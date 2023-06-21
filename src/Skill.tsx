import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import "./Skill.scss";
import SkillEdit from "./SkillEdit";
import SkillCategories from "./ClassesPanel/SkillCategories";
import { SkillVariable } from "./CharacterPanel/slice/state/SkillVariable";
import { Skill } from "./CharacterPanel/slice/state/Skill";
import { TierDescription } from "./CharacterPanel/slice/state/TierDescription";

interface SkillProps extends Skill {
    allowEdit: boolean;
    expanded: boolean;
    calculateValueOfIncreasedVariable(
        variable: SkillVariable,
        skill: Skill
    ): number;
}

class SkillComponent extends React.Component<
    SkillProps,
    { expanded: boolean }
> {
    constructor(props: SkillProps) {
        super(props);

        this.state = {
            expanded: props.expanded,
        };
    }

    

    switchExpandVisibility() {
        this.setState((prevState) => ({
            expanded: !prevState.expanded,
        }));
    }

    replaceVariableMarkupsInTierDescriptions(tierDescription: TierDescription) {
        const query = /<[\\S]*>/g;
        
        let tierDescriptionVariablesMatches = [
            ...tierDescription.description.matchAll(query),
        ];

        if (tierDescriptionVariablesMatches.length > 0) {
            let variableNames = tierDescriptionVariablesMatches.map((m) =>
                m[0].slice(1, m[0].length - 1)
            );
            variableNames = [...new Set(variableNames)];

            let dictionary = new Map();
            for (let i = 0; i < variableNames.length; i++) {
                const vn = variableNames[i];

                const propVariable = this.props.variables.filter(
                    (v) => v.name === vn
                )[0];

                const calculatedIncreasedVariable =
                    this.props.calculateValueOfIncreasedVariable(
                        propVariable,
                        this.props
                    );

                dictionary.set(
                    "<" + vn + ">",
                    this.props.calculateValueOfIncreasedVariable(
                        propVariable,
                        this.props
                    )
                );

                switch (propVariable.variableCalculationType) {
                    case "Additive":
                        dictionary.set(
                            "<" + vn + ">",
                            propVariable.baseValue +
                                propVariable.unit +
                                " [" +
                                calculatedIncreasedVariable +
                                propVariable.unit +
                                "]"
                        );
                        break;
                    case "None":
                    case "Reciprocal":
                    case "StaticAdditiveOtherVariableBased":
                        dictionary.set(
                            "<" + vn + ">",
                            propVariable.baseValue +
                                propVariable.unit +
                                " [" +
                                calculatedIncreasedVariable +
                                propVariable.unit +
                                "]"
                        );
                        break;
                    default:
                        console.error(
                            "calculationType '" +
                                propVariable.variableCalculationType +
                                "' is not known"
                        );
                }
            }

            let description = tierDescription.description;

            for (const prop in dictionary) {
                description = description.replace(prop, dictionary.get(prop));
            }
        }

        return tierDescription.description;
    }

    render() {
        return (
            <div className="skill">
                <div className="skill-top-row">
                    <button
                        className="skill-expand"
                        onClick={() => this.switchExpandVisibility()}
                    >
                        {this.state.expanded ? (
                            <FontAwesomeIcon icon={faCaretUp} />
                        ) : (
                            <FontAwesomeIcon icon={faCaretDown} />
                        )}
                    </button>
                    <div className="skill-name">
                        {this.props.type}: {this.props.name}{" "}
                        {this.props.enhanced ? " [Enhanced]" : ""}
                    </div>
                    <div>Level {this.props.level}</div>
                    <div className="skill-tier">Tier {this.props.tier}</div>
                </div>
                {this.state.expanded && (
                    <>
                        <div>
                            {this.props.tierDescriptions
                                .map((x) => x)
                                .sort((a, b) => a.tier - b.tier)
                                .map((td) => (
                                    <p key={td.id} className="tier-description">
                                        Tier {td.tier}:{" "}
                                        {this.replaceVariableMarkupsInTierDescriptions(
                                            td
                                        )}
                                    </p>
                                ))}
                        </div>
                        <SkillCategories categoryIds={this.props.categoryIds} />
                        {this.props.allowEdit && (
                            <SkillEdit
                                {...this.props}
                                skillId={this.props.id}
                            />
                        )}
                    </>
                )}
            </div>
        );
    }
}

export default SkillComponent;

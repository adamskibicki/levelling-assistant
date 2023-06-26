import { useState } from "react";
import "./Skill.scss";
import SkillCategories from "./ClassesPanel/SkillCategories";
import { Skill } from "./CharacterPanel/slice/state/Skill";
import { TierDescription } from "./CharacterPanel/slice/state/TierDescription";
import { useCalculateValueOfIncreasedVariable } from "./CharacterPanel/useCalculateValueOfIncreasedVariable";
import { ExpandButton } from "./components/common/Buttons";

export default function SkillComponent(props: {
    allowEdit: boolean;
    expanded: boolean;
} & Skill) {
    const [expanded, setExpanded] = useState(props.expanded);
    const {calculateValueOfIncreasedVariable} = useCalculateValueOfIncreasedVariable();

    const switchExpandVisibility = () => {
        setExpanded((prevState) => !prevState);
    }

    const replaceVariableMarkupsInTierDescriptions = (tierDescription: TierDescription) => {
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

                const propVariable = props.variables.filter(
                    (v) => v.name === vn
                )[0];

                const calculatedIncreasedVariable =
                    calculateValueOfIncreasedVariable(
                        propVariable,
                        props
                    );

                dictionary.set(
                    "<" + vn + ">",
                    calculateValueOfIncreasedVariable(
                        propVariable,
                        props
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

    return (
        <div className="skill">
            <div className="skill-top-row">
                <ExpandButton expanded={expanded} onClick={() => switchExpandVisibility()} />
                <div className="skill-name">
                    {props.type}: {props.name}{" "}
                    {props.enhanced ? " [Enhanced]" : ""}
                </div>
                <div>Level {props.level}</div>
                <div className="skill-tier">Tier {props.tier}</div>
            </div>
            {expanded && (
                <>
                    <div>
                        {props.tierDescriptions
                            .map((x) => x)
                            .sort((a, b) => a.tier - b.tier)
                            .map((td) => (
                                <p key={td.id} className="tier-description">
                                    Tier {td.tier}:{" "}
                                    {replaceVariableMarkupsInTierDescriptions(
                                        td
                                    )}
                                </p>
                            ))}
                    </div>
                    <SkillCategories categoryIds={props.categoryIds} />
                </>
            )}
        </div>
    );
}
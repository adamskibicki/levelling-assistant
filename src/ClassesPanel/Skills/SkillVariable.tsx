import { useSelector } from "react-redux";
import { SkillVariable } from "../../CharacterPanel/slice/state/SkillVariable";
import { useCalculateValueOfIncreasedVariable } from "../../CharacterPanel/useCalculateValueOfIncreasedVariable";
import "./SkillVariable.scss";
import { RootState } from "../../store/store";
import useGetSkillVariableById from "./useGetSkillVariableById";
import { useAllClassModifiers } from "../../CharacterPanel/useAllClassModifiers";
import { Skill } from "../../CharacterPanel/slice/state/Skill";

export default function SkillVariableComponent(props: {
    skillVariable: SkillVariable;
    skill: Skill;
}) {
    const { allClassModifiers } = useAllClassModifiers();
    const { calculateValueOfIncreasedVariable } =
        useCalculateValueOfIncreasedVariable(allClassModifiers);
    const { getSkillVariableById } = useGetSkillVariableById();
    const stats = useSelector(
        (state: RootState) =>
            state.characterPanel.generalInformation.stats.stats
    );

    const getAffectedDescription = () => {
        let results = [];

        if (props.skillVariable.baseSkillVariableId)
            results.push(
                `Affects variable ${
                    getSkillVariableById(props.skillVariable.baseSkillVariableId)?.name
                }`
            );
        if (props.skillVariable.affectedStatIds)
            results.push(`Affects stats: ${getAffectedStatNames()}`);
        return results.join("  ");
    };

    const getAffectedStatNames = () => {
        const affectedStats = stats.filter((s) => {
            return (
                props.skillVariable.affectedStatIds.findIndex((asi) => asi === s.id) !== -1
            );
        });

        return affectedStats.map((s) => s.name).join(", ");
    };

    return (
        <div className="skill-variable">
            <div className="skill-variable__name">{props.skillVariable.name}</div>
            <div className="skill-variable__value">
                {calculateValueOfIncreasedVariable(props.skillVariable, props.skill)}
                {props.skillVariable.unit}
            </div>
            <div className="skill-variable__affected">
                {getAffectedDescription()}
            </div>
        </div>
    );
}

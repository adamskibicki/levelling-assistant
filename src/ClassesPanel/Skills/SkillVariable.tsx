import { useSelector } from "react-redux";
import { SkillVariable } from "../../CharacterPanel/slice/state/SkillVariable";
import { useCalculateValueOfIncreasedVariable } from "../../CharacterPanel/useCalculateValueOfIncreasedVariable";
import "./SkillVariable.scss";
import { RootState } from "../../store/store";
import useGetSkillVariableById from "./useGetSkillVariableById";

export default function SkillVariableComponent(
    props: SkillVariable
) {
    const { calculateValueOfIncreasedVariable } =
        useCalculateValueOfIncreasedVariable();
    const { getSkillVariableById } = useGetSkillVariableById();
    const stats = useSelector(
        (state: RootState) =>
            state.characterPanel.generalInformation.stats.stats
    );

    const getAffectedDescription = () => {
        let results = [];

        if (props.baseSkillVariableId)
            results.push(`Affects variable ${getSkillVariableById(props.baseSkillVariableId)?.name}`);
        if (props.affectedStatIds)
            results.push(`Affects stats: ${getAffectedStatNames()}`);
        return results.join("  ");
    };

    const getAffectedStatNames = () => {
        const affectedStats = stats.filter((s) => {
            return (
                props.affectedStatIds.findIndex((asi) => asi === s.id) !== -1
            );
        });

        return affectedStats.map((s) => s.name).join(", ");
    };

    return (
        <div className="skill-variable">
            <div className="skill-variable__name">{props.name}</div>
            <div className="skill-variable__value">
                {calculateValueOfIncreasedVariable(props)}
                {props.unit}
            </div>
            <div className="skill-variable__affected">
                {getAffectedDescription()}
            </div>
        </div>
    );
}

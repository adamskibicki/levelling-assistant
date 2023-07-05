import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

export default function useGetSkillVariableById() {
    const skillVariables = useSelector((state: RootState) =>
        state.characterPanel.classes
            .flatMap((c) => c.skills)
            .flatMap((s) => s.variables)
    );

    const getSkillVariableById = (id: string) => {
        return skillVariables.find((sv) => sv.id === id);
    };

    return { getSkillVariableById };
}

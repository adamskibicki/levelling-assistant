import { useMemo } from "react";
import { useAppSelector } from "../../store/store";

export default function useGetSkillVariableById() {
    const allClasses = useAppSelector(
        (state) => state.characterPanel.classes
    );

    const skillVariables = useMemo(
        () => allClasses.flatMap((c) => c.skills).flatMap((s) => s.variables),
        [allClasses]
    );

    const getSkillVariableById = (id: string) => {
        return skillVariables.find((sv) => sv.id === id);
    };

    return { getSkillVariableById };
}

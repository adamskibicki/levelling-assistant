import { useMemo } from "react";
import { useAppSelector } from "../store/store";

export function useAllClassModifiers() {
    const allClasses = useAppSelector((state) => state.characterPanel.classes);

    const allClassModifiers = useMemo(
        () => allClasses.flatMap((c) => c.modifiers),
        [allClasses]
    );

    return { allClassModifiers };
}

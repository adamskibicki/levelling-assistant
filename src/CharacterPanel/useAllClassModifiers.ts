import { useSelector } from "react-redux";
import { RootState } from "../store/store";

export function useAllClassModifiers() {
    const allClassModifiers = useSelector((state: RootState) =>
        state.characterPanel.classes.flatMap((c) => c.modifiers)
    );

    return { allClassModifiers };
}

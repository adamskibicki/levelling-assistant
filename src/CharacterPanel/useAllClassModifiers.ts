import { useSelector } from "react-redux";
import { CharacterPanelSliceState } from "./slice/state/CharacterPanelSliceState";


export function useAllClassModifiers() {
    const allClassModifiers = useSelector(
        (state: { characterPanel: CharacterPanelSliceState; }) => state.characterPanel.classes.flatMap(c => c.modifiers)
    );

    return { allClassModifiers };
}

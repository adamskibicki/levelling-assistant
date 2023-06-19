import { CharacterStatusSimplified } from "./slice/state/UserCharacterSliceState";

export const getNewestCharacterStatus = (
    characterStatuses: Array<CharacterStatusSimplified>
) => {
    return characterStatuses.reduce((prev, current) =>
        prev.createdAt > current.createdAt ? prev : current
    );
};
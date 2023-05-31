export const initialState: UserCharacterSliceState = {
    loaded: false,
    userCharacters: []
};

interface UserCharacterSliceState {
    loaded: boolean,
    userCharacters: Array<UserCharacter>
}

export interface UserCharacter {
    id: string,
    characterStatuses: Array<CharacterStatusSimplified>
}

export interface CharacterStatusSimplified {
    id: string,
    createdAt: Date,
    name: string,
    title: string
}
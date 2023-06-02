export const initialState: UserCharacterSliceState = {
    loaded: false,
    userCharacters: []
};

export interface UserCharacterSliceState {
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
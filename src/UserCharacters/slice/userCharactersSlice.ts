import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "./state/UserCharacterSliceState";
import { getUserCharacters } from "./thunks/getUserCharacters";
import { postUserCharacter } from "./thunks/postUserCharacter";
import { deleteUserCharacter } from "./thunks/deleteUserCharacter";
import { deleteCharacterStatus } from "./thunks/deleteCharacterStatus";

export const userCharactersSlice = createSlice({
    name: "userCharacters",
    initialState: initialState,
    reducers: {
    },
    extraReducers(builder) {
        builder
            .addCase(getUserCharacters.fulfilled, (state, action) => {
                state.loaded = true;
                state.userCharacters = action.payload;
            })
            .addCase(getUserCharacters.pending, (state) => {
                state.loaded = false;
            })
            .addCase(getUserCharacters.rejected, (state) => {
                state.loaded = false;
            });
            
        builder
            .addCase(postUserCharacter.fulfilled, (state, action) => {
                state.userCharacters = [...state.userCharacters, action.payload];
            });
            
        builder
            .addCase(deleteUserCharacter.fulfilled, (state, action) => {
                state.userCharacters = state.userCharacters.filter(uc => uc.id !== action.meta.arg);
            });

        builder
            .addCase(deleteCharacterStatus.fulfilled, (state, action) => {
                const deletedCharacterStatusId = action.meta.arg;

                for (let i = 0; i < state.userCharacters.length; i++) {
                    const uc = state.userCharacters[i];
                    
                    const csIndex = uc.characterStatuses.findIndex(cs => cs.id === deletedCharacterStatusId);

                    if (csIndex !== -1) {
                        state.userCharacters[i].characterStatuses = state.userCharacters[i].characterStatuses.filter(cs => cs.id !== deletedCharacterStatusId);
                        break;
                    }
                }
            });
    }
});

export default userCharactersSlice.reducer;
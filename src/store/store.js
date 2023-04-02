import { configureStore } from "@reduxjs/toolkit";
import characterPanelReducer from '../CharacterPanel/characterPanelSlice';
import userCharactersReducer from '../UserCharacters/userCharactersSlice';

export default configureStore({
    reducer: {
        characterPanel: characterPanelReducer,
        userCharacters: userCharactersReducer
    },
});
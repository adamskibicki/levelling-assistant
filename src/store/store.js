import { configureStore } from "@reduxjs/toolkit";
import characterPanelReducer from '../CharacterPanel/characterPanelSlice';
import userCharactersReducer from '../UserCharacters/slice/userCharactersSlice';

export default configureStore({
    reducer: {
        characterPanel: characterPanelReducer,
        userCharacters: userCharactersReducer
    },
});
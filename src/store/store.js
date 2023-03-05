import { configureStore } from "@reduxjs/toolkit";
import characterPanelReducer from '../CharacterPanel/characterPanelSlice';


export default configureStore({
    reducer: {
        characterPanel: characterPanelReducer,
    },
});
import { configureStore } from "@reduxjs/toolkit";
import characterPanelReducer from '../CharacterPanel/slice/characterPanelSlice';
import userCharactersReducer from '../UserCharacters/slice/userCharactersSlice';
import { useDispatch } from "react-redux";

const store = configureStore({
    reducer: {
        characterPanel: characterPanelReducer,
        userCharacters: userCharactersReducer
    },
});

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;


export default store;
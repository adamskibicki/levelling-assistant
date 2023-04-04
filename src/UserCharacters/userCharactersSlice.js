import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    loaded: false,
    userCharacters: []
};

export const userCharactersSlice = createSlice({
    name: "userCharacters",
    initialState:initialState,
    reducers: {

    },
    extraReducers(builder) {
        builder
            .addCase(getUserCharacters.fulfilled, (state, action) => {
                state.loaded = true;
                state.userCharacters = action.payload;
            });
            
        builder
            .addCase(postUserCharacter.fulfilled, (state, action) => {
                state.userCharacters = [...state.userCharacters, action.payload];
            });
            
        builder
            .addCase(deleteUserCharacter.fulfilled, (state, action) => {
                state.userCharacters = state.userCharacters.filter(uc => uc.id !== action.meta.arg);
            });
    }
});

export const getUserCharacters = createAsyncThunk('userCharacters/get', async () => {
    const response = await axios.get('https://localhost:7119/api/UserCharacters');
    return response.data;
});

export const postUserCharacter = createAsyncThunk('userCharacters/post', async (data) => {
    const response = await axios.post('https://localhost:7119/api/UserCharacters', {...data});
    return response.data;
});

export const deleteUserCharacter = createAsyncThunk('userCharacters/delete', async (data) => {
    const response = await axios.delete('https://localhost:7119/api/UserCharacters', { params: { id: data } });
    return response.data;
});

export default userCharactersSlice.reducer;
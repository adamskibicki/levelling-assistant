import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { UserCharacter } from "../state/UserCharacterSliceState";

export const getUserCharacters = createAsyncThunk('userCharacters/get', async () => {
    try{
        const response = await axios.get('https://localhost:7119/api/UserCharacters');
        return response.data as Array<UserCharacter>;

    }
    catch(e){
        console.log(e);
    }

    return [];
});
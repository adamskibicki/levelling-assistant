import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const postUserCharacter = createAsyncThunk('userCharacters/post', async (data: PostUserCharacterRequestData) => {
    const response = await axios.post('https://localhost:7119/api/UserCharacters', {...data});
    return response.data as PostUserCharacterResponseData;
});

interface PostUserCharacterRequestData {
    
}

interface PostUserCharacterResponseData {

}
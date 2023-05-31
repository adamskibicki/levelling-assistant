import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { CharacterStatusSimplified } from "../state/UserCharacterSliceState";

export const postUserCharacter = createAsyncThunk<PostUserCharacterResponseData, PostUserCharacterRequestData>('userCharacters/post', async (data) => {
    const response = await axios.post('https://localhost:7119/api/UserCharacters', {...data});
    return response.data as PostUserCharacterResponseData;
});

interface PostUserCharacterRequestData {
    name: string;
    title: string;
}

interface PostUserCharacterResponseData {
    id: string;
    characterStatuses: Array<CharacterStatusSimplified>;
}
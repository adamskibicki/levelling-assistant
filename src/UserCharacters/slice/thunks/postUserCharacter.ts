import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { CharacterStatusSimplified } from "../state/UserCharacterSliceState";
import authHeader from "../../../Identity/services/auth-header";

export const postUserCharacter = createAsyncThunk<
    PostUserCharacterResponseData,
    PostUserCharacterRequestData
>("userCharacters/post", async (data) => {
    const response = await axios.post(
        "https://localhost:7119/api/UserCharacters",
        { ...data },
        { headers: authHeader() }
    );
    return response.data as PostUserCharacterResponseData;
});

export interface PostUserCharacterRequestData {
    name: string;
    title: string;
}

interface PostUserCharacterResponseData {
    id: string;
    characterStatuses: Array<CharacterStatusSimplified>;
}

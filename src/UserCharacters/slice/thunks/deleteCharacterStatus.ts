import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import authHeader from "../../../Identity/services/auth-header";

export const deleteCharacterStatus = createAsyncThunk<string, string>(
    "characterStatuses/delete",
    async (data) => {
        const response = await axios.delete(
            "https://localhost:7119/api/CharacterStatus",
            { params: { id: data }, headers: authHeader() }
        );
        return response.data;
    }
);

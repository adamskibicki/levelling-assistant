import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import authHeader from "../../../Identity/services/auth-header";

export const deleteUserCharacter = createAsyncThunk<string, string>(
    "userCharacters/delete",
    async (data) => {
        const response = await axios.delete(
            "https://localhost:7119/api/UserCharacters",
            { params: { id: data }, headers: authHeader() }
        );
        return response.data;
    }
);

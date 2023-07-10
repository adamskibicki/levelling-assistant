import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import authHeader from "../../../Identity/services/auth-header";

export const fetchUserCategories = createAsyncThunk(
    "character/getUserCategories",
    async () => {
        const response = await axios.get(
            "https://localhost:7119/api/Categories/GetUserCategories",
            { headers: authHeader() }
        );
        return response.data;
    }
);

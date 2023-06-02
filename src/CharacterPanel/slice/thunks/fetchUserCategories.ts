import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUserCategories = createAsyncThunk('character/getUserCategories', async () => {
    const response = await axios.get('https://localhost:7119/api/Categories/GetUserCategories');
    return response.data;
});
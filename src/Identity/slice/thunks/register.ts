import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const register = createAsyncThunk<RegisterResponseData, RegisterRequestData>('Identity/RegisterUser', async (data) => {
    const response = await axios.post('https://localhost:7119/api/Identity/RegisterUser', { ...data });
    return response.data as RegisterResponseData;
});

interface RegisterRequestData {
    email: string;
    userName: string;
    password: string;
}

interface RegisterResponseData {}
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const login = createAsyncThunk<LoginResponseData, LoginRequestData>('Identity/LoginUser', async (data) => {
    const response = await axios.post('https://localhost:7119/api/Identity/LoginUser', { ...data });
    return response.data as LoginResponseData;
});

interface LoginRequestData {
    email: string;
    password: string;
}

interface LoginResponseData {
    id: string;
    userName: string;
    email: string;
    token: string;
}
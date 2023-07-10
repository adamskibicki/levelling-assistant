import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import authHeader from "../../services/auth-header";

export const validateStoredToken = createAsyncThunk<
    ValidateStoredLoginResponseData
>("Identity/ValidateToken", async () => {
    const response = await axios.post(
        "https://localhost:7119/api/Identity/ValidateToken",
        {},
        { headers: authHeader() }
    );
    return response.data as ValidateStoredLoginResponseData;
});

interface ValidateStoredLoginResponseData {
    id: string;
    userName: string;
    email: string;
}

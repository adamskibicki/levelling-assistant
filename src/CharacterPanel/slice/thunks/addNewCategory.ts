import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import authHeader from "../../../Identity/services/auth-header";

export const addNewCategory = createAsyncThunk<
    AddNewCategoryResponseData,
    AddNewCategoryRequestData
>("character/addNewCategory", async (data) => {
    const response = await axios.post(
        "https://localhost:7119/api/Categories/AddNewCategory",
        { ...data },
        { headers: authHeader() }
    );
    return response.data as AddNewCategoryResponseData;
});

interface AddNewCategoryRequestData {}

interface AddNewCategoryResponseData {
    id: string;
    name: string;
    displayColor: string;
}

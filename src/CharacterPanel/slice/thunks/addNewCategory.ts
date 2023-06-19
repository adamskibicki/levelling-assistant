import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const addNewCategory = createAsyncThunk<AddNewCategoryResponseData, AddNewCategoryRequestData>('character/addNewCategory', async (data) => {
    const response = await axios.post('https://localhost:7119/api/Categories/AddNewCategory', { ...data });
    return response.data as AddNewCategoryResponseData;
});

interface AddNewCategoryRequestData {
}

interface AddNewCategoryResponseData {
    id: string;
    name: string;
    displayColor: string;
}
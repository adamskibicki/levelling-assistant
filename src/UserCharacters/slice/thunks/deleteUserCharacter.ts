import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const deleteUserCharacter = createAsyncThunk<string, string>('userCharacters/delete', async (data) => {
    const response = await axios.delete('https://localhost:7119/api/UserCharacters', { params: { id: data } });
    return response.data;
});
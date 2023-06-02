import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { NavigateFunction } from "react-router-dom";

export const saveCharacterStatusChanges = createAsyncThunk<SaveCharacterStatusChangesResponseData, SaveCharacterStatusChangesRequestData>('character/post', async (data) => {
    const response = await axios.post('https://localhost:7119/api/CharacterStatus', data.payload);
    return response.data as SaveCharacterStatusChangesResponseData;
});

interface SaveCharacterStatusChangesRequestData {
    payload: any;
    navigate: NavigateFunction;
}

interface SaveCharacterStatusChangesResponseData {
    id: string;
}
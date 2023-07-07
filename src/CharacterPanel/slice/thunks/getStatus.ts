import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { GeneralInformation } from "../state/GeneralInformation";
import { CharacterClass } from "../state/CharacterClass";
import { GeneralSkill } from "../state/GeneralSkill";
import authHeader from "../../../Identity/services/auth-header";

export const getStatus = createAsyncThunk<
    GetStatusResponseData,
    GetStatusRequestData
>("characterStatus/get", async (data) => {
    const response = await axios.get(
        "https://localhost:7119/api/CharacterStatus",
        { params: { statusId: data.id }, headers: authHeader() }
    );
    return response.data;
});

interface GetStatusRequestData {
    id: string;
}

interface GetStatusResponseData {
    generalInformation: GeneralInformation;
    classes: CharacterClass[];
    generalSkills: GeneralSkill[];
}

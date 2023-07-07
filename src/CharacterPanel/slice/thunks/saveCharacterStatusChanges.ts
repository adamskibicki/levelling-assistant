import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { NavigateFunction } from "react-router-dom";
import authHeader from "../../../Identity/services/auth-header";

export const saveCharacterStatusChanges = createAsyncThunk<
    SaveCharacterStatusChangesResponseData,
    SaveCharacterStatusChangesRequestData
>("character/post", async (data) => {
    const response = await axios.post(
        "https://localhost:7119/api/CharacterStatus",
        data.payload,
        { headers: authHeader() }
    );
    return response.data as SaveCharacterStatusChangesResponseData;
});

interface SaveCharacterStatusChangesRequestData {
    payload: {
        characterStatus: CharacterStatus;
        characterStatusId: string;
    };
    navigate: NavigateFunction;
}

interface SaveCharacterStatusChangesResponseData {
    id: string;
}

export interface CharacterStatus {
    classes: any[];
    generalInformation: GeneralInformation;
    generalSkills: any;
}

interface GeneralInformation {
    basicInfo: BasicInfo;
    stats: Stats;
    skillpoints: any;
    resources: Resource[];
}

interface BasicInfo {
    name: string;
    title: string;
}

interface Stats {
    unspentStatpoints: number;
    stats: Stat[];
}

interface Stat {
    id: string;
    name: string;
    value: number;
    isHidden: boolean;
}

interface Resource {
    id: string;
    displayName: string;
    baseStatId: any;
    resourcePointsPerBaseStatPoint: number;
}

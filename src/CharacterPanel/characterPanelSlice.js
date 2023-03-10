import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    loaded: false,
    generalInformation: {
        basicInfo: {
            name: "None",
            title: "None"
        },
        resources: [
            {
                displayName: "Health",
                calculationName: "Health",
                baseStatName: "Vitality",
                resourcePointsPerBaseStatPoint: 10
            },
        ],
        stats: {
            unspentStatpoints: 0,
            stats: [
                {
                    name: "Vitality",
                    value: 0
                }
            ]
        },
        skillpoints: {
            coreSkillpoints: 0,
            fourthTierSkillpoints: 0,
            thirdTierGeneralSkillpoints: 0,
            fourthTierGeneralSkillpoints: 0
        }
    },
    classes: [
        {
            name: "None",
            level: 0,
            modifiers: [],
            skills: [
                {
                    name: "None",
                    level: 0,
                    tier: 0,
                    tierDescriptions: [],
                    type: "None",
                    categories: [],
                    enhanced: false
                }
            ]
        },
        {
            name: "None",
            level: 0,
            modifiers: [],
            skills: [
                {
                    name: "None",
                    level: 0,
                    tier: 0,
                    tierDescriptions: [],
                    type: "None",
                    categories: [],
                    enhanced: false
                }
            ]
        },
        {
            name: "None",
            level: 0,
            modifiers: [],
            skills: [
                {
                    name: "None",
                    level: 0,
                    tier: 0,
                    tierDescriptions: [],
                    type: "None",
                    categories: [],
                    enhanced: false
                }
            ]
        },
    ],
    "generalSkills": null
};

export const characterPanelSlice = createSlice({
    name: 'characterPanel',
    initialState: initialState,
    reducers: {
        updateSkillTierDescriptions: (state, action) => {
            const {skillId, classId} = action.payload;
            state.classes[classId].skills[skillId].tierDescriptions = action.payload.tierDescriptions;
        }
    },
    extraReducers(builder) {
        builder
            .addCase(fetchCharacterData.pending, (state, action) => {
                state.loaded = false;
            })
            .addCase(fetchCharacterData.fulfilled, (state, action) => {
                state.loaded = true;
                state.generalInformation = action.payload.generalInformation;
                state.classes = action.payload.classes;
                state.generalSkills = action.payload.generalSkills;
            })
            .addCase(fetchCharacterData.rejected, (state, action) => {
                state.loaded = false;
            })
    }
});

export const fetchCharacterData = createAsyncThunk('character/getData', async () => {
    const response = await axios.get('https://localhost:7119/api/Status/GetStatus', { params: { statusId: '6daa1ea5-9c21-45fc-ab05-447f30c8a0fc' } });
    return response.data;
})

export const { updateSkillTierDescriptions } = characterPanelSlice.actions;

export default characterPanelSlice.reducer;
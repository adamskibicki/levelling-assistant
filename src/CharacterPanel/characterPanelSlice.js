import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    loaded: false,
    userCategories: [],
    generalInformation: {
        basicInfo: {
            name: "None",
            title: "None"
        },
        resources: [],
        stats: {
            unspentStatpoints: 0,
            stats: []
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
        updateSkill: (state, action) => {
            const {skillId, classId} = action.payload;
            state.classes[classId].skills[skillId].tierDescriptions = action.payload.tierDescriptions;
            state.classes[classId].skills[skillId].categories = action.payload.categories;
        },
        editBasicInfo: (state, action) => {
            const {name, title} = action.payload;
            state.generalInformation.basicInfo.name = name;
            state.generalInformation.basicInfo.title = title;
        },
        editStats: (state, action) => {
            const {stats} = action.payload;
            state.generalInformation.stats.stats = stats;
        }
    },
    extraReducers(builder) {
        builder
            .addCase(getStatus.pending, (state, action) => {
                state.loaded = false;
            })
            .addCase(getStatus.fulfilled, (state, action) => {
                state.loaded = true;
                state.generalInformation = action.payload.generalInformation;
                state.classes = action.payload.classes;
                state.generalSkills = action.payload.generalSkills;
            })
            .addCase(getStatus.rejected, (state, action) => {
                state.loaded = false;
            });

        builder
            .addCase(fetchUserCategories.fulfilled, (state, action) => {
                state.userCategories = action.payload;
            });
            
        builder
            .addCase(addNewCategory.fulfilled, (state, action) => {
                state.userCategories = [...state.userCategories, action.payload];
            });
    }
});

export const getStatus = createAsyncThunk('characterStatus/get', async (action) => {
    const response = await axios.get('https://localhost:7119/api/Status/GetStatus', { params: { statusId: action.statusId } });
    return response.data;
})

export const fetchUserCategories = createAsyncThunk('character/getUserCategories', async () => {
    const response = await axios.get('https://localhost:7119/api/Categories/GetUserCategories');
    return response.data;
})

export const addNewCategory = createAsyncThunk('character/addNewCategory', async (data) => {
    const response = await axios.post('https://localhost:7119/api/Categories/AddNewCategory', {...data});
    return response.data;
})

export const { updateSkill, editBasicInfo, editStats } = characterPanelSlice.actions;

export default characterPanelSlice.reducer;
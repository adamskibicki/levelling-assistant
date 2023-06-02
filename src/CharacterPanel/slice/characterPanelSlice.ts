import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "./state/CharacterPanelSliceState";
import { getStatus } from "./thunks/getStatus";
import { fetchUserCategories } from "./thunks/fetchUserCategories";
import { addNewCategory } from "./thunks/addNewCategory";
import { saveCharacterStatusChanges } from "./thunks/saveCharacterStatusChanges";

export const characterPanelSlice = createSlice({
    name: 'characterPanel',
    initialState: initialState,
    reducers: {
        updateSkill: (state, action) => {
            const { skillId, classId } = action.payload;
            state.classes[classId].skills[skillId].tierDescriptions = action.payload.tierDescriptions;
            state.classes[classId].skills[skillId].categories = action.payload.categories;
        },
        editBasicInfo: (state, action) => {
            const { name, title } = action.payload;
            state.generalInformation.basicInfo.name = name;
            state.generalInformation.basicInfo.title = title;
        },
        editStats: (state, action) => {
            const { stats } = action.payload;
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

        builder
            .addCase(saveCharacterStatusChanges.fulfilled, (state, action) => {
                console.log(action);
                action.meta.arg.navigate(`/character/${action.payload.id}`);
            });
    }
});

export const { updateSkill, editBasicInfo, editStats } = characterPanelSlice.actions;

export default characterPanelSlice.reducer;
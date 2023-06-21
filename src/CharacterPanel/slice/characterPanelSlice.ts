import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { initialState } from "./state/CharacterPanelSliceState";
import { getStatus } from "./thunks/getStatus";
import { fetchUserCategories } from "./thunks/fetchUserCategories";
import { addNewCategory } from "./thunks/addNewCategory";
import { saveCharacterStatusChanges } from "./thunks/saveCharacterStatusChanges";
import { CharacterClass } from "./state/CharacterClass";
import { TierDescription } from "./state/TierDescription";

export const characterPanelSlice = createSlice({
    name: "characterPanel",
    initialState: initialState,
    reducers: {
        updateSkill: (
            state,
            action: PayloadAction<{
                tierDescriptions: TierDescription[];
                categoryIds: string[];
                skillId: string;
            }>
        ) => {
            const { skillId } = action.payload;

            const skillTuUpdate = state.classes
                .flatMap((c) => c.skills)
                .find((s) => s.id === skillId);

            if (skillTuUpdate === undefined)
                throw new Error("skillTuUpdate is undefinded");

            skillTuUpdate.tierDescriptions = action.payload.tierDescriptions;
            skillTuUpdate.categoryIds = action.payload.categoryIds;
        },
        updateClassModifiers: (state, action) => {
            const { classId, classModifiers } = action.payload;

            const classToUpdate = state.classes.find((c) => c.id === classId);

            if (classToUpdate === undefined)
                throw new Error("classToUpdate is undefinded");

            classToUpdate.modifiers = classModifiers;
        },
        editBasicInfo: (state, action) => {
            const { name, title } = action.payload;
            state.generalInformation.basicInfo.name = name;
            state.generalInformation.basicInfo.title = title;
        },
        editStats: (state, action) => {
            const { stats } = action.payload;
            state.generalInformation.stats.stats = stats;
        },
        addClass: (
            state,
            action: {
                payload: CharacterClass;
                type: string;
            }
        ) => {
            state.classes = [...state.classes, action.payload];
        },
        deleteClass: (
            state,
            action: {
                payload: string;
                type: string;
            }
        ) => {
            state.classes = state.classes.filter(
                (c) => c.id !== action.payload
            );
        },
        editClass: (
            state,
            action: {
                payload: CharacterClass;
                type: string;
            }
        ) => {
            const index = state.classes.findIndex(
                (c) => c.id === action.payload.id
            );
            state.classes[index] = action.payload;
        },
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

        builder.addCase(fetchUserCategories.fulfilled, (state, action) => {
            state.userCategories = action.payload;
        });

        builder.addCase(addNewCategory.fulfilled, (state, action) => {
            state.userCategories = [...state.userCategories, action.payload];
        });

        builder.addCase(
            saveCharacterStatusChanges.fulfilled,
            (state, action) => {
                action.meta.arg.navigate(`/character/${action.payload.id}`);
            }
        );
    },
});

export const {
    updateSkill,
    updateClassModifiers,
    editBasicInfo,
    editStats,
    addClass,
    deleteClass,
    editClass,
} = characterPanelSlice.actions;

export default characterPanelSlice.reducer;

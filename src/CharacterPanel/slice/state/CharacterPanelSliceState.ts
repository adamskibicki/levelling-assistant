import { CharacterClass } from "./CharacterClass";
import { GeneralInformation } from "./GeneralInformation";
import { GeneralSkill } from "./GeneralSkill";
import { UserCategory } from "./UserCategory";

export const initialState: CharacterPanelSliceState = {
    loaded: false,
    userCategories: [],
    generalInformation: {
        basicInfo: {
            name: "None",
            title: "None",
        },
        resources: [],
        stats: {
            unspentStatpoints: 0,
            stats: [],
        },
        skillpoints: {
            coreSkillpoints: 0,
            fourthTierSkillpoints: 0,
            thirdTierGeneralSkillpoints: 0,
            fourthTierGeneralSkillpoints: 0,
        },
    },
    classes: [],
    generalSkills: [],
};

export interface CharacterPanelSliceState {
    loaded: boolean;
    classes: Array<CharacterClass>;
    generalInformation: GeneralInformation;
    generalSkills: Array<GeneralSkill>;
    userCategories: Array<UserCategory>;
}
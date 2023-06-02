import { CharacterStats } from "./CharacterStats";
import { Skillpoints } from "./Skillpoints";
import { BasicInfo } from "./BasicInfo";
import { Resource } from "./Resource";

export interface GeneralInformation {
    basicInfo: BasicInfo;
    stats: CharacterStats;
    resources: Array<Resource>;
    skillpoints: Skillpoints;
}


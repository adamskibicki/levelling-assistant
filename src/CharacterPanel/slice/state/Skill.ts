import { uuidv4 } from "../../../common/Guid";
import { SkillVariable } from "./SkillVariable";
import { TierDescription } from "./TierDescription";


export interface Skill {
    id: string;
    name: string;
    level: number;
    tier: number;
    type: SkillType;
    enhanced: boolean;
    tierDescriptions: TierDescription[];
    categoryIds: string[];
    variables: SkillVariable[];
}

export enum SkillType {
    Active = "Active",
    Passive = "Passive",
}

export function GetDefault(): Skill {
    return {
        id: uuidv4(),
        name: "Skill name",
        level: 1,
        tier: 1,
        type: SkillType.Active,
        enhanced: false,
        tierDescriptions: [],
        categoryIds: [],
        variables: []
    };
}
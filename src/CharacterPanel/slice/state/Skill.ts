import { SkillVariable } from "./SkillVariable";
import { TierDescription } from "./TierDescription";


export interface Skill {
    id: string;
    name: string;
    level: number;
    tier: number;
    type: string;
    enhanced: boolean;
    tierDescriptions: TierDescription[];
    categoryIds: string[];
    variables: SkillVariable[];
}
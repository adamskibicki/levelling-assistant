import { Category } from "./Category";
import { SkillVariable } from "./SkillVariable";
import { TierDescription } from "./TierDescription";


export interface Skill {
    name: string;
    level: number;
    tier: number;
    type: string;
    enhanced: boolean;
    tierDescriptions: Array<TierDescription>;
    categories: Array<Category>;
    variables: SkillVariable[];
}
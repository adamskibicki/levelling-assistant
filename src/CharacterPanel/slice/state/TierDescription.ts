import { uuidv4 } from "../../../common/Guid";

export interface TierDescription {
    id: string;
    tier: number;
    description: string;
 }

 export function GetDefault(): TierDescription {
    return {
        description: "Tier description",
        id: uuidv4(),
        tier: 1
    };
 }
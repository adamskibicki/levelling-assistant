import { v4 as uuidv4 } from "uuid";

export interface Resource {
    id: string;
    displayName: string;
    baseStatId: string | null;
    resourcePointsPerBaseStatPoint: number;
}

export function GetDefault(): Resource {
    return {
        id: uuidv4(),
        displayName: "New resource",
        baseStatId: null,
        resourcePointsPerBaseStatPoint: 10,
    };
}

import { CategoryCalculationType } from "./CategoryCalculationType";
import { v4 as uuidv4 } from "uuid";

export interface ClassModifier {
    id: string;
    affectedResourceId: string | null;
    categoryCalculationType: CategoryCalculationType;
    percentagePointsOfCategoryIncrease: number;
    categoryId: string | null;
    description: string;
}

export function GetDefault(): ClassModifier {
    return {
        affectedResourceId: null,
        categoryId: null,
        categoryCalculationType: CategoryCalculationType.None,
        description: "",
        id: uuidv4(),
        percentagePointsOfCategoryIncrease: 0,
    };
}
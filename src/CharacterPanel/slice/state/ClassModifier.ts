import { Category } from "./Category";
import { CategoryCalculationType } from "./CategoryCalculationType";
import { v4 as uuidv4 } from "uuid";

export interface ClassModifier {
    id: string;
    affectedResourceId: string | null;
    categoryCalculationType: CategoryCalculationType;
    percentagePointsOfCategoryIncrease: number;
    //TODO: remove category, use id instead to avoid data duplication
    category: Category | null;
    categoryId: string | null;
    description: string;
}

export function GetDefault(): ClassModifier {
    return {
        affectedResourceId: null,
        category: null,
        categoryId: null,
        categoryCalculationType: CategoryCalculationType.None,
        description: "",
        id: uuidv4(),
        percentagePointsOfCategoryIncrease: 0,
    };
}
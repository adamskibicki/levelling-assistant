import { Category } from "./Category";

export interface ClassModifier {
    affectedResourceId: string;
    categoryCalculationType: unknown;//TODO
    percentagePointsOfCategoryIncrease: number;
    category: Category;
 }

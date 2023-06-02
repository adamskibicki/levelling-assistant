import { Category } from "./Category";
import { CategoryCalculationType } from "./CategoryCalculationType";

export interface ClassModifier {
    affectedResourceId: string;
    categoryCalculationType: CategoryCalculationType;
    percentagePointsOfCategoryIncrease: number;
    category: Category;
 }

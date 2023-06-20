import { Category } from "./Category";
import { CategoryCalculationType } from "./CategoryCalculationType";

export interface ClassModifier {
    id: string;
    affectedResourceId: string;
    categoryCalculationType: CategoryCalculationType;
    percentagePointsOfCategoryIncrease: number;
    category: Category;
    description: string;
}

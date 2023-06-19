import { CategoryCalculationType } from "./CategoryCalculationType";
import { VariableCalculationType } from "./VariableCalculationType";

export interface SkillVariable {
    name: string;
    baseVariableName: string;
    affectedStatIds: string[];
    categoryCalculationType: CategoryCalculationType; 
    baseValue: number;
    variableCalculationType: VariableCalculationType;
    unit: string;
}



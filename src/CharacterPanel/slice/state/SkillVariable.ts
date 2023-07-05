import { uuidv4 } from "../../../common/Guid";
import { CategoryCalculationType } from "./CategoryCalculationType";
import { VariableCalculationType } from "./VariableCalculationType";

export interface SkillVariable {
    id: string;
    name: string;
    baseSkillVariableId: string | null;
    affectedStatIds: string[];
    categoryCalculationType: CategoryCalculationType;
    baseValue: number;
    variableCalculationType: VariableCalculationType;
    unit: string;
}

export function GetDefault(): SkillVariable {
    return {
        id: uuidv4(),
        name: "Skill variable",
        baseSkillVariableId: null,
        affectedStatIds: [],
        categoryCalculationType: CategoryCalculationType.None,
        baseValue: 0,
        variableCalculationType: VariableCalculationType.None,
        unit: "%",
    };
}

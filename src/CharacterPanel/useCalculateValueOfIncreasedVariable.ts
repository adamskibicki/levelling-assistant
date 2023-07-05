import { SkillVariable } from "./slice/state/SkillVariable";
import { VariableCalculationType } from "./slice/state/VariableCalculationType";
import { ClassModifier } from "./slice/state/ClassModifier";
import { Skill } from "./slice/state/Skill";

export function useCalculateValueOfIncreasedVariable(allClassModifiers: ClassModifier[]) {
    const getPercentagePointsIncreaseInCategoryFromClassModifiers = (
        categoryId: string
    ) => {
        const applyingModifiers = allClassModifiers.filter((m) => {
            return categoryId === m.categoryId;
        });

        const result = applyingModifiers
            .map((c) => c.percentagePointsOfCategoryIncrease)
            .reduce((a, c) => a + c, 0);

        return result;
    };

    const calculateValueOfIncreasedVariable = (
        variable: SkillVariable,
        skill: Skill
    ): number => {
        const baseValue = variable.baseValue;
        const calculationType = variable.variableCalculationType;

        const categoryIds = skill.categoryIds;
        
        const increase = categoryIds
            .map((c) =>
                getPercentagePointsIncreaseInCategoryFromClassModifiers(c)
            )
            .reduce((a, c) => a + c, 0);

        switch (calculationType) {
            case VariableCalculationType.Additive: {
                let increaseWithBase = 100 + increase;
                return (baseValue * increaseWithBase) / 100;
            }
            case VariableCalculationType.Reciprocal: {
                let increaseWithBase = 100 + increase;
                return baseValue / (increaseWithBase / 100);
            }
            case VariableCalculationType.StaticAdditiveOtherVariableBased: {
                let otherVariable = skill.variables.filter(
                    (v) => v.id === variable.baseSkillVariableId
                )[0];
                let otherVariableIncrease =
                    calculateValueOfIncreasedVariable(otherVariable, skill);

                return (otherVariableIncrease * variable.baseValue) / 100;
            }
            case VariableCalculationType.None: {
                return variable.baseValue;
            }
            default:
                console.error(
                    "VariableCalculationType '" +
                        calculationType +
                        "' is not known"
                );
                return 0;
        }
    };

    return { calculateValueOfIncreasedVariable };
}

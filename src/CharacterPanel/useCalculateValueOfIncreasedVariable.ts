import { useSelector } from "react-redux";
import { SkillVariable } from "./slice/state/SkillVariable";
import { VariableCalculationType } from "./slice/state/VariableCalculationType";
import { useAllClassModifiers } from "./useAllClassModifiers";
import { RootState } from "../store/store";

export function useCalculateValueOfIncreasedVariable() {
    const { allClassModifiers } = useAllClassModifiers();
    const skills = useSelector((state: RootState) =>
        state.characterPanel.classes.flatMap((c) => c.skills)
    );

    const getPercentagePointsIncreaseInCategoryFromClassModifiers = (
        categoryId: string
    ) => {
        let applyingModifiers = allClassModifiers.filter((m) => {
            return categoryId === m.categoryId;
        });

        const result = applyingModifiers
            .map((c) => c.percentagePointsOfCategoryIncrease)
            .reduce((a, c) => a + c, 0);

        return result;
    };

    const calculateValueOfIncreasedVariable = (
        variable: SkillVariable
    ): number => {
        const baseValue = variable.baseValue;
        const calculationType = variable.variableCalculationType;
        const skill = skills.find((s) =>
            s.variables.find((sv) => sv.id === variable.id)
        );

        if (skill === undefined) {
            throw new Error(
                `Skill with skill variable that have id: ${variable.id} was not found`
            );
        }

        const categoryIds = skill.categoryIds;

        let increase = categoryIds
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
                    calculateValueOfIncreasedVariable(otherVariable);

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

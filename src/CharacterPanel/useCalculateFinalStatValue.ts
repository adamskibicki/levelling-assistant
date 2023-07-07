import { CategoryCalculationType } from "./slice/state/CategoryCalculationType";
import { Stat } from "./slice/state/Stat";
import { useCalculateValueOfIncreasedVariable } from "./useCalculateValueOfIncreasedVariable";
import { useAllClassModifiers } from "./useAllClassModifiers";
import { useAppSelector } from "../store/store";
import { useMemo } from "react";

export function useCalculateFinalStatValue() {
    const { allClassModifiers } = useAllClassModifiers();
    const allClasses = useAppSelector((state) => state.characterPanel.classes);

    const allClassSkills = useMemo(
        () => allClasses.flatMap((c) => c.skills),
        [allClasses]
    );

    const { calculateValueOfIncreasedVariable } =
        useCalculateValueOfIncreasedVariable(allClassModifiers);
    const getSkillsAffectingProvidedStat = (stat: Stat) => {
        return allClassSkills.filter((s) => {
            return (
                s.variables?.filter((v) => v.affectedStatIds.includes(stat.id))
                    .length > 0
            );
        });
    };

    const calculateFinalStatValue = (stat: Stat) => {
        let statAffectingSkills = getSkillsAffectingProvidedStat(stat);

        let statIncreases = [];
        let statMultipliers = [];

        for (let i = 0; i < statAffectingSkills.length; i++) {
            const skill = statAffectingSkills[i];
            const affectingVariables = skill.variables.filter((v) =>
                v.affectedStatIds.includes(stat.id)
            );

            for (let j = 0; j < affectingVariables.length; j++) {
                const skillVariable = affectingVariables[j];

                let variableIncreaseValue = calculateValueOfIncreasedVariable(
                    skillVariable,
                    skill
                );

                switch (skillVariable.categoryCalculationType) {
                    case CategoryCalculationType.None:
                        break;
                    case CategoryCalculationType.Multiplicative:
                        statMultipliers.push(variableIncreaseValue);
                        break;
                    case CategoryCalculationType.MultiplicativeWithBaseAdded:
                        statMultipliers.push(variableIncreaseValue + 100);
                        break;
                    case CategoryCalculationType.Additive:
                    case CategoryCalculationType.StaticAdditiveOtherVariableBased:
                        statIncreases.push(variableIncreaseValue);
                        break;
                    default:
                        console.error(
                            "CategoryCalculationType '" +
                                skillVariable.categoryCalculationType +
                                "' is not supported"
                        );
                }
            }
        }

        const calculatedStatIncreases =
            statIncreases.reduce((a, c) => a + c, 100) / 100;
        const calculatedStatMultipliers = statMultipliers
            .map((s) => s / 100)
            .reduce((a, c) => a * c, 1);

        return stat.value * calculatedStatIncreases * calculatedStatMultipliers;
    };

    return { calculateFinalStatValue };
}

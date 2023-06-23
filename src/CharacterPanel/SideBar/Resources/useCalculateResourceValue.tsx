import { useSelector } from "react-redux";
import { Resource } from "../../slice/state/Resource";
import { useAllClassModifiers } from "../../useAllClassModifiers";
import { useCalculateFinalStatValue } from "../../useCalculateFinalStatValue";
import { RootState } from "../../../store/store";

export function useCalculateResourceValue() {
    const { allClassModifiers } = useAllClassModifiers();
    const { calculateFinalStatValue } = useCalculateFinalStatValue();
    const characterStatusStats = useSelector(
        (state: RootState) =>
            state.characterPanel.generalInformation.stats.stats
    );

    const calculateResourceValue = (resource: Resource) => {
        let affectingClassModifiers = allClassModifiers.filter(
            (m) => m.affectedResourceId === resource.id
        );
        let resourceStat = characterStatusStats.filter(
            (s) => s.id === resource.baseStatId
        )[0];

        if (!resourceStat) {
            return 0;
        }

        let finalStatValue = calculateFinalStatValue(resourceStat);

        let baseResourceValue =
            finalStatValue * resource.resourcePointsPerBaseStatPoint;

        let increases = [];
        let multipliers = [];

        for (let i = 0; i < affectingClassModifiers.length; i++) {
            const classModifier = affectingClassModifiers[i];

            switch (classModifier.categoryCalculationType) {
                case "None":
                    break;
                case "Multiplicative":
                    multipliers.push(
                        classModifier.percentagePointsOfCategoryIncrease
                    );
                    break;
                case "MultiplicativeWithBaseAdded":
                    multipliers.push(
                        classModifier.percentagePointsOfCategoryIncrease + 100
                    );
                    break;
                case "Additive":
                    increases.push(
                        classModifier.percentagePointsOfCategoryIncrease
                    );
                    break;
                default:
                    console.error(
                        "calculationType '" +
                            classModifier.categoryCalculationType +
                            "' is not supported"
                    );
            }
        }

        let calculatedMultipliers = multipliers
            .map((m) => m / 100)
            .reduce((a, c) => a * c, 1);

        return (
            baseResourceValue *
            (increases.reduce((a, c) => a + c, 100) / 100) *
            calculatedMultipliers
        );
    };

    return { calculateResourceValue };
}

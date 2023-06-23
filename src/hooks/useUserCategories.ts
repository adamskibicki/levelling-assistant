import { useSelector } from "react-redux";
import { RootState } from "../store/store";

export function useUserCategories() {
    const userCategories = useSelector(
        (state: RootState) => state.characterPanel.userCategories
    );

    const getCategoriesByIds = (categoryIds: string[]) => {
        return userCategories.filter((uc) => categoryIds.indexOf(uc.id) !== -1);
    };

    const getCategoryById = (categoryId: string) => {
        const result = userCategories.find((uc) => uc.id === categoryId);

        return result === undefined ? null : result;
    };

    return { userCategories, getCategoriesByIds, getCategoryById };
}

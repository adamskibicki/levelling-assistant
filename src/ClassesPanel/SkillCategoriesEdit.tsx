import { faClose, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import AddCategoryModal from "./AddCategoryModal";
import "./SkillCategories.scss";
import { useUserCategories } from "../hooks/useUserCategories";

function SkillCategoriesEdit(props: {
    selectedCategoryIds: string[];
    onChange(selectedCategoryIds: string[]): void;
    limit?: number;
}) {
    const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);

    const { userCategories, getCategoriesByIds } = useUserCategories();

    const deleteCategory = (id: string) => {
        props.onChange(props.selectedCategoryIds.filter((c) => c !== id));
    };

    const addCategory = (id: string) => {
        if (isLimitAchieved()) {
            return;
        }

        const selectedCategory = userCategories.find((uc) => uc.id === id);

        if (selectedCategory === undefined) {
            throw new Error("selectedCategory is undefined");
        }

        props.onChange([...props.selectedCategoryIds, selectedCategory.id]);
    };

    const isLimitAchieved = () =>
        props.limit && props.selectedCategoryIds.length >= props.limit;

    return (
        <>
            <div>Selected categories:</div>
            <div className="skill-categories">
                {getCategoriesByIds(props.selectedCategoryIds).map((c) => (
                    <div
                        className="skill-categories__category skill-categories__category--removable"
                        style={{ backgroundColor: c.displayColor }}
                        key={c.id}
                        onClick={() => deleteCategory(c.id)}
                    >
                        <div className="skill-categories__category-name">
                            {c.name}
                        </div>
                        <FontAwesomeIcon
                            className="skill-categories__category-overlap"
                            icon={faClose}
                        />
                    </div>
                ))}
            </div>
            <div>Available categories:</div>
            <div className="skill-categories">
                {userCategories &&
                    userCategories
                        .filter(
                            (uc) =>
                                props.selectedCategoryIds.find(
                                    (sci) => sci === uc.id
                                ) === undefined
                        )
                        .map((uc) => (
                            <div
                                style={{ backgroundColor: uc.displayColor }}
                                className={`skill-categories__category ${
                                    isLimitAchieved()
                                        ? ""
                                        : "skill-categories__category--selectable"
                                }`}
                                key={uc.id}
                                onClick={() => addCategory(uc.id)}
                            >
                                <div className="skill-categories__category-name">
                                    {uc.name}
                                </div>
                                <FontAwesomeIcon
                                    className="skill-categories__category-overlap"
                                    icon={faPlus}
                                />
                            </div>
                        ))}
                <div
                    className="skill-categories__category skill-categories__category--selectable"
                    onClick={() => setShowAddCategoryModal(true)}
                >
                    <FontAwesomeIcon icon={faPlus} />
                </div>
                <AddCategoryModal
                    show={showAddCategoryModal}
                    onHide={() => setShowAddCategoryModal(false)}
                    onClose={() => setShowAddCategoryModal(false)}
                    onAccept={() => setShowAddCategoryModal(false)}
                />
            </div>
        </>
    );
}

export default SkillCategoriesEdit;

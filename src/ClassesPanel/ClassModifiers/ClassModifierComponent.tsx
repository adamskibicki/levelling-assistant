import { ClassModifier } from "../../CharacterPanel/slice/state/ClassModifier";
import { useUserCategories } from "../../hooks/useUserCategories";
import "./ClassModifier.scss";

export default function ClassModifierComponent(props: ClassModifier) {
    const {getCategoryById} = useUserCategories();

    const category = props.categoryId ? getCategoryById(props.categoryId) : null;
    
    return (
        <div className="class-modifier__modifier">
            {category !== null && (
                <div
                    className="class-modifier__category"
                    style={{
                        backgroundColor: category.displayColor,
                    }}
                >
                    {category.name}
                </div>
            )}
            <p className="class-modifier__description">{props.description}</p>
        </div>
    );
}

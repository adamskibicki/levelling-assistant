import { ClassModifier } from "../../CharacterPanel/slice/state/ClassModifier";
import "./ClassModifier.scss";

export default function ClassModifierComponent(props: ClassModifier) {
    return (
        <div className="class-modifier__modifier">
            {props.category !== null && (
                <div
                    className="class-modifier__category"
                    style={{
                        backgroundColor: props.category.displayColor,
                    }}
                >
                    {props.category.name}
                </div>
            )}
            <p className="class-modifier__description">{props.description}</p>
        </div>
    );
}

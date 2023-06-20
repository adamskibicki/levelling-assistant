import { useState } from "react";
import { ClassModifier } from "../../CharacterPanel/slice/state/ClassModifier";
import "./ClassModifiers.scss";
import { EditButton, ExpandButton } from "../../components/common/Buttons";

export default function ClassModifiers(props: {
    classModifiers: ClassModifier[];
    expand: boolean;
}) {
    const [expanded, setExpanded] = useState(props.expand);
    const [showClassModifiersEditModal, setShowClassModifiersEditModal] =
        useState(false);

    return (
        <div className="class-modifiers">
            <div className="class-modifiers__title-bar">
                <ExpandButton
                    expanded={expanded}
                    onClick={() => setExpanded(!expanded)}
                />
                <div className="class-modifiers__title">Class modifiers:</div>
                <EditButton
                    onClick={() => setShowClassModifiersEditModal(true)}
                />
            </div>
            {expanded &&
                props.classModifiers.map((m, i) => (
                    <div className="class-modifiers__modifier" key={i}>
                        {m.category !== null && (
                            <div
                                className="class-modifiers__category"
                                style={{
                                    backgroundColor: m.category.displayColor,
                                }}
                            >
                                {m.category.name}
                            </div>
                        )}
                        <p className="class-modifiers__description">
                            {m.description}
                        </p>
                    </div>
                ))}
        </div>
    );
}

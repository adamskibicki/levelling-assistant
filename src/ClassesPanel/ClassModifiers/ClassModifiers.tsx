import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { ClassModifier } from "../../CharacterPanel/slice/state/ClassModifier";
import "./ClassModifiers.scss";

export default function ClassModifiers(props: {
    classModifiers: ClassModifier[];
    expand: boolean;
}) {
    const [expanded, setExpanded] = useState(props.expand);

    return (
        <div className="class-modifiers">
            <div className="class-modifiers__title-bar">
                <button
                    className="class-modifiers__expand"
                    onClick={() => setExpanded(!expanded)}
                >
                    {expanded ? (
                        <FontAwesomeIcon icon={faCaretUp} />
                    ) : (
                        <FontAwesomeIcon icon={faCaretDown} />
                    )}
                </button>
                <div className="class-modifiers__title">Class modifiers:</div>
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
                        <p className="class-modifiers__description">{m.description}</p>
                    </div>
                ))}
        </div>
    );
}

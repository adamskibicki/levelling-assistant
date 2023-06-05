import { faCaretDown, faCaretUp, faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import "./Class.scss";
import SkillComponent from "./Skill";
import { ClassModifier } from "./CharacterPanel/slice/state/ClassModifier";
import { Skill } from "./CharacterPanel/slice/state/Skill";
import ConfirmationModal from "./UserCharacters/ConfirmationModal";
import { useDispatch } from "react-redux";
import { AppDispatch } from "./store/store";
import { deleteClass } from "./CharacterPanel/slice/characterPanelSlice";

export default function Class(props: {
    id: string;
    name: string;
    level: number;
    modifiers: ClassModifier[];
    skills: Skill[];
    allowEdit: boolean;
    calculateValueOfIncreasedVariable: Function;
}) {
    const [expanded, setExpanded] = useState(true);
    const [classModifiersExpanded, setClassModifiersExpanded] = useState(true);
    const [
        showClassDeletionConfirmationModal,
        setShowClassDeletionConfirmationModal,
    ] = useState(false);
    const dispatch = useDispatch<AppDispatch>();

    const switchExpandVisibility = () => {
        const prevExpanded = expanded;

        setExpanded(!prevExpanded);
        setClassModifiersExpanded(!prevExpanded);
    };

    const switchClassModifiersExpandVisibility = () => {
        setClassModifiersExpanded((prevState) => !prevState);
    };

    const deleteCurrentClass = () => {
        dispatch(deleteClass(props.id));
        setShowClassDeletionConfirmationModal(false);
    }

    return (
        <>
            <div className="class-container">
                <div className="class-name-container">
                    <button
                        className="expand"
                        onClick={() => switchExpandVisibility()}
                    >
                        {expanded ? (
                            <FontAwesomeIcon icon={faCaretUp} />
                        ) : (
                            <FontAwesomeIcon icon={faCaretDown} />
                        )}
                    </button>
                    <h4 className="class-name">
                        {props.name} - lvl {props.level}
                    </h4>
                    <button
                        onClick={() => setShowClassDeletionConfirmationModal(true)}
                    >
                        <FontAwesomeIcon icon={faClose} />
                    </button>
                </div>
                <div className="modifiers-container">
                    <div className="title-container">
                        <button
                            className="expand"
                            onClick={() =>
                                switchClassModifiersExpandVisibility()
                            }
                        >
                            {classModifiersExpanded ? (
                                <FontAwesomeIcon icon={faCaretUp} />
                            ) : (
                                <FontAwesomeIcon icon={faCaretDown} />
                            )}
                        </button>
                        <div className="title">Class modifiers:</div>
                    </div>
                    {classModifiersExpanded &&
                        props.modifiers.map((m, i) => (
                            <div className="modifier" key={i}>
                                {m.category !== null && (
                                    <div className="category">
                                        {m.category.name}
                                    </div>
                                )}
                                <p className="description">{m.description}</p>
                            </div>
                        ))}
                </div>
            </div>
            <div>
                {props.skills.map((s, i) => (
                    <SkillComponent
                        allowEdit={props.allowEdit}
                        key={i + expanded.toString()}
                        {...s}
                        expanded={expanded}
                        calculateValueOfIncreasedVariable={
                            props.calculateValueOfIncreasedVariable
                        }
                    />
                ))}
            </div>
            <ConfirmationModal
                modalTitle={`Are you sure you want to delete class: ${props.name}`}
                message={`Class ${props.name} and all associated modifiers and skills will be deleted.`}
                show={showClassDeletionConfirmationModal}
                onAccept={() => deleteCurrentClass()}
                onClose={() => setShowClassDeletionConfirmationModal(false)}
                onHide={() => setShowClassDeletionConfirmationModal(false)}
            />
        </>
    );
}

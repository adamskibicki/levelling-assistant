import {
    faCaretDown,
    faCaretUp,
    faClose,
    faEdit,
    faMinus,
    faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import "./Class.scss";
import SkillComponent from "./Skill";
import ConfirmationModal from "./UserCharacters/ConfirmationModal";
import { useDispatch } from "react-redux";
import { AppDispatch } from "./store/store";
import {
    deleteClass,
    editClass,
} from "./CharacterPanel/slice/characterPanelSlice";
import { CharacterClass } from "./CharacterPanel/slice/state/CharacterClass";
import EditClassModal from "./ClassesPanel/EditClassModal";
import { SkillVariable } from "./CharacterPanel/slice/state/SkillVariable";
import { Skill } from "./CharacterPanel/slice/state/Skill";

export default function Class(props: {
    value: CharacterClass;
    allowEdit: boolean;
    calculateValueOfIncreasedVariable(variable: SkillVariable, skill: Skill): number;
}) {
    const [expanded, setExpanded] = useState(true);
    const [showEditClassModal, setShowEditClassModal] = useState(false);
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
        dispatch(deleteClass(props.value.id));
        setShowClassDeletionConfirmationModal(false);
    };

    const onAcceptEditCurrentClass = (
        _: React.MouseEvent<HTMLButtonElement>,
        characterClass: CharacterClass
    ) => {
        dispatch(editClass(characterClass));

        setShowEditClassModal(false);
    };

    const editClassLevel = (levelChangeValue: number) => {
        dispatch(
            editClass({
                ...props.value,
                level: props.value.level + levelChangeValue,
            })
        );
    };

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
                        {props.value.name} - lvl {props.value.level}
                    </h4>
                    <button 
                        className={props.value.level === 0 ? "disabled" : ""}
                        onClick={() => editClassLevel(-1)}
                    >
                        <FontAwesomeIcon icon={faMinus} />
                    </button>
                    <button
                        onClick={() => editClassLevel(1)}
                    >
                        <FontAwesomeIcon icon={faPlus} />
                    </button>
                    <button
                        className="class__edit-button"
                        onClick={() => setShowEditClassModal(true)}
                    >
                        <FontAwesomeIcon icon={faEdit} />
                    </button>
                    <button
                        className="class__delete-button"
                        onClick={() =>
                            setShowClassDeletionConfirmationModal(true)
                        }
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
                        props.value.modifiers.map((m, i) => (
                            <div className="modifier" key={i}>
                                {m.category !== null && (
                                    <div className="category" style={{backgroundColor: m.category.displayColor}} >
                                        {m.category.name}
                                    </div>
                                )}
                                <p className="description">{m.description}</p>
                            </div>
                        ))}
                </div>
            </div>
            <div>
                {props.value.skills.map((s, i) => (
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
                modalTitle={`Are you sure you want to delete class: ${props.value.name}`}
                message={`Class ${props.value.name} and all associated modifiers and skills will be deleted.`}
                show={showClassDeletionConfirmationModal}
                onAccept={() => deleteCurrentClass()}
                onClose={() => setShowClassDeletionConfirmationModal(false)}
                onHide={() => setShowClassDeletionConfirmationModal(false)}
            />
            <EditClassModal
                characterClass={props.value}
                onAccept={onAcceptEditCurrentClass}
                onClose={() => setShowEditClassModal(false)}
                onHide={() => setShowEditClassModal(false)}
                show={showEditClassModal}
            />
        </>
    );
}

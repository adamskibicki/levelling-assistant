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
import SkillComponent from "../Skill";
import ConfirmationModal from "../UserCharacters/ConfirmationModal";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/store";
import {
    deleteClass,
    editClass,
} from "../CharacterPanel/slice/characterPanelSlice";
import { CharacterClass } from "../CharacterPanel/slice/state/CharacterClass";
import EditClassModal from "../ClassesPanel/EditClassModal";
import { SkillVariable } from "../CharacterPanel/slice/state/SkillVariable";
import { Skill } from "../CharacterPanel/slice/state/Skill";
import ClassModifiers from "./ClassModifiers/ClassModifiers";

export default function Class(props: {
    value: CharacterClass;
    allowEdit: boolean;
    calculateValueOfIncreasedVariable(
        variable: SkillVariable,
        skill: Skill
    ): number;
}) {
    const [expanded, setExpanded] = useState(true);
    const [showEditClassModal, setShowEditClassModal] = useState(false);

    const [
        showClassDeletionConfirmationModal,
        setShowClassDeletionConfirmationModal,
    ] = useState(false);
    const dispatch = useDispatch<AppDispatch>();

    const switchExpandVisibility = () => {
        const prevExpanded = expanded;

        setExpanded(!prevExpanded);
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
                    <button onClick={() => editClassLevel(1)}>
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
                <ClassModifiers
                    key={expanded.toString()}
                    expand={expanded}
                    classModifiers={props.value.modifiers}
                />
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

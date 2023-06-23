import { useEffect, useState } from "react";
import Modal from "../../Modal/Modal";
import ModalContent from "../../Modal/ModalContent";
import ModalFooter from "../../Modal/ModalFooter";
import ModalHeader from "../../Modal/ModalHeader";
import {
    ClassModifier,
    GetDefault,
} from "../../CharacterPanel/slice/state/ClassModifier";
import ReorderableList from "../../Lists/ReorderableList";
import ClassModifierComponent from "./ClassModifierComponent";
import EditClassModifierModal from "./EditClassModifierModal";
import { AddButton, EditButton } from "../../components/common/Buttons";
import "./EditClassModifiersModal.scss";

export default function EditClassModifiersModal(props: {
    onHide(event: MouseEvent): void;
    show: boolean;
    onClose(event: React.MouseEvent): void;
    onAccept: (
        event: React.MouseEvent<HTMLButtonElement>,
        classModifiers: ClassModifier[]
    ) => void;
    classModifiers: ClassModifier[];
}) {
    const [classModifiers, setClassModifiers] = useState<ClassModifier[]>([]);
    const [showEditClassModifierModal, setShowEditClassModifierModal] =
        useState(false);
    const [classModifierToEdit, setClassModifierToEdit] = useState(
        GetDefault()
    );
    const [isAddingClassModifier, setIsAddingClassModifier] = useState(false);

    useEffect(() => {
        setClassModifiers(props.classModifiers);
    }, [props.classModifiers, props.show]);

    const onAccept = (event: React.MouseEvent<HTMLButtonElement>) => {
        props.onAccept(event, classModifiers);
    };

    const onClassModifiersChanged = (
        updatedClassModifiers: ClassModifier[]
    ) => {
        setClassModifiers(updatedClassModifiers);
    };

    const onClassModifierChanged = (classModifier: ClassModifier) => {
        if (isAddingClassModifier) {
            onClassModifiersChanged([...classModifiers, classModifier]);
        } else {
            onClassModifiersChanged(
                classModifiers.map((cm) => {
                    if (cm.id === classModifier.id) return classModifier;

                    return cm;
                })
            );
        }
        setShowEditClassModifierModal(false);
    };

    const getItemKey = (classModifier: ClassModifier) => classModifier.id;

    const renderClassModifier = (classModifier: ClassModifier) => {
        return <ClassModifierComponent {...classModifier} />;
    };

    const renderEditButton = (classModifier: ClassModifier) => {
        return (
            <EditButton
                onClick={() => {
                    setIsAddingClassModifier(false);
                    setClassModifierToEdit(classModifier);
                    setShowEditClassModifierModal(true);
                }}
            />
        );
    };

    return (
        <>
            <Modal show={props.show} onHide={props.onHide}>
                <ModalHeader onClose={props.onClose}>
                    Class modifiers
                </ModalHeader>
                <ModalContent>
                    <ReorderableList
                        renderItem={renderClassModifier}
                        renderAdditionalButtons={renderEditButton}
                        items={classModifiers}
                        getItemKey={getItemKey}
                        onChange={onClassModifiersChanged}
                    />
                    <AddButton
                        className="edit-class-modifiers-modal__add-button"
                        onClick={() => {
                            setIsAddingClassModifier(true);
                            setClassModifierToEdit(GetDefault());
                            setShowEditClassModifierModal(true);
                        }}
                    />
                </ModalContent>
                <ModalFooter
                    onClose={props.onClose}
                    onAccept={onAccept}
                ></ModalFooter>

                <EditClassModifierModal
                    title={isAddingClassModifier ? "Add new class modifier" : undefined}
                    classModifier={classModifierToEdit}
                    show={showEditClassModifierModal}
                    onAccept={(_, cm) => onClassModifierChanged(cm)}
                    onClose={() => setShowEditClassModifierModal(false)}
                    onHide={() => setShowEditClassModifierModal(false)}
                />
            </Modal>
        </>
    );
}

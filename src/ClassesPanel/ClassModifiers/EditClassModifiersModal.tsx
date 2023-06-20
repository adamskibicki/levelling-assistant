import { useEffect, useState } from "react";
import Modal from "../../Modal/Modal";
import ModalContent from "../../Modal/ModalContent";
import ModalFooter from "../../Modal/ModalFooter";
import ModalHeader from "../../Modal/ModalHeader";
import {
    ClassModifier,
    GetDefault,
} from "../../CharacterPanel/slice/state/ClassModifier";
import ReorderableListImproved from "../../Lists/ReorderableListImproved";
import ClassModifierComponent from "./ClassModifierComponent";
import EditClassModifierModal from "./EditClassModifierModal";
import { EditButton } from "../../components/common/Buttons";

export default function EditClassModifiersModal(props: {
    onHide(event: MouseEvent): void;
    show: boolean;
    onClose(event: React.MouseEvent): void;
    onAccept: (
        event: React.MouseEvent<HTMLButtonElement>,
        characterClass: ClassModifier[]
    ) => void;
    classModifiers: ClassModifier[];
}) {
    const [classModifiers, setClassModifiers] = useState<ClassModifier[]>([]);
    const [showEditClassModifierModal, setShowEditClassModifierModal] =
        useState(false);
    const [classModifierToEdit, setClassModifierToEdit] = useState(
        GetDefault()
    );

    useEffect(() => {
        setClassModifiers(props.classModifiers);
    }, [props.classModifiers]);

    const onAccept = (event: React.MouseEvent<HTMLButtonElement>) => {
        props.onAccept(event, classModifiers);
    };

    const onClassModifiersChanged = (
        updatedClassModifiers: ClassModifier[]
    ) => {
        console.log(updatedClassModifiers);
        setClassModifiers(updatedClassModifiers);
    };

    const onClassModifierChanged = (classModifier: ClassModifier) => {
        onClassModifiersChanged(
            classModifiers.map((cm) => {
                if (cm.id === classModifier.id) return classModifier;

                return cm;
            })
        );
    };

    const getItemKey = (classModifier: ClassModifier) => classModifier.id;

    const renderClassModifier = (classModifier: ClassModifier) => {
        return <ClassModifierComponent {...classModifier} />;
    };

    const renderEditButton = (classModifier: ClassModifier) => {
        return (
            <EditButton
                onClick={() => {
                    setClassModifierToEdit(classModifier);
                    setShowEditClassModifierModal(true);
                }}
            />
        );
    };

    return (
        <>
            <Modal show={props.show} onHide={props.onHide}>
                <ModalHeader onClose={props.onClose} />
                <ModalContent>
                    <ReorderableListImproved
                        renderItem={renderClassModifier}
                        renderAdditionalButtons={renderEditButton}
                        items={classModifiers}
                        getItemKey={getItemKey}
                        onChange={onClassModifiersChanged}
                    />
                </ModalContent>
                <ModalFooter
                    onClose={props.onClose}
                    onAccept={onAccept}
                ></ModalFooter>

                <EditClassModifierModal
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

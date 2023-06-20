import { useEffect, useState } from "react";
import Modal from "../../Modal/Modal";
import ModalContent from "../../Modal/ModalContent";
import ModalFooter from "../../Modal/ModalFooter";
import ModalHeader from "../../Modal/ModalHeader";
import { ClassModifier } from "../../CharacterPanel/slice/state/ClassModifier";
import ReorderableListImproved from "../../Lists/ReorderableListImproved";

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

    const renderClassModifier = (classModifier: ClassModifier) => {
        return (
            <div>{classModifier.description}</div>
        );
    }

    return (
        <Modal show={props.show} onHide={props.onHide}>
            <ModalHeader onClose={props.onClose}>

            </ModalHeader>
            <ModalContent>
                <ReorderableListImproved
                    renderItem={renderClassModifier}
                    items={classModifiers}
                    getItemKey={(item) => item.id}
                    onChange={onClassModifiersChanged}
                />
            </ModalContent>
            <ModalFooter
                onClose={props.onClose}
                onAccept={onAccept}
            ></ModalFooter>
        </Modal>
    );
}

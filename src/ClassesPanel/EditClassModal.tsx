import { useState } from "react";
import Modal from "../Modal/Modal";
import ModalContent from "../Modal/ModalContent";
import ModalFooter from "../Modal/ModalFooter";
import ModalHeader from "../Modal/ModalHeader";
import InputText from "../Inputs/InputText";
import { CharacterClass } from "../CharacterPanel/slice/state/CharacterClass";

export default function EditClassModal(props: {
    characterClass: CharacterClass;
    onHide(event: MouseEvent): void;
    show: boolean;
    onClose(event: React.MouseEvent): void;
    onAccept: (event: React.MouseEvent<HTMLButtonElement>, characterClass: CharacterClass) => void;
}) {
    const [name, setName] = useState(props.characterClass.name);

    const onAccept = (event: React.MouseEvent<HTMLButtonElement>) => {
        props.onAccept(event, {...props.characterClass, name: name});
    }

    return (
        <Modal show={props.show} onHide={props.onHide}>
            <ModalHeader onClose={props.onClose}>
                Edit selected class
            </ModalHeader>
            <ModalContent>
                <InputText label={'Name'} value={name} onChange={(event: React.FormEvent<HTMLInputElement>) => setName(event.currentTarget.value)}/>
            </ModalContent>
            <ModalFooter onClose={props.onClose} onAccept={onAccept}>

            </ModalFooter>
        </Modal>
    );
}
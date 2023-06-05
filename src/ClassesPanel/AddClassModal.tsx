import { useState } from "react";
import Modal from "../Modal/Modal";
import ModalContent from "../Modal/ModalContent";
import ModalFooter from "../Modal/ModalFooter";
import ModalHeader from "../Modal/ModalHeader";
import InputText from "../Inputs/InputText";
import { CharacterClass } from "../CharacterPanel/slice/state/CharacterClass";
import { v4 as uuidv4 } from 'uuid';

export default function AddClassModal(props: {
    onHide: Function,
    show: boolean,
    onClose: Function,
    onAccept: (event: React.MouseEvent<HTMLButtonElement>, characterClass: CharacterClass) => void
}) {
    const nameDefault = "New class";
    const [name, setName] = useState(nameDefault);

    const onAccept = (event: React.MouseEvent<HTMLButtonElement>) => {
        props.onAccept(event, {
            id: uuidv4(),
            name: name,
            level: 0,
            modifiers: [],
            skills: []
        });
        setName(nameDefault);
    }

    return (
        <Modal show={props.show} onHide={props.onHide}>
            <ModalHeader onClose={props.onClose}>
                Add new class
            </ModalHeader>
            <ModalContent>
                <InputText label={'Name'} value={name} onChange={(event: React.FormEvent<HTMLInputElement>) => setName(event.currentTarget.value)}/>
            </ModalContent>
            <ModalFooter onClose={props.onClose} onAccept={onAccept}>

            </ModalFooter>
        </Modal>
    );
}
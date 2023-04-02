import { useEffect, useState } from "react";
import InputText from "../Inputs/InputText";
import Modal from "../Modal/Modal";
import ModalContent from "../Modal/ModalContent";
import ModalFooter from "../Modal/ModalFooter";
import ModalHeader from "../Modal/ModalHeader";
import "./BasicInfoEditModal.scss";

export default function BasicInfoEditModal(props) {
    const [title, setTitle] = useState('Title');
    const [name, setName] = useState('Name Surname');

    useEffect(() => {
        setTitle(props.title);
        setName(props.name);
    }, [props.title, props.name]);

    const onAccept = (event) => {
        event.preventDefault();
        props.onAccept({
            name: name,
            title: title
        });
    }

    return (
        <Modal show={props.show} onHide={props.onHide}>
            <ModalHeader onClose={props.onClose}>
                {props.modalTitle}
            </ModalHeader>
            <ModalContent>
                <InputText className={"basic-info-edit-modal__input"} label={'Name'} value={name} onChange={(event) => setName(event.target.value)}/>
                <InputText label={'Title'} value={title} onChange={(event) => setTitle(event.target.value)}/>
            </ModalContent>
            <ModalFooter onClose={props.onClose} onAccept={onAccept}>

            </ModalFooter>
        </Modal>
    )
} 
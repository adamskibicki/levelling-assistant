import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { editBasicInfo } from "../characterPanelSlice";
import InputText from "../../Inputs/InputText";
import Modal from "../../Modal/Modal";
import ModalContent from "../../Modal/ModalContent";
import ModalFooter from "../../Modal/ModalFooter";
import ModalHeader from "../../Modal/ModalHeader";

export default function BasicInfoEditModal(props) {
    const [title, setTitle] = useState('Title');
    const [name, setName] = useState('Name Surname');
    const dispatch = useDispatch();

    useEffect(() => {
        setTitle(props.title);
        setName(props.name);
    }, [props.title, props.name]);

    const onAccept = (event) => {
        event.preventDefault();
        dispatch(editBasicInfo({
            name: name,
            title: title
        }));
        props.onAccept();
    }

    return (
        <Modal show={props.show} onHide={props.onHide}>
            <ModalHeader onClose={props.onClose}>
                Add category
            </ModalHeader>
            <ModalContent>
                <InputText label={'Name'} value={name} onChange={(event) => setName(event.target.value)}/>
                <InputText label={'Title'} value={title} onChange={(event) => setTitle(event.target.value)}/>
            </ModalContent>
            <ModalFooter onClose={props.onClose} onAccept={onAccept}>

            </ModalFooter>
        </Modal>
    )
} 
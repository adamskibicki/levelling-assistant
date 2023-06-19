import { useState } from "react";
import { useDispatch } from "react-redux";
import { addNewCategory } from "../CharacterPanel/slice/thunks/addNewCategory";
import InputColor from "../Inputs/InputColor";
import InputText from "../Inputs/InputText";
import Modal from "../Modal/Modal";
import ModalContent from "../Modal/ModalContent";
import ModalFooter from "../Modal/ModalFooter";
import ModalHeader from "../Modal/ModalHeader";
import { AppDispatch } from "../store/store";

export default function AddCategoryModal(props: {
    show: boolean;
    onHide(): void;
    onClose(): void;
    onAccept(): void;
}) {
    const [color, setColor] = useState('#000000');
    const [name, setName] = useState('New category');
    const dispatch = useDispatch<AppDispatch>();

    const onAccept = (event: React.MouseEvent<HTMLInputElement>) => {
        event.preventDefault();
        dispatch(addNewCategory({
            name: name,
            displayColor: color
        }));
        props.onAccept();
    }

    return (
        <Modal show={props.show} onHide={props.onHide}>
            <ModalHeader onClose={props.onClose}>
                Add category
            </ModalHeader>
            <ModalContent>
                <InputText label={'Name'} value={name} onChange={(event: React.FormEvent<HTMLInputElement>) => setName(event.currentTarget.value)}/>
                <InputColor label={'Display color'} value={color} onChange={(event) => setColor(event.currentTarget.value)}/>
            </ModalContent>
            <ModalFooter onClose={props.onClose} onAccept={onAccept}>

            </ModalFooter>
        </Modal>
    )
} 
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { editStats } from "../characterPanelSlice";
import InputText from "../../Inputs/InputText";
import Modal from "../../Modal/Modal";
import ModalContent from "../../Modal/ModalContent";
import ModalFooter from "../../Modal/ModalFooter";
import ModalHeader from "../../Modal/ModalHeader";
import ReorderableList from "../../Lists/ReorderableList";

export default function StatsEditModal(props) {
    const [stats, setStats] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        setStats(props.stats);
    }, [props.stats]);

    const onAccept = (event) => {
        event.preventDefault();
        dispatch(editStats({
            stats: stats
        }));
        props.onAccept();
    }

    const onChange = (name, index) => {
        setStats((prevState) => {
            return prevState.map((s, i) => {
                if (i === index) {
                    return {
                        ...s,
                        name: name
                    };
                }
                return s;
            });
        });
    }

    const moveItemUp = (event, index) => {
        setStats((prevState) => {
            const itemToMove = prevState[index];
            const itemReplaced = prevState[index - 1];

            return prevState.map((s, i) => {
                if (i === index)
                    return itemReplaced;
                if (i === index - 1)
                    return itemToMove;
                return s;
            });
        });
    }

    const moveItemDown = (event, index) => {
        setStats((prevState) => {
            const itemToMove = prevState[index];
            const itemReplaced = prevState[index + 1];

            return prevState.map((s, i) => {
                if (i === index)
                    return itemReplaced;
                if (i === index + 1)
                    return itemToMove;
                return s;
            });
        });
    }

    const deleteItem = (event, index) => {
        setStats((prevState) => {
            return prevState.filter((_, i) => i !== index);
        });
    }

    const onClose = () => {
        props.onClose();
        resetForm();
    }

    const onHide = () => {
        props.onHide();
        resetForm();
    }

    const resetForm = () => {
        setStats(props.stats);
    }

    return (
        <Modal show={props.show} onHide={onHide}>
            <ModalHeader onClose={onClose}>
                Add category
            </ModalHeader>
            <ModalContent>
                <ReorderableList moveItemUp={moveItemUp} moveItemDown={moveItemDown} deleteItem={deleteItem}>
                    {
                        stats.map((s, i) => <InputText key={i} value={s.name} onChange={(event) => onChange(event.target.value, i)} />)
                    }
                </ReorderableList>
            </ModalContent>
            <ModalFooter onClose={onClose} onAccept={onAccept}>

            </ModalFooter>
        </Modal>
    )
} 
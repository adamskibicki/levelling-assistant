import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { editStats } from "../characterPanelSlice";
import InputText from "../../Inputs/InputText";
import Modal from "../../Modal/Modal";
import ModalContent from "../../Modal/ModalContent";
import ModalFooter from "../../Modal/ModalFooter";
import ModalHeader from "../../Modal/ModalHeader";
import ReorderableList from "../../Lists/ReorderableList";
import { v4 as uuidv4 } from 'uuid';
import InputCheckbox from "../../Inputs/InputCheckbox";
import "./StatsEditModal.scss";

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

    const onChange = (statId, name) => {
        setStats((prevState) => {
            return prevState.map(s => {
                if (s.id === statId) {
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

    const addNewItem = () => {
        setStats((prevState) => {
            return [...prevState, {
                id: uuidv4(),
                name: "New stat",
                value: 5,
                isHidden: false
            }];
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

    const isHiddenOnChange = (statId, value) => {
        setStats((prevState) => {
            return prevState.map(s => {
                if (s.id === statId) {
                    return {
                        ...s,
                        isHidden: value
                    };
                }
                return s;
            });
        });
    }

    return (
        <Modal show={props.show} onHide={onHide}>
            <ModalHeader onClose={onClose}>
                Stats
            </ModalHeader>
            <ModalContent>
                <ReorderableList moveItemUp={moveItemUp} moveItemDown={moveItemDown} deleteItem={deleteItem}>
                    {
                        stats.map((s, i) => (
                            <div className="stats-edit-modal__stat" key={s.id}>
                                <InputText value={s.name} onChange={(event) => onChange(s.id, event.target.value)} className="stats-edit-modal__stat-name" />
                                <InputCheckbox label={"Hide"} value={s.isHidden} onChange={(_, value) => isHiddenOnChange(s.id, value)} className="stats-edit-modal__stat-hide" />
                            </div>
                        ))
                    }
                </ReorderableList>
                <button onClick={addNewItem}>Add new stat</button>
            </ModalContent>
            <ModalFooter onClose={onClose} onAccept={onAccept}>

            </ModalFooter>
        </Modal>
    )
} 
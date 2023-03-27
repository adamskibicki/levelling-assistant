import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { editStats } from "../characterPanelSlice";
import InputText from "../../Inputs/InputText";
import Modal from "../../Modal/Modal";
import ModalContent from "../../Modal/ModalContent";
import ModalFooter from "../../Modal/ModalFooter";
import ModalHeader from "../../Modal/ModalHeader";
import EditableList from "./EditableList";

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

    return (
        <Modal show={props.show} onHide={props.onHide}>
            <ModalHeader onClose={props.onClose}>
                Add category
            </ModalHeader>
            <ModalContent>
                <EditableList>
                    {
                        stats.map((s, i) => <InputText key={i} value={s.name} onChange={(event) => onChange(event.target.value, i)} />)
                    }
                </EditableList>
            </ModalContent>
            <ModalFooter onClose={props.onClose} onAccept={onAccept}>

            </ModalFooter>
        </Modal>
    )
} 
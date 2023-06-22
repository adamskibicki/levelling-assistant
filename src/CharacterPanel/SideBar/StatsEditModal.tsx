import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { editStats } from "../slice/characterPanelSlice";
import InputText from "../../Inputs/InputText";
import Modal from "../../Modal/Modal";
import ModalContent from "../../Modal/ModalContent";
import ModalFooter from "../../Modal/ModalFooter";
import ModalHeader from "../../Modal/ModalHeader";
import { v4 as uuidv4 } from "uuid";
import InputCheckbox from "../../Inputs/InputCheckbox";
import "./StatsEditModal.scss";
import { Stat } from "../slice/state/Stat";
import ReorderableListImproved from "../../Lists/ReorderableList";

export default function StatsEditModal(props: {
    stats: Stat[];
    show: boolean;
    onHide(): void;
    onClose(): void;
    onAccept(): void;
}) {
    const [stats, setStats] = useState<Stat[]>([]);
    const dispatch = useDispatch();

    useEffect(() => {
        setStats(props.stats);
    }, [props.stats]);

    const onAccept = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        dispatch(
            editStats({
                stats: stats,
            })
        );
        props.onAccept();
    };

    const onStatChange = (statId: string, name: string) => {
        setStats((prevState) => {
            return prevState.map((s) => {
                if (s.id === statId) {
                    return {
                        ...s,
                        name: name,
                    };
                }
                return s;
            });
        });
    };

    const addNewItem = () => {
        setStats((prevState) => {
            return [
                ...prevState,
                {
                    id: uuidv4(),
                    name: "New stat",
                    value: 5,
                    isHidden: false,
                },
            ];
        });
    };

    const onClose = () => {
        props.onClose();
        resetForm();
    };

    const onHide = () => {
        props.onHide();
        resetForm();
    };

    const resetForm = () => {
        setStats(props.stats);
    };

    const isHiddenOnChange = (statId: string, value: boolean) => {
        setStats((prevState) => {
            return prevState.map((s) => {
                if (s.id === statId) {
                    return {
                        ...s,
                        isHidden: value,
                    };
                }
                return s;
            });
        });
    };

    const renderStat = (s: Stat) => {
        return (
            <div className="stats-edit-modal__stat" key={s.id}>
                <InputText
                    value={s.name}
                    onChange={(event: React.FormEvent<HTMLInputElement>) =>
                        onStatChange(s.id, event.currentTarget.value)
                    }
                    className="stats-edit-modal__stat-name"
                />
                <InputCheckbox
                    label={"Hide"}
                    value={s.isHidden}
                    onChange={(_, value) => isHiddenOnChange(s.id, value)}
                />
            </div>
        );
    };

    const onStatsChange = (modifiedStats: Stat[]) => {
        setStats(modifiedStats);
    };

    return (
        <Modal show={props.show} onHide={onHide}>
            <ModalHeader onClose={onClose}>Stats</ModalHeader>
            <ModalContent>
                <ReorderableListImproved
                    getItemKey={(s) => s.id}
                    items={stats}
                    onChange={onStatsChange}
                    renderItem={renderStat}
                />
                <button onClick={addNewItem}>Add new stat</button>
            </ModalContent>
            <ModalFooter onClose={onClose} onAccept={onAccept}></ModalFooter>
        </Modal>
    );
}

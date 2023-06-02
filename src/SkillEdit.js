import { faCaretDown, faCaretUp, faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserCategories } from "./CharacterPanel/slice/thunks/fetchUserCategories";
import { updateSkill } from "./CharacterPanel/slice/characterPanelSlice";
import InputText from "./Inputs/InputText";
import Modal from "./Modal/Modal";
import ModalContent from "./Modal/ModalContent";
import ModalFooter from "./Modal/ModalFooter";
import ModalHeader from "./Modal/ModalHeader";
import './SkillEdit.scss';
import SkillCategoriesEdit from "./SkillsPanel/SkillCategoriesEdit";

function SkillEdit(props) {
    const [show, setShow] = useState(false);
    const [tierDescriptions, setTierDescriptions] = useState([]);
    const [categories, setCategories] = useState([]);
    const userCategories = useSelector((state) => state.characterPanel.userCategories);
    const dispatch = useDispatch();

    const showModal = () => {
        setShow(true);
        setTierDescriptions(props.tierDescriptions);
        setCategories(props.categories);
        dispatch(fetchUserCategories());
    };

    const hideModal = () => {
        setShow(false);
    };

    const onChange = (text, index) => {
        setTierDescriptions((prevState) => {
            return prevState.map((td, i) => {
                if (i === index)
                    return text;
                return td;
            });
        });
    };

    const addTier = (event) => {
        event.preventDefault();
        setTierDescriptions((prevState) => {
            return [
                ...prevState,
                ''
            ];
        });
    };

    const deleteTier = (event, index) => {
        event.preventDefault();
        setTierDescriptions((prevState) => {
            return prevState.filter((_, i) => i !== index);
        });
    };

    const moveTierUp = (event, index) => {
        event.preventDefault();
        setTierDescriptions((prevState) => {
            const itemToMove = prevState[index];
            const itemReplaced = prevState[index - 1];

            return prevState.map((td, i) => {
                if (i === index)
                    return itemReplaced;
                if (i === index - 1)
                    return itemToMove;
                return td;
            });
        });
    };

    const moveTierDown = (event, index) => {
        event.preventDefault();
        setTierDescriptions((prevState) => {
            const itemToMove = prevState[index];
            const itemReplaced = prevState[index + 1];

            return prevState.map((td, i) => {
                if (i === index)
                    return itemReplaced;
                if (i === index + 1)
                    return itemToMove;
                return td;
            });
        });
    };

    const acceptForm = (event) => {
        event.preventDefault();

        const dataToDispatch = {
            tierDescriptions: tierDescriptions,
            skillId: props.skillId,
            classId: props.classId,
            categories: categories
        };

        dispatch(updateSkill(dataToDispatch));
        hideModal();
    }

    const onCategoriesChange = (categories) => {
        setCategories(categories);
    }

    return (
        <>
            <button onClick={showModal}>
                Edit
            </button>
            <Modal show={show} onHide={hideModal}>
                <ModalHeader onClose={hideModal}>
                    {props.name}
                </ModalHeader>
                <ModalContent>
                    <form>
                        {tierDescriptions.map((td, i) => (
                            <div key={i} className='skill-edit__tier-description'>
                                <div className='skill-edit__input'>
                                    <InputText value={td} label={'Tier: ' + i} onChange={(event) => onChange(event.target.value, i)} multiline={true} />
                                </div>
                                <button onClick={(event) => moveTierUp(event, i)} className={i === 0 ? 'disabled' : ''}><FontAwesomeIcon icon={faCaretUp} /></button>
                                <button onClick={(event) => moveTierDown(event, i)} className={i === tierDescriptions.length - 1 ? 'disabled' : ''}><FontAwesomeIcon icon={faCaretDown} /></button>
                                <button onClick={(event) => deleteTier(event, i)}><FontAwesomeIcon icon={faClose} /></button>
                            </div>
                        ))}
                        <button onClick={addTier}>Add tier</button>
                        <SkillCategoriesEdit categories={categories} userCategories={userCategories} onChange={(categories) => onCategoriesChange(categories)} />
                    </form>
                </ModalContent>
                <ModalFooter onAccept={acceptForm} onClose={hideModal} />
            </Modal>
        </>
    );
}

export default SkillEdit;
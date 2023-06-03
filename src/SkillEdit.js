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
        setTierDescriptions(props.tierDescriptions.length > 1 ? props.tierDescriptions.toSorted((a, b) => a.tier - b.tier) : props.tierDescriptions);
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

    const deleteTier = (event, tier) => {
        event.preventDefault();
        setTierDescriptions((prevState) => {
            return prevState.filter(td => td.tier !== tier);
        });
    };

    const moveTierByValue = (event, tier, value) => {
        event.preventDefault();
        setTierDescriptions((prevState) => {
            const indexToMove = getIndexOfTierDescriptionByTier(prevState, tier);
            const indexToReplace = getIndexOfTierDescriptionByTier(prevState, tier + value)
            const itemToMove = { ...prevState[indexToMove], tier: tier + value };
            const itemToReplace = { ...prevState[indexToReplace], tier: tier };

            const newState = prevState.map((td, i) => {
                if (i === indexToMove)
                    return itemToReplace;
                if (i === indexToReplace)
                    return itemToMove;
                return td;
            });

            return newState;
        }
    );
};

const getIndexOfTierDescriptionByTier = (tierDescriptions, tier) => {
    return tierDescriptions.findIndex(td => td.tier === tier);
}

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
                        <div key={td.id} className='skill-edit__tier-description'>
                            <div className='skill-edit__input'>
                                <InputText value={td.description} label={'Tier: ' + td.tier} onChange={(event) => onChange(event.target.value, td.tier)} multiline={true} />
                            </div>
                            <button onClick={(event) => moveTierByValue(event, td.tier, -1)} className={i === 0 ? 'disabled' : ''}><FontAwesomeIcon icon={faCaretUp} /></button>
                            <button onClick={(event) => moveTierByValue(event, td.tier, 1)} className={i === tierDescriptions.length - 1 ? 'disabled' : ''}><FontAwesomeIcon icon={faCaretDown} /></button>
                            <button onClick={(event) => deleteTier(event, td.tier)}><FontAwesomeIcon icon={faClose} /></button>
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
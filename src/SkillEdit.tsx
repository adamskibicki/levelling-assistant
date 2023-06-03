import {
    faCaretDown,
    faCaretUp,
    faClose,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserCategories } from "./CharacterPanel/slice/thunks/fetchUserCategories";
import { updateSkill } from "./CharacterPanel/slice/characterPanelSlice";
import InputText from "./Inputs/InputText";
import Modal from "./Modal/Modal";
import ModalContent from "./Modal/ModalContent";
import ModalFooter from "./Modal/ModalFooter";
import ModalHeader from "./Modal/ModalHeader";
import "./SkillEdit.scss";
import SkillCategoriesEdit from "./SkillsPanel/SkillCategoriesEdit";
import { TierDescription } from "./CharacterPanel/slice/state/TierDescription";
import { Category } from "./CharacterPanel/slice/state/Category";
import { CharacterPanelSliceState } from "./CharacterPanel/slice/state/CharacterPanelSliceState";
import { AppDispatch } from "./store/store";
import { v4 as uuidv4 } from "uuid";

function SkillEdit(props: {
    skillId: string;
    classId: string;
    tierDescriptions: TierDescription[];
    categories: Category[];
    name: string;
}) {
    const [show, setShow] = useState(false);
    const [tierDescriptions, setTierDescriptions] = useState<TierDescription[]>(
        []
    );
    const [categories, setCategories] = useState<Category[]>([]);
    const userCategories = useSelector(
        (state: { characterPanel: CharacterPanelSliceState }) =>
            state.characterPanel.userCategories
    );
    const dispatch = useDispatch<AppDispatch>();

    const showModal = () => {
        setShow(true);
        setTierDescriptions(
            props.tierDescriptions.length > 1
                ? [...props.tierDescriptions].sort((a, b) => a.tier - b.tier)
                : props.tierDescriptions
        );
        setCategories(props.categories);
        dispatch(fetchUserCategories());
    };

    const hideModal = () => {
        setShow(false);
    };

    const onChange = (text: string, tier: number) => {
        setTierDescriptions((prevState) => {
            const indexOfTierDescriptionToChange =
                getIndexOfTierDescriptionByTier(prevState, tier);
            return prevState.map((td, i) => {
                if (i === indexOfTierDescriptionToChange)
                    return {
                        ...prevState[indexOfTierDescriptionToChange],
                        description: text,
                    };
                return td;
            });
        });
    };

    const addTier = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        setTierDescriptions((prevState) => {
            return [
                ...prevState,
                {
                    tier: Math.max(...prevState.map((td) => td.tier)),
                    description: "",
                    id: uuidv4(),
                },
            ];
        });
    };

    const deleteTier = (
        event: React.MouseEvent<HTMLButtonElement>,
        tier: number
    ) => {
        event.preventDefault();
        setTierDescriptions((prevState) => {
            return prevState.filter((td) => td.tier !== tier);
        });
    };

    const moveTierByValue = (
        event: React.MouseEvent<HTMLButtonElement>,
        tier: number,
        value: number
    ) => {
        event.preventDefault();
        setTierDescriptions((prevState) => {
            const indexToMove = getIndexOfTierDescriptionByTier(
                prevState,
                tier
            );
            const indexToReplace = getIndexOfTierDescriptionByTier(
                prevState,
                tier + value
            );
            const itemToMove = {
                ...prevState[indexToMove],
                tier: tier + value,
            };
            const itemToReplace = { ...prevState[indexToReplace], tier: tier };

            const newState = prevState.map((td, i) => {
                if (i === indexToMove) return itemToReplace;
                if (i === indexToReplace) return itemToMove;
                return td;
            });

            return newState;
        });
    };

    const getIndexOfTierDescriptionByTier = (
        tierDescriptions: TierDescription[],
        tier: number
    ) => {
        return tierDescriptions.findIndex((td) => td.tier === tier);
    };

    const acceptForm = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();

        const dataToDispatch = {
            tierDescriptions: tierDescriptions,
            skillId: props.skillId,
            classId: props.classId,
            categories: categories,
        };

        dispatch(updateSkill(dataToDispatch));
        hideModal();
    };

    const onCategoriesChange = (categories: Category[]) => {
        setCategories(categories);
    };

    return (
        <>
            <button onClick={showModal}>Edit</button>
            <Modal show={show} onHide={hideModal}>
                <ModalHeader onClose={hideModal}>{props.name}</ModalHeader>
                <ModalContent>
                    <form>
                        {tierDescriptions.map((td, i) => (
                            <div
                                key={td.id}
                                className="skill-edit__tier-description"
                            >
                                <div className="skill-edit__input">
                                    <InputText
                                        value={td.description}
                                        label={"Tier: " + td.tier}
                                        onChange={(
                                            event: React.FormEvent<HTMLInputElement>
                                        ) =>
                                            onChange(
                                                event.currentTarget.value,
                                                td.tier
                                            )
                                        }
                                        multiline={true}
                                    />
                                </div>
                                <button
                                    onClick={(event) =>
                                        moveTierByValue(event, td.tier, -1)
                                    }
                                    className={i === 0 ? "disabled" : ""}
                                >
                                    <FontAwesomeIcon icon={faCaretUp} />
                                </button>
                                <button
                                    onClick={(event) =>
                                        moveTierByValue(event, td.tier, 1)
                                    }
                                    className={
                                        i === tierDescriptions.length - 1
                                            ? "disabled"
                                            : ""
                                    }
                                >
                                    <FontAwesomeIcon icon={faCaretDown} />
                                </button>
                                <button
                                    onClick={(event) =>
                                        deleteTier(event, td.tier)
                                    }
                                >
                                    <FontAwesomeIcon icon={faClose} />
                                </button>
                            </div>
                        ))}
                        <button onClick={addTier}>Add tier</button>
                        <SkillCategoriesEdit
                            categories={categories}
                            userCategories={userCategories}
                            onChange={(categories: Category[]) =>
                                onCategoriesChange(categories)
                            }
                        />
                    </form>
                </ModalContent>
                <ModalFooter onAccept={acceptForm} onClose={hideModal} />
            </Modal>
        </>
    );
}

export default SkillEdit;
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import './UserCharacters.scss';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faPlus } from "@fortawesome/free-solid-svg-icons";
import AddUserCharacterModal from "./AddUserCharacterModal";
import ConfirmationModal from "./ConfirmationModal";
import Loader from "../components/Loader";
import { getUserCharacters } from "./slice/thunks/getUserCharacters";
import { PostUserCharacterRequestData, postUserCharacter } from "./slice/thunks/postUserCharacter";
import { deleteUserCharacter } from "./slice/thunks/deleteUserCharacter";
import { toReadableDate } from "../common/DateExtensions";
import CharacterStatuses from "./CharacterStatuses";
import { AppDispatch } from "../store/store";
import { CharacterStatusSimplified, UserCharacter, UserCharacterSliceState } from "./slice/state/UserCharacterSliceState";

export default function UserCharacters() {
    const userCharacters = useSelector((state: {userCharacters: UserCharacterSliceState}) => state.userCharacters.userCharacters);
    const loaded = useSelector((state: any) => state.userCharacters.loaded);
    const [showAddUserCharacterModal, setShowAddUserCharacterModal] = useState(false);
    const [showDeleteConfirmationModal, setShowDeleteConfirmationModal] = useState(false);
    const [deleteConfirmationModalMessage, setDeleteConfirmationModalMessage] = useState("");
    const [userCharacterIdToDelete, setUserCharacterIdToDelete] = useState("");
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(getUserCharacters());
    }, [dispatch]);

    const onModalAccept = (userCharacter: PostUserCharacterRequestData) => {
        setShowAddUserCharacterModal(false);
        dispatch(postUserCharacter(userCharacter));
    }

    const onUserCharacterDeleteButtonClick = (event: React.MouseEvent<HTMLButtonElement>, userCharacter: UserCharacter) => {
        event.preventDefault();

        const newestCharacterStatus = getNewestCharacterStatus(userCharacter.characterStatuses);

        setUserCharacterIdToDelete(userCharacter.id);
        setShowDeleteConfirmationModal(true);
        setDeleteConfirmationModalMessage(`${newestCharacterStatus.name}\n${newestCharacterStatus.title}\n${toReadableDate(newestCharacterStatus.createdAt)}`);
    }

    const onDeleteConfirmationModalAccept = () => {
        dispatch(deleteUserCharacter(userCharacterIdToDelete));
        setUserCharacterIdToDelete("");
        setShowDeleteConfirmationModal(false);
    }

    const getNewestCharacterStatus = (characterStatuses: Array<CharacterStatusSimplified>) => {
        return characterStatuses.reduce((prev, current) => (prev.createdAt > current.createdAt ? prev : current));
    }

    return (
        <div className="user-characters">
            {!loaded &&
                <div className="user-characters__loader">
                    <Loader className="user-characters__loader-spinner" />
                </div>
            }
            {loaded &&
                userCharacters
                .map(uc => ({
                    newestCharacterStatus: getNewestCharacterStatus(uc.characterStatuses),
                    userCharacter: uc
                }))
                .sort((a, b) => (new Date(b.newestCharacterStatus.createdAt).getTime() - new Date(a.newestCharacterStatus.createdAt).getTime()))
                .map(ucs => ucs.userCharacter)
                .map(uc => {
                    const newestCharacterStatus = getNewestCharacterStatus(uc.characterStatuses);

                    return (
                        <div key={uc.id} >
                            <Link to={"/character/" + newestCharacterStatus.id} className="user-characters__link">
                                <div className="user-characters__item">
                                    <div className="user-characters__name">{newestCharacterStatus.name}</div>
                                    <div className="user-characters__title">{newestCharacterStatus.title}</div>
                                    <div className="user-characters__lastEdited">{toReadableDate(newestCharacterStatus.createdAt)}</div>
                                    <button onClick={(event) => onUserCharacterDeleteButtonClick(event, uc)}><FontAwesomeIcon icon={faClose} /></button>
                                </div>
                            </Link>
                            <CharacterStatuses characterStatuses={uc.characterStatuses}/> 
                        </div>
                    )
                })
            }
            {loaded &&
                <>
                    <div className="user-characters__item" onClick={() => setShowAddUserCharacterModal(true)}>
                        <FontAwesomeIcon className="user-characters__item-add" icon={faPlus} />
                    </div>
                    <div className="user-characters__bottom-spacer"></div>
                </>
            }

            <ConfirmationModal modalTitle={"Do you want to delete selected user character?"} message={deleteConfirmationModalMessage} show={showDeleteConfirmationModal} onAccept={onDeleteConfirmationModalAccept} onHide={() => setShowDeleteConfirmationModal(false)} onClose={() => setShowDeleteConfirmationModal(false)} />

            <AddUserCharacterModal name="New character name" title="New character status" show={showAddUserCharacterModal} onHide={() => setShowAddUserCharacterModal(false)} onClose={() => setShowAddUserCharacterModal(false)} onAccept={(userCharacter: PostUserCharacterRequestData) => onModalAccept(userCharacter)} modalTitle={"Add character"} />
        </div>
    );
}
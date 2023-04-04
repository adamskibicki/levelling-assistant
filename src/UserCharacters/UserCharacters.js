import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserCharacters, postUserCharacter, deleteUserCharacter } from "./userCharactersSlice";
import './UserCharacters.scss';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faPlus } from "@fortawesome/free-solid-svg-icons";
import AddUserCharacterModal from "./AddUserCharacterModal";
import ConfirmationModal from "./ConfirmationModal";
import Loader from "../components/Loader";

export default function UserCharacters(props) {
    const userCharacters = useSelector((state) => state.userCharacters.userCharacters);
    const loaded = useSelector((state) => state.userCharacters.loaded);
    const [showAddUserCharacterModal, setShowAddUserCharacterModal] = useState(false);
    const [showDeleteConfirmationModal, setShowDeleteConfirmationModal] = useState(false);
    const [deleteConfirmationModalMessage, setDeleteConfirmationModalMessage] = useState("");
    const [userCharacterToDelete, setUserCharacterToDelete] = useState(null);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUserCharacters());
    }, [dispatch]);

    const onModalAccept = (userCharacter) => {
        setShowAddUserCharacterModal(false);
        dispatch(postUserCharacter(userCharacter));
    }

    const onDeleteButtonClick = (event, userCharacter) => {
        event.preventDefault();
        setShowDeleteConfirmationModal(true);
        setDeleteConfirmationModalMessage(`${userCharacter.name}\n${userCharacter.title}\n${toReadableDate(userCharacter.lastEdited)}`);
        setUserCharacterToDelete(userCharacter);
    }

    const toReadableDate = (date) => {
        return new Intl.DateTimeFormat("en-US", { dateStyle: "medium", timeStyle: "medium" }).format(new Date(date));
    }

    const onDeleteConfirmationModalAccept = () => {
        dispatch(deleteUserCharacter(userCharacterToDelete.id));
        setUserCharacterToDelete(null);
        setShowDeleteConfirmationModal(false);
    }

    return (
        <div className="user-characters">
            {!loaded &&
                <div className="user-characters__loader">
                    <Loader className="user-characters__loader-spinner" />
                </div>
            }
            {loaded &&
                userCharacters.map((uc) =>
                    <Link to={"/character/" + uc.statusId} key={uc.id} className="user-characters__link">
                        <div className="user-characters__item">
                            <div className="user-characters__name">{uc.name}</div>
                            <div className="user-characters__title">{uc.title}</div>
                            <div className="user-characters__lastEdited">{toReadableDate(uc.lastEdited)}</div>
                            <button onClick={(event) => onDeleteButtonClick(event, uc)}><FontAwesomeIcon icon={faClose} /></button>
                        </div>
                    </Link>
                )}
            {loaded &&
                <div className="user-characters__item" onClick={() => setShowAddUserCharacterModal(true)}>
                    <FontAwesomeIcon className="user-characters__item-add" icon={faPlus} />
                </div>
            }

            <ConfirmationModal modalTitle={"Do you want to delete selected user character?"} message={deleteConfirmationModalMessage} show={showDeleteConfirmationModal} onAccept={onDeleteConfirmationModalAccept} onHide={() => setShowDeleteConfirmationModal(false)} onClose={() => setShowDeleteConfirmationModal(false)} />

            <AddUserCharacterModal name="New character name" title="New character status" show={showAddUserCharacterModal} onHide={() => setShowAddUserCharacterModal(false)} onClose={() => setShowAddUserCharacterModal(false)} onAccept={(userCharacter) => onModalAccept(userCharacter)} modalTitle={"Add character"} />
        </div>
    );
}
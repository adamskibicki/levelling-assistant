import { useState } from "react";
import { CharacterStatusSimplified } from "./slice/state/UserCharacterSliceState";
import { toReadableDate } from "../common/DateExtensions";
import { deleteCharacterStatus } from "./slice/thunks/deleteCharacterStatus";
import { useAppDispatch } from "../store/store";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import ConfirmationModal from "./ConfirmationModal";
import "./CharacterStatuses.scss";
import { IconButton } from "../components/common/Buttons";

export default function CharacterStatuses(props: {
    characterStatuses: Array<CharacterStatusSimplified>;
    deletionDisabled: boolean;
}) {
    const [characterStatusIdToDelete, setCharacterStatusIdToDelete] =
        useState<string>("");
    const [showDeleteConfirmationModal, setShowDeleteConfirmationModal] =
        useState(false);
    const [deleteConfirmationModalMessage, setDeleteConfirmationModalMessage] =
        useState("");
    const dispatch = useAppDispatch();

    const onDeleteButtonClick = (
        event: React.MouseEvent<HTMLButtonElement>,
        characterStatus: CharacterStatusSimplified
    ) => {
        event.preventDefault();
        setShowDeleteConfirmationModal(true);
        setDeleteConfirmationModalMessage(
            `${characterStatus.name}\n${
                characterStatus.title
            }\n${toReadableDate(characterStatus.createdAt)}`
        );
        setCharacterStatusIdToDelete(characterStatus.id);
    };

    const onDeleteConfirmationModalAccept = () => {
        dispatch(deleteCharacterStatus(characterStatusIdToDelete));
        setCharacterStatusIdToDelete("");
        setShowDeleteConfirmationModal(false);
    };

    return (
        <>
            <div className="character-statuses">
                <>
                    {props.characterStatuses
                        .map((cs) => cs)
                        .sort(
                            (a, b) =>
                                new Date(b.createdAt).getTime() -
                                new Date(a.createdAt).getTime()
                        )
                        .map((cs) => (
                            <Link
                                to={"/character/" + cs.id}
                                key={cs.id}
                                className="character-statuses__link"
                            >
                                <div className="character-statuses__item character-statuses__item--old-status">
                                    <div className="character-statuses__name">
                                        {cs.name}
                                    </div>
                                    <div className="character-statuses__title">
                                        {cs.title}
                                    </div>
                                    <div className="character-statuses__lastEdited">
                                        {toReadableDate(cs.createdAt)}
                                    </div>
                                    <IconButton
                                        onClick={(event) =>
                                            onDeleteButtonClick(event, cs)
                                        }
                                        disabled={props.deletionDisabled}
                                    >
                                        <FontAwesomeIcon icon={faClose} />
                                    </IconButton>
                                </div>
                            </Link>
                        ))}
                </>

                <ConfirmationModal
                    modalTitle={
                        "Do you want to delete selected character status?"
                    }
                    message={deleteConfirmationModalMessage}
                    show={showDeleteConfirmationModal}
                    onAccept={onDeleteConfirmationModalAccept}
                    onHide={() => setShowDeleteConfirmationModal(false)}
                    onClose={() => setShowDeleteConfirmationModal(false)}
                />
            </div>
        </>
    );
}

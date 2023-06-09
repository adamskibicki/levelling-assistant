import { useState } from "react";
import { UserCharacter } from "./slice/state/UserCharacterSliceState";
import { toReadableDate } from "../common/DateExtensions";
import { useAppDispatch } from "../store/store";
import { Link } from "react-router-dom";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import ConfirmationModal from "./ConfirmationModal";
import "./UserCharacter.scss";
import { deleteUserCharacter } from "./slice/thunks/deleteUserCharacter";
import CharacterStatuses from "./CharacterStatuses";
import { getNewestCharacterStatus } from "./getNewestCharacterStatus";
import { ExpandButton, IconButton } from "../components/common/Buttons";

export default function UserCharacterComponent(props: UserCharacter) {
    const [expanded, setExpanded] = useState(false);

    const [
        showDeleteUserCharacterConfirmationModal,
        setShowDeleteUserCharacterConfirmationModal,
    ] = useState(false);
    const [
        deleteUserCharacterConfirmationModalMessage,
        setDeleteUserCharacterConfirmationModalMessage,
    ] = useState("");
    const [userCharacterIdToDelete, setUserCharacterIdToDelete] = useState("");

    const dispatch = useAppDispatch();

    const onDeleteUserCharacterConfirmationModalAccept = () => {
        dispatch(deleteUserCharacter(userCharacterIdToDelete));
        setUserCharacterIdToDelete("");
        setShowDeleteUserCharacterConfirmationModal(false);
    };

    const onUserCharacterDeleteButtonClick = (
        event: React.MouseEvent<HTMLButtonElement>,
        userCharacter: UserCharacter
    ) => {
        event.preventDefault();

        const newestCharacterStatus = getNewestCharacterStatus(
            userCharacter.characterStatuses
        );

        setUserCharacterIdToDelete(userCharacter.id);
        setShowDeleteUserCharacterConfirmationModal(true);
        setDeleteUserCharacterConfirmationModalMessage(
            `${newestCharacterStatus.name}\n${
                newestCharacterStatus.title
            }\n${toReadableDate(newestCharacterStatus.createdAt)}`
        );
    };

    const flipExpanded = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        setExpanded(!expanded);
    };

    const newestCharacterStatus = getNewestCharacterStatus(
        props.characterStatuses
    );

    return (
        <>
            <div>
                <Link
                    to={"/character/" + newestCharacterStatus.id}
                    className="user-character__link"
                >
                    <div className="user-character__item">
                        <ExpandButton
                            expanded={expanded}
                            onClick={flipExpanded}
                        />
                        <div className="user-character__name">
                            {newestCharacterStatus.name}
                        </div>
                        <div className="user-character__title">
                            {newestCharacterStatus.title}
                        </div>
                        <div className="user-character__lastEdited">
                            {toReadableDate(newestCharacterStatus.createdAt)}
                        </div>
                        <IconButton
                            onClick={(event) =>
                                onUserCharacterDeleteButtonClick(event, props)
                            }
                            icon={faClose}
                        />
                    </div>
                </Link>
                {expanded && (
                    <CharacterStatuses
                        characterStatuses={props.characterStatuses}
                        deletionDisabled={props.characterStatuses.length === 1}
                    />
                )}
            </div>

            <ConfirmationModal
                modalTitle={"Do you want to delete selected user character?"}
                message={deleteUserCharacterConfirmationModalMessage}
                show={showDeleteUserCharacterConfirmationModal}
                onAccept={onDeleteUserCharacterConfirmationModalAccept}
                onHide={() =>
                    setShowDeleteUserCharacterConfirmationModal(false)
                }
                onClose={() =>
                    setShowDeleteUserCharacterConfirmationModal(false)
                }
            />
        </>
    );
}

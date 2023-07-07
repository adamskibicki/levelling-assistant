import { useEffect, useState } from "react";
import "./UserCharacters.scss";
import "./UserCharacter.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import AddUserCharacterModal from "./AddUserCharacterModal";
import Loader from "../components/Loader";
import { getUserCharacters } from "./slice/thunks/getUserCharacters";
import {
    PostUserCharacterRequestData,
    postUserCharacter,
} from "./slice/thunks/postUserCharacter";
import { useAppDispatch, useAppSelector } from "../store/store";
import { getNewestCharacterStatus } from "./getNewestCharacterStatus";
import UserCharacterComponent from "./UserCharacter";
import { fetchUserCategories } from "../CharacterPanel/slice/thunks/fetchUserCategories";

export default function UserCharacters() {
    const userCharacters = useAppSelector(
        (state) => state.userCharacters.userCharacters
    );
    const loaded = useAppSelector((state) => state.userCharacters.loaded);
    const [showAddUserCharacterModal, setShowAddUserCharacterModal] =
        useState(false);

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchUserCategories());
        dispatch(getUserCharacters());
    }, [dispatch]);

    const onModalAccept = (userCharacter: PostUserCharacterRequestData) => {
        setShowAddUserCharacterModal(false);
        dispatch(postUserCharacter(userCharacter));
    };

    return (
        <div className="user-characters">
            {!loaded && (
                <div className="user-characters__loader">
                    <Loader className="user-characters__loader-spinner" />
                </div>
            )}
            {loaded &&
                userCharacters
                    .map((uc) => ({
                        newestCharacterStatus: getNewestCharacterStatus(
                            uc.characterStatuses
                        ),
                        userCharacter: uc,
                    }))
                    .sort(
                        (a, b) =>
                            new Date(
                                b.newestCharacterStatus.createdAt
                            ).getTime() -
                            new Date(
                                a.newestCharacterStatus.createdAt
                            ).getTime()
                    )
                    .map((ucs) => ucs.userCharacter)
                    .map((uc) => (
                        <UserCharacterComponent key={uc.id} {...uc} />
                    ))}
            {loaded && (
                <>
                    <div
                        className="user-character__item"
                        onClick={() => setShowAddUserCharacterModal(true)}
                    >
                        <FontAwesomeIcon
                            className="user-characters__item-add"
                            icon={faPlus}
                        />
                    </div>
                    <div className="user-characters__bottom-spacer"></div>
                </>
            )}

            <AddUserCharacterModal
                name="New character name"
                title="New character status"
                show={showAddUserCharacterModal}
                onHide={() => setShowAddUserCharacterModal(false)}
                onClose={() => setShowAddUserCharacterModal(false)}
                onAccept={(userCharacter: PostUserCharacterRequestData) =>
                    onModalAccept(userCharacter)
                }
                modalTitle={"Add character"}
            />
        </div>
    );
}

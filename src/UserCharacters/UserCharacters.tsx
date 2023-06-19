import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./UserCharacters.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import AddUserCharacterModal from "./AddUserCharacterModal";
import Loader from "../components/Loader";
import { getUserCharacters } from "./slice/thunks/getUserCharacters";
import {
    PostUserCharacterRequestData,
    postUserCharacter,
} from "./slice/thunks/postUserCharacter";
import { AppDispatch } from "../store/store";
import {
    UserCharacterSliceState,
} from "./slice/state/UserCharacterSliceState";
import { getNewestCharacterStatus } from "./getNewestCharacterStatus";
import UserCharacterComponent from "./UserCharacter";

export default function UserCharacters() {
    const userCharacters = useSelector(
        (state: { userCharacters: UserCharacterSliceState }) =>
            state.userCharacters.userCharacters
    );
    const loaded = useSelector((state: any) => state.userCharacters.loaded);
    const [showAddUserCharacterModal, setShowAddUserCharacterModal] =
        useState(false);

    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
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
                    .map((uc) => 
                        <UserCharacterComponent key={uc.id} {...uc}/>
                    )}
            {loaded && (
                <>
                    <div
                        className="user-characters__item"
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

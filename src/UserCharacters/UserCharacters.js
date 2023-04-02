import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserCharacters, postUserCharacter } from "./userCharactersSlice";
import './UserCharacters.scss';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import AddUserCharacterModal from "./AddUserCharacterModal";

export default function UserCharacters(props) {
    const userCharacters = useSelector((state) => state.userCharacters.userCharacters);
    const loaded = useSelector((state) => state.userCharacters.loaded);
    const [showAddUserCharacterModal, setShowAddUserCharacterModal] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        if (loaded)
            return;
        dispatch(getUserCharacters());
    });

    const onModalAccept = (userCharacter) => {
        setShowAddUserCharacterModal(false);
        dispatch(postUserCharacter(userCharacter));
    }

    return (
        <div className="user-characters">
            {userCharacters.map((uc) =>
                <Link to={"/character/" + uc.statusId} key={uc.statusId} className="user-characters__link">
                    <div className="user-characters__item">
                        <div className="user-characters__name">{uc.name}</div>
                        <div className="user-characters__title">{uc.title}</div>
                        <div className="user-characters__lastEdited">{new Intl.DateTimeFormat("en-US", {dateStyle: "medium", timeStyle: "medium"}).format(new Date(uc.lastEdited))}</div>
                    </div>
                </Link>
            )}
            <div className="user-characters__item" onClick={() => setShowAddUserCharacterModal(true)}>
                <FontAwesomeIcon className="user-characters__item-add" icon={faPlus}/>
            </div>

            <AddUserCharacterModal name="New character name" title="New character status" show={showAddUserCharacterModal} onHide={() => setShowAddUserCharacterModal(false)} onClose={() => setShowAddUserCharacterModal(false)} onAccept={(userCharacter) => onModalAccept(userCharacter)} modalTitle={"Add character"}/>
        </div>
    );
}
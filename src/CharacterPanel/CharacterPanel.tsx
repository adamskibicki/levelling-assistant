import React, { useEffect } from "react";
import "./CharacterPanel.scss";
import ClassesPanel from "../ClassesPanel/ClassesPanel";
import BasicInfo from "./SideBar/BasicInfo";
import ResourcesStatus from "./SideBar/Resources/ResourcesStatus";
import Stats from "./SideBar/Stats";
import UnspentSkillpoints from "./SideBar/UnspentSkillpoints";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../components/Loader";
import { getStatus } from "./slice/thunks/getStatus";
import { useAppDispatch, useAppSelector } from "../store/store";
import { saveCharacterStatusChanges } from "./slice/thunks/saveCharacterStatusChanges";

export default function CharacterPanel() {
    const characterStatus = useAppSelector(
        (state) => state.characterPanel
    );
    const loaded = useAppSelector(
        (state) => state.characterPanel.loaded
    );
    const { statusId } = useParams<string>();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (statusId === undefined) {
            alert(
                "CharacterPanel cannot be loaded without CharacterStatus id in route"
            );
        } else {
            dispatch(getStatus({ id: statusId }));
        }
    }, [statusId, dispatch]);

    const saveChangesOnClick = () => {
        if (statusId === undefined) throw new Error("statusId is undefined");
        dispatch(
            saveCharacterStatusChanges({
                payload: {
                    characterStatusId: statusId,
                    characterStatus: {
                        classes: characterStatus.classes,
                        generalInformation: characterStatus.generalInformation,
                        generalSkills: characterStatus.generalSkills,
                    },
                },
                navigate,
            })
        );
    };

    return (
        <div className="character-panel">
            {!loaded && (
                <div className="character-panel__loader">
                    <Loader />
                </div>
            )}
            {loaded && (
                <>
                    <div className="general-information">
                        <div className="general-information-group">
                            <button onClick={saveChangesOnClick}>
                                Save changes
                            </button>
                            <button>Discard changes</button>
                        </div>

                        <div className="general-information-group">
                            <BasicInfo
                                {...characterStatus.generalInformation
                                    .basicInfo}
                            />
                        </div>

                        <div className="general-information-group">
                            <ResourcesStatus
                                resources={
                                    characterStatus.generalInformation.resources
                                }
                            />
                        </div>

                        <div className="general-information-group">
                            <Stats
                                {...characterStatus.generalInformation.stats}
                            />
                        </div>

                        <div className="general-information-group">
                            <UnspentSkillpoints
                                {...characterStatus.generalInformation
                                    .skillpoints}
                            />
                        </div>
                    </div>

                    <ClassesPanel classes={characterStatus.classes} />
                </>
            )}
        </div>
    );
}

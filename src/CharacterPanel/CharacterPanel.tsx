import React, { useEffect } from 'react';
import './CharacterPanel.scss'
import ClassesPanel from '../ClassesPanel/ClassesPanel';
import BasicInfo from './SideBar/BasicInfo';
import ResourcesStatus from './SideBar/Resources/ResourcesStatus';
import Stats from './SideBar/Stats';
import UnspentSkillpoints from './SideBar/UnspentSkillpoints';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Loader from "../components/Loader";
import { getStatus } from './slice/thunks/getStatus';
import { CharacterPanelSliceState } from './slice/state/CharacterPanelSliceState';
import { AppDispatch } from '../store/store';
import { saveCharacterStatusChanges } from './slice/thunks/saveCharacterStatusChanges';
import { Resource } from './slice/state/Resource';
import { CalculatedResource } from './CalculatedResource';
import { useCalculateFinalStatValue } from './useCalculateFinalStatValue';

export default function CharacterPanel() {
    const characterStatus = useSelector((state: {characterPanel: CharacterPanelSliceState}) => state.characterPanel);
    const loaded = useSelector((state: {characterPanel: CharacterPanelSliceState}) => state.characterPanel.loaded);
    const { statusId } = useParams<string | "">();
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const {calculateFinalStatValue} = useCalculateFinalStatValue();

    useEffect(() => {
        if (statusId === undefined) {
            alert("CharacterPanel cannot be loaded without CharacterStatus id in route");
        }
        else {
            dispatch(getStatus({id: statusId}));
        }
    }, [statusId, dispatch]);

    const getCalculatedResources = (): CalculatedResource[] => {
        return characterStatus.generalInformation.resources.map(r => ({
            name: r.displayName,
            value: calculateResourceValue(r)
        }));
    }

    const calculateResourceValue = (resource: Resource) => {
        const allClassModifiers = getAllClassModifiers();
        let affectingClassModifiers = allClassModifiers.filter(m => m.affectedResourceId === resource.id);
        let resourceStat = characterStatus.generalInformation.stats.stats.filter(s => s.id === resource.baseStatId)[0];

        let finalStatValue = calculateFinalStatValue(resourceStat);

        let baseResourceValue = finalStatValue * resource.resourcePointsPerBaseStatPoint;

        let increases = [];
        let multipliers = [];

        for (let i = 0; i < affectingClassModifiers.length; i++) {
            const classModifier = affectingClassModifiers[i];

            switch (classModifier.categoryCalculationType) {
                case 'None':
                    break;
                case 'Multiplicative':
                    multipliers.push(classModifier.percentagePointsOfCategoryIncrease);
                    break;
                case 'MultiplicativeWithBaseAdded':
                    multipliers.push(classModifier.percentagePointsOfCategoryIncrease + 100);
                    break;
                case 'Additive':
                    increases.push(classModifier.percentagePointsOfCategoryIncrease);
                    break;
                default:
                    console.error('calculationType \'' + classModifier.categoryCalculationType + '\' is not supported');
            }
        }


        let calculatedMultipliers = multipliers.map(m => m / 100).reduce((a, c) => a * c, 1);

        return baseResourceValue * (increases.reduce((a, c) => a + c, 100) / 100) * calculatedMultipliers;
    }

    const getAllClassModifiers = () => {
        return characterStatus.classes.map(c => c.modifiers).flat();
    }

    const saveChangesOnClick = () => {
        dispatch(saveCharacterStatusChanges({
            payload:{
                characterStatusId: statusId,
                characterStatus: {
                    classes: characterStatus.classes,
                    generalInformation: characterStatus.generalInformation,
                    generalSkills: characterStatus.generalSkills
                }
            },
            navigate: navigate
        }));
    }

    return (
        <div className='character-panel'>
            {!loaded &&
                <div className="character-panel__loader">
                    <Loader />
                </div>
            }
            {loaded &&
                <>
                    <div className="general-information">
                        <div className='general-information-group'>
                            <button onClick={saveChangesOnClick}>Save changes</button>
                            <button>Discard changes</button>
                        </div>

                        <div className='general-information-group'>
                            <BasicInfo {...characterStatus.generalInformation.basicInfo} />
                        </div>

                        <div className='general-information-group'>
                            <ResourcesStatus resources={getCalculatedResources()} />
                        </div>

                        <div className='general-information-group'>
                            <Stats {...characterStatus.generalInformation.stats} />
                        </div>

                        <div className='general-information-group'>
                            <UnspentSkillpoints {...characterStatus.generalInformation.skillpoints} />
                        </div>
                    </div>

                    <ClassesPanel classes={characterStatus.classes} />
                </>
            }
        </div>
    );
}
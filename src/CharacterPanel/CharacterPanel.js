import React, { useEffect } from 'react';
import './CharacterPanel.scss'
import SkillsPanel from '../SkillsPanel';
import BasicInfo from './SideBar/BasicInfo';
import ResourcesStatus from './SideBar/ResourcesStatus';
import Stats from './SideBar/Stats';
import UnspentSkillpoints from './SideBar/UnspentSkillpoints';
import { useDispatch, useSelector } from 'react-redux';
import { getStatus } from './characterPanelSlice';
import { useParams } from 'react-router-dom';
import Loader from "../components/Loader";

export default function CharacterPanel() {
    const characterStatus = useSelector(state => state.characterPanel);
    const loaded = useSelector(state => state.characterPanel.loaded);
    const { statusId } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getStatus(statusId));
    }, [statusId, dispatch]);

    const getSkillsAffectingProvidedStat = (stat, skills) => {
        return skills.filter(s => {
            return s.variables?.filter(v => v.affectedStatIds.includes(stat.id)).length > 0;
        });
    }

    const getAllClassSkills = () => {
        return characterStatus.classes.map(c => c.skills).flat();
    }

    const calculateFinalStatValue = (stat) => {
        let statAffectingSkills = getSkillsAffectingProvidedStat(stat, getAllClassSkills());

        let statIncreases = [];
        let statMultipliers = [];

        for (let i = 0; i < statAffectingSkills.length; i++) {
            const skill = statAffectingSkills[i];
            const affectingVariables = skill.variables.filter(v => v.affectedStatIds.includes(stat.id));

            for (let j = 0; j < affectingVariables.length; j++) {
                const skillVariable = affectingVariables[j];

                let variableIncreaseValue = calculateValueOfIncreasedVariable(skillVariable, skill);

                switch (skillVariable.categoryCalculationType) {
                    case 'None':
                        break;
                    case 'Multiplicative':
                        statMultipliers.push(variableIncreaseValue);
                        break;
                    case 'MultiplicativeWithBaseAdded':
                        statMultipliers.push(variableIncreaseValue + 100);
                        break;
                    case 'Additive':
                    case 'StaticAdditiveOtherVariableBased':
                        statIncreases.push(variableIncreaseValue);
                        break;
                    default:
                        console.error('calculationType \'' + skillVariable.categoryCalculationType + '\' is not supported');
                }
            }
        }

        const calculatedStatIncreases = (statIncreases.reduce((a, c) => a + c, 100) / 100);
        const calculatedStatMultipliers = statMultipliers.map(s => (s / 100)).reduce((a, c) => (a) * (c), 1);

        return stat.value * calculatedStatIncreases * calculatedStatMultipliers;
    }

    const calculateValueOfIncreasedVariable = (variable, skill) => {
        const baseValue = variable.baseValue;
        const calculationType = variable.variableCalculationType;
        const categoryIds = skill.categories.map(c => (c.id));

        let increase = categoryIds.map(c => {
            return getPercentagePointsIncreaseInCategoryFromClassModifiers(c);
        }, this).reduce((a, c) => a + c, 0);

        switch (calculationType) {
            case 'Additive':
                {
                    let increaseWithBase = 100 + increase;
                    return baseValue * increaseWithBase / 100;
                }
            case 'Reciprocal':
                {
                    let increaseWithBase = 100 + increase;
                    return baseValue / (increaseWithBase / 100);
                }
            case 'StaticAdditiveOtherVariableBased':
                {
                    let otherVariable = skill.variables.filter(v => v.name === variable.baseVariableName)[0];
                    let otherVariableIncrease = calculateValueOfIncreasedVariable(otherVariable, skill);

                    return otherVariableIncrease * variable.baseValue / 100;
                }
            case 'None':
                {
                    return variable.baseValue;
                }
            default:
                console.error('calculationType \'' + calculationType + '\' is not known');
        }
    }

    const getPercentagePointsIncreaseInCategoryFromClassModifiers = (categoryId) => {
        let allClassModifiers = [];
        characterStatus.classes.forEach(c => {
            allClassModifiers = allClassModifiers.concat(c.modifiers);
        });

        let applyingModifiers = allClassModifiers.filter(m => {
            return categoryId === m.category?.id;
        });

        return applyingModifiers.map((c) => c.percentagePointsOfCategoryIncrease).reduce((a, c) => a + c, 0);
    }

    const getCalculatedResources = () => {
        return characterStatus.generalInformation.resources.map(r => ({
            name: r.displayName,
            value: calculateResourceValue(r)
        }));
    }

    const calculateResourceValue = (resource) => {
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
                            <BasicInfo {...characterStatus.generalInformation.basicInfo} />
                        </div>

                        <div className='general-information-group'>
                            <ResourcesStatus resources={getCalculatedResources()} />
                        </div>

                        <div className='general-information-group'>
                            <Stats {...characterStatus.generalInformation.stats} calculateFinalStatValue={calculateFinalStatValue} />
                        </div>

                        <div className='general-information-group'>
                            <UnspentSkillpoints {...characterStatus.generalInformation.skillpoints} />
                        </div>
                    </div>

                    <SkillsPanel classes={characterStatus.classes} calculateValueOfIncreasedVariable={calculateValueOfIncreasedVariable} />
                </>
            }
        </div>
    );
}
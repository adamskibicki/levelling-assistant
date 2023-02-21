import axios from 'axios';
import React from 'react';
import './CharacterPanel.scss'
import SkillsPanel from '../SkillsPanel';
import BasicInfo from './BasicInfo';
import ResourcesStatus from './ResourcesStatus';
import Stats from './Stats';
import UnspentSkillpoints from './UnspentSkillpoints';

class CharacterPanel extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            generalInformation: {
                basicInfo: {
                    name: "None",
                    title: "None"
                },
                resourcesStatus: {
                    maxHealth: 0,
                    maxStamina: 0,
                    maxMana: 0
                },
                stats: {
                    unspentStatpoints: 0,
                    stats: [
                        {
                            name: "None",
                            value: 0
                        }
                    ]
                },
                skillpoints: {
                    coreSkillpoints: 0,
                    fourthTierSkillpoints: 0,
                    thirdTierGeneralSkillpoints: 0,
                    fourthTierGeneralSkillpoints: 0
                }
            },
            classes: [
                {
                    name: "None",
                    level: 0,
                    modifiers: [],
                    skills: [
                        {
                            name: "None",
                            level: 0,
                            tier: 0,
                            tierDescriptions: [],
                            type: "None",
                            categories: [],
                            enhanced: false
                        }
                    ]
                },
                {
                    name: "None",
                    level: 0,
                    modifiers: [],
                    skills: [
                        {
                            name: "None",
                            level: 0,
                            tier: 0,
                            tierDescriptions: [],
                            type: "None",
                            categories: [],
                            enhanced: false
                        }
                    ]
                },
                {
                    name: "None",
                    level: 0,
                    modifiers: [],
                    skills: [
                        {
                            name: "None",
                            level: 0,
                            tier: 0,
                            tierDescriptions: [],
                            type: "None",
                            categories: [],
                            enhanced: false
                        }
                    ]
                },
            ],
            "generalSkills": null
        };

        this.getPercentagePointsIncreaseInCategory = this.getPercentagePointsIncreaseInCategory.bind(this);
        this.calculateValueOfIncreasedVariable = this.calculateValueOfIncreasedVariable.bind(this);
    }

    //TODO: move base url to environment settings
    componentDidMount() {
        axios.get('https://localhost:7119/api/Status/GetStatus', { params: { statusId: '6daa1ea5-9c21-45fc-ab05-447f30c8a0fc' } })
            .then(res => {
                this.setState(res.data);
            });
    }

    calculateValueOfIncreasedVariable(baseValue, categoryIds, calculationType) {
        let increase = categoryIds.map(c => {
            return this.getPercentagePointsIncreaseInCategory(c);
        }, this).reduce((a, c) => a + c, 0);

        let increaseWithBase = 100 + increase;

        switch (calculationType) {
            case 'Multiplicative':
                return baseValue * increaseWithBase / 100;
            case 'Reciprocal':
                return baseValue / (increaseWithBase / 100);
            case 'Static':
                return baseValue;
            default:
                console.error('calculationType \'' + calculationType + '\' is not known');
        }
    }

    getPercentagePointsIncreaseInCategory(categoryId) {
        let allClassModifiers = [];
        this.state.classes.forEach(c => {
            allClassModifiers = allClassModifiers.concat(c.modifiers);
        });

        let applyingModifiers = allClassModifiers.filter(m => {
            return categoryId === m.category?.id;
        });

        return applyingModifiers.map((c) => c.percentagePointsOfCategoryIncrease).reduce((a, c) => a + c, 0);
    }

    render() {
        return (
            <>
                <div className='navbar'>
                    Navigation bar
                </div>
                <div className='character-panel'>
                    <div className="general-information">
                        <div className='general-information-group'>
                            <BasicInfo {...this.state.generalInformation.basicInfo} />
                        </div>

                        <div className='general-information-group'>
                            <ResourcesStatus {...this.state.generalInformation.resourcesStatus} />
                        </div>

                        <div className='general-information-group'>
                            <Stats {...this.state.generalInformation.stats} />
                        </div>

                        <div className='general-information-group'>
                            <UnspentSkillpoints {...this.state.generalInformation.skillpoints} />
                        </div>
                    </div>

                    <SkillsPanel classes={this.state.classes} calculateValueOfIncreasedVariable={this.calculateValueOfIncreasedVariable}/>
                </div>
            </>
        );
    }
}

export default CharacterPanel;
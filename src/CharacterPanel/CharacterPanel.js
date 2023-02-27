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
            loaded: false,
            generalInformation: {
                basicInfo: {
                    name: "None",
                    title: "None"
                },
                resources: [
                    {
                        displayName: "Health",
                        calculationName: "Health",
                        baseStatName: "Vitality",
                        resourcePointsPerBaseStatPoint: 10
                    },
                ],
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

        this.calculateValueOfIncreasedVariable = this.calculateValueOfIncreasedVariable.bind(this);
        this.calculateResourceValue = this.calculateResourceValue.bind(this);
        this.calculateFinalStatValue = this.calculateFinalStatValue.bind(this);

        this.getPercentagePointsIncreaseInCategoryFromClassModifiers = this.getPercentagePointsIncreaseInCategoryFromClassModifiers.bind(this);
        this.getAllClassSkills = this.getAllClassSkills.bind(this);
        this.getFinalStats = this.getFinalStats.bind(this);
        this.getCalculatedResources = this.getCalculatedResources.bind(this);
        this.getAllClassModifiers = this.getAllClassModifiers.bind(this);
        this.getSkillsAffectingProvidedStat = this.getSkillsAffectingProvidedStat.bind(this);
    }

    //TODO: move base url to environment settings
    componentDidMount() {
        axios.get('https://localhost:7119/api/Status/GetStatus', { params: { statusId: '6daa1ea5-9c21-45fc-ab05-447f30c8a0fc' } })
            .then(res => {
                this.setState({ ...res.data, loaded: true });
            });
    }

    getSkillsAffectingProvidedStat(stat, skills) {
        return skills.filter(s => {
            return s.variables?.filter(v => v.affectedStatNames?.includes(stat.name)).length > 0;
        })
    }

    getAllClassSkills() {
        return this.state.classes.map(c => c.skills).flat();
    }

    calculateFinalStatValue(stat) {
        let statAffectingSkills = this.getSkillsAffectingProvidedStat(stat, this.getAllClassSkills());

        let statIncreases = [];
        let statMultipliers = [];

        for (let i = 0; i < statAffectingSkills.length; i++) {
            const skill = statAffectingSkills[i];
            const affectingVariables = skill.variables.filter(v => v.affectedStatNames?.includes(stat.name));

            for (let j = 0; j < affectingVariables.length; j++) {
                const skillVariable = affectingVariables[j];

                let variableIncreaseValue = this.calculateValueOfIncreasedVariable(skillVariable, skill);

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

    calculateValueOfIncreasedVariable(variable, skill) {
        const baseValue = variable.baseValue;
        const calculationType = variable.variableCalculationType;
        const categoryIds = skill.categories.map(c => (c.id));

        let increase = categoryIds.map(c => {
            return this.getPercentagePointsIncreaseInCategoryFromClassModifiers(c);
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
                    let otherVariableIncrease = this.calculateValueOfIncreasedVariable(otherVariable, skill);

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

    getPercentagePointsIncreaseInCategoryFromClassModifiers(categoryId) {
        let allClassModifiers = [];
        this.state.classes.forEach(c => {
            allClassModifiers = allClassModifiers.concat(c.modifiers);
        });

        let applyingModifiers = allClassModifiers.filter(m => {
            return categoryId === m.category?.id;
        });

        return applyingModifiers.map((c) => c.percentagePointsOfCategoryIncrease).reduce((a, c) => a + c, 0);
    }

    getFinalStats() {
        return this.state.generalInformation.stats.stats.map(s => ({ name: s.name, value: this.calculateFinalStatValue(s) }));
    }

    getCalculatedResources() {
        return this.state.generalInformation.resources.map(r => ({
            name: r.displayName,
            value: this.calculateResourceValue(r)
        }));
    }

    calculateResourceValue(resource) {
        let affectingClassModifiers = this.getAllClassModifiers().filter(m => m.affectedResourceName === resource.calculationName);
        let resourceStat = this.state.generalInformation.stats.stats.filter(s => s.name === resource.baseStatName)[0];
        let finalStatValue = this.calculateFinalStatValue(resourceStat);

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

    getAllClassModifiers() {
        return this.state.classes.map(c => c.modifiers).flat();
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

                        {
                            this.state.loaded &&
                            <div className='general-information-group'>
                                <ResourcesStatus resources={this.getCalculatedResources()} />
                            </div>
                        }
                        <div className='general-information-group'>
                            <Stats {...this.state.generalInformation.stats} calculateFinalStatValue={this.calculateFinalStatValue} />
                        </div>

                        <div className='general-information-group'>
                            <UnspentSkillpoints {...this.state.generalInformation.skillpoints} />
                        </div>
                    </div>

                    <SkillsPanel classes={this.state.classes} calculateValueOfIncreasedVariable={this.calculateValueOfIncreasedVariable} />
                </div>
            </>
        );
    }
}

export default CharacterPanel;
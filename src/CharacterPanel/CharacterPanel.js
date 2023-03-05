import React from 'react';
import './CharacterPanel.scss'
import SkillsPanel from '../SkillsPanel';
import BasicInfo from './BasicInfo';
import ResourcesStatus from './ResourcesStatus';
import Stats from './Stats';
import UnspentSkillpoints from './UnspentSkillpoints';
import { connect } from 'react-redux';
import { fetchCharacterData } from './characterPanelSlice';

class CharacterPanel extends React.Component {
    constructor(props) {
        super(props);

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

    componentDidMount() {
        if (this.props.loaded === false)
            this.props.loadData();
    }

    getSkillsAffectingProvidedStat(stat, skills) {
        return skills.filter(s => {
            return s.variables?.filter(v => v.affectedStatNames?.includes(stat.name)).length > 0;
        })
    }

    getAllClassSkills() {
        return this.props.classes.map(c => c.skills).flat();
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
        this.props.classes.forEach(c => {
            allClassModifiers = allClassModifiers.concat(c.modifiers);
        });

        let applyingModifiers = allClassModifiers.filter(m => {
            return categoryId === m.category?.id;
        });

        return applyingModifiers.map((c) => c.percentagePointsOfCategoryIncrease).reduce((a, c) => a + c, 0);
    }

    getFinalStats() {
        return this.props.generalInformation.stats.stats.map(s => ({ name: s.name, value: this.calculateFinalStatValue(s) }));
    }

    getCalculatedResources() {
        return this.props.generalInformation.resources.map(r => ({
            name: r.displayName,
            value: this.calculateResourceValue(r)
        }));
    }

    calculateResourceValue(resource) {
        let affectingClassModifiers = this.getAllClassModifiers().filter(m => m.affectedResourceName === resource.calculationName);
        let resourceStat = this.props.generalInformation.stats.stats.filter(s => s.name === resource.baseStatName)[0];
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
        return this.props.classes.map(c => c.modifiers).flat();
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
                            <BasicInfo {...this.props.generalInformation.basicInfo} />
                        </div>

                        {
                            this.props.loaded &&
                            <div className='general-information-group'>
                                <ResourcesStatus resources={this.getCalculatedResources()} />
                            </div>
                        }
                        <div className='general-information-group'>
                            <Stats {...this.props.generalInformation.stats} calculateFinalStatValue={this.calculateFinalStatValue} />
                        </div>

                        <div className='general-information-group'>
                            <UnspentSkillpoints {...this.props.generalInformation.skillpoints} />
                        </div>
                    </div>

                    <SkillsPanel classes={this.props.classes} calculateValueOfIncreasedVariable={this.calculateValueOfIncreasedVariable} />
                </div>
            </>
        );
    }
}


const mapStateToProps = state => {
    return state.characterPanel;
}

const mapDispatchToProps = dispatch => {
    return {
        loadData: () => dispatch(fetchCharacterData())
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CharacterPanel);
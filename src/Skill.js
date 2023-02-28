import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import './Skill.scss';
import SkillEdit from './SkillEdit';

class Skill extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            expanded: props.expanded
        };
    }

    switchExpandVisibility() {
        this.setState((prevState) => (
            {
                expanded: !prevState.expanded
            }
        ));
    }

    replaceVariableMarkupsInTierDescriptions(tierDescription) {
        let baseRegex = '<[\\S]*>';

        let tierDescriptionVariablesMatches = [...tierDescription.matchAll(baseRegex)];

        if(tierDescriptionVariablesMatches.length > 0){
            let variableNames = tierDescriptionVariablesMatches.map(m => (m[0].slice(1, m[0].length-1)));
            variableNames = [...new Set(variableNames)];
            
            let dictionary = {};
            for (let i = 0; i < variableNames.length; i++) {
                const vn = variableNames[i];
                
                const propVariable = this.props.variables.filter(v => v.name === vn)[0];

                const calculatedIncreasedVariable = this.props.calculateValueOfIncreasedVariable(propVariable, this.props);

                dictionary['<' + vn + '>'] = this.props.calculateValueOfIncreasedVariable(propVariable, this.props);

                switch (propVariable.variableCalculationType) {
                    case 'Additive':
                        dictionary['<' + vn + '>'] = propVariable.baseValue + propVariable.unit + ' [' + calculatedIncreasedVariable + propVariable.unit + ']';
                        break;
                    case 'None':
                    case 'Multiplicative':
                    case 'Reciprocal':
                    case 'StaticAdditiveOtherVariableBased':
                        dictionary['<' + vn + '>'] = propVariable.baseValue + propVariable.unit + ' [' + calculatedIncreasedVariable + propVariable.unit + ']';
                        break;
                    default:
                        console.error('calculationType \'' + propVariable.variableCalculationType + '\' is not known');
                }
            }

            for (const prop in dictionary) {
                tierDescription = tierDescription.replace(prop, dictionary[prop]);
            }
        }

        return tierDescription;
    }

    render() {
        return (
            <div className='skill'>
                <div className='skill-top-row'>
                    <button className='skill-expand' onClick={() => this.switchExpandVisibility()}>
                        {
                            this.state.expanded ? (<FontAwesomeIcon icon={faCaretUp} />) : (<FontAwesomeIcon icon={faCaretDown} />)
                        }
                    </button>
                    <div className='skill-name'>{this.props.type}: {this.props.name} {this.props.enhanced ? " [Enhanced]" : ""}</div>
                    <div>Level {this.props.level}</div>
                    <div className='skill-tier'>Tier {this.props.tier}</div>
                </div>
                {
                    this.state.expanded &&
                    <>
                        <div>
                            {
                                this.props.tierDescriptions
                                    .map((td, i) => (
                                        <p key={i} className='tier-description'>Tier {i + 1}: {this.replaceVariableMarkupsInTierDescriptions(td)}</p>
                                    ))
                            }
                        </div>
                        <div className='skill-categories-container'>
                            {
                                this.props.categories
                                    .map((c, i) => (
                                        <div className='skill-category' key={i}>{c.name}</div>
                                    ))
                            }
                        </div>
                    </>
                }
                {
                    this.props.allowEdit && <SkillEdit {...this.props}/> 
                }                
            </div>
        );
    }
}

export default Skill;
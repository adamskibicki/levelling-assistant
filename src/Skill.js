import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import './Skill.scss';

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

    render() {
        return (
            <div className='skill'>
                <div className='skill-top-row'>
                    <button className='button-std skill-expand' onClick={() => this.switchExpandVisibility()}>
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
                                        <p key={i} className='tier-description'>Tier {i + 1}: {td}</p>
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
            </div>
        );
    }
}

export default Skill;
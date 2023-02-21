import React from 'react';
import './Skill.scss';

class Skill extends React.Component {
    render() {
        return (
            <div className='skill'>
                <div className='skill-top-row'>
                    <button className='button-std expand'>^</button>
                    <div className='skill-name'>{this.props.name}</div>
                    <div className='skill-level'>Level {this.props.level}</div>
                    <div className='skill-tier'>Tier {this.props.tier}</div>
                </div>
                <div>
                    {
                        this.props.tierDescriptions
                        // .map(td => td.replace('\n', '<br>'))
                        .map((td, i) => (
                            <p key={i} className='tier-description'>Tier {i+1}: {td}</p>
                        ))
                    }
                </div>
            </div>
        );
    }
}

export default Skill;
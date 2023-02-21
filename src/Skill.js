import React from 'react';
import './Skill.scss';

class Skill extends React.Component {
    render() {
        return (
            <div className='skill'>
                <div className='skill-top-row'>
                    <button className='button-std expand'>^</button>
                    <div className='skill-name'>Skill name</div>
                    <div className='skill-level'>Level 0</div>
                    <div className='skill-tier'>Tier 0</div>
                </div>
                <div>
                    <p className='tier-description'>Tier 1: Lorem Ipsum is simply dummy text of the printing and typesetting industry. </p>
                    <p className='tier-description'>Tier 1: Lorem Ipsum is simply dummy text of the printing and typesetting industry. </p>
                    <p className='tier-description'>Tier 1: Lorem Ipsum is simply dummy text of the printing and typesetting industry. </p>
                </div>
            </div>
        );
    }
}

export default Skill;
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import './Class.scss';
import Skill from './Skill';

export default function Class(props) {
    const [expanded, setExpanded] = useState(true);
    const [classModifiersExpanded, setClassModifiersExpanded] = useState(true);

    const switchExpandVisibility = () => {
        const prevExpanded = expanded;

        setExpanded(!prevExpanded);
        setClassModifiersExpanded(!prevExpanded);
    }

    const switchClassModifiersExpandVisibility = () => {
        setClassModifiersExpanded((prevState => !prevState));
    }

    return (
        <>
            <div className='class-container'>
                <div className='class-name-container'>
                    <button className='expand' onClick={() => switchExpandVisibility()}>
                        {
                            expanded ? (<FontAwesomeIcon icon={faCaretUp} />) : (<FontAwesomeIcon icon={faCaretDown} />)
                        }
                    </button>
                    <h4 className='class-name'>
                        {props.name} - lvl {props.level}
                    </h4>
                </div>
                <div className='modifiers-container'>
                    <div className='title-container'>
                        <button className='expand' onClick={() => switchClassModifiersExpandVisibility()}>
                            {
                                classModifiersExpanded ? (<FontAwesomeIcon icon={faCaretUp} />) : (<FontAwesomeIcon icon={faCaretDown} />)
                            }
                        </button>
                        <div className='title'>Class modifiers:</div>
                    </div>
                    {
                        classModifiersExpanded &&
                        props.modifiers.map((m, i) => (
                            <div className='modifier' key={i}>
                                {
                                    m.category !== null &&
                                    <div className='category'>{m.category?.name}</div>
                                }
                                <p className='description'>{m.description}</p>
                            </div>
                        ))
                    }
                </div>
            </div>
            <div>
                {
                    props.skills.map((s, i) => (
                        <Skill allowEdit={props.allowEdit} key={i + expanded.toString()} {...s} expanded={expanded} calculateValueOfIncreasedVariable={props.calculateValueOfIncreasedVariable} />
                    ))
                }
            </div>
        </>
    );
}
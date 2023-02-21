import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import './Class.scss';
import Skill from './Skill';

class Class extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            expanded: true,
            classModifiersExpanded: true,
        };
    }

    switchExpandVisibility() {
        this.setState((prevState) => (
            {
                expanded: !prevState.expanded,
                classModifiersExpanded: !prevState.expanded
            }
        ));
    }

    switchClassModifiersExpandVisibility() {
        this.setState((prevState) => (
            {
                classModifiersExpanded: !prevState.classModifiersExpanded
            }
        ));
    }

    render() {
        return (
            <>
                <div className='class-container'>
                    <div className='class-name-container'>
                        <button className='button-std expand' onClick={() => this.switchExpandVisibility()}>
                            {
                                this.state.expanded ? (<FontAwesomeIcon icon={faCaretUp} />) : (<FontAwesomeIcon icon={faCaretDown} />)
                            }
                        </button>
                        <h4 className='class-name'>
                            {this.props.name} - lvl {this.props.level}
                        </h4>
                    </div>
                    <div className='modifiers-container'>
                        <div className='title-container'>
                            <button className='button-std expand' onClick={() => this.switchClassModifiersExpandVisibility()}>
                                {
                                    this.state.classModifiersExpanded ? (<FontAwesomeIcon icon={faCaretUp} />) : (<FontAwesomeIcon icon={faCaretDown} />)
                                }
                            </button>
                            <div className='title'>Class modifiers:</div>
                        </div>
                        { 
                            this.state.classModifiersExpanded &&
                            this.props.modifiers.map((m, i) => (
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
                        this.props.skills.map((s, i) => (
                            <Skill key={i + this.state.expanded.toString()} {...s} expanded={this.state.expanded} calculateValueOfIncreasedVariable={this.props.calculateValueOfIncreasedVariable}/>
                        ))
                    }
                </div>
            </>
        );
    }
}

export default Class;
import React from 'react';
import './Class.scss';
import Skill from './Skill';

class Class extends React.Component {
    render() {
        return (
            <>
                <div>
                    {this.props.name}
                </div>
                <div>
                    <Skill/>
                    <Skill/>
                    <Skill/>
                </div>
            </>
        );
    }
}

export default Class;
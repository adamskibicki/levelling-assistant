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
                    {
                        this.props.skills.map((s, i) => (
                            <Skill key={i} {...s}/>
                        ))
                    }
                </div>
            </>
        );
    }
}

export default Class;
import React from 'react';
import Class from './Class';
import './SkillsPanel.scss';

class SkillsPanel extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedTabIndex: 0
        }
    }

    openTab(tabIndex) {
        this.setState({
            selectedTabIndex: tabIndex
        });
    }

    renderTabLinks() {
        return (
            <>
                {
                    this.props.classes.map((c, i) => 
                        <button key={i} className='skills-panel__tablinks' onClick={() => this.openTab(i)}>
                            {c.name}
                        </button>
                    )
                }
            </>
        );
    }

    renderTabs(){
        return (
            <>
            {
                this.props.classes.map((c,i) => 
                    <div key={i} style={{display: i !== this.state.selectedTabIndex ? 'none' : ''}}>
                        <Class allowEdit={true} {...c} calculateValueOfIncreasedVariable={this.props.calculateValueOfIncreasedVariable}/>
                    </div>
                )
            }
            </>
        );
    }

    render() {
        return (
            <div className="skills-panel">
                <div className='tab'>
                    {this.renderTabLinks()}
                </div>
                {this.renderTabs()}
            </div>
        );
    }
}

export default SkillsPanel;
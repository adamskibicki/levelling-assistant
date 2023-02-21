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
                        <button key={i} className='tablinks' onClick={() => this.openTab(i)}>
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
                    <div key={i} className='tab' style={{display: i !== this.state.selectedTabIndex ? 'none' : ''}}>
                        <Class {...c} calculateValueOfIncreasedVariable={this.props.calculateValueOfIncreasedVariable}/>
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
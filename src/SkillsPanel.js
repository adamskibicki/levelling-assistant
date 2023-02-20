import React from 'react';
import './SkillsPanel.scss';

class SkillsPanel extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedTabIndex: 0
        }
    }

    openTab(tabIndex) {
        console.log(tabIndex);
    }

    renderTabLinks() {
        return (
            <>
                {
                    this.props.classes.map((c, i) => 
                        <button key={i} className='tablinks' onClick={() => this.openTab(i)}>
                            {c}
                        </button>
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



                <div>
                    This is skills panel
                </div>
            </div>
        );
    }
}

export default SkillsPanel;
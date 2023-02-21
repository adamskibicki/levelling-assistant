import axios from 'axios';
import React from 'react';
import './CharacterPanel.scss'
import GeneralProperty from '../GeneralProperty';
import SkillsPanel from '../SkillsPanel';
import StatpointProperty from '../StatpointProperty';
import BasicInfo from './BasicInfo';

class CharacterPanel extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            generalInformation: {
                basicInfo: {
                    name: "None",
                    title: "None"
                },
                resourcesStatus: {
                    maxHealth: 0,
                    maxStamina: 0,
                    maxMana: 0
                },
                stats: {
                    unspentStatpoints: 0,
                    stats: [
                        {
                            name: "None",
                            value: 0
                        }
                    ]
                },
                skillpoints: {
                    coreSkillpoints: 0,
                    fourthTierSkillpoints: 0,
                    thirdTierGeneralSkillpoints: 0,
                    fourthTierGeneralSkillpoints: 0
                }
            }
        };
    }

    componentDidMount() {
        axios.get('https://localhost:7119/api/Status/GetStatus', { params: { statusId: '6daa1ea5-9c21-45fc-ab05-447f30c8a0fc' } })
            .then(res => {
                this.setState(res.data);
            });
    }

    render() {
        let basicInfo = this.state.generalInformation.basicInfo;

        return (
            <>
                <div className='navbar'>
                    Navigation bar
                </div>
                <div className='character-panel'>
                    <div className="general-information">
                        <div className='general-information-group'>
                            <BasicInfo name={basicInfo.name} title={basicInfo.title}/>
                        </div>

                        <div className='general-information-group'>
                            <h4>Status</h4>
                            <div className=''>
                                <GeneralProperty name='Health' value={50} />
                                <GeneralProperty name='Stamina' value={50} />
                                <GeneralProperty name='Mana' value={50} />
                            </div>
                        </div>

                        <div className='general-information-group'>
                            <h4>Stats</h4>
                            <div className=''>
                                <GeneralProperty name='Unspent statpoints' value='0' />
                                <StatpointProperty name='Vitality' value={5} increaseEnabled={true} decreaseEnabled={false} />
                                <StatpointProperty name='Endurance' value={5} increaseEnabled={true} decreaseEnabled={false} />
                                <StatpointProperty name='Strength' value={5} increaseEnabled={true} decreaseEnabled={false} />
                                <StatpointProperty name='Dexterity' value={5} increaseEnabled={true} decreaseEnabled={false} />
                                <StatpointProperty name='Intelligence' value={5} increaseEnabled={true} decreaseEnabled={false} />
                                <StatpointProperty name='Wisdom' value={5} increaseEnabled={true} decreaseEnabled={false} />
                            </div>
                        </div>

                        <div className='general-information-group'>
                            <h4>Unspent skillpoints</h4>
                            <div className=''>
                                <GeneralProperty name='Core skillpoints' value={0} />
                                <GeneralProperty name='4th tier skillpoints' value={0} />
                                <GeneralProperty name='3rd tier general skillpoints' value={0} />
                                <GeneralProperty name='4th tier general skillpoints' value={0} />
                            </div>
                        </div>
                    </div>

                    <SkillsPanel classes={["Class 1", "Class 2", "General skills"]} />
                </div>
            </>
        );
    }
}

export default CharacterPanel;
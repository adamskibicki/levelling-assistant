import './CharacterPanel.scss'
import GeneralProperty from './GeneralProperty';
import SkillsPanel from './SkillsPanel';
import StatpointProperty from './StatpointProperty';

function CharacterPanel() {
    return (
        <>
            <div className='navbar'>
                Navigation bar
            </div>
            <div className="general-information">
                <h4>General information</h4>
                <GeneralProperty name='Name' value='Shearah Ignis' />
                <GeneralProperty name='Title' value='Random otherworlder' />

                <div className='border-container'>
                    <h4>Status</h4>
                    <div className='border-container'>
                        <GeneralProperty name='Health' value={50} />
                        <GeneralProperty name='Stamina' value={50} />
                        <GeneralProperty name='Mana' value={50} />
                    </div>
                </div>

                <div className='border-container'>
                    <h4>Stats</h4>
                    <div className='border-container'>
                        <GeneralProperty name='Unspent statpoints' value='0' />
                        <StatpointProperty name='Vitality' value={5} increaseEnabled={true} decreaseEnabled={false} />
                        <StatpointProperty name='Endurance' value={5} increaseEnabled={true} decreaseEnabled={false} />
                        <StatpointProperty name='Strength' value={5} increaseEnabled={true} decreaseEnabled={false} />
                        <StatpointProperty name='Dexterity' value={5} increaseEnabled={true} decreaseEnabled={false} />
                        <StatpointProperty name='Intelligence' value={5} increaseEnabled={true} decreaseEnabled={false} />
                        <StatpointProperty name='Wisdom' value={5} increaseEnabled={true} decreaseEnabled={false} />
                    </div>
                </div>

                <div className='border-container'>
                    <h4>Unspent skillpoints</h4>
                    <div className='border-container'>
                        <GeneralProperty name='Core skillpoints' value={0}/>
                        <GeneralProperty name='4th tier skillpoints' value={0}/>
                        <GeneralProperty name='3rd tier general skillpoints' value={0}/>
                        <GeneralProperty name='4th tier general skillpoints' value={0}/>
                    </div>
                </div>
            </div>

            <SkillsPanel classes={["Class 1", "Class 2"]}/>
        </>
    );
}

export default CharacterPanel;
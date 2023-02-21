import GeneralProperty from "../GeneralProperty";

function ResourcesStatus(props) {
    return (
        <>
            <h4>Status</h4>
            <div className=''>
                <GeneralProperty name='Health' value={props.maxHealth} />
                <GeneralProperty name='Stamina' value={props.maxStamina} />
                <GeneralProperty name='Mana' value={props.maxMana} />
            </div>
        </>
    );
}

export default ResourcesStatus;
import GeneralProperty from "../../GeneralProperty";

function UnspentSkillpoints(props) {
    return (
        <>
            <h4>Unspent skillpoints</h4>
            <div className=''>
                <GeneralProperty name='Core skillpoints' value={props.coreSkillpoints} />
                <GeneralProperty name='4th tier skillpoints' value={props.fourthTierSkillpoints} />
                <GeneralProperty name='3rd tier general skillpoints' value={props.thirdTierGeneralSkillpoints} />
                <GeneralProperty name='4th tier general skillpoints' value={props.fourthTierGeneralSkillpoints} />
            </div>
        </>
    );
}

export default UnspentSkillpoints;
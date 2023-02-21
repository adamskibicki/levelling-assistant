import GeneralProperty from "../GeneralProperty";

function BasicInfo(props) {
    return (
        <>
            <h4>General information</h4>
            <GeneralProperty name='Name' value={props.name} />
            <GeneralProperty name='Title' value={props.title} />
        </>
    );
}

export default BasicInfo;
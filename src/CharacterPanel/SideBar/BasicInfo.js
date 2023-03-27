import { useState } from "react";
import GeneralProperty from "../../GeneralProperty";
import BasicInfoEditModal from "./BasicInfoEditModal";
import TitleWithEditButton from "./TitleWithEditButton";

function BasicInfo(props) {
    const [showEditModal, setShowEditModal] = useState(false);

    return (
        <>
            <TitleWithEditButton onEditClick={() => setShowEditModal(true)} title={'General information'}/>
            <GeneralProperty name='Name' value={props.name} />
            <GeneralProperty name='Title' value={props.title} />
            <BasicInfoEditModal name={props.name} title={props.title} show={showEditModal} onHide={() => setShowEditModal(false)} onClose={() => setShowEditModal(false)} onAccept={() => setShowEditModal(false)}/>
        </>
    );
}

export default BasicInfo;
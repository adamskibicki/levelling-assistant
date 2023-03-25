import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import GeneralProperty from "../../GeneralProperty";
import './BasicInfo.scss';
import BasicInfoEditModal from "./BasicInfoEditModal";

function BasicInfo(props) {
    const [showEditModal, setShowEditModal] = useState(false);

    return (
        <>
            <div className="basic-info__title-bar">
                <h4 className="basic-info__title">General information</h4>
                <button onClick={() => setShowEditModal(true)} className="basic-info__edit-button"><FontAwesomeIcon icon={faEdit}/></button>
            </div>
            <GeneralProperty name='Name' value={props.name} />
            <GeneralProperty name='Title' value={props.title} />
            <BasicInfoEditModal name={props.name} title={props.title} show={showEditModal} onHide={() => setShowEditModal(false)} onClose={() => setShowEditModal(false)} onAccept={() => setShowEditModal(false)}/>
        </>
    );
}

export default BasicInfo;
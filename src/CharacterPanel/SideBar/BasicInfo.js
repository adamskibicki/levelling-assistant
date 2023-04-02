import { useState } from "react";
import GeneralProperty from "../../GeneralProperty";
import BasicInfoEditModal from "../../components/BasicInfoEditModal";
import TitleWithEditButton from "./TitleWithEditButton";
import { useDispatch } from "react-redux";
import { editBasicInfo } from "../characterPanelSlice";

function BasicInfo(props) {
    const [showEditModal, setShowEditModal] = useState(false);
    const dispatch = useDispatch();

    const onEditAccept = (editedInfo) => {
        setShowEditModal(false);
        dispatch(editBasicInfo(editedInfo));
    }

    return (
        <>
            <TitleWithEditButton onEditClick={() => setShowEditModal(true)} title={'General information'}/>
            <GeneralProperty name='Name' value={props.name} />
            <GeneralProperty name='Title' value={props.title} />
            <BasicInfoEditModal name={props.name} title={props.title} show={showEditModal} onHide={() => setShowEditModal(false)} onClose={() => setShowEditModal(false)} onAccept={(editedInfo) => onEditAccept(editedInfo)} modalTitle={"Edit basic information"}/>
        </>
    );
}

export default BasicInfo;
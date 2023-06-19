import { useState } from "react";
import GeneralProperty from "../../GeneralProperty";
import BasicInfoEditModal from "../../components/BasicInfoEditModal";
import TitleWithEditButton from "./TitleWithEditButton";
import { useDispatch } from "react-redux";
import { editBasicInfo } from "../slice/characterPanelSlice";
import { BasicInfo } from "../slice/state/BasicInfo";

export default function BasicInfoComponent(props: BasicInfo) {
    const [showEditModal, setShowEditModal] = useState(false);
    const dispatch = useDispatch();

    const onEditAccept = (editedInfo: BasicInfo) => {
        setShowEditModal(false);
        dispatch(editBasicInfo(editedInfo));
    };

    return (
        <>
            <TitleWithEditButton
                onEditClick={() => setShowEditModal(true)}
                title={"General information"}
            />
            <GeneralProperty name="Name" value={props.name} />
            <GeneralProperty name="Title" value={props.title} />
            <BasicInfoEditModal
                value={props}
                show={showEditModal}
                onHide={() => setShowEditModal(false)}
                onClose={() => setShowEditModal(false)}
                onAccept={(editedInfo: BasicInfo) => onEditAccept(editedInfo)}
                modalTitle={"Edit basic information"}
            />
        </>
    );
}
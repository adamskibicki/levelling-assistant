import { useState } from "react";
import TitleWithEditButton from "../TitleWithEditButton";
import { ResourceComponent } from "./ResourceComponent";
import CommonEditableListModal from "../../../Modal/CommonEditableListModal";
import { GetDefault, Resource } from "../../slice/state/Resource";
import { EditResourceModal } from "./EditResourceModal";
import { useAppDispatch } from "../../../store/store";
import { updateResources } from "../../slice/characterPanelSlice";

export default function ResourcesStatus(props: { resources: Resource[] }) {
    const [showEditResourcesModal, setShowEditResourcesModal] = useState(false);
    const dispatch = useAppDispatch();

    const renderResource = (resource: Resource, key?: string) => {
        return <ResourceComponent {...resource} key={key}/>;
    };

    const onResourcesEditAccept = (_: any, editedResources: Resource[]) => {
        setShowEditResourcesModal(false);
        dispatch(updateResources(editedResources));
    };

    return (
        <>
            <TitleWithEditButton title="Status" onEditClick={() => {setShowEditResourcesModal(true)}} />
            <div>
                {props.resources.map((r) => (
                    <ResourceComponent key={r.id} {...r} />
                ))}
            </div>
            <CommonEditableListModal
                defaultItemCreator={GetDefault}
                getItemKey={(resource) => resource.id}
                items={props.resources}
                onAccept={onResourcesEditAccept}
                onClose={() => setShowEditResourcesModal(false)}
                onHide={() => setShowEditResourcesModal(false)}
                referenceItemComparer={(resourceA, resourceB) =>
                    resourceA.id === resourceB.id
                }
                renderItem={renderResource}
                show={showEditResourcesModal}
                singleEditModal={EditResourceModal}
                title="Edit resources"
            />
        </>
    );
}

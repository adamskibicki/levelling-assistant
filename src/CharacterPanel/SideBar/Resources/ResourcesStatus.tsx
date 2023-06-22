import { useState } from "react";
import TitleWithEditButton from "../TitleWithEditButton";
import { ResourceComponent } from "./ResourceComponent";
import CommonEditableListModal from "../../../Modal/CommonEditableListModal";
import { GetDefault, Resource } from "../../slice/state/Resource";
import { EditResourceModal } from "./EditResourceModal";

export default function ResourcesStatus(props: { resources: Resource[] }) {
    const [showEditResourcesModal, setShowEditResourcesModal] = useState(false);

    const renderResource = (resource: Resource) => {
        return <ResourceComponent {...resource} />;
    };

    const onAccept = (_: any, editedResources: Resource[]) => {
        //TODO: handle editing resources here (dispatch)
        console.log(editedResources);
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
                onAccept={onAccept}
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

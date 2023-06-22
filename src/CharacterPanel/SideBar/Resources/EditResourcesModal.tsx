import { useState } from "react";
import CommonEditableListModal from "../../../Modal/CommonEditableListModal";
import { GetDefault, Resource } from "../../slice/state/Resource";
import { ResourceComponent } from "./ResourceComponent";
import { EditResourceModal } from "./EditResourceModal";

//TODO: decide between using it or deleting it and using implementation in ResourcesStatus component 
// that is the same as here (just copied)
export default function EditResourcesModal(props: { resources: Resource[] }) {
    const [show, setShow] = useState(false);

    const renderResource = (resource: Resource) => {
        return <ResourceComponent {...resource} />;
    };

    const onAccept = (_: any, editedResources: Resource[]) => {
        console.log(editedResources);
    };

    return (
        <CommonEditableListModal
            defaultItemCreator={GetDefault}
            getItemKey={(resource) => resource.id}
            items={props.resources}
            onAccept={onAccept}
            onClose={() => setShow(false)}
            onHide={() => setShow(false)}
            referenceItemComparer={(resourceA, resourceB) =>
                resourceA.id === resourceB.id
            }
            renderItem={renderResource}
            show={show}
            singleEditModal={EditResourceModal}
            title="Edit resources"
        />
    );
}

import { useState } from "react";
import TitleWithEditButton from "../TitleWithEditButton";
import CommonEditableListModal from "../../../Modal/CommonEditableListModal";
import { GetDefault, Resource } from "../../slice/state/Resource";
import { EditResourceModal } from "./EditResourceModal";
import { useAppDispatch } from "../../../store/store";
import { updateResources } from "../../slice/characterPanelSlice";
import GeneralProperty from "../../../GeneralProperty";
import { useCalculateResourceValue } from "./useCalculateResourceValue";
import "./ResourcesStatus.scss";

export default function ResourcesStatus(props: { resources: Resource[] }) {
    const [showEditResourcesModal, setShowEditResourcesModal] = useState(false);
    const dispatch = useAppDispatch();
    const { calculateResourceValue } = useCalculateResourceValue();

    const numberToStringWithThousandSeparator = (
        number: number,
        separator: string
    ) => {
        return number
            .toString()
            .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, separator);
    };

    const renderResource = (resource: Resource) => {
        return (
            <GeneralProperty
                className="resources-status__editable-resource"
                name={resource.displayName}
                value={numberToStringWithThousandSeparator(
                    Math.round(calculateResourceValue(resource)),
                    "'"
                )}
            />
        );
    };

    const onResourcesEditAccept = (_: any, editedResources: Resource[]) => {
        setShowEditResourcesModal(false);
        dispatch(updateResources(editedResources));
    };

    return (
        <>
            <TitleWithEditButton
                title="Status"
                onEditClick={() => {
                    setShowEditResourcesModal(true);
                }}
            />
            <div>
                {props.resources.map((r) => (
                    <GeneralProperty
                        key={r.id}
                        name={r.displayName}
                        value={numberToStringWithThousandSeparator(
                            Math.round(calculateResourceValue(r)),
                            "'"
                        )}
                    />
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

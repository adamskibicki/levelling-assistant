import { useEffect, useState } from "react";
import Modal from "../../Modal/Modal";
import ModalContent from "../../Modal/ModalContent";
import ModalFooter from "../../Modal/ModalFooter";
import ModalHeader from "../../Modal/ModalHeader";
import InputText from "../../Inputs/InputText";
import {
    ClassModifier,
    GetDefault,
} from "../../CharacterPanel/slice/state/ClassModifier";
import InputDropdown from "../../Inputs/InputDropdown";
import { useSelector } from "react-redux";
import { CharacterPanelSliceState } from "../../CharacterPanel/slice/state/CharacterPanelSliceState";
import { Resource } from "../../CharacterPanel/slice/state/Resource";
import "./EditClassModifierModal.scss";

export default function EditClassModifierModal(props: {
    show: boolean;
    classModifier: ClassModifier;
    onHide(event: MouseEvent): void;
    onClose(event: React.MouseEvent): void;
    onAccept: (
        event: React.MouseEvent<HTMLButtonElement>,
        classModifier: ClassModifier
    ) => void;
}) {
    const [classModifier, setClassModifier] = useState<ClassModifier>(
        GetDefault()
    );
    const resources = useSelector(
        (state: { characterPanel: CharacterPanelSliceState }) =>
            state.characterPanel.generalInformation.resources
    );

    useEffect(() => {
        setClassModifier(props.classModifier);
    }, [props.classModifier, props.show]);

    const onClassModifierChanged = (
        propertiesToUpdate: Partial<ClassModifier>
    ) => {
        setClassModifier((prevState) => {
            return { ...prevState, ...propertiesToUpdate };
        });
    };

    const getResourceId = (resource: Resource) => resource.id;
    
    const getResourceDisplayName = (resource: Resource) => resource.displayName;

    const onAffectedResourcIdChange = (_: any, resource: Resource) => {
        onClassModifierChanged({
            affectedResourceId: resource.id,
        });
    }

    return (
        <Modal show={props.show} onHide={props.onHide}>
            <ModalHeader onClose={props.onClose}>
                Edit selected class modifier
            </ModalHeader>
            <ModalContent>
                {true && (
                    <>
                        <InputText
                            label={"Description"}
                            value={classModifier.description}
                            onChange={(event: React.FormEvent<HTMLInputElement>) =>
                                onClassModifierChanged({
                                    description: event.currentTarget.value,
                                })
                            }
                        />
                        <InputDropdown
                            values={resources}
                            allowNullValue={true}
                            label={"Affected resource"}
                            className="edit-class-modifier-modal__select"
                            selectedValue={resources.find(r => r.id === classModifier.affectedResourceId)}
                            getItemKey={getResourceId}
                            getItemLabel={getResourceDisplayName}
                            onChange={onAffectedResourcIdChange}
                        />
                    </>
                )}
            </ModalContent>
            <ModalFooter
                onClose={props.onClose}
                onAccept={(event) => props.onAccept(event, classModifier)}
            ></ModalFooter>
        </Modal>
    );
}

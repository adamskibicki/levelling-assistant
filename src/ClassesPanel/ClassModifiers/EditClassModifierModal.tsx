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
import { CategoryCalculationType } from "../../CharacterPanel/slice/state/CategoryCalculationType";

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

    const onAffectedResourcIdChange = (_: any, resource: Resource | null) => {
        onClassModifierChanged({
            affectedResourceId: resource ? resource.id : null,
        });
    }

    const onCategoryCalculationTypeChange = (_: any, categoryCalculationType: CategoryCalculationType) => {
        onClassModifierChanged({
            categoryCalculationType: categoryCalculationType,
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
                            className="edit-class-modifier-modal__item-dropdown"
                            selectedValue={resources.find(r => r.id === classModifier.affectedResourceId)}
                            getItemKey={getResourceId}
                            getItemLabel={getResourceDisplayName}
                            onChange={onAffectedResourcIdChange}
                        />
                        <InputDropdown
                            values={Object.values(CategoryCalculationType)}
                            label={"Category calculation type"}
                            className="edit-class-modifier-modal__item-dropdown"
                            selectedValue={classModifier.categoryCalculationType}
                            getItemKey={cct => cct}
                            getItemLabel={cct => cct}
                            onChange={onCategoryCalculationTypeChange}
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

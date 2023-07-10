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
import { InputDropdown } from "../../Inputs/InputDropdown";
import { Resource } from "../../CharacterPanel/slice/state/Resource";
import "./EditClassModifierModal.scss";
import { CategoryCalculationType } from "../../CharacterPanel/slice/state/CategoryCalculationType";
import InputNumber from "../../Inputs/InputNumber";
import SkillCategoriesEdit from "../SkillCategoriesEdit";
import { useAppSelector } from "../../store/store";

export default function EditClassModifierModal(props: {
    show: boolean;
    classModifier: ClassModifier;
    title?: string;
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
    const resources = useAppSelector(
        (state) => state.characterPanel.generalInformation.resources
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
    };

    const onCategoryCalculationTypeChange = (
        _: any,
        categoryCalculationType: CategoryCalculationType
    ) => {
        onClassModifierChanged({
            categoryCalculationType: categoryCalculationType,
        });
    };

    const onPercentagePointsOfCategoryIncreaseChange = (
        _: any,
        value: number
    ) => {
        onClassModifierChanged({ percentagePointsOfCategoryIncrease: value });
    };

    const onCategoryIdChange = (categoryIds: string[]) => {
        onClassModifierChanged({
            categoryId: categoryIds.length === 0 ? null : categoryIds[0],
        });
    };

    return (
        <Modal show={props.show} onHide={props.onHide}>
            <ModalHeader onClose={props.onClose}>
                {props.title || "Edit selected class modifier"}
            </ModalHeader>
            <ModalContent>
                {true && (
                    <>
                        <InputText
                            label={"Description"}
                            value={classModifier.description}
                            onChange={(
                                event: React.FormEvent<HTMLInputElement>
                            ) =>
                                onClassModifierChanged({
                                    description: event.currentTarget.value,
                                })
                            }
                        />
                        <InputDropdown
                            values={resources}
                            allowNullValue={true}
                            label={"Affected resource"}
                            labelHoverTooltipText="Defines which resource class modifier affects."
                            className="edit-class-modifier-modal__input--top-spacer"
                            selectedValue={
                                resources.find(
                                    (r) =>
                                        r.id ===
                                        classModifier.affectedResourceId
                                ) || null
                            }
                            getItemKey={getResourceId}
                            getItemLabel={getResourceDisplayName}
                            onChange={onAffectedResourcIdChange}
                        />
                        <InputDropdown
                            values={Object.values(CategoryCalculationType)}
                            label={"Category calculation type"}
                            labelHoverTooltipText="Defines how class modifier affects selected resource."
                            className="edit-class-modifier-modal__input--top-spacer"
                            selectedValue={
                                classModifier.categoryCalculationType
                            }
                            getItemKey={(cct) => cct}
                            getItemLabel={(cct) => cct}
                            onChange={onCategoryCalculationTypeChange}
                        />
                        <InputNumber
                            label={"Percentage points of category increase"}
                            className="edit-class-modifier-modal__input--top-spacer"
                            onChange={
                                onPercentagePointsOfCategoryIncreaseChange
                            }
                            value={
                                classModifier.percentagePointsOfCategoryIncrease
                            }
                        />
                        <SkillCategoriesEdit
                            selectedCategoryIds={
                                classModifier.categoryId === null
                                    ? []
                                    : [classModifier.categoryId]
                            }
                            limit={1}
                            onChange={onCategoryIdChange}
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

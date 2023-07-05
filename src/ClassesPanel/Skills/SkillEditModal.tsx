import { useEffect, useState } from "react";
import {
    GetDefault,
    Skill,
    SkillType,
} from "../../CharacterPanel/slice/state/Skill";
import {
    GetDefault as GetDefaultSkillVariable,
    SkillVariable,
} from "../../CharacterPanel/slice/state/SkillVariable";
import {
    CommonEditableListModalWithAdditionalSingleEditModalProps,
    SingleEditModalProps,
} from "../../Modal/CommonEditableListModal";
import CommonModal from "../../Modal/CommonModal";
import InputText from "../../Inputs/InputText";
import InputNumber from "../../Inputs/InputNumber";
import InputCheckbox from "../../Inputs/InputCheckbox";
import { InputDropdownNotAllowNullValue } from "../../Inputs/InputDropdown";
import SkillCategoriesEdit from "../SkillCategoriesEdit";
import TierDescriptionsEdit from "./TierDescriptionsEdit";
import { SkillVariableEditModal } from "./SkillVariableEditModal";
import TitleWithEditButton from "../../CharacterPanel/SideBar/TitleWithEditButton";
import SkillVariableComponent from "./SkillVariable";

export const SkillEditModal: React.FunctionComponent<
    SingleEditModalProps<Skill>
> = (props) => {
    const [skill, setSkill] = useState(GetDefault());
    const [showSkillVariablesEditModal, setShowSkillVariablesEditModal] =
        useState(false);

    useEffect(() => {
        setSkill(props.item);
    }, [props.item, props.show]);

    const onSkillChanged = (propertiesToUpdate: Partial<Skill>) => {
        setSkill((prevState) => {
            return { ...prevState, ...propertiesToUpdate };
        });
    };

    const renderSkillVariable = (skillVariable: SkillVariable) => {
        return (
            <SkillVariableComponent
                key={skillVariable.id}
                skillVariable={skillVariable}
                skill={skill}
            />
        );
    };

    return (
        <CommonModal
            onAccept={(event) => props.onAccept(event, skill)}
            onClose={props.onClose}
            onHide={props.onHide}
            show={props.show}
            title={props.title}
        >
            <InputText
                onChange={(_, value) => onSkillChanged({ name: value })}
                value={skill.name}
                label="Name"
            />
            <InputDropdownNotAllowNullValue
                values={Object.values(SkillType)}
                label="Type"
                selectedValue={skill.type}
                getItemKey={(st) => st}
                getItemLabel={(st) => st}
                onChange={(_, value) => onSkillChanged({ type: value })}
            />
            <InputCheckbox
                onChange={(_, value) => onSkillChanged({ enhanced: value })}
                value={skill.enhanced}
                label="Enhanced"
            />
            <InputNumber
                onChange={(_, value) => onSkillChanged({ tier: value })}
                value={skill.tier}
                label="Tier"
            />
            <InputNumber
                onChange={(_, value) => onSkillChanged({ level: value })}
                value={skill.level}
                label="Level"
            />
            <TierDescriptionsEdit
                tierDescriptions={skill.tierDescriptions
                    .map((td) => td)
                    .sort((td0, td1) => td0.tier - td1.tier)}
                onChange={(editedTierDescriptions) =>
                    onSkillChanged({ tierDescriptions: editedTierDescriptions })
                }
            />
            <SkillCategoriesEdit
                selectedCategoryIds={skill.categoryIds}
                onChange={(categoryIds) =>
                    onSkillChanged({ categoryIds: categoryIds })
                }
            />
            <TitleWithEditButton
                title="Skill variables"
                onEditClick={() => {
                    setShowSkillVariablesEditModal(true);
                }}
            />
            {skill.variables.map((sv) => renderSkillVariable(sv))}
            <CommonEditableListModalWithAdditionalSingleEditModalProps
                items={skill.variables}
                defaultItemCreator={GetDefaultSkillVariable}
                getItemKey={(variable) => variable.id}
                onAccept={(_, variables) => {
                    setShowSkillVariablesEditModal(false);
                    onSkillChanged({ variables: variables });
                }}
                onClose={() => setShowSkillVariablesEditModal(false)}
                onHide={() => setShowSkillVariablesEditModal(false)}
                referenceItemComparer={(variableA, variableB) =>
                    variableA.id === variableB.id
                }
                renderItem={renderSkillVariable}
                show={showSkillVariablesEditModal}
                singleEditModal={SkillVariableEditModal}
                singleEditModalAdditionalProps={{
                    skillVariables: skill.variables,
                }}
                title="Edit skill variables"
            />
        </CommonModal>
    );
};

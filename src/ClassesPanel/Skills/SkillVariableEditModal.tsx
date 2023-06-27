import { useEffect, useState } from "react";
import {
    GetDefault,
    SkillVariable,
} from "../../CharacterPanel/slice/state/SkillVariable";
import { SingleEditModalProps } from "../../Modal/CommonEditableListModal";
import CommonModal from "../../Modal/CommonModal";
import InputText from "../../Inputs/InputText";
import {
    InputDropdownAllowNullValue,
    InputDropdownNotAllowNullValue,
} from "../../Inputs/InputDropdown";
import { CategoryCalculationType } from "../../CharacterPanel/slice/state/CategoryCalculationType";
import { VariableCalculationType } from "../../CharacterPanel/slice/state/VariableCalculationType";
import InputNumber from "../../Inputs/InputNumber";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { InputMultiselect } from "../../Inputs/InputMultiselect";

export const SkillVariableEditModal: React.FunctionComponent<
    SingleEditModalProps<SkillVariable>
> = (props) => {
    const [skillVariable, setSkillVariable] = useState(GetDefault());
    const stats = useSelector(
        (state: RootState) =>
            state.characterPanel.generalInformation.stats.stats
    );
    const skillVariables = useSelector((state: RootState) =>
        state.characterPanel.classes
            .flatMap((c) => c.skills)
            .filter(
                (s) =>
                    s.variables.find((sv) => sv.id === props.item.id) !==
                    undefined
            )
            .flatMap((s) => s.variables)
    );

    useEffect(() => {
        setSkillVariable(props.item);
    }, [props.item, props.show]);

    const onSkillVariableChanged = (
        propertiesToUpdate: Partial<SkillVariable>
    ) => {
        setSkillVariable((prevState) => {
            return { ...prevState, ...propertiesToUpdate };
        });
    };

    return (
        <CommonModal
            onAccept={(event) => props.onAccept(event, skillVariable)}
            onClose={props.onClose}
            onHide={props.onHide}
            show={props.show}
            title={props.title}
        >
            <InputText
                onChange={(_, value) => onSkillVariableChanged({ name: value })}
                value={skillVariable.name}
                label="Name"
            />
            <InputNumber
                onChange={(_, value) =>
                    onSkillVariableChanged({ baseValue: value })
                }
                value={skillVariable.baseValue}
                label="Base value"
            />
            <InputText
                onChange={(_, value) => onSkillVariableChanged({ unit: value })}
                value={skillVariable.unit}
                label="Unit"
            />
            <InputDropdownNotAllowNullValue
                values={Object.values(CategoryCalculationType)}
                label="Category calculation type (how skill categories affect it)"
                selectedValue={skillVariable.categoryCalculationType}
                getItemKey={(cct) => cct}
                getItemLabel={(cct) => cct}
                onChange={(_, value) =>
                    onSkillVariableChanged({ categoryCalculationType: value })
                }
            />
            <InputDropdownNotAllowNullValue
                values={Object.values(VariableCalculationType)}
                label="Variable calculation type (how variable affects it's base variable)"
                selectedValue={skillVariable.variableCalculationType}
                getItemKey={(vct) => vct}
                getItemLabel={(vct) => vct}
                onChange={(_, value) =>
                    onSkillVariableChanged({ variableCalculationType: value })
                }
            />
            <InputDropdownAllowNullValue
                values={skillVariables.filter((sv) => sv.id !== props.item.id)}
                label="Base variable"
                getItemKey={(sv) => sv.id}
                getItemLabel={(sv) => sv.name}
                onChange={(_, value) => {
                    onSkillVariableChanged({
                        baseSkillVariableId: value === null ? value : value.id,
                    });
                }}
                selectedValue={
                    skillVariables.find(
                        (sv) => sv.id === skillVariable.baseSkillVariableId
                    ) ?? null
                }
            />
            <InputMultiselect
                values={stats}
                getItemKey={(s) => s.id}
                getItemLabel={(s) => s.name}
                label="Affected stats"
                selectedValues={stats.filter((s) => {
                    return skillVariable.affectedStatIds.indexOf(s.id) !== -1;
                })}
                onChange={(_, value) => {
                    onSkillVariableChanged({
                        affectedStatIds: stats
                            .map((s) => s.id)
                            .filter((s) => {
                                return value.find((v) => v.id === s);
                            }),
                    });
                }}
            />
        </CommonModal>
    );
};

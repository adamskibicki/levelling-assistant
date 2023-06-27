import { useEffect, useState } from "react";
import { GetDefault, SkillVariable } from "../../CharacterPanel/slice/state/SkillVariable";
import { SingleEditModalProps } from "../../Modal/CommonEditableListModal";
import CommonModal from "../../Modal/CommonModal";
import InputText from "../../Inputs/InputText";

export const SkillVariableEditModal: React.FunctionComponent<
    SingleEditModalProps<SkillVariable>
> = (props) => {
    const [skillVariable, setSkillVariable] = useState(GetDefault());

    useEffect(() => {
        setSkillVariable(props.item);
    }, [props.item, props.show]);

    const onSkillVariableChanged = (propertiesToUpdate: Partial<SkillVariable>) => {
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
            
        </CommonModal>
    );
};

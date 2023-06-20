import { useEffect, useState } from "react";
import Modal from "../../Modal/Modal";
import ModalContent from "../../Modal/ModalContent";
import ModalFooter from "../../Modal/ModalFooter";
import ModalHeader from "../../Modal/ModalHeader";
import InputText from "../../Inputs/InputText";
import { ClassModifier, GetDefault } from "../../CharacterPanel/slice/state/ClassModifier";

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
    const [classModifier, setClassModifier] = useState<ClassModifier>(GetDefault());

    useEffect(() => {
        setClassModifier(props.classModifier);
    }, [props.classModifier]);

    const onAccept = (event: React.MouseEvent<HTMLButtonElement>) => {
        props.onAccept(event, classModifier);
    };

    const onClassModifierChanged = (propertiesToUpdate: Partial<ClassModifier>) => {
        setClassModifier((prevState) => {
            return {...prevState, ...propertiesToUpdate};
        })
    }

    return (
        <Modal show={props.show} onHide={props.onHide}>
            <ModalHeader onClose={props.onClose}>
                Edit selected class modifier
            </ModalHeader>
            <ModalContent>
                <InputText
                    label={"Description"}
                    value={classModifier.description}
                    onChange={(event: React.FormEvent<HTMLInputElement>) =>
                        onClassModifierChanged({description: event.currentTarget.value})
                    }
                />
            </ModalContent>
            <ModalFooter
                onClose={props.onClose}
                onAccept={onAccept}
            ></ModalFooter>
        </Modal>
    );
}

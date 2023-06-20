import { useState } from "react";
import { ClassModifier } from "../../CharacterPanel/slice/state/ClassModifier";
import "./ClassModifiers.scss";
import { EditButton, ExpandButton } from "../../components/common/Buttons";
import EditClassModifiersModal from "./EditClassModifiersModal";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { updateClassModifiers } from "../../CharacterPanel/slice/characterPanelSlice";
import ClassModifierComponent from "./ClassModifierComponent";

export default function ClassModifiers(props: {
    classModifiers: ClassModifier[];
    expand: boolean;
    classId: string;
}) {
    const [expanded, setExpanded] = useState(props.expand);
    const [showClassModifiersEditModal, setShowClassModifiersEditModal] =
        useState(false);
    const dispatch = useDispatch<AppDispatch>();

    const onAcceptEditClassModifiers = (
        _: React.MouseEvent<HTMLButtonElement>,
        classModifiers: ClassModifier[]
    ) => {
        setShowClassModifiersEditModal(false);

        dispatch(
            updateClassModifiers({
                classId: props.classId,
                classModifiers: classModifiers,
            })
        );
    };

    return (
        <>
            <div className="class-modifiers">
                <div className="class-modifiers__title-bar">
                    <ExpandButton
                        expanded={expanded}
                        onClick={() => setExpanded(!expanded)}
                    />
                    <div className="class-modifiers__title">
                        Class modifiers:
                    </div>
                    <EditButton
                        onClick={() => setShowClassModifiersEditModal(true)}
                    />
                </div>
                {expanded &&
                    props.classModifiers.map((cm) => (
                        <ClassModifierComponent {...cm} key={cm.id} />
                    ))}
            </div>

            <EditClassModifiersModal
                show={showClassModifiersEditModal}
                classModifiers={props.classModifiers}
                onAccept={onAcceptEditClassModifiers}
                onClose={() => setShowClassModifiersEditModal(false)}
                onHide={() => setShowClassModifiersEditModal(false)}
            />
        </>
    );
}

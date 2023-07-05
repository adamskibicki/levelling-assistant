import { useState } from "react";
import { GetDefault, Skill } from "../../CharacterPanel/slice/state/Skill";
import SkillComponent from "./Skill";
import { useAppDispatch } from "../../store/store";
import { updateSkills } from "../../CharacterPanel/slice/characterPanelSlice";
import TitleWithEditButton from "../../CharacterPanel/SideBar/TitleWithEditButton";
import CommonEditableListModal from "../../Modal/CommonEditableListModal";
import { SkillEditModal } from "./SkillEditModal";

export default function Skills(props: {
    skills: Skill[];
    expanded: boolean;
    allowEdit: boolean;
    classId: string;
}) {
    const [showSkillsEditModal, setShowSkillsEditModal] = useState(false);
    const dispatch = useAppDispatch();

    const renderSkill = (skill: Skill, expanded: boolean) => {
        return (
            <SkillComponent
                allowEdit={props.allowEdit}
                key={skill.id + props.expanded.toString()}
                {...skill}
                expanded={expanded}
            />
        );
    };

    const onSkillsEditModalAccept = (_: any, editedSkills: Skill[]) => {
        setShowSkillsEditModal(false);
        dispatch(
            updateSkills({ editedSkills: editedSkills, classId: props.classId })
        );
    };

    return (
        <>
            <TitleWithEditButton
                title="Skills"
                onEditClick={() => {
                    setShowSkillsEditModal(true);
                }}
            />
            <div>{props.skills.map((s) => renderSkill(s, props.expanded))}</div>
            <CommonEditableListModal
                defaultItemCreator={GetDefault}
                getItemKey={(skill) => skill.id}
                items={props.skills}
                onAccept={onSkillsEditModalAccept}
                onClose={() => setShowSkillsEditModal(false)}
                onHide={() => setShowSkillsEditModal(false)}
                referenceItemComparer={(resourceA, resourceB) =>
                    resourceA.id === resourceB.id
                }
                renderItem={(s) => renderSkill(s, false)}
                show={showSkillsEditModal}
                singleEditModal={SkillEditModal}
                title="Edit skills"
            />
        </>
    );
}

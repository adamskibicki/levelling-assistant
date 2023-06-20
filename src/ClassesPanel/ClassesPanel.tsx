import React, { useState } from "react";
import "./ClassesPanel.scss";
import { CharacterClass } from "../CharacterPanel/slice/state/CharacterClass";
import Class from "./Class";
import AddClassModal from "./AddClassModal";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/store";
import { addClass } from "../CharacterPanel/slice/characterPanelSlice";
import { SkillVariable } from "../CharacterPanel/slice/state/SkillVariable";
import { Skill } from "../CharacterPanel/slice/state/Skill";

export default function ClassesPanel(props: {
    classes: CharacterClass[];
    calculateValueOfIncreasedVariable(variable: SkillVariable, skill: Skill): number;
}) {
    const [selectedTabIndex, setSelectedTabIndex] = useState(0);
    const [showAddClassModal, setShowAddClassModal] = useState(false);
    const dispatch = useDispatch<AppDispatch>();

    const renderTabLinks = () => {
        const tabsCount = props.classes.length + 1;
        const tabWidth = 100 / tabsCount - 0.01 + "%";

        return (
            <>
                {props.classes.map((c, i) => (
                    <button
                        key={i}
                        className="classes-panel__tablinks"
                        style={{ width: tabWidth }}
                        onClick={() => setSelectedTabIndex(i)}
                    >
                        {c.name}
                    </button>
                ))}
                <button
                    key={-1}
                    className="classes-panel__tablinks"
                    style={{ width: tabWidth }}
                    onClick={() => setShowAddClassModal(true)}
                >
                    Add new class
                </button>
            </>
        );
    };

    const onAcceptAddClass = (
        _: React.MouseEvent<HTMLButtonElement>,
        characterClass: CharacterClass
    ) => {
        dispatch(addClass(characterClass));

        setShowAddClassModal(false);
    };

    const renderTabs = () => {
        return (
            <>
                {props.classes.map((c, i) => (
                    <div
                        key={i}
                        style={{
                            display: i !== selectedTabIndex ? "none" : "",
                        }}
                    >
                        <Class
                            allowEdit={true}
                            value={c}
                            calculateValueOfIncreasedVariable={
                                props.calculateValueOfIncreasedVariable
                            }
                        />
                    </div>
                ))}
            </>
        );
    };

    return (
        <>
            <div className="classes-panel">
                <div className="classes-panel__tab">{renderTabLinks()}</div>
                {renderTabs()}
            </div>
            <AddClassModal
                onAccept={onAcceptAddClass}
                onClose={() => setShowAddClassModal(false)}
                onHide={() => setShowAddClassModal(false)}
                show={showAddClassModal}
            />
        </>
    );
}

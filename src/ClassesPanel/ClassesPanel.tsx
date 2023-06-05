import React, { useState } from "react";
import "./ClassesPanel.scss";
import { CharacterClass } from "../CharacterPanel/slice/state/CharacterClass";
import Class from "../Class";
import AddClassModal from "./AddClassModal";

export default function ClassesPanel(props: {
    classes: CharacterClass[];
    calculateValueOfIncreasedVariable: Function;
}) {
    const [selectedTabIndex, setSelectedTabIndex] = useState(0);
    const [showAddClassModal, setShowAddClassModal] = useState(false);

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
        event: React.MouseEvent<HTMLButtonElement>,
        className: string
    ) => {
        console.log(className);

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
                            {...c}
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

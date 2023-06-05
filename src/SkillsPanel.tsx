import React, { useState } from "react";
import "./SkillsPanel.scss";
import { CharacterClass } from "./CharacterPanel/slice/state/CharacterClass";
import Class from "./Class";

export default function SkillsPanel(props: {
    classes: CharacterClass[];
    calculateValueOfIncreasedVariable: Function;
}) {
    const [selectedTabIndex, setSelectedTabIndex] = useState(0);

    const renderTabLinks = () => {
        return (
            <>
                {props.classes.map((c, i) => (
                    <button
                        key={i}
                        className="skills-panel__tablinks"
                        onClick={() => setSelectedTabIndex(i)}
                    >
                        {c.name}
                    </button>
                ))}
            </>
        );
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
        <div className="skills-panel">
            <div className="tab">{renderTabLinks()}</div>
            {renderTabs()}
        </div>
    );
}

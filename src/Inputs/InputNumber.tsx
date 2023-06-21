import React from "react";
import "./InputCommon.scss";

export default function InputNumber(props: {
    label: string;
    value: number;
    className?: string;
    onChange(event: React.FormEvent<HTMLInputElement>, value: number): void;
}) {
    return (
        <div className={"input " + props.className}>
            <label className="input__label">{props.label}</label>
            <input
                className="input__input"
                type="number"
                value={props.value}
                onChange={(event) =>
                    props.onChange(event, Number(event.currentTarget.value))
                }
            />
        </div>
    );
}

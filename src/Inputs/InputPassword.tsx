import React from "react";
import "./InputCommon.scss";

export default function InputPassword(props: {
    label: string;
    value: string;
    className?: string;
    autocomplete?: string;
    onChange(event: React.FormEvent<HTMLInputElement>, value: string): void;
}) {
    return (
        <div className={"input " + props.className}>
            <label className="input__label">{props.label}</label>
            <input
                className="input__input"
                type="password"
                autoComplete={props.autocomplete}
                value={props.value}
                onChange={(event) =>
                    props.onChange(event, event.currentTarget.value)
                }
            />
        </div>
    );
}

import React, { useEffect, useRef } from "react";
import "./InputText.scss";

interface InputTextProps {
    multiline?: boolean;
    className?: string;
    label?: string;
    value: string;
    autocomplete?: string;
    onChange(
        event:
            | React.FormEvent<HTMLInputElement>
            | React.FormEvent<HTMLTextAreaElement>,
        value: string
    ): void;
}

export default function InputText(props: InputTextProps) {
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const onChange = (
        event:
            | React.FormEvent<HTMLInputElement>
            | React.FormEvent<HTMLTextAreaElement>,
        value: string
    ) => {
        resizeTextArea();

        props.onChange(event, value);
    };

    useEffect(() => {
        resizeTextArea();
    }, [props.value]);

    const resizeTextArea = () => {
        if (!props.multiline) return;
        if (textareaRef.current === null) return;
        textareaRef.current.style.height = "0px";
        const scrollHeight = textareaRef.current.scrollHeight;
        textareaRef.current.style.height = scrollHeight + "px";
    };

    return (
        <div className={"input " + props.className}>
            {props.label && (
                <label className="input__label">{props.label}</label>
            )}
            {props.multiline ? (
                <textarea
                    ref={textareaRef}
                    rows={1}
                    className="input__input input-text__input--multiline"
                    autoComplete={props.autocomplete}
                    value={props.value}
                    onChange={(event) =>
                        onChange(event, event.target.value)
                    }
                ></textarea>
            ) : (
                <input
                    className="input__input"
                    autoComplete={props.autocomplete}
                    type="text"
                    value={props.value}
                    onChange={(event) =>
                        props.onChange(event, event.target.value)
                    }
                />
            )}
        </div>
    );
}

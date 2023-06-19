import React from "react";
import "./InputText.scss";

interface InputTextProps {
    multiline?: boolean;
    className?: string;
    label?: string;
    value: string;
    onChange(
        event:
            | React.FormEvent<HTMLInputElement>
            | React.FormEvent<HTMLTextAreaElement>
    ): void;
}

class InputText extends React.Component<InputTextProps> {
    textareaRef: React.RefObject<HTMLTextAreaElement>;

    constructor(props: InputTextProps) {
        super(props);

        this.textareaRef = React.createRef();
    }

    onChange = (
        event:
            | React.FormEvent<HTMLInputElement>
            | React.FormEvent<HTMLTextAreaElement>
    ) => {
        this.resizeTextArea();

        this.props.onChange(event);
    };

    componentDidMount() {
        this.resizeTextArea();
    }

    componentDidUpdate() {
        this.resizeTextArea();
    }

    resizeTextArea = () => {
        if (!this.props.multiline) return;
        if (this.textareaRef.current === null) return;
        this.textareaRef.current.style.height = "0px";
        const scrollHeight = this.textareaRef.current.scrollHeight;
        this.textareaRef.current.style.height = scrollHeight + "px";
    };

    render() {
        return (
            <div className={"input " + this.props.className}>
                {this.props.label && (
                    <label className="input__label">{this.props.label}</label>
                )}
                {this.props.multiline ? (
                    <textarea
                        ref={this.textareaRef}
                        rows={1}
                        className="input__input input-text__input--multiline"
                        value={this.props.value}
                        onChange={this.onChange}
                    ></textarea>
                ) : (
                    <input
                        className="input__input"
                        type="text"
                        value={this.props.value}
                        onChange={this.props.onChange}
                    />
                )}
            </div>
        );
    }
}

export default InputText;

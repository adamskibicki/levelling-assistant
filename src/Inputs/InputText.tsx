import React from "react";
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

class InputText extends React.Component<InputTextProps> {
    textareaRef: React.RefObject<HTMLTextAreaElement>;

    constructor(props: InputTextProps) {
        super(props);

        this.textareaRef = React.createRef();
    }

    onChange = (
        event:
            | React.FormEvent<HTMLInputElement>
            | React.FormEvent<HTMLTextAreaElement>,
        value: string
    ) => {
        this.resizeTextArea();

        this.props.onChange(event, value);
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
                        autoComplete={this.props.autocomplete}
                        value={this.props.value}
                        onChange={(event) =>
                            this.onChange(event, event.target.value)
                        }
                    ></textarea>
                ) : (
                    <input
                        className="input__input"
                        autoComplete={this.props.autocomplete}
                        type="text"
                        value={this.props.value}
                        onChange={(event) =>
                            this.props.onChange(event, event.target.value)
                        }
                    />
                )}
            </div>
        );
    }
}

export default InputText;

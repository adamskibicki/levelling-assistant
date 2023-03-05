import React from "react";
import './InputText.scss';

class InputText extends React.Component {
    constructor(props) {
        super(props);

        this.textareaRef = React.createRef();
    }

    onChange = (event) => {
        this.resizeTextArea();

        this.props.onChange(event);
    }

    componentDidMount() {
        this.resizeTextArea();
    }

    componentDidUpdate() {
        this.resizeTextArea();
    }

    resizeTextArea = () => {
        if (this.props.multiline === false)
            return;
        this.textareaRef.current.style.height = '0px';
        const scrollHeight = this.textareaRef.current.scrollHeight;
        this.textareaRef.current.style.height = scrollHeight + 'px';
    }

    render() {
        return (
            <div className='input-text'>
                <label className='input-text__label'>{this.props.label}</label>
                {
                    this.props.multiline ?
                        <textarea ref={this.textareaRef} rows={1} className='input-text__input input-text__input--multiline' value={this.props.value} onChange={this.onChange}></textarea>
                        :
                        <input className='input-text__input' type='text' value={this.props.value} onChange={this.props.onChange} />
                }
            </div>
        );
    }
}

export default InputText;
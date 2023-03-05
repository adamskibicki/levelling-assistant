import React, { Children } from "react";
import './Modal.scss';

class Modal extends React.Component {
    constructor(props) {
        super(props);

        this.wrapperRef = React.createRef();
    }

    componentDidMount() {
        document.addEventListener("mousedown", this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener("mousedown", this.handleClickOutside);
    }

    handleClickOutside = (event) => {
        if(this.props.show && this.wrapperRef && !this.wrapperRef.current.contains(event.target)){
            this.props.onHide();
        }
    }

    render() {
        const visibilityClass = this.props.show ? 'modal--show' : 'modal--hide';

        return (
            <div className={'modal ' + visibilityClass}>
                <div className='modal__content' ref={this.wrapperRef}>
                    {this.props.show && Children.toArray(this.props.children)}
                </div>
            </div>
        );
    }
}

export default Modal;
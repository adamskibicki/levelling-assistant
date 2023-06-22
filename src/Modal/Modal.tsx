import React, { Children } from "react";
import "./Modal.scss";

interface ModalProps {
    show: boolean;
    onHide(event: MouseEvent): void;
    children: React.ReactNode | React.ReactNode[];
}

//TODO: fix export here or global
export class Modal extends React.Component<ModalProps> {
    wrapperRef: React.RefObject<HTMLDivElement>;

    constructor(props: ModalProps) {
        super(props);

        this.wrapperRef = React.createRef();
    }

    componentDidMount() {
        document.addEventListener("mousedown", this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener("mousedown", this.handleClickOutside);
    }

    handleClickOutside = (event: MouseEvent) => {
        if (
            this.props.show &&
            this.wrapperRef.current &&
            !this.wrapperRef.current.contains(event.target as Node)
        ) {
            this.props.onHide(event);
        }
    };

    render() {
        const visibilityClass = this.props.show ? "modal--show" : "modal--hide";

        return (
            <div className={"modal " + visibilityClass}>
                <div className="modal__content" ref={this.wrapperRef}>
                    {this.props.show && Children.toArray(this.props.children)}
                </div>
            </div>
        );
    }
}

export default Modal;

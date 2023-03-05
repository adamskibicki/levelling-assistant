import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Children } from "react";
import './ModalHeader.scss';

class ModalHeader extends React.Component {
    render() {
        return (
            <div className='modal-header'>
                <div className="modal-header__content">
                    {Children.toArray(this.props.children)}
                </div>
                <div>
                    <button onClick={this.props.onClose}>
                        <FontAwesomeIcon icon={faClose} />
                    </button>
                </div>
            </div>
        );
    }
}

export default ModalHeader;
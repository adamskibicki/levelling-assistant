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
                        X
                    </button>
                </div>
            </div>
        );
    }
}

export default ModalHeader;
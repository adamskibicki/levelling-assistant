import React, { Children } from "react";
import './ModalFooter.scss';

class ModalFooter extends React.Component {
    onClose = (event) => {
        this.props.onClose && this.props.onClose(event);
    }

    render() {
        return (
            <div className='modal-footer'>
                {Children.toArray(this.props.children)}
                <div>
                    <button className='modal-footer__accept' onClick={this.props.onAccept}>Accept</button>
                    <button className='modal-footer__close' onClick={this.onClose}>Close</button>
                </div>
            </div>
        );
    }
}

export default ModalFooter;
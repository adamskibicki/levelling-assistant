import React, { Children } from "react";
import './ModalFooter.scss';

class ModalFooter extends React.Component {
    render() {
        return (
            <div className='modal-footer'>
                {Children.toArray(this.props.children)}
                <div>
                    <button className='modal-footer__accept' onClick={this.props.onAccept}>Accept</button>
                    <button className='modal-footer__close' onClick={this.props.onClose}>Close</button>
                </div>
            </div>
        );
    }
}

export default ModalFooter;
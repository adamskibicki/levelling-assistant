import React, { Children } from "react";
import './ModalContent.scss';

class ModalContent extends React.Component {
    render() {
        return (
            <div className='modal-content'>
                {Children.toArray(this.props.children)}
            </div>
        );
    }
}

export default ModalContent;
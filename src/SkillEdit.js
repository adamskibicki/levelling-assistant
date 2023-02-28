import React from "react";
import Modal from "./Modal/Modal";
import ModalContent from "./Modal/ModalContent";
import ModalFooter from "./Modal/ModalFooter";
import ModalHeader from "./Modal/ModalHeader";

class SkillEdit extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            show: false
        };

        this.showModal = this.showModal.bind(this);
        this.hideModal = this.hideModal.bind(this);
    }

    showModal() {
        this.setState({show: true});
    }

    hideModal() {
        this.setState({show: false});
    }

    acceptForm = () => {
        console.log('acceptForm');
    };

    render() {
        return (
            <>
                <button onClick={this.showModal}>
                    Edit
                </button>
                <Modal show={this.state.show} onHide={this.hideModal}>
                    <ModalHeader onClose={this.hideModal}>
                        {this.props.name}
                    </ModalHeader>
                    <ModalContent>
                        This is skill edit modal
                    </ModalContent>
                    <ModalFooter onAccept={this.acceptForm} onClose={this.hideModal}/>
                </Modal>
            </>
        );
    }
}

export default SkillEdit;
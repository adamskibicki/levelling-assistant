import Modal from "../Modal/Modal";
import ModalContent from "../Modal/ModalContent";
import ModalFooter from "../Modal/ModalFooter";
import ModalHeader from "../Modal/ModalHeader";
import "./ConfirmationModal.scss";

export default function ConfirmationModal(props) {
    const onAccept = (event) => {
        event.preventDefault();
        props.onAccept();
    }

    const onClose = (event) => {
        props.onClose(event);
    }

    const onHide = (event) => {
        props.onHide(event);
    }

    return (
        <Modal show={props.show} onHide={onHide}>
            <ModalHeader onClose={onClose}>
                {props.modalTitle}
            </ModalHeader>
            <ModalContent>
                <div className="confirmation-modal__message">{props.message}</div>
            </ModalContent>
            <ModalFooter onClose={onClose} onAccept={onAccept}>

            </ModalFooter>
        </Modal>
    )
} 
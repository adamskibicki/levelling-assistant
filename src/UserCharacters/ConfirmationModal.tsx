import Modal from "../Modal/Modal";
import ModalContent from "../Modal/ModalContent";
import ModalFooter from "../Modal/ModalFooter";
import ModalHeader from "../Modal/ModalHeader";
import "./ConfirmationModal.scss";

export default function ConfirmationModal(props: {
    show: boolean,
    modalTitle: string,
    message: string,
    onAccept: (event: React.MouseEvent<HTMLButtonElement>) => void,
    onHide: (event: React.MouseEvent<HTMLButtonElement>) => void,
    onClose: (event: React.MouseEvent<HTMLButtonElement>) => void
}) {
    const onAccept = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        props.onAccept(event);
    }

    const onClose = (event: React.MouseEvent<HTMLButtonElement>) => {
        props.onClose(event);
    }

    const onHide = (event: React.MouseEvent<HTMLButtonElement>) => {
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
    );
} 
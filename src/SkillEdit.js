import { faCaretDown, faCaretUp, faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import InputText from "./Inputs/InputText";
import Modal from "./Modal/Modal";
import ModalContent from "./Modal/ModalContent";
import ModalFooter from "./Modal/ModalFooter";
import ModalHeader from "./Modal/ModalHeader";
import './SkillEdit.scss';

class SkillEdit extends React.Component {
    constructor(props) {
        super(props);

        //TODO: to allow changing tier descriptions here I have to pass on change callback from CharacterPanel (too many layers of components) to avoid that it would be a good idea to move state from CharacterPanel elsewhere (state is outside components) - i will avoid passing down too many things. Check all caveeats of this solution
        this.state = {
            show: false,
            tierDescriptions: [
                '1',
                '2\ndasfasdfasdf'
            ]
        };

        this.showModal = this.showModal.bind(this);
        this.hideModal = this.hideModal.bind(this);
    }

    showModal() {
        this.setState({ show: true });
    }

    hideModal() {
        this.setState({ show: false });
    }

    acceptForm = () => {
        console.log('acceptForm');
    };

    onChange = (text, index) => {
        this.setState((prevState) => {
            return {
                tierDescriptions: prevState.tierDescriptions.map((td, i) => {
                    if (i === index)
                        return text;
                    return td;
                })
            };
        });
    }

    addTier = (event) => {
        event.preventDefault();
        this.setState((prevState) => {
            return {
                tierDescriptions: [
                    ...prevState.tierDescriptions,
                    ''
                ]
            };
        });
    }

    deleteTier = (event, index) => {
        event.preventDefault();
        this.setState((prevState) => {
            return {
                tierDescriptions: prevState.tierDescriptions.filter((_, i) => i !== index)
            };
        });
    }

    moveTierUp = (event, index) => {
        event.preventDefault();
        this.setState((prevState) => {
            const itemToMove = prevState.tierDescriptions[index];
            const itemReplaced = prevState.tierDescriptions[index - 1];

            return {
                tierDescriptions: prevState.tierDescriptions.map((td, i) => {
                    if (i === index)
                        return itemReplaced;
                    if (i === index - 1)
                        return itemToMove;
                    return td;
                })
            };
        });
    }

    moveTierDown = (event, index) => {
        event.preventDefault();
        this.setState((prevState) => {
            const itemToMove = prevState.tierDescriptions[index];
            const itemReplaced = prevState.tierDescriptions[index + 1];

            return {
                tierDescriptions: prevState.tierDescriptions.map((td, i) => {
                    if (i === index)
                        return itemReplaced;
                    if (i === index + 1)
                        return itemToMove;
                    return td;
                })
            };
        });
    }

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
                        <form>
                            {this.state.tierDescriptions.map((td, i) => (
                                <div key={i} className='skill-edit__tier-description'>
                                    <div className='skill-edit__input'>
                                        <InputText value={td} label={'Tier: ' + i} onChange={(event) => this.onChange(event.target.value, i)} multiline={true} />
                                    </div>
                                    <button onClick={(event) => this.moveTierUp(event, i)} className={i === 0 ? 'disabled' : ''}><FontAwesomeIcon icon={faCaretUp} /></button>
                                    <button onClick={(event) => this.moveTierDown(event, i)} className={i === this.state.tierDescriptions.length - 1 ? 'disabled' : ''}><FontAwesomeIcon icon={faCaretDown} /></button>
                                    <button onClick={(event) => this.deleteTier(event, i)}><FontAwesomeIcon icon={faClose} /></button>
                                </div>
                            ))}
                            <button onClick={this.addTier}>Add tier</button>
                        </form>
                    </ModalContent>
                    <ModalFooter onAccept={this.acceptForm} onClose={this.hideModal} />
                </Modal>
            </>
        );
    }
}

export default SkillEdit;
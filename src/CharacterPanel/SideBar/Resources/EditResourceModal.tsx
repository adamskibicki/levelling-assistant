import {
    SingleEditModalProps,
} from "../../../Modal/CommonEditableListModal";
import { Resource } from "../../slice/state/Resource";
import CommonModal from "../../../Modal/CommonModal";

//TODO: finish this component
export const EditResourceModal: React.FunctionComponent<
    SingleEditModalProps<Resource>
> = (props) => {
    return (
        <CommonModal
            onAccept={(event) => props.onAccept(event, props.item)}
            onClose={props.onClose}
            onHide={props.onHide}
            show={props.show}
            title={props.title}
        >
            <div>Test</div>
        </CommonModal>
    );
};

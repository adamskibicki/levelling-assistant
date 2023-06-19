import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./TitleWithEditButton.scss";

export default function TitleWithEditButton(props: {
    title: string;
    onEditClick(event: React.MouseEvent<HTMLButtonElement>): void;
}) {
    return (
        <div className="title-with-edit-button__title-bar">
            <h4 className="title-with-edit-button__title">{props.title}</h4>
            <button
                onClick={(event) =>
                    props.onEditClick && props.onEditClick(event)
                }
                className="title-with-edit-button__edit-button"
            >
                <FontAwesomeIcon icon={faEdit} />
            </button>
        </div>
    );
}

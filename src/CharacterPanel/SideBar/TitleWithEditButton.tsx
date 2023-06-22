import "./TitleWithEditButton.scss";
import { EditButton } from "../../components/common/Buttons";

export default function TitleWithEditButton(props: {
    title: string;
    onEditClick(event: React.MouseEvent<HTMLButtonElement>): void;
}) {
    return (
        <div className="title-with-edit-button__title-bar">
            <h4 className="title-with-edit-button__title">{props.title}</h4>
            <EditButton
                className="title-with-edit-button__edit-button"
                onClick={(event) =>
                    props.onEditClick && props.onEditClick(event)
                }
            />
        </div>
    );
}

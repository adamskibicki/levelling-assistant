import { Children } from "react";
import "./Buttons.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    IconDefinition,
    faAdd,
    faCaretDown,
    faCaretUp,
    faEdit,
} from "@fortawesome/free-solid-svg-icons";

export function Button(props: {
    onClick(event: React.MouseEvent<HTMLButtonElement>): void;
    children: React.ReactNode | React.ReactNode[];
    className?: string;
}) {
    return (
        <button onClick={props.onClick} className={props.className}>
            {Children.toArray(props.children)}
        </button>
    );
}

export function IconButton(props: {
    onClick(event: React.MouseEvent<HTMLButtonElement>): void;
    icon: IconDefinition;
    className?: string;
    disabled?: boolean;
}) {
    return (
        <Button
            className={`icon-button ${
                props.disabled ? "icon-button--disabled" : ""
            } ${props.className}`}
            onClick={props.onClick}
        >
            <FontAwesomeIcon icon={props.icon} />
        </Button>
    );
}

export function ExpandButton(props: {
    onClick(
        event: React.MouseEvent<HTMLButtonElement>,
        expanded: boolean
    ): void;
    expanded: boolean;
}) {
    return (
        <IconButton
            onClick={(event) => props.onClick(event, props.expanded)}
            icon={props.expanded ? faCaretUp : faCaretDown}
        />
    );
}

export function EditButton(props: {
    onClick(event: React.MouseEvent<HTMLButtonElement>): void;
    className?: string;
}) {
    return (
        <IconButton
            className={`edit-button ${props.className}`}
            onClick={props.onClick}
            icon={faEdit}
        />
    );
}

export function AddButton(props: {
    onClick(event: React.MouseEvent<HTMLButtonElement>): void;
    className?: string;
}) {
    return (
        <IconButton
            className={`add-button ${props.className}`}
            onClick={props.onClick}
            icon={faAdd}
        />
    );
}

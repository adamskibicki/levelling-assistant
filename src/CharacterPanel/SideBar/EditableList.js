import { Children } from "react";

export default function EditableList(props) {

    return (
        <div>
            {Children.toArray(props.children)}
        </div>
    )
}
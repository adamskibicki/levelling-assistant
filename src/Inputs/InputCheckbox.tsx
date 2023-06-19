import "./InputCheckbox.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faSquare } from "@fortawesome/free-solid-svg-icons";

export default function InputCheckbox(props: {
    value: boolean;
    label: string;
    onChange(event: React.MouseEvent<HTMLButtonElement>, value: boolean): void;
}){
    const onChange = (event: React.MouseEvent<HTMLButtonElement>) => {
        let value = !props.value;
        props.onChange && props.onChange(event, value);
    }

    return (
        <div className="input-checkbox">
            <div className="input-checkbox__label">
                {props.label}
            </div>
            <button className="input-checkbox__input" onClick={onChange}>
                <FontAwesomeIcon className={props.value ? "" : "input-checkbox__icon--visibility-none"} icon={props.value ? faChevronDown : faSquare}/>
            </button>
        </div>
    );
}
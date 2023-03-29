import { faCaretDown, faCaretUp, faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Children } from "react";
import './ReorderableList.scss';

export default function ReorderableList(props) {
    const children = Children.toArray(props.children);

    return (
        <div className="reorderable-list">
            {
                children.map((c, i) => (
                    <div className="reorderable-list__item" key={i}>
                        <div className="reorderable-list__child">{c}</div>
                        <div>
                            <button onClick={(event) => props.moveItemUp(event, i)} className={i === 0 ? 'disabled' : ''}><FontAwesomeIcon icon={faCaretUp} /></button>
                            <button onClick={(event) => props.moveItemDown(event, i)} className={i === children.length - 1 ? 'disabled' : ''}><FontAwesomeIcon icon={faCaretDown} /></button>
                            <button onClick={(event) => props.deleteItem(event, i)}><FontAwesomeIcon icon={faClose} /></button>
                        </div>
                    </div>
                ))
            }
        </div>
    );
}
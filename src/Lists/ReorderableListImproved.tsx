import { faCaretDown, faCaretUp, faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './ReorderableList.scss';

export default function ReorderableListImproved<T>(props: {
    renderItem(item: T): React.ReactNode | React.ReactNode[];
    getItemKey(item: T): string;
    items: T[];
    onChange(modifiedItems: T[]): void;
}) {
    const moveItemUp = (key: string) => {
        moveItem(key, -1);
    }

    const moveItemDown = (key: string) => {
        moveItem(key, 1);
    }

    const moveItem = (key: string, step: number) => {
        const indexOfItemToMove = props.items.findIndex(i => props.getItemKey(i) === key);
        const indexOfItemToBeReplaced = indexOfItemToMove + step;

        const itemToMove = props.items[indexOfItemToMove];
        const itemToBeReplaced = props.items[indexOfItemToBeReplaced];

        const updatedItems = props.items.map((item, i) => {
            if (i === indexOfItemToMove)
                return itemToBeReplaced;
            if (i === indexOfItemToBeReplaced)
                return itemToMove;
            return item;
        });

        props.onChange(updatedItems);
    }

    const deleteItem = (key: string) => {
        props.onChange(props.items.filter(i => props.getItemKey(i) !== key));
    }

    return (
        <div className="reorderable-list">
            {props.items.map((item, index) => (
                <div className="reorderable-list__item" key={props.getItemKey(item)}>
                    <div className="reorderable-list__child">{props.renderItem(item)}</div>
                    <div>
                        <button
                            onClick={() => moveItemUp(props.getItemKey(item))}
                            className={index === 0 ? "disabled" : ""}
                        >
                            <FontAwesomeIcon icon={faCaretUp} />
                        </button>
                        <button
                            onClick={() => moveItemDown(props.getItemKey(item))}
                            className={
                                index === props.items.length - 1 ? "disabled" : ""
                            }
                        >
                            <FontAwesomeIcon icon={faCaretDown} />
                        </button>
                        <button onClick={() => deleteItem(props.getItemKey(item))}>
                            <FontAwesomeIcon icon={faClose} />
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}
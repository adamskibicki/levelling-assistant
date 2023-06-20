import { faCaretDown, faCaretUp, faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Children, useEffect, useState } from "react";
import './ReorderableList.scss';

export default function ReorderableListImproved<T>(props: {
    children: React.ReactNode | React.ReactNode[];
    getItemKey(item: T): string;
    items: T[];
    onChange(modifiedItems: T[]): void;
}) {
    const [items, setItems] = useState<T[]>([]);

    useEffect(() => {
        setItems(props.items);
    }, [props.items]);

    //TODO: duplicated code in move item up/down methods
    const moveItemUp = (_: never, key: string) => {
        setItems((prevState) => {
            const indexOfItemToMove = prevState.findIndex(i => props.getItemKey(i) === key);
            const indexOfItemToBeReplaced = indexOfItemToMove - 1;

            const itemToMove = prevState[indexOfItemToMove];
            const itemToBeReplaced = prevState[indexOfItemToBeReplaced];

            return prevState.map((item, i) => {
                if (i === indexOfItemToMove)
                    return itemToBeReplaced;
                if (i === indexOfItemToBeReplaced)
                    return itemToMove;
                return item;
            });
        });
    }

    const moveItemDown = (_: never, key: string) => {
        setItems((prevState) => {
            const indexOfItemToMove = prevState.findIndex(i => props.getItemKey(i) === key);
            const indexOfItemToBeReplaced = indexOfItemToMove + 1;

            const itemToMove = prevState[indexOfItemToMove];
            const itemToBeReplaced = prevState[indexOfItemToBeReplaced];

            return prevState.map((item, i) => {
                if (i === indexOfItemToMove)
                    return itemToBeReplaced;
                if (i === indexOfItemToBeReplaced)
                    return itemToMove;
                return item;
            });
        });
    }

    const deleteItem = (_: never, key: string) => {
        setItems((prevState) => {
            return prevState.filter(i => props.getItemKey(i) !== key);
        });
    }

    const children = Children.toArray(props.children);

    return (
        <div className="reorderable-list">
            {children.map((c, i) => (
                <div className="reorderable-list__item" key={i}>
                    <div className="reorderable-list__child">{c}</div>
                    <div>
                        <button
                            onClick={(event) => moveItemUp(event, i)}
                            className={i === 0 ? "disabled" : ""}
                        >
                            <FontAwesomeIcon icon={faCaretUp} />
                        </button>
                        <button
                            onClick={(event) => moveItemDown(event, i)}
                            className={
                                i === children.length - 1 ? "disabled" : ""
                            }
                        >
                            <FontAwesomeIcon icon={faCaretDown} />
                        </button>
                        <button onClick={(event) => deleteItem(event, i)}>
                            <FontAwesomeIcon icon={faClose} />
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}
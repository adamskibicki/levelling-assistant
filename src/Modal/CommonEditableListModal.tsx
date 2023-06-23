import React, { useEffect, useState } from "react";
import { AddButton, EditButton } from "../components/common/Buttons";
import ReorderableList from "../Lists/ReorderableList";
import CommonModal from "./CommonModal";
import "./CommonEditableListModal.scss";

export interface SingleEditModalProps<TItem> {
    show: boolean;
    item: TItem;
    title: string;
    onHide(event: MouseEvent): void;
    onClose(event: React.MouseEvent): void;
    onAccept: (
        event: React.MouseEvent<HTMLButtonElement>,
        modifiedItem: TItem
    ) => void;
}

export default function CommonEditableListModal<TItem>(props: {
    show: boolean;
    title: string;
    onHide(event: MouseEvent): void;
    onClose(event: React.MouseEvent): void;
    onAccept: (
        event: React.MouseEvent<HTMLButtonElement>,
        editedItems: TItem[]
    ) => void;
    items: TItem[];
    defaultItemCreator(): TItem;
    referenceItemComparer(itemA: TItem, itemB: TItem): boolean;
    getItemKey(item: TItem): string;
    renderItem(item: TItem): React.ReactNode | React.ReactNode[];
    singleEditModal: React.FunctionComponent<SingleEditModalProps<TItem>>;
}) {
    const [items, setItems] = useState<TItem[]>([]);
    const [showSingleEditModal, setShowSingleEditModal] = useState(false);
    const [itemToEdit, setItemToEdit] = useState(props.defaultItemCreator());
    const [isAddingItem, setIsAddingItem] = useState(false);

    useEffect(() => {
        setItems(props.items);
    }, [props.items, props.show]);

    const onItemChanged = (item: TItem) => {
        if (isAddingItem) {
            setItems([...items, item]);
        } else {
            setItems(
                items.map((i) => {
                    if (props.referenceItemComparer(item, i)) return item;

                    return i;
                })
            );
        }
        setShowSingleEditModal(false);
    };

    const renderEditButton = (item: TItem) => {
        return (
            <EditButton
                onClick={() => {
                    setIsAddingItem(false);
                    setItemToEdit(item);
                    setShowSingleEditModal(true);
                }}
            />
        );
    };

    const renderSingleEditModal = (itemToEdit: TItem) => {
        return (
            <props.singleEditModal
                item={itemToEdit}
                onAccept={(_, modifiedItem) => onItemChanged(modifiedItem)}
                onClose={() => setShowSingleEditModal(false)}
                onHide={() => setShowSingleEditModal(false)}
                show={showSingleEditModal}
                title="Edit item"
            />
        );
    };

    return (
        <>
            <CommonModal
                onAccept={(event) => props.onAccept(event, items)}
                onClose={props.onClose}
                onHide={props.onHide}
                show={props.show}
                title={props.title}
                additionalElements={renderSingleEditModal(itemToEdit)}
            >
                <ReorderableList
                    renderItem={props.renderItem}
                    renderAdditionalButtons={renderEditButton}
                    items={items}
                    getItemKey={props.getItemKey}
                    onChange={(modifiedItems) => setItems(modifiedItems)}
                />
                <AddButton
                    onClick={() => {
                        setIsAddingItem(true);
                        setItemToEdit(props.defaultItemCreator());
                        setShowSingleEditModal(true);
                    }}
                    className="common-editable-list-modal__add-button"
                />
            </CommonModal>
        </>
    );
}

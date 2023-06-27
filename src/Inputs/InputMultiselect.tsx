import { useEffect, useRef } from "react";
import "./InputMultiselect.scss";

export function InputMultiselect<T>(props: {
    values: T[];
    selectedValues: T[];
    label: string;
    className?: string;
    getItemKey(item: T): string;
    getItemLabel(item: T): string;
    onChange(
        event: React.ChangeEvent<HTMLSelectElement>,
        selectedItems: T[]
    ): void;
}) {
    const selectRef = useRef<HTMLSelectElement>(null);

    useEffect(() => {
        resizeSelect();
    }, [props.values]);

    const onChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectValues = Array.from(
            event.target.selectedOptions,
            (option) => option.value
        );

        const selectedItems = props.values.filter((item) => {
            return (
                selectValues.find((so) => so === props.getItemKey(item)) !==
                undefined
            );
        });

        props.onChange(event, selectedItems);
    };

    const getItemKey = (item: T) => {
        return props.getItemKey(item);
    };

    const getItemLabel = (item: T) => {
        return props.getItemLabel(item);
    };

    const resizeSelect = () => {
        if (selectRef.current === null || selectRef.current === undefined)
            return;
        selectRef.current.style.height = "0px";
        const scrollHeight = selectRef.current.scrollHeight;
        selectRef.current.style.height = scrollHeight + "px";
    };

    return (
        <div className={`input ${props.className}`}>
            {props.label && (
                <label className="input__label">{props.label}</label>
            )}
            <select
                multiple={true}
                ref={selectRef}
                className="input__input input-multiselect__select input-multiselect__select--multiple"
                onChange={onChange}
                value={props.selectedValues.map((sv) => getItemKey(sv))}
            >
                {props.values.map((v) => (
                    <option
                        className="input-multiselect__option"
                        key={getItemKey(v)}
                        value={getItemKey(v)}
                    >
                        {getItemLabel(v)}
                    </option>
                ))}
            </select>
        </div>
    );
}

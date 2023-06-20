import "./InputDropdown.scss";

export default function InputDropdown<T>(props: {
    values: T[];
    selectedValue: T;
    label: string;
    className?: string;
    allowNullValue?: boolean;
    nullValueItemLabel?: string;
    getItemKey(item: T): string;
    getItemLabel(item: T): string;
    onChange(event: React.ChangeEvent<HTMLSelectElement>, item: T | null): void;
}) {
    const nullOption = "null-option";

    const onChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        if (event.currentTarget.value === nullOption) {
            props.onChange(event, null);
            return;
        }

        const selectedItem = props.values.find(
            (v) => props.getItemKey(v) === event.currentTarget.value
        );

        if (selectedItem === undefined)
            throw new Error("selectedItem not found");

        props.onChange(event, selectedItem);
    };

    const renderNullValueOption = () => {
        return (
            <option key={nullOption} value={nullOption}>
                {props.nullValueItemLabel ?? ""}
            </option>
        );
    };

    return (
        <div className={`input ${props.className}`}>
            {props.label && (
                <label className="input__label">{props.label}</label>
            )}
            <select
                className="input__input input-dropdown__select"
                onChange={onChange}
                value={
                    props.selectedValue
                        ? props.getItemKey(props.selectedValue)
                        : nullOption
                }
            >
                {props.allowNullValue && renderNullValueOption()}
                {props.values.map((v) => (
                    <option
                        className="input-dropdown__option"
                        key={props.getItemKey(v)}
                        value={props.getItemKey(v)}
                    >
                        {props.getItemLabel(v)}
                    </option>
                ))}
            </select>
        </div>
    );
}

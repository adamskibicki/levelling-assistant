import TooltipText from "../components/common/TooltipText";
import "./InputDropdown.scss";
import "./InputCommon.scss";

interface InputDropdownPropsBase<T> {
    values: T[];
    label: string;
    className?: string;
    labelHoverTooltipText?: string;
    getItemKey(item: T): string;
    getItemLabel(item: T): string;
}

export function InputDropdownNotAllowNullValue<T>(
    props: InputDropdownPropsBase<T> & {
        selectedValue: T;
        onChange(event: React.ChangeEvent<HTMLSelectElement>, item: T): void;
    }
) {
    return <InputDropdown {...props} />;
}

export function InputDropdownAllowNullValue<T>(
    props: InputDropdownPropsBase<T> & {
        selectedValue: T | null;
        nullValueItemLabel?: string;
        onChange(
            event: React.ChangeEvent<HTMLSelectElement>,
            item: T | null
        ): void;
    }
) {
    return <InputDropdown {...props} allowNullValue={true} />;
}

export function InputDropdown<T>(
    props: InputDropdownPropsBase<T> & {
        values: T[];
        selectedValue: T;
        label: string;
        className?: string;
        getItemKey(item: T): string;
        getItemLabel(item: T): string;
        allowNullValue?: boolean;
        nullValueItemLabel?: string;
        onChange(
            event: React.ChangeEvent<HTMLSelectElement>,
            item: T | null
        ): void;
    }
) {
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

    const getItemKey = (item: T) => {
        if (item === null) return nullOption;

        return props.getItemKey(item);
    };

    const getItemLabel = (item: T) => {
        if (item === null) return props.nullValueItemLabel;

        return props.getItemLabel(item);
    };

    return (
        <div className={`input ${props.className}`}>
            {props.label && (
                <label className="input__label input-dropdown__label">
                    {props.label}
                    {props.labelHoverTooltipText && (
                        <TooltipText text={props.labelHoverTooltipText} />
                    )}
                </label>
            )}
            <select
                className="input__input input-dropdown__select"
                onChange={onChange}
                value={getItemKey(props.selectedValue)}
            >
                {props.allowNullValue && renderNullValueOption()}
                {props.values.map((v) => (
                    <option
                        className="input-dropdown__option"
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

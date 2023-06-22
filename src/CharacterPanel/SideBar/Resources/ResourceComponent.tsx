import GeneralProperty from "../../../GeneralProperty";
import { Resource } from "../../slice/state/Resource";
import { useCalculateResourceValue } from "./useCalculateResourceValue";

export function ResourceComponent(props: Resource) {
    const { calculateResourceValue } = useCalculateResourceValue();

    const numberToStringWithThousandSeparator = (
        number: number,
        separator: string
    ) => {
        return number
            .toString()
            .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, separator);
    };

    return (
        <GeneralProperty
            name={props.displayName}
            value={numberToStringWithThousandSeparator(
                Math.round(calculateResourceValue(props)),
                "'"
            )} />
    );
}

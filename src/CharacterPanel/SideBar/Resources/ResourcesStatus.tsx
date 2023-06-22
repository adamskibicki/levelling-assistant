// import { useState } from "react";
import GeneralProperty from "../../../GeneralProperty";
import { Resource } from "../../slice/state/Resource";
import TitleWithEditButton from "../TitleWithEditButton";
import { useCalculateResourceValue } from "./useCalculateResourceValue";

function numberToStringWithThousandSeparator(
    number: number,
    separator: string
) {
    return number
        .toString()
        .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, separator);
}

export default function ResourcesStatus(props: { resources: Resource[] }) {
    // const [showEditResourcesModal, setShowEditResourcesModal] = useState(false);
    const { calculateResourceValue } = useCalculateResourceValue();

    return (
        <>
            <TitleWithEditButton title="Status" onEditClick={() => {}} />
            <div>
                {props.resources.map((r, i) => (
                    <GeneralProperty
                        key={i}
                        name={r.displayName}
                        value={numberToStringWithThousandSeparator(
                            Math.round(calculateResourceValue(r)),
                            "'"
                        )}
                    />
                ))}
            </div>
        </>
    );
}
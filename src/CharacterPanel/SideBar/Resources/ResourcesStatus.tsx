// import { useState } from "react";
import GeneralProperty from "../../../GeneralProperty";
import { CalculatedResource } from "../../CalculatedResource";
import TitleWithEditButton from "../TitleWithEditButton";

function numberToStringWithThousandSeparator(number: number, separator: string) {
    return number.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, separator);
}

function ResourcesStatus(props: {resources: CalculatedResource[]}) {
    // const [showEditResourcesModal, setShowEditResourcesModal] = useState(false);

    return (
        <>
            <TitleWithEditButton title="Status" onEditClick={() => {}}/>
            <div>
                {
                    props.resources.map((r, i) => (
                        <GeneralProperty key={i} name={r.name} value={numberToStringWithThousandSeparator(Math.round(r.value), "'")}/>
                    ))
                }
            </div>
        </>
    );
}

export default ResourcesStatus;
import GeneralProperty from "../../GeneralProperty";
import { CalculatedResource } from "../CalculatedResource";

function numberToStringWithThousandSeparator(number: number, separator: string) {
    return number.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, separator);
}

function ResourcesStatus(props: {resources: CalculatedResource[]}) {
    return (
        <>
            <h4>Status</h4>
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
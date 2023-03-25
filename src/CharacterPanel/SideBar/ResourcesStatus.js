import GeneralProperty from "../../GeneralProperty";

function numberToStringWithThousandSeparator(number, separator) {
    return number.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, separator);
}

function ResourcesStatus(props) {
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
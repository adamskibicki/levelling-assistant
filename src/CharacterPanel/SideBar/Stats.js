import GeneralProperty from "../../GeneralProperty";
import StatpointProperty from "../../StatpointProperty";

function Stats(props) {
    return (
        <>
            <h4>Stats</h4>
            <div>
                <GeneralProperty name='Unspent statpoints' value={props.unspentStatpoints} />
                {
                    props.stats.map((s, i) => (
                        <StatpointProperty key={i} name={s.name} value={s.value} increaseEnabled={true} decreaseEnabled={false} calculatedValue={props.calculateFinalStatValue(s)}/>
                    ))
                }
            </div>
        </>
    );
}

export default Stats;
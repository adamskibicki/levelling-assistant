import { useState } from "react";
import GeneralProperty from "../../GeneralProperty";
import StatpointProperty from "../../StatpointProperty";
import StatsEditModal from "./StatsEditModal";
import TitleWithEditButton from "./TitleWithEditButton";

function Stats(props) {
    const [showEditModal, setShowEditModal] = useState(false);

    return (
        <>
            <TitleWithEditButton onEditClick={() => setShowEditModal(true)} title={'Stats'} />

            <div>
                <GeneralProperty name='Unspent statpoints' value={props.unspentStatpoints} />
                {
                    props.stats.map((s, i) => (
                        <StatpointProperty key={i} name={s.name} value={s.value} increaseEnabled={true} decreaseEnabled={false} calculatedValue={props.calculateFinalStatValue(s)} />
                    ))
                }
            </div>
            <StatsEditModal stats={props.stats} show={showEditModal} onHide={() => setShowEditModal(false)} onClose={() => setShowEditModal(false)} onAccept={() => setShowEditModal(false)}/>
        </>
    );
}

export default Stats;
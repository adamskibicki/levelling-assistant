import { useState } from "react";
import GeneralProperty from "../../GeneralProperty";
import StatpointProperty from "../../StatpointProperty";
import StatsEditModal from "./StatsEditModal";
import TitleWithEditButton from "./TitleWithEditButton";
import InputCheckbox from "../../Inputs/InputCheckbox";

function Stats(props) {
    const [showEditModal, setShowEditModal] = useState(false);
    const [showHiddenStats, setShowHiddenStats] = useState(false);

    const statsToShow = showHiddenStats ? props.stats : props.stats.filter(s => !s.isHidden);

    return (
        <>
            <TitleWithEditButton onEditClick={() => setShowEditModal(true)} title={'Stats'} />
            <InputCheckbox label={"Show hidden stats"} value={showHiddenStats} onChange={(_, value) => setShowHiddenStats(value)}/>

            <div>
                <GeneralProperty name='Unspent statpoints' value={props.unspentStatpoints} />
                {
                    statsToShow.map(s => (
                        <StatpointProperty key={s.id} name={s.name} value={s.value} increaseEnabled={true} decreaseEnabled={false} calculatedValue={props.calculateFinalStatValue(s)} />
                    ))
                }
            </div>
            <StatsEditModal stats={props.stats} show={showEditModal} onHide={() => setShowEditModal(false)} onClose={() => setShowEditModal(false)} onAccept={() => setShowEditModal(false)}/>
        </>
    );
}

export default Stats;
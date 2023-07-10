import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import './StatpointProperty.scss';
import TooltipText from './components/common/TooltipText';
import { IconButton } from './components/common/Buttons';

function StatpointProperty(props: {
    name: string;
    value: number;
    increaseEnabled: boolean;
    decreaseEnabled: boolean;
    calculatedValue: number;
}) {
    return (
        <div className='statpoint-property'>
            <div className='statpoint-property__name'>
                {props.name}:
            </div>
            <div className='statpoint-property__value'>
                {props.value}
                <TooltipText text={`Final value: ${Math.round(props.calculatedValue)}`} />
            </div>
            <IconButton icon={faPlus} disabled={!props.increaseEnabled} onClick={() => {console.log("stat increased")}} />            
            <IconButton icon={faMinus} disabled={!props.decreaseEnabled} onClick={() => {console.log("stat decreased")}} />            
        </div>
    );
}

export default StatpointProperty;
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './StatpointProperty.scss';

function StatpointProperty(props: {
    name: string;
    value: number;
    increaseEnabled: boolean;
    decreaseEnabled: boolean;
    calculatedValue: number;
}) {
    return (
        <div className='statpoint-property'>
            <div className='property-name'>
                {props.name}:
            </div>
            <div className='property-value'>
                {props.value}
                <div className='property-tooltiptext'>
                    Final value: {Math.round(props.calculatedValue)}
                </div>
            </div>
            <button className={(props.increaseEnabled ? '' : 'disabled') + ' property-increase'}>
                <FontAwesomeIcon icon={faPlus} />
            </button>
            <button className={(props.decreaseEnabled ? '' : 'disabled') + ' property-decrease'}>
                <FontAwesomeIcon icon={faMinus} />
            </button>
        </div>
    );
}

export default StatpointProperty;
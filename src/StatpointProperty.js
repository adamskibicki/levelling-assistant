import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './StatpointProperty.scss';

function StatpointProperty(props) {
    return (
        <div className='statpoint-property'>
            <div className='property-name'>
                {props.name}:
            </div>
            <div className='property-value'>
                {props.value}
            </div>
            <button className={(props.increaseEnabled ? '' : 'disabled') + ' property-increase button-std'}>
                <FontAwesomeIcon icon={faPlus} />
            </button>
            <button className={(props.decreaseEnabled ? '' : 'disabled') + ' property-decrease button-std'}>
                <FontAwesomeIcon icon={faMinus} />
            </button>
        </div>
    );
}

export default StatpointProperty;
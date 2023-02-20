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
            <button className={'property-increase ' + (props.increaseEnabled ? '' : 'disabled')}>
                <FontAwesomeIcon icon={faPlus} />
            </button>
            <button className={'property-decrease ' + (props.decreaseEnabled ? '' : 'disabled')}>
                <FontAwesomeIcon icon={faMinus} />
            </button>
        </div>
    );
}

export default StatpointProperty;
import './GeneralProperty.scss';

function GeneralProperty(props) {
    return (
        <div className='general-property'>
            <div className='property-name'>
                {props.name}:
            </div>
            <div className='property-value'>
                {props.value}
            </div>
        </div>
    );
}

export default GeneralProperty;
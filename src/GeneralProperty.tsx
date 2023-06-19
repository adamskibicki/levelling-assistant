import './GeneralProperty.scss';

export default function GeneralProperty(props: {
    name: string;
    value: string;
}) {
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
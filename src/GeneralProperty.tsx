import './GeneralProperty.scss';

export default function GeneralProperty(props: {
    name: string;
    value: string | number;
    className?: string;
}) {
    return (
        <div className={`general-property ${props.className ? props.className : ""}`}>
            <div className='property-name'>
                {props.name}:
            </div>
            <div className='property-value'>
                {props.value}
            </div>
        </div>
    );
}
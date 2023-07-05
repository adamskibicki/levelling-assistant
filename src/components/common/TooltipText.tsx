import "./TooltipText.scss";

export default function TooltipText(props: {
    text: string;
    className?: string;
}) {
    return (
        <div
            className={`tooltip-text ${
                props.className === undefined ? "" : props.className
            }`}
        >
            {props.text}
        </div>
    );
}

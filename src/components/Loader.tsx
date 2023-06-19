import "./Loader.scss";

export default function Loader(props: {
    className?: string | "";
}) {
    return (
        <span className={`loader ${props.className}`}></span>
    );
}
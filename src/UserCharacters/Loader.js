import "./Loader.scss";

export default function Loader(props) {
    return (
        <span className={`loader ${props.className}`}></span>
    );
}
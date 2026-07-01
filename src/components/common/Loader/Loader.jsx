import "./Loader.css";

export default function Loader({ size = "md", text = "Loading..." }) {
  return (
    <div className={`loader-container loader-${size}`}>
      <div className="loader-spinner" />
      {text && <span className="loader-text">{text}</span>}
    </div>
  );
}

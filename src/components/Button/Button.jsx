import "./Button.css";

const Button = ({
  children,
  onClick,
  type = "button",
  variant = "primary",
  disabled = false,
  className = "",
  icon: Icon
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`btn btn-${variant} ${className} ${disabled ? "btn-disabled" : ""}`}
    >
      {Icon && <Icon className="btn-icon" />}
      {children}
    </button>
  );
};

export default Button;

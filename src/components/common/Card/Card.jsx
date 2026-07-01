import "./Card.css";

const Card = ({ children, title, className = "", icon: Icon }) => {
  return (
    <div className={`card ${className}`}>
      {title && (
        <div className="card-header">
          {Icon && <Icon className="card-icon" />}
          <h3 className="card-title">{title}</h3>
        </div>
      )}
      <div className="card-body">{children}</div>
    </div>
  );
};

export default Card;

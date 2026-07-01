import "./SectionTitle.css";

export default function SectionTitle({ title, subtitle, align = "center", className = "" }) {
  return (
    <div className={`section-title-wrapper align-${align} ${className}`}>
      <h2 className="section-title-heading">{title}</h2>
      {subtitle && <p className="section-title-subtitle">{subtitle}</p>}
    </div>
  );
}

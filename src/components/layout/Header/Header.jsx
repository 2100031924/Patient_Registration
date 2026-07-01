import "./Header.css";

export default function Header({ title, subtitle, children }) {
  return (
    <header className="page-header">
      <div className="page-header-text">
        {title && <h1 className="page-header-title">{title}</h1>}
        {subtitle && <p className="page-header-subtitle">{subtitle}</p>}
      </div>
      {children && <div className="page-header-actions">{children}</div>}
    </header>
  );
}

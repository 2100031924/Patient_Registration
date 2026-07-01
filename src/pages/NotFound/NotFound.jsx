import { Link } from "react-router-dom";
import { FiHome } from "react-icons/fi";
import "./NotFound.css";

export default function NotFound() {
  return (
    <div className="notfound-page">
      <div className="notfound-container">
        <span className="notfound-code">404</span>
        <h1>Page Not Found</h1>
        <p>The page you're looking for doesn't exist or has been moved.</p>
        <Link to="/" className="notfound-btn">
          <FiHome /> Back to Home
        </Link>
      </div>
    </div>
  );
}

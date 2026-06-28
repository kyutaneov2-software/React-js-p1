import { Link } from "react-router-dom";
import "../pages/Error404.css";

export default function Error404() {
    return (
        <div className="page error-page">
            <div className="error-container">
                <div className="error-code">
                    <span className="error-digit">4</span>
                    <span className="error-digit error-digit-ghost">0</span>
                    <span className="error-digit">4</span>
                </div>
                <h1 className="error-title">Page Not Found</h1>
                <p className="error-message">
                    The page you are looking for doesn't exist or has been moved.
                </p>
                <Link to="/" className="btn btn-primary error-btn">
                    Back to Home
                </Link>
            </div>
        </div>
    );
}

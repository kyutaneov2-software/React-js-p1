import { NavLink, Link } from "react-router-dom";
import "../components/Navbar.css";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext.jsx";

export default function Navbar() {
    const { user, logout } = useAuth();
    const { getCartItemsWithProducts } = useCart();

    const cartItems = getCartItemsWithProducts();
    const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    const displayEmail = user?.email?.split("@")[0];

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/" className="navbar-brand">
                    <span className="brand-mark">I</span>
                    <span>InTech</span>
                </Link>

                <div className="navbar-links">
                    <NavLink
                        to="/"
                        className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
                    >
                        Home
                    </NavLink>

                    <NavLink
                        to="/checkout"
                        className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
                    >
                        Cart
                        {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
                    </NavLink>
                </div>

                {!user ? (
                    <div className="navbar-auth">
                        <Link to="/auth?mode=login" className="btn btn-secondary">
                            Login
                        </Link>
                        <Link to="/auth?mode=signup" className="btn btn-primary">
                            Sign Up
                        </Link>
                    </div>
                ) : (
                    <div className="navbar-user">
                        <div className="navbar-avatar">{displayEmail?.charAt(0).toUpperCase()}</div>
                        <div className="navbar-user-info">
                            <span className="navbar-user-label">Logged in</span>
                            <span className="navbar-greeting">{displayEmail}</span>
                        </div>
                        <button
                            type="button"
                            className="btn btn-secondary logout-btn"
                            onClick={logout}
                        >
                            Logout
                        </button>
                    </div>
                )}
            </div>
        </nav>
    );
}

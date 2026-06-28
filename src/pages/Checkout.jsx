import { useCart } from "../context/CartContext.jsx";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../pages/Checkout.css";

export default function Checkout() {
    const { user } = useAuth();
    const { getCartItemsWithProducts, removeFromCart, updateQuantity, getCartTotal, clearCart } =
        useCart();
    const cartItems = getCartItemsWithProducts();

    const total = getCartTotal();

    function placeOrder() {
        alert("Order Placed");
        clearCart();
    }

    return (
        <div className="page">
            <div className="container">
                <h1 className="page-title">Checkout</h1>
                {user ? (
                    <div className="checkout-container">
                        <div className="checkout-items">
                            <h2 className="checkout-section-title">Order Summary</h2>
                            {cartItems.length === 0 ? (
                                <div className="checkout-empty">
                                    <div className="checkout-empty-icon">🛒</div>
                                    <p className="checkout-empty-text">Your cart is empty</p>
                                    <p className="checkout-empty-subtext">
                                        Looks like you haven't added anything yet.
                                    </p>
                                    <Link to="/" className="btn btn-primary">
                                        Browse Products
                                    </Link>
                                </div>
                            ) : (
                                cartItems.map((item) => (
                                    <div className="checkout-item" key={item.id}>
                                        <img
                                            src={item.product.image}
                                            alt={item.product.name}
                                            className="checkout-item-image"
                                        />
                                        <div className="checkout-item-details">
                                            <h3 className="checkout-item-name">
                                                {item.product.name}
                                            </h3>
                                            <p className="checkout-item-price">
                                                ${item.product.price} each
                                            </p>
                                        </div>
                                        <div className="checkout-item-controls">
                                            <div className="quantity-controls">
                                                <button
                                                    className="quantity-btn"
                                                    onClick={() =>
                                                        updateQuantity(item.id, item.quantity - 1)
                                                    }
                                                >
                                                    -
                                                </button>
                                                <span className="quantity-value">
                                                    {item.quantity}
                                                </span>
                                                <button
                                                    className="quantity-btn"
                                                    onClick={() =>
                                                        updateQuantity(item.id, item.quantity + 1)
                                                    }
                                                >
                                                    +
                                                </button>
                                            </div>

                                            <p className="checkout-item-total">
                                                ${item.product.price * item.quantity}
                                            </p>
                                            <button
                                                className="btn btn-secondary btn-small"
                                                onClick={() => removeFromCart(item.id)}
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        {cartItems.length > 0 && (
                            <div className="checkout-summary">
                                <h2 className="checkout-section-title">Total</h2>
                                <div className="checkout-total">
                                    <p className="checkout-total-label">Subtotal:</p>
                                    <p className="checkout-total-value">${total.toFixed(2)}</p>
                                </div>
                                <div className="checkout-total">
                                    <p className="checkout-total-label">Total:</p>
                                    <p className="checkout-total-value checkout-total-final">
                                        ${total.toFixed(2)}
                                    </p>
                                </div>
                                <button
                                    className="btn btn-primary btn-large btn-block"
                                    onClick={placeOrder}
                                >
                                    Place Order
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="checkout-login-required">
                        <div className="checkout-login-icon">🔒</div>
                        <h2 className="checkout-login-title">Login Required</h2>
                        <p className="checkout-login-text">
                            Please sign in to your account to proceed with checkout and place your
                            order.
                        </p>
                        <div className="checkout-login-buttons">
                            <Link to="/auth" className="btn btn-primary">
                                Sign In
                            </Link>
                            <Link to="/auth" className="btn btn-secondary">
                                Create Account
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

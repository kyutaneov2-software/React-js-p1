import { useNavigate, useParams, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getProductsById } from "../data/products";
import { useCart } from "../context/CartContext";
import "../pages/ProductDetails.css";

export default function ProductDetails() {
    const { user } = useAuth();
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart, cartItems } = useCart();
    const product = getProductsById(id);

    if (!product) {
        navigate("/");
        return null;
    }

    const productInCart = cartItems.find((item) => item.id === product.id);
    const productQuantityLabel = productInCart ? `(${productInCart.quantity})` : "";
    const isInCart = !!productInCart;

    return (
        <div className="page">
            <div className="container">
                {/* Breadcrumb */}
                <nav className="product-breadcrumb">
                    <Link to="/">Home</Link>
                    <span className="product-breadcrumb-separator">/</span>
                    <span>Products</span>
                    <span className="product-breadcrumb-separator">/</span>
                    <span style={{ color: "rgba(255,255,255,0.6)" }}>{product.name}</span>
                </nav>

                <div className="product-detail">
                    <div className="product-detail-image">
                        <img src={product.image} alt={product.name} loading="eager" />
                    </div>
                    <div className="product-details-content">
                        <div className="product-details-meta">Product Details</div>
                        <h1 className="product-details-name">{product.name}</h1>
                        <p className="product-details-price">${product.price}</p>
                        <p className="product-details-description">{product.description}</p>

                        {/* Specs Grid */}
                        <div className="product-details-specs">
                            <div className="product-spec">
                                <span className="product-spec-label">Category</span>
                                <span className="product-spec-value">Electronics</span>
                            </div>
                            <div className="product-spec">
                                <span className="product-spec-label">Availability</span>
                                <span className="product-spec-value">In Stock</span>
                            </div>
                            <div className="product-spec">
                                <span className="product-spec-label">Shipping</span>
                                <span className="product-spec-value">Free</span>
                            </div>
                            <div className="product-spec">
                                <span className="product-spec-label">Warranty</span>
                                <span className="product-spec-value">1 Year</span>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="product-details-actions">
                            {user ? (
                                <button
                                    className="btn btn-primary"
                                    type="button"
                                    onClick={() => addToCart(product.id)}
                                >
                                    Add to Cart
                                    {productQuantityLabel && (
                                        <span className="btn-cart-count">
                                            {productInCart.quantity}
                                        </span>
                                    )}
                                </button>
                            ) : (
                                <Link to="/auth" className="btn btn-primary">
                                    Add to Cart
                                </Link>
                            )}

                            {isInCart && (
                                <Link to="/checkout" className="btn btn-checkout">
                                    Checkout
                                    <svg
                                        width="16"
                                        height="16"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <path d="M5 12h14" />
                                        <path d="m12 5 7 7-7 7" />
                                    </svg>
                                </Link>
                            )}
                        </div>
                    </div>
                </div>

                <div className="product-detail-divider" />
            </div>
        </div>
    );
}

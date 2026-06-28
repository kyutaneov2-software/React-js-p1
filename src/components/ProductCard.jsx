import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

export default function ProductRow({ product, index }) {
    const { addToCart } = useCart();
    const { user } = useAuth();

    const paddedIndex = String(index + 1).padStart(2, "0");

    return (
        <article className="product-row">
            <div className="product-row-image">
                <img
                    src={product.image}
                    alt={product.name}
                    loading={index < 2 ? "eager" : "lazy"}
                />
            </div>
            <div className="product-row-content">
                <span className="product-row-number">No. {paddedIndex}</span>
                <h3 className="product-row-name">{product.name}</h3>
                <p className="product-row-price">${product.price}</p>
                <p className="product-row-description">{product.description}</p>
                <div className="product-row-actions">
                    <Link className="btn btn-secondary" to={`/products/${product.id}`}>
                        View Details
                    </Link>
                    {user ? (
                        <button
                            className="btn btn-primary"
                            type="button"
                            onClick={() => addToCart(product.id)}
                        >
                            Add to Cart
                        </button>
                    ) : (
                        <Link to="/auth" className="btn btn-primary">
                            Add to Cart
                        </Link>
                    )}
                </div>
            </div>
        </article>
    );
}

import { useEffect, useRef } from "react";
import { getProducts } from "../data/products.js";
import "../pages/Home.css";
import ProductRow from "../components/ProductCard.jsx";

export default function Home() {
    const products = getProducts();
    const gridRef = useRef(null);

    useEffect(() => { 
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("is-visible");
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.15,
                rootMargin: "0px 0px -50px 0px",
            }
        );

        const rows = gridRef.current?.querySelectorAll(".product-row");
        rows?.forEach((row) => observer.observe(row));

        return () => observer.disconnect();
    }, []);

    return (
        <div className="page">
            <section className="home-hero">
                <h1 className="home-title">Welcome to InTech Shop</h1>
                <p className="home-subtitle">
                    Discover unique products from all across the world with a budget-friendly but
                    premium taste in aesthetics.
                </p>
            </section>

            <section className="container" aria-labelledby="products-heading">
                <h2 id="products-heading" className="page-title">
                    Our Products
                </h2>
                <div className="products-grid" ref={gridRef}>
                    {products.map((product, index) => (
                        <ProductRow product={product} index={index} key={product.id} />
                    ))}
                </div>
            </section>
        </div>
    );
}

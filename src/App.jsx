import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home.jsx";
import Auth from "./pages/Auth.jsx";
import Checkout from "./pages/Checkout.jsx";
import Error404 from "./pages/Error404.jsx";
import Navbar from "./components/Navbar.jsx";
import AuthProvider from "./context/AuthContext.jsx";
import ProductDetails from "./pages/ProductDetails.jsx";
import CartProvider from "./context/CartContext.jsx";

function App() {
    return (
        <>
            <AuthProvider>
                <CartProvider>
                    <div className="mainSection">
                        <Navbar />
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/auth" element={<Auth />} />
                            <Route path="/checkout" element={<Checkout />} />
                            <Route path="/products/:id" element={<ProductDetails />} />
                            <Route path="*" element={<Error404 />} />
                        </Routes>
                    </div>
                </CartProvider>
            </AuthProvider>
        </>
    );
}
export default App;

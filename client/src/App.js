// Elements from React
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

// Providers
import { ProductProovider } from "./context/providers/ProductsContext";
import { AuthProvider } from "./context/providers/AuthContext";
import { CartProvider } from "./context/providers/CartContext";

//Components
import HomePage from "./pages/home/HomePages";
import Navbar from "./components/ui/Navbar";
import ProductForm from "./pages/products/ProductForm";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import CartPage from "./pages/cart/CartPage";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <Navbar />

          <div className="container App">
            <ProductProovider>
              <Routes>
                <Route path="/" exact element={<HomePage />} />
                <Route path="/auth/register" exact element={<Register />} />
                <Route path="/auth/login" exact element={<Login />} />
                <Route path="/products/new" element={<ProductForm />} />
                <Route path="/cart" element={<CartPage />} />
              </Routes>
            </ProductProovider>
          </div>
        </CartProvider>
      </AuthProvider>
      <Toaster />
    </BrowserRouter>
  );
}

export default App;

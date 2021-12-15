import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ProductProovider } from "./context/providers/ProductsContext";
import { AuthProvider } from "./context/providers/AuthContext";
import { Toaster } from 'react-hot-toast'

//Components
import HomePage from "./pages/home/HomePages";
import Navbar from "./components/ui/Navbar";
import ProductForm from "./pages/products/ProductForm";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Navbar />

        <div className="container App">
          <ProductProovider>
            <Routes>
              <Route path="/" exact element={<HomePage />} />
              <Route path="/auth/register" exact element={<Register />} />
              <Route path="/auth/login" exact element={<Login />} />
              <Route path="/products/new" element={<ProductForm />} />
            </Routes>
          </ProductProovider>
          <Toaster/>
        </div>
        
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;

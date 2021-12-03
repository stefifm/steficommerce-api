import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ProductProovider } from "./context/providers/ProductsContext";

//Components
import HomePage from "./pages/home/HomePages";
import Navbar from "./components/ui/Navbar";
import ProductForm from "./pages/products/ProductForm";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <div className="container App">
        <ProductProovider>
          <Routes>
            <Route path="/" exact element={<HomePage />} />
            <Route path="/products/new" element={<ProductForm />} />
          </Routes>
        </ProductProovider>
      </div>
    </BrowserRouter>
  );
}

export default App;

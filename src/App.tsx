
import { Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";

export default function App() {
  return (
    <div className="min-h-screen bg-[#faf9f6] text-[#24251f]">
      <Navbar />

      <main className="mx-auto max-w-[1440px] px-4 pb-12 sm:px-6 lg:px-8">
        <Routes>
          <Route path="/" element={<Navigate to="/products" replace />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="*" element={<Navigate to="/products" replace />} />
        </Routes>
      </main>
    </div>
  );
}

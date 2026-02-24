import { Routes, Route } from "react-router-dom";
import { Container } from "@mui/material";
import Products from "@/pages/Products";
import ProductCreate from "@/pages/ProductCreate";
import Order from "@/pages/Order";
import Header from "@/components/Header";

function App() {
  return (
    <>
      <Header />
      <Container sx={{ mt: 4 }}>
        <Routes>
          <Route path="/products" element={<Products />} />
          <Route path="/create" element={<ProductCreate />} />
          <Route path="/order" element={<Order />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;

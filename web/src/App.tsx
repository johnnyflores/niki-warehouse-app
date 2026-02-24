import { Routes, Route } from "react-router-dom";
import { AppBar, Toolbar, Container, Typography } from "@mui/material";
import Products from "@/pages/Products";
import ProductCreate from "@/pages/ProductCreate";
import Order from "@/pages/Order";
import AppDrawer from "./components/AppDrawer";

function App() {
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <AppDrawer />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Niki Warehouse
          </Typography>
        </Toolbar>
      </AppBar>
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

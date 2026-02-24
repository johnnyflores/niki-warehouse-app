import { Routes, Route, Link } from "react-router-dom";
import { AppBar, Toolbar, Button, Container } from "@mui/material";
import Products from "@/pages/Products";
import ProductCreate from "@/pages/ProductCreate";
import Order from "@/pages/Order";

function App() {
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Button color="inherit" component={Link} to="/products">
            Products
          </Button>
          <Button color="inherit" component={Link} to="/create">
            Create Product
          </Button>
          <Button color="inherit" component={Link} to="/order">
            Place Order
          </Button>
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

import { Routes, Route, Link } from "react-router-dom";
import { AppBar, Toolbar, Button, Container } from "@mui/material";
import Products from "./pages/Products";
import ProductCreate from "./pages/ProductCreate";

function App() {
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Button color="inherit" component={Link} to="/products">
            Products
          </Button>
        </Toolbar>
      </AppBar>
      <Container sx={{ mt: 4 }}>
        <Routes>
          <Route path="/products" element={<Products />} />
          <Route path="/create" element={<ProductCreate />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;

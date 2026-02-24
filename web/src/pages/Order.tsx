import { useEffect, useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Stack,
  Alert,
} from "@mui/material";
import type { Product } from "../types/product";

const PRODUCT_URL = import.meta.env.VITE_PRODUCT_URL;
const ORDER_URL = import.meta.env.VITE_ORDER_URL;

const Order: React.FC = () => {
  const [productId, setProductId] = useState<string>("");
  const [quantity, setQuantity] = useState<number | "">("");
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const [productPrice, setProductPrice] = useState<number | null>(null);

  useEffect(() => {
    if (!productId) return;

    const fetchProduct = async () => {
      try {
        const response = await fetch(`${PRODUCT_URL}/product/${productId}`);
        if (!response.ok) throw new Error("Product not found");

        const data: Product = await response.json();

        const price = data.price * 0.2;
        setProductPrice(price);
        setMessage(`The price for the order is $${price.toFixed(2)}`);
      } catch (error) {
        console.error("Error fetching product:", error);
        setMessage("Failed to fetch product.");
      }
    };

    fetchProduct();
  }, [productId]);

  const handleCreateOrder = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const body = JSON.stringify({
        product_id: productId,
        quantity,
      });

      const response = await fetch(`${ORDER_URL}/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body,
      });

      if (!response.ok) throw new Error("Failed to place order");

      await response.json();
      setMessage(`Order for ${quantity} item(s) sent`);
    } catch (error) {
      console.error("Error placing order:", error);
      setMessage("Failed to place order.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container sx={{ mt: 4, maxWidth: 500 }}>
      <Typography variant="h4" gutterBottom>
        Place Order
      </Typography>
      {message && (
        <Alert severity="info" sx={{ mb: 2 }}>
          {message}
        </Alert>
      )}
      <form onSubmit={handleCreateOrder}>
        <Stack spacing={2}>
          <TextField
            label="Product ID"
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
            required
          />
          <TextField
            label="Quantity"
            type="number"
            value={quantity}
            onChange={(e) =>
              setQuantity(e.target.value === "" ? "" : Number(e.target.value))
            }
            required
          />
          <Button type="submit" variant="contained" disabled={loading}>
            {loading ? "Placing..." : "Place Order"}
          </Button>
        </Stack>
      </form>

      {productPrice !== null && (
        <Typography sx={{ mt: 2 }}>
          Current calculated price: ${productPrice.toFixed(2)}
        </Typography>
      )}
    </Container>
  );
};

export default Order;

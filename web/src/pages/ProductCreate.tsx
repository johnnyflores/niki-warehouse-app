import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  TextField,
  Button,
  Stack,
  Alert,
} from "@mui/material";

const PRODUCT_URL = import.meta.env.VITE_PRODUCT_URL;

const ProductCreate: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [price, setPrice] = useState<number | "">("");
  const [quantity, setQuantity] = useState<number | "">("");

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleCreateProduct = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const body = JSON.stringify({ name, price, quantity });

      const response = await fetch(`${PRODUCT_URL}/product`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      await response.json();
      navigate("/products");
    } catch (err) {
      console.error("Error creating product:", err);
      setError("Failed to create product. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container sx={{ mt: 4, maxWidth: 500 }}>
      <Typography variant="h4" gutterBottom>
        Create Product
      </Typography>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      <form onSubmit={handleCreateProduct}>
        <Stack spacing={2}>
          <TextField
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <TextField
            label="Price"
            type="number"
            value={price}
            onChange={(e) =>
              setPrice(e.target.value === "" ? "" : Number(e.target.value))
            }
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
            {loading ? "Creating..." : "Create Product"}
          </Button>
        </Stack>
      </form>
    </Container>
  );
};

export default ProductCreate;

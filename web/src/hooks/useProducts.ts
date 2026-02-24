import { useEffect, useState, useCallback } from "react";
import type { Product } from "../types/product";

const PRODUCT_URL = import.meta.env.VITE_PRODUCT_URL;

interface UseProductsReturn {
  products: Product[];
  loading: boolean;
  error: string | null;
  fetchProducts: () => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
}

export const useProducts = (): UseProductsReturn => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${PRODUCT_URL}/products`);
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }

      const data: Product[] = await response.json();
      setProducts(data);
    } catch (err) {
      setError("Error fetching products.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteProduct = useCallback(async (id: string) => {
    try {
      const response = await fetch(`${PRODUCT_URL}/product/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete product");
      }

      setProducts((prev) => prev.filter((product) => product.id !== id));
    } catch (err) {
      setError("Error deleting product.");
      console.error(err);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return {
    products,
    loading,
    error,
    fetchProducts,
    deleteProduct,
  };
};

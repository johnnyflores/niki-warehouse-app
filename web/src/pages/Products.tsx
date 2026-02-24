import { useMemo, useState } from "react";
import { type Product } from "@/types/product";
import { Link } from "react-router-dom";
import {
  Alert,
  Button,
  CircularProgress,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  TextField,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useProducts } from "@/hooks/useProducts";

type Order = "asc" | "desc";

const Products: React.FC = () => {
  const { products, loading, error, deleteProduct } = useProducts();
  const [search, setSearch] = useState<string>("");
  const [orderBy, setOrderBy] = useState<keyof Product>("id");
  const [order, setOrder] = useState<Order>("asc");
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const filteredProducts = useMemo(() => {
    return products
      .filter((product) =>
        product.name.toLowerCase().includes(search.toLowerCase()),
      )
      .sort((a, b) => {
        const valueA = a[orderBy];
        const valueB = b[orderBy];

        if (valueA < valueB) return order === "asc" ? -1 : 1;
        if (valueA > valueB) return order === "asc" ? 1 : -1;
        return 0;
      });
  }, [products, search, orderBy, order]);

  const confirmDelete = async (id: string | null) => {
    if (id === null) return;
    await deleteProduct(id);
    setDeleteId(null);
  };

  const handleSort = (property: keyof Product) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Typography variant="h4">Products</Typography>
        <Button variant="contained" component={Link} to="/create">
          Add Product
        </Button>
      </Stack>
      <TextField
        label="Search by name"
        variant="outlined"
        fullWidth
        sx={{ mb: 3 }}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      {loading ? (
        <Stack alignItems="center" mt={4}>
          <CircularProgress />
        </Stack>
      ) : (
        <Paper>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  {["id", "name", "price", "quantity"].map((head) => (
                    <TableCell key={head}>
                      <TableSortLabel
                        active={orderBy === head}
                        direction={order}
                        onClick={() => handleSort(head as keyof Product)}
                      >
                        {head.toUpperCase()}
                      </TableSortLabel>
                    </TableCell>
                  ))}
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {filteredProducts
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((product) => (
                    <TableRow key={product.id}>
                      <TableCell>{product.id}</TableCell>
                      <TableCell>{product.name}</TableCell>
                      <TableCell>${product.price}</TableCell>
                      <TableCell>{product.quantity}</TableCell>
                      <TableCell align="right">
                        <Button
                          color="error"
                          startIcon={<DeleteIcon />}
                          onClick={() => setDeleteId(product.id)}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            component="div"
            count={filteredProducts.length}
            page={page}
            onPageChange={(_, newPage) => setPage(newPage)}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={(e) => {
              setRowsPerPage(parseInt(e.target.value, 10));
              setPage(0);
            }}
          />
        </Paper>
      )}
      <Dialog open={deleteId !== null} onClose={() => setDeleteId(null)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this product?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteId(null)} variant="outlined">
            Cancel
          </Button>
          <Button
            color="error"
            onClick={() => confirmDelete(deleteId)}
            variant="outlined"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      <Button sx={{ mt: 3 }} component={Link} to="/order" variant="outlined">
        Order
      </Button>
    </Container>
  );
};

export default Products;

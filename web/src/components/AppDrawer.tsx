import { useState, type JSX } from "react";
import {
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Toolbar,
  Typography,
  Box,
  ListItemIcon,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import AddIcon from "@mui/icons-material/Add";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link, useLocation } from "react-router-dom";

const AppDrawer: React.FC = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const toggleDrawer = (state: boolean) => () => {
    setOpen(state);
  };

  const menuItems: { text: string; icon: JSX.Element; path: string }[] = [
    { text: "Products", icon: <HomeIcon />, path: "/products" },
    { text: "Add Product", icon: <AddIcon />, path: "/create" },
    { text: "Orders", icon: <ShoppingCartIcon />, path: "/order" },
  ];

  return (
    <>
      <IconButton color="inherit" edge="start" onClick={toggleDrawer(true)}>
        <MenuIcon />
      </IconButton>
      <Drawer anchor="left" open={open} onClose={toggleDrawer(false)}>
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <Toolbar>
            <Typography variant="h6">Admin Panel</Typography>
          </Toolbar>
          <List>
            {menuItems.map((item) => {
              const isActive = location.pathname.startsWith(item.path);
              return (
                <ListItem
                  key={item.text}
                  component={Link}
                  to={item.path}
                  sx={{
                    backgroundColor: isActive ? "primary.main" : "inherit",
                    color: isActive ? "white" : "inherit",
                    "&:hover": {
                      backgroundColor: isActive
                        ? "primary.dark"
                        : "action.hover",
                    },
                  }}
                >
                  <ListItemIcon sx={{ color: isActive ? "white" : "inherit" }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItem>
              );
            })}
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default AppDrawer;

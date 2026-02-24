import { IconButton, AppBar, Toolbar, Typography } from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { useThemeContext } from "@/context/themeContext";
import AppDrawer from "./AppDrawer";

const Header: React.FC = () => {
  const { toggleColorMode, mode } = useThemeContext();

  return (
    <AppBar position="static">
      <Toolbar>
        <AppDrawer />
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Niki Warehouse App
        </Typography>
        <IconButton color="inherit" onClick={toggleColorMode}>
          {mode === "light" ? <Brightness4Icon /> : <Brightness7Icon />}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Header;

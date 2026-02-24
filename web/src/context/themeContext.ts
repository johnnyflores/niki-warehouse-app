import { createContext, useContext } from "react";
import type { PaletteMode } from "@mui/material";

interface ThemeContextType {
  toggleColorMode: () => void;
  mode: PaletteMode;
}

export const ThemeContext = createContext<ThemeContextType>({
  toggleColorMode: () => {},
  mode: "light",
});

export const useThemeContext = () => useContext(ThemeContext);

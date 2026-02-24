import React, { useMemo, useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import type { PaletteMode } from "@mui/material";
import { ThemeContext } from "./themeContext";

interface Props {
  children: React.ReactNode;
}

const getInitialMode = (): PaletteMode => {
  const storedTheme = localStorage.getItem("theme");
  return storedTheme === "light" || storedTheme === "dark"
    ? storedTheme
    : "light";
};

export const CustomThemeProvider: React.FC<Props> = ({ children }) => {
  const [mode, setMode] = useState<PaletteMode>(getInitialMode);

  const toggleColorMode = () => {
    setMode((prev) => {
      const newMode = prev === "light" ? "dark" : "light";
      localStorage.setItem("theme", newMode);
      return newMode;
    });
  };

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode],
  );

  return (
    <ThemeContext.Provider value={{ toggleColorMode, mode }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
};

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import App from "./App";
import { CustomThemeProvider } from "./context/ThemeContext";

const theme = createTheme();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <CustomThemeProvider>
          <App />
        </CustomThemeProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
);

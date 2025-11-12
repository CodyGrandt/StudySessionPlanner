import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";

const theme = createTheme({
  palette: {
    mode: "light", // switch to "dark" for dark mode
    background: {
      default: "#f5f7fa", // professional neutral background
      paper: "#ffffff", // card background
    },
    primary: {
      main: "#1976d2", // professional blue
    },
    secondary: {
      main: "#9c27b0", // optional accent
    },
  },
  typography: {
    fontFamily: "system-ui, -apple-system, Helvetica, Arial, sans-serif",
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>
);

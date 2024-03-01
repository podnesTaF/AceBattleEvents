"use client";
import { createTheme } from "@mui/material/styles";
import { Montserrat } from "next/font/google";

const roboto = Montserrat({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

const theme = createTheme({
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
  palette: {
    primary: {
      main: "#1C1E1F",
    },
    secondary: {
      main: "#F3F3F3",
    },
    background: {
      default: "#FFF9FF",
      paper: "#F3F3F3",
    },
  },
});

export default theme;

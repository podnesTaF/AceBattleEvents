import { red } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Theme {
    status: {
      dark: string;
    };
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    status?: {
      dark?: string;
    };
  }
}

// Create a theme instance.
const theme = createTheme({
  components: {
    MuiMobileStepper: {
      styleOverrides: {
        dot: {
          backgroundColor: "rgba(0, 0, 0, 0.26)",
        },
        dotActive: {
          backgroundColor: "#1E1C1F",
        },
      },
    },
  },
  palette: {
    primary: {
      main: "#556cd6",
    },
    secondary: {
      main: "#1c1e1f",
    },
    error: {
      main: red.A400,
    },
  },
});

export default theme;

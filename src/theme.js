import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#242b3c",
    },
    secondary: {
      main: "#11cb5f",
    },
  },
  components: {
    MuiDrawer: {
      styleOverrides: {
        paper: {
          background: "#242b3c",
        },
      },
    },
  },
  typography: {
    fontFamily: ["Open Sans", "sans-serif"].join(","),
  },
});

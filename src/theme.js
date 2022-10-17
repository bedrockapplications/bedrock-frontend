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
          background: "#3a3a3c",
        },
      },
    },
    MUIDataTable: {
      styleOverrides: {
        root: {
          border: "3px solid #3A3A3C",
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          textAlign: "center",
          padding: "8px",
        },
      },
    },
    MUIDataTableHeadCell: {
      styleOverrides: {
        root: {
          padding: "8px !important",
          backgroundColor: "#3A3A3C",
          color: "#fff !important",
          display: "table-cell !important",
        },
        contentWrapper: {
          justifyContent: "center",
          textTransform: "capitalize",
          fontWeight: "700",
        },
      },
    },
  },
  typography: {
    fontFamily: ["Poppins", "Open Sans", "sans-serif"].join(","),
  },
});

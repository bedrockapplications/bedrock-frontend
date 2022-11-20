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
          textAlign: "left",
          padding: "8px",
          borderBottom: "2px solid #242b3c",
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
    // MuiTableSortLabel: {
    //   styleOverrides: {
    //     root: {
    //       "&.Mui-active": {
    //         color: "#fff",
    //         "&& $icon": {
    //           opacity: 1,
    //           color: "#fff",
    //         },
    //       },
    //       ":hover": {
    //         color: "#fff",
    //         "&& $icon": {
    //           opacity: 1,
    //           color: "#fff",
    //         },
    //       },
    //     },
    //   },
    // },
    MuiTab: {
      styleOverrides: {
        root: {
          color: "#fff",
          backgroundColor: "rgba(58, 58, 60, 0.6)",
          "&.Mui-selected": {
            backgroundColor: "#3A3A3C",
            color: "#fff",
          },
        },
      },
    },
  },
  typography: {
    fontFamily: ["Poppins", "Open Sans", "sans-serif"].join(","),
  },
});

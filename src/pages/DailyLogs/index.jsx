import React from "react";
import { makeStyles } from "@mui/styles";
import {
  Box,
  Grid,
  Paper,
  Typography,
  Button,
  TextField,
  InputAdornment,
  Stack,
  Switch,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import SearchIcon from "@mui/icons-material/Search";
import { styled } from "@mui/material/styles";
import { useState } from "react";

const useStyle = makeStyles(() => ({
  PageHeader: {
    background: "#3A3A3C",
    borderRadius: "10px",
    padding: "20px 0px 20px 30px",
  },
  titleText: {
    fontSize: "1.5rem",
    fontWeight: 700,
    lineHeight: "36px",
    color: "#fff",
  },
  createBtn: {
    fontSize: "1rem",
    fontWeight: "700",
    lineHeight: "27px",
    borderRadius: "10px",
    textTransform: "capitalize",
    backgroundColor: "#fff",
    "&:hover": {
      background: "#fff",
    },
  },
  switchText: {
    fontSize: "1rem",
    fontWeight: "700",
    lineHeight: "24px",
    color: "#fff",
  },
}));

const AntSwitch = styled(Switch)(({ theme }) => ({
  width: 28,
  height: 16,
  padding: 0,
  display: "flex",
  "&:active": {
    "& .MuiSwitch-thumb": {
      width: 15,
    },
    "& .MuiSwitch-switchBase.Mui-checked": {
      transform: "translateX(9px)",
    },
  },
  "& .MuiSwitch-switchBase": {
    padding: 2,
    "&.Mui-checked": {
      transform: "translateX(12px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: "#8d8d95",
      },
    },
  },
  "& .MuiSwitch-thumb": {
    boxShadow: "0 2px 4px 0 rgb(0 35 11 / 20%)",
    width: 12,
    height: 12,
    borderRadius: 6,
    transition: theme.transitions.create(["width"], {
      duration: 200,
    }),
  },
  "& .MuiSwitch-track": {
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor: "#8d8d95",
    boxSizing: "border-box",
  },
}));

const DailyLogs = () => {
  const classes = useStyle();

  const [viewToggle, setViewToggle] = useState(false);

  const handleSearch = (value) => {
    console.log("value", value);
  };

  return (
    <Box sx={{ height: "calc(100% - 65px)" }}>
      <Grid container spacing={0}>
        <Grid item xs={12}>
          <Paper elevation={0} className={classes.PageHeader}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Typography className={classes.titleText}>Daily Log</Typography>
              </Grid>
              <Grid item xs={1.5}>
                <Button
                  startIcon={<AddIcon />}
                  fullWidth
                  className={classes.createBtn}
                >
                  Create Log
                </Button>
              </Grid>
              <Grid item xs={2.2}>
                <Button
                  fullWidth
                  endIcon={<ArrowDropDownIcon />}
                  className={classes.createBtn}
                >
                  Download Multiple{" "}
                </Button>
              </Grid>
              <Grid item xs={1.8}>
                <Button
                  fullWidth
                  endIcon={<ArrowDropDownIcon />}
                  className={classes.createBtn}
                >
                  Delete Multiple{" "}
                </Button>
              </Grid>
              <Grid item xs={3}>
                <TextField
                  id="search"
                  name="search"
                  placeholder={"Search"}
                  variant="outlined"
                  size="small"
                  sx={{ backgroundColor: "#fff", borderRadius: "10px" }}
                  fullWidth
                  onChange={(e) => handleSearch(e.target.value)}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid
                item
                xs={3}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <Stack direction="row" spacing={2} alignItems="center">
                  <Typography className={classes.switchText}>
                    Card View
                  </Typography>
                  <AntSwitch
                    checked={viewToggle}
                    onChange={() => setViewToggle(!viewToggle)}
                    inputProps={{ "aria-label": "ant design" }}
                  />
                  <Typography className={classes.switchText}>
                    Tabular View
                  </Typography>
                </Stack>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
      <Grid
        container
        sx={{
          marginTop: "1rem",
          border: "3px solid black",
          borderRadius: "10px",
        }}
      >
        <Grid item xs={12}>
          <Paper
            elevation={0}
            sx={{
              padding: "11rem 1rem",
              borderRadius: "10px",
              textAlign: "center",
            }}
          >
            {viewToggle ? "Table View" : "Card View"}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DailyLogs;

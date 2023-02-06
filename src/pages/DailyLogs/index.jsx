import React, { useCallback } from "react";
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
  IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import SearchIcon from "@mui/icons-material/Search";
import { styled } from "@mui/material/styles";
import { useState } from "react";
import TabularView from "./TabularView";
import Divider from "@mui/material/Divider";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import DownloadForOfflineOutlinedIcon from "@mui/icons-material/DownloadForOfflineOutlined";
import ShareIcon from "@mui/icons-material/Share";
import LinearProgress from "@mui/material/LinearProgress";
import projectImg from "../../Images/projectImg.png";
import ownerImg from "../../Images/owner.svg";
import contarctorImg from "../../Images/contractor.svg";
import CreateDailyLog from "./CreateDailyLog";
import CardView from "./cardView";

const useStyle = makeStyles(() => ({
  PageHeader: {
    background: "#3A3A3C",
    borderRadius: "10px",
    padding: "20px 30px 20px 30px",
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

let data = [
  {
    createdBy: "Aravind G. - Owner",
    project: "MVP CONSTRUCTIONS",
    schedule: "01/06/2020",
    date: "9:00 AM",
    reportingTo: "Sarah M. - Contarctor",
    location: "Alaska",
    weather: "85 F",
    condition: "Good",
    workActivity: ["Excavator", "Drillling"],
    notesComments: [
      "Material Need to be delivered",
      "Small injury for a Labor",
    ],
  },
  {
    createdBy: "Aravind G. - Owner",
    project: "MVP CONSTRUCTIONS",
    schedule: "01/06/2020",
    date: "9:00 AM",
    reportingTo: "Sarah M. - Contarctor",
    location: "Alaska",
    weather: "85 F",
    condition: "Good",
    workActivity: ["Excavator", "Drillling"],
    notesComments: [
      "Material Need to be delivered",
      "Small injury for a Labor",
    ],
  },
  {
    createdBy: "Aravind G. - Owner",
    project: "MVP CONSTRUCTIONS",
    schedule: "01/06/2020",
    date: "9:00 AM",
    reportingTo: "Sarah M. - Contarctor",
    location: "Alaska",
    weather: "85 F",
    condition: "Good",
    workActivity: ["Excavator", "Drillling"],
    notesComments: [
      "Material Need to be delivered",
      "Small injury for a Labor",
    ],
  },
  {
    createdBy: "Aravind G. - Owner",
    project: "MVP CONSTRUCTIONS",
    schedule: "01/06/2020",
    date: "9:00 AM",
    reportingTo: "Sarah M. - Contarctor",
    location: "Alaska",
    weather: "85 F",
    condition: "Good",
    workActivity: ["Excavator", "Drillling"],
    notesComments: [
      "Material Need to be delivered",
      "Small injury for a Labor",
    ],
  },
  {
    createdBy: "Aravind G. - Owner",
    project: "MVP CONSTRUCTIONS",
    schedule: "01/06/2020",
    date: "9:00 AM",
    reportingTo: "Sarah M. - Contarctor",
    location: "Alaska",
    weather: "85 F",
    condition: "Good",
    workActivity: ["Excavator", "Drillling"],
    notesComments: [
      "Material Need to be delivered",
      "Small injury for a Labor",
    ],
  },
  {
    createdBy: "Aravind G. - Owner",
    project: "MVP CONSTRUCTIONS",
    schedule: "01/06/2020",
    date: "9:00 AM",
    reportingTo: "Sarah M. - Contarctor",
    location: "Alaska",
    weather: "85 F",
    condition: "Good",
    workActivity: ["Excavator", "Drillling"],
    notesComments: [
      "Material Need to be delivered",
      "Small injury for a Labor",
    ],
  },
  {
    createdBy: "Aravind G. - Owner",
    project: "MVP CONSTRUCTIONS",
    schedule: "01/06/2020",
    date: "9:00 AM",
    reportingTo: "Sarah M. - Contarctor",
    location: "Alaska",
    weather: "85 F",
    condition: "Good",
    workActivity: ["Excavator", "Drillling"],
    notesComments: [
      "Material Need to be delivered",
      "Small injury for a Labor",
    ],
  },
  {
    createdBy: "Aravind G. - Owner",
    project: "MVP CONSTRUCTIONS",
    schedule: "01/06/2020",
    date: "9:00 AM",
    reportingTo: "Sarah M. - Contarctor",
    location: "Alaska",
    weather: "85 F",
    condition: "Good",
    workActivity: ["Excavator", "Drillling"],
    notesComments: [
      "Material Need to be delivered",
      "Small injury for a Labor",
    ],
  },
  {
    createdBy: "Aravind G. - Owner",
    project: "MVP CONSTRUCTIONS",
    schedule: "01/06/2020",
    date: "9:00 AM",
    reportingTo: "Sarah M. - Contarctor",
    location: "Alaska",
    weather: "85 F",
    condition: "Good",
    workActivity: ["Excavator", "Drillling"],
    notesComments: [
      "Material Need to be delivered",
      "Small injury for a Labor",
    ],
  },
];

const DailyLogs = () => {
  const classes = useStyle();

  const [viewToggle, setViewToggle] = useState(false);
  const [openDailyLog, setOpenDailyLog] = useState(false);

  const handleSearch = (value) => {
    console.log("value", value);
  };

  const handleOpenDailyLog = () => {
    setOpenDailyLog(true);
  };

  const handleCloseDailyLog = useCallback(() => {
    setOpenDailyLog(false);
  }, []);

  return (
    <>
      <Box sx={{ height: "calc(100% - 65px)" }}>
        <Grid container spacing={0}>
          <Grid item xs={12}>
            <Paper elevation={0} className={classes.PageHeader}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Typography className={classes.titleText}>
                    Daily Log
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={1.5} lg={1.5}>
                  <Button
                    startIcon={<AddIcon />}
                    fullWidth
                    className={classes.createBtn}
                    onClick={handleOpenDailyLog}
                  >
                    Create Log
                  </Button>
                </Grid>
                <Grid item xs={12} sm={6} md={2.5} lg={2.2}>
                  <Button
                    fullWidth
                    endIcon={<ArrowDropDownIcon />}
                    className={classes.createBtn}
                  >
                    Download Multiple{" "}
                  </Button>
                </Grid>
                <Grid item xs={12} sm={6} md={2} lg={1.8}>
                  <Button
                    fullWidth
                    endIcon={<ArrowDropDownIcon />}
                    className={classes.createBtn}
                  >
                    Delete Multiple{" "}
                  </Button>
                </Grid>
                <Grid item xs={12} sm={6} md={3} lg={3}>
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
                  xs={12}
                  md={3}
                  lg={3}
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
        <Box sx={{ width: "100%", marginTop: "1rem" }}>
          {viewToggle ? (
            <TabularView data={data} />
          ) : (
            <Paper
              sx={{
                minHeight: "400px",
                border: "3px solid #3A3A3C",
                padding: "5px",
              }}
            >
              <CardView />
            </Paper>
          )}
        </Box>
      </Box>
      <CreateDailyLog
        title="Create Log"
        id="createLog"
        open={openDailyLog}
        handleClose={handleCloseDailyLog}
      />
    </>
  );
};

export default DailyLogs;

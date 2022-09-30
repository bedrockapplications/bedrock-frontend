import React, { useEffect, useState } from "react";

import { getTodayTasksApi } from "../../services/request";

import employee from "../../Images/employee.png";
import cloud from "../../Images/CLoud.png";
import crane from "../../Images/crane.png";
import { makeStyles } from "@mui/styles";
import Checkbox from "@mui/material/Checkbox";
import TaskDetails from "./TaskDetails";
import ContactPageOutlinedIcon from "@mui/icons-material/ContactPageOutlined";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import {
  Grid,
  Box,
  IconButton,
  Stack,
  Paper,
  Typography,
  Tooltip,
} from "@mui/material";

const useStyle = makeStyles(() => ({
  employeeImg: {
    width: "10rem",
    height: "6.5rem",
    background: `url(${cloud})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    position: "relative",
  },
  personimg: {
    position: "absolute",
    top: "-15px",
    left: "20px",
    width: "88%",
  },
  craneImg: {
    width: "inherit",
    transform: "rotateY(-180deg)",
  },
  paper: {
    width: "100%",
    backgroundColor: "#e5e5e5 !important",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  taskList: {
    backgroundColor: "#e6e5ea",
    padding: "10px",
    margin: "10px 0px",
    borderRadius: "5px",
    cursor: "pointer",
  },
  taskTitle: {
    fontSize: "14px",
    fontWeight: "600 !important",
  },
  taskSubTitle: {
    fontSize: "11px !important",
    fontWeight: "600 !important",
  },
  timeText: {
    fontSize: "14px !important",
    whiteSpace: "nowrap",
  },
  timeWapper: {
    width: "5rem",
    marginLeft: "0px !important",
    textAlign: "center",
  },
}));

const list = [
  {
    time: "8:00 AM",
    meetingTitle: "City of Atlanta Inspection",
    subTitle: "Meet them at the gallery first; then take them to lunch",
    isChecked: false,
  },
  {
    time: "10:00 AM",
    meetingTitle: "Fire Dept Inspection",
    subTitle: "",
    isChecked: false,
  },
  {
    time: "3:00 PM",
    meetingTitle: "Prepare for Full Team Meeting Tomorrow",
    subTitle: "",
    isChecked: false,
  },
  {
    time: "6:00 PM",
    meetingTitle: "Complete Daily Log before Closing Out",
    subTitle: "",
    isChecked: false,
  },
];

const label = { inputProps: { "aria-label": "Checkbox demo" } };

const Dashboard = () => {
  const userId = localStorage.getItem("userId");
  const classes = useStyle();
  const [showTask, setShowTask] = useState(false);
  const [taskDetails, setTaskDetails] = useState(null);
  const [detailsList, setDetailsList] = useState([]);

  const handleShowDetails = (item) => {
    if (item) {
      setTaskDetails({ ...item });
      setShowTask(true);
    }
  };
  const handleHideDetails = () => {
    setShowTask(null);
    setShowTask(false);
  };

  const getAllTasksList = () => {
    if (userId) {
      getTodayTasksApi(userId)
        .then((res) => {
          if (res.status === 200) {
            console.log(res.data);
            setDetailsList([...list]);
          }
        })
        .catch((error) => {
          console.log("error", error);
        });
    }
  };

  useEffect(() => {
    getAllTasksList();
  }, []);

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Grid
            container
            sx={{
              background: "#3a3a3c",
              paddingLeft: "2rem",
              borderRadius: "15px",
            }}
          >
            <Grid item xs={2} className={classes.employeeImg}>
              <img
                src={employee}
                alt="employee"
                className={classes.personimg}
              />
            </Grid>
            <Grid
              item
              xs={12}
              sm={12}
              md={8}
              lg={8}
              sx={{ padding: "1rem 2rem" }}
            >
              <Typography variant="h5" color="#fff" fontWeight="600">
                Hi Ganesh
              </Typography>
              <Typography variant="p" color="#fff" fontSize={15}>
                You have completed 2 of your Projects this week, there are 3
                Projects to go, keep on rolling and reach your goal!
              </Typography>
            </Grid>
            <Grid item xs={2} sx={{ width: "6rem", textAlign: "end" }}>
              <img src={crane} alt="crane" className={classes.craneImg} />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={9} lg={9}>
              <Paper sx={{ p: "1rem", backgroundColor: "#f3f2f7" }}>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography
                    variant="h6"
                    fontWeight={600}
                    sx={{ textShadow: "1px 0px #242b3c" }}
                  >
                    Today's Tasks
                  </Typography>
                  <Box>
                    <IconButton color="primary" size="small">
                      <Tooltip title="Add Tasks">
                        <AddCircleOutlineOutlinedIcon />
                      </Tooltip>
                    </IconButton>
                    <IconButton
                      color="primary"
                      size="small"
                      onClick={handleHideDetails}
                    >
                      <Tooltip title="View Contacts">
                        <ContactPageOutlinedIcon />
                      </Tooltip>
                    </IconButton>
                  </Box>
                </Stack>
                <Box sx={{ height: "55vh", overflowY: "auto", p: "5px" }}>
                  {detailsList?.map((item, i) => (
                    <Box
                      className={classes.taskList}
                      key={item?.meetingTitle}
                      onClick={() => handleShowDetails(item)}
                    >
                      <Stack
                        direction="row"
                        justifyContent="flex-start"
                        alignItems="center"
                        spacing={2}
                      >
                        <Checkbox
                          {...label}
                          onClick={(event) => {
                            event.stopPropagation();
                          }}
                        />
                        <Box className={classes.timeWapper}>
                          <Typography className={classes.timeText}>
                            {item.time}
                          </Typography>
                        </Box>
                        <Box>
                          <Typography className={classes.taskTitle}>
                            {item.meetingTitle}
                          </Typography>
                          <Typography className={classes.taskSubTitle}>
                            {item.subTitle}
                          </Typography>
                        </Box>
                      </Stack>
                    </Box>
                  ))}
                </Box>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={12} md={3} lg={3}>
              <Paper
                sx={{ p: "1rem", backgroundColor: "#f3f2f7", height: "64.8vh" }}
              >
                {showTask ? <TaskDetails details={taskDetails} /> : null}
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};
export default Dashboard;

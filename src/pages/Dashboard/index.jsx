import React, { useEffect, useState, memo } from "react";

import { getMeetingsList, deleteMeetingApi } from "../../services/request";

import employee from "../../Images/employee.png";
import cloud from "../../Images/CLoud.png";
import crane from "../../Images/crane.png";
import { makeStyles } from "@mui/styles";
import TaskDetails from "./TaskDetails";
import CreateNewTask from "./CreateNewTask";
import DirectContact from "./DirectContact";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import ContactPageIcon from "@mui/icons-material/ContactPage";
import {
  Grid,
  Box,
  IconButton,
  Stack,
  Paper,
  Typography,
  Tooltip,
  DialogContent,
  DialogActions,
  Button,
  Divider,
} from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import MuiDialog from "../../components/MuiDialog";
import { useTranslation } from "react-i18next";

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
    width: "inherit",
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

const contactList = [
  {
    name: "Fuad Hossain",
    role: "Architect",
    mail: "Fuad123@gmail.com",
    mobile: "1234567890",
  },
  {
    name: "Ganesh",
    role: "Architect",
    mail: "ganesh123@gmail.com",
    mobile: "1234567890",
  },
  {
    name: "Srikanth",
    role: "Architect",
    mail: "Srikanth123@gmail.com",
    mobile: "1234567890",
  },
  {
    name: "Mayuran",
    role: "Architect",
    mail: "Fuad123@gmail.com",
    mobile: "1234567890",
  },
];

const label = { inputProps: { "aria-label": "Checkbox demo" } };

const Dashboard = () => {
  const { t } = useTranslation();
  const userId = localStorage.getItem("userId");
  const userFirstName = localStorage.getItem("userFirstName");
  const classes = useStyle();
  const [show, setShow] = useState("Direct Contact");
  const [taskDetails, setTaskDetails] = useState(null);
  const [detailsList, setDetailsList] = useState([]);
  const [openCancle, setOpenCancle] = useState(false);
  const [cancleItem, setCancleItem] = useState(null);
  const [contactDetails, setContactDetails] = useState([]);

  const handleShowDetails = (item) => {
    if (item) {
      setTaskDetails({ ...item });
      setShow("Details");
    }
  };
  const handleHideDetails = () => {
    setTaskDetails(null);
    setShow("Direct Contact");
  };

  const handleShowTaskForm = () => {
    setTaskDetails(null);
    setShow("Add Task");
  };

  const getAllTasksList = () => {
    if (userId) {
      getMeetingsList(userId)
        .then((res) => {
          if (res.status === 200) {
            console.log("res", res);
            setDetailsList([...res.data]);
            setContactDetails([...contactList]);
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

  const handleCancleTask = (event, item) => {
    event.stopPropagation();
    setOpenCancle(true);
    setCancleItem({ ...item });
  };

  const handleCloseCancleModel = () => {
    setOpenCancle(false);
  };

  const handleYesModel = () => {
    deleteMeetingApi(cancleItem?._id)
      .then((res) => {
        if (res.status === 200) {
          console.log("res", res);
          getAllTasksList();
          setOpenCancle(false);
        }
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

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
              <Typography
                variant="h5"
                color="#fff"
                fontWeight="600"
                textTransform="capitalize"
              >
                {t("hi", { name: userFirstName })}
              </Typography>
              <Typography variant="p" color="#fff" fontSize={15}>
                {t("you_completed")}
              </Typography>
            </Grid>
            <Grid item xs={2} sx={{ width: "6rem", textAlign: "end" }}>
              <img src={crane} alt="crane" className={classes.craneImg} />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={8} lg={8}>
              <Paper sx={{ p: "0.75rem", backgroundColor: "#f3f2f7" }}>
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
                    {t("today's_tasks")}
                  </Typography>
                  <Box>
                    <IconButton
                      color="primary"
                      size="small"
                      onClick={handleShowTaskForm}
                    >
                      <Tooltip title={t("create_task")}>
                        <AddCircleIcon />
                      </Tooltip>
                    </IconButton>
                    <IconButton
                      color="primary"
                      size="small"
                      onClick={handleHideDetails}
                    >
                      <Tooltip title={t("direct_contacts")}>
                        <ContactPageIcon />
                      </Tooltip>
                    </IconButton>
                  </Box>
                </Stack>
                <Box sx={{ height: "55vh", overflowY: "auto", p: "5px" }}>
                  {detailsList?.map((item, i) => (
                    <Box
                      className={classes.taskList}
                      sx={{
                        backgroundColor:
                          item?._id === taskDetails?._id ? "#fff" : "#e6e5ea",
                      }}
                      key={item?.meetingTitle}
                      onClick={() => handleShowDetails(item)}
                    >
                      <Stack
                        direction="row"
                        justifyContent="flex-start"
                        alignItems="center"
                        spacing={2}
                      >
                        <IconButton
                          size="small"
                          onClick={(event) => handleCancleTask(event, item)}
                        >
                          <CancelIcon />
                        </IconButton>
                        <Box className={classes.timeWapper}>
                          <Typography className={classes.timeText}>
                            {item.startTime}
                          </Typography>
                        </Box>
                        <Box>
                          <Typography className={classes.taskTitle}>
                            {item.title}
                          </Typography>
                          <Typography className={classes.taskSubTitle}>
                            {item.description}
                          </Typography>
                        </Box>
                      </Stack>
                    </Box>
                  ))}
                </Box>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4}>
              <Paper
                sx={{
                  p: "0.75rem",
                  backgroundColor: "#f3f2f7",
                  height: "64vh",
                }}
              >
                {show === "Direct Contact" ? (
                  <DirectContact list={contactDetails} />
                ) : show === "Add Task" ? (
                  <CreateNewTask getAllTasksList={getAllTasksList} />
                ) : (
                  <TaskDetails details={taskDetails} />
                )}
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <MuiDialog
        open={openCancle}
        handleClose={handleCloseCancleModel}
        id={"cancelTask"}
        title={t("cancel_task")}
      >
        <Divider />
        <DialogContent>
          <Typography fontSize={14} fontWeight={500}>
            Are you sure You want to Cancel{" "}
            <Typography
              variant="span"
              fontWeight={600}
              sx={{ textDecoration: "underline" }}
            >
              {cancleItem?.title}{" "}
            </Typography>{" "}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleCloseCancleModel}>
            No
          </Button>
          <Button onClick={handleYesModel} autoFocus>
            Yes
          </Button>
        </DialogActions>
      </MuiDialog>
    </>
  );
};
export default Dashboard;

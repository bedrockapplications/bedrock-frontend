import React, { useEffect, useState, useContext, useCallback } from "react";

import {
  getMeetingsList,
  deleteMeetingApi,
  createContactApi,
  getContactsList,
} from "../../services/request";

import employee from "../../Images/employee1.png";
// import cloud from "../../Images/CLoud.png";
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
  TextField,
} from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import MuiDialog from "../../components/MuiDialog";
import { useTranslation } from "react-i18next";
import noDataImg from "../../Images/NoData.png";

import MuiTextField from "../../components/Formik/MuiTextField";
import moment from "moment";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import { GlobalState } from "../../Context/Context";
import PremiumDailog from "../../components/premiumDailog";
import FormCreateNewTask from "./FormCreateNewTask";
import CreateUserForm from "./CreateUserForm";
import ChatBox from "../../components/Chat/chat";
import noTasks from "../../Images/noTasks.svg";

//Please Dont remove this imports
// import MuiDatePicker from "../../components/Formik/MuiDatePicker";
// import MuiTimePicker from "../../components/Formik/MuiTimePicker";
// import MuiTextArea from "../../components/Formik/MuiTextArea";
// import { createMeetingApi } from "../../services/request";
// import MuiFileUpload from "../../components/Formik/MuiFileUpload";
// import CloudUploadIcon from "@mui/icons-material/CloudUpload";
// import InputAdornment from "@mui/material/InputAdornment";
// import MuiSelectField from "../../components/Formik/MuiSelectField";

const useStyle = makeStyles(() => ({
  employeeImg: {
    width: "10rem",
    height: "6.5rem",
    // background: `url(${cloud})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    position: "relative",
  },
  personimg: {
    position: "absolute",
    top: "-15px",
    left: "20px",
    height: "120px",
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
    fontSize: "1.25rem",
    fontWeight: "500",
    fontStyle: "normal",
    lineHeight: "30px",
    color: "rgba(28, 28, 30, 0.85)",
  },
  taskSubTitle: {
    fontSize: "0.75rem",
    fontWeight: "500",
    fontStyle: "normal",
    lineHeight: "18px",
    color: "#3A3A3D",
    opacity: 0.9,
  },
  timeText: {
    fontSize: "1rem",
    fontWeight: "400",
    fontStyle: "normal",
    lineHeight: "24px",
    color: "#48484A",
  },
  timeWapper: {
    width: "5rem",
    marginLeft: "0px !important",
    textAlign: "center",
  },
  titleText: {
    fontSize: "1.5rem",
    fontWeight: "700",
    fontStyle: "normal",
    lineHeight: "36px",
    color: "#3A3A3C",
  },
  chatTitle: {
    fontWeight: "700",
    fontSize: "1.2rem",
    lineHeight: "36px",
    color: "#3A3A3C",
  },
  personText: {
    fontSize: "1.5rem",
    fontWeight: "700",
    fontStyle: "normal",
    lineHeight: "36px",
    color: "#fff",
    textTransform: "capitalize",
  },
  messageText: {
    width: "532px",
    fontSize: "0.75rem",
    fontWeight: "500",
    fontStyle: "normal",
    lineHeight: "18px",
    color: "#FFF",
  },
  flow: {
    animation: "slide-left .4s forwards",
    transform: "translateX(20%)",
  },
  flowright: {
    animation: "slide-right .4s forwards",
    transform: "translateX(-50%)",
  },
  avatar: {
    borderRadius: "15px",
    border: "3px solid #000",
    filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))",
    margin: "0px 10px",
  },
  messageBox: {
    height: "42vh",
    overflow: "hidden scroll",
  },
  messageInputBox: {
    height: "10vh",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  msgInput: {
    width: "100%",
    height: "100%",
    padding: "10px 15px",
    border: "none",
    fontWeight: "700",
    fontSize: "14px",
    lineHeight: "18px",
    color: "#3A3A3C",
    background: "#FFFFFF",
    borderRadius: "5px",
    outline: "none",
  },
  msgicon: {
    height: "33px",
    width: "33px",
    cursor: "pointer",
    "&:hover": {
      transform: "scale(1.1)",
      transition: "cubic-bezier(0.215, 0.610, 0.355, 1)",
    },
  },
  upload: {
    display: "none",
  },
  fieldWrappper: {
    position: "relative",
  },
  errorText: {
    position: "absolute",
    left: 0,
    top: "40px",
    fontSize: "12px",
    color: "rgb(244, 67, 54)",
  },
  noteText: {
    position: "absolute",
    left: 0,
    top: "90px",
    fontSize: "12px",
    color: "rgb(244, 67, 54)",
  },
}));

const userValidationSchema = Yup.object().shape({
  firstName: Yup.string().min(2).max(20).required().nullable(),
  lastName: Yup.string().min(2).max(20).required().nullable(),
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .min(2)
    .max(20)
    .required("Password is required")
    .nullable(),
  role: Yup.string().required().nullable(),
  phNumber: Yup.string().min(10).required().nullable(),
  address: Yup.string().min(2).max(20).required().nullable(),
});

const contactList = [
  {
    name: "Fuad Hossain",
    role: "Architect",
    mail: "Fuad123@gmail.com",
    mobile: "1234567890",
  },
  {
    name: "Rajesh",
    role: "Architect",
    mail: "Rajesh456@gmail.com",
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
  let userRole = localStorage.getItem("role");
  const userFirstName = localStorage.getItem("userFirstName");
  const classes = useStyle();
  const {
    selectedChat,
    setSelectedChat,
    popen,
    openUserForm,
    setOpenUserForm,
    list,
    setList,
    show,
    setShow,
    taskDetails,
    setTaskDetails,
    setIsLoading,
  } = useContext(GlobalState);
  const [detailsList, setDetailsList] = useState([]);
  const [openCancle, setOpenCancle] = useState(false);
  const [cancleItem, setCancleItem] = useState(null);
  const [contactDetails, setContactDetails] = useState([]);
  const [openForm, setOpenForm] = useState(false);
  const [msgInput, setMsgInput] = useState("");

  // useEffect(() => {
  //   console.log(msgInput);
  // }, [msgInput]);

  const handleCloseForm = useCallback(() => {
    setOpenForm(false);
  }, []);

  const handleCloseUserForm = useCallback(() => {
    setOpenUserForm(false);
  }, []);

  const getAllTasksList = useCallback(() => {
    if (userId) {
      getMeetingsList(userId, moment(new Date()).format("YYYY-MM-DD"))
        .then((res) => {
          if (res.status === 200) {
            setDetailsList([...res.data]);
            setIsLoading(false);
          }
        })
        .catch((error) => {
          console.log("error", error);
          setIsLoading(false);
        });
    }
  }, []);

  const getAllContactsList = useCallback(() => {
    if (userRole === "Owner") {
      getContactsList(userId, "Contractor")
        .then((res) => {
          if (res.status === 200) {
            if (res.data.length > 0) {
              setContactDetails([...res.data]);
            } else {
              setContactDetails([]);
            }
            setOpenUserForm(false);
            setIsLoading(false);
          }
        })
        .catch((error) => {
          console.log("error", error);
          setOpenUserForm(false);
          setIsLoading(false);
        });
    }
  }, []);

  useEffect(() => {
    setIsLoading(true);
    getAllTasksList();
    getAllContactsList();
  }, []);

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
    // setTaskDetails(null);
    // setShow("Add Task");
    setOpenForm(true);
  };

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
              paddingLeft: "7rem",
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
              <Typography className={classes.personText}>
                {t("hi", { name: userFirstName })}
              </Typography>
              {/* <Typography className={classes.messageText}>
                {t("you_completed")}
              </Typography> */}
            </Grid>
            <Grid item xs={2} sx={{ width: "6rem", textAlign: "end" }}>
              <img src={crane} alt="crane" className={classes.craneImg} />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={8} lg={8}>
              <Paper sx={{ p: "0.75rem", backgroundColor: "#f3f2f7", position:"relative", overflowX:"hidden" }}>
                {/* {Object.keys(selectedChat).length === 0 ? */}
                <Box className={classes.flowright}>
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Typography className={classes.titleText}>
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
                    </Box>
                  </Stack>
                  <Box sx={{ height: "57vh", overflowY: "auto", p: "5px" }}>
                    {detailsList.length > 0 ? (
                      detailsList?.map((item, i) => (
                        <Box
                          className={classes.taskList}
                          sx={{
                            backgroundColor:
                              item?._id === taskDetails?._id
                                ? "#fff"
                                : "#e6e5ea",
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
                      ))
                    ) : (
                      <Box
                        sx={{
                          height: "100%",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <img
                          src={noTasks}
                          alt=""
                          style={{ width: "75px", opacity: "0.6" }}
                        />

                        <Typography
                          sx={{
                            fontSize: "20px",
                            marginLeft: "1.5rem",
                            color: "#3A3A3C",
                            fontWeight: "700",
                            lineHeight: "30px",
                            opacity: 0.7,
                          }}
                        >
                          No Tasks are Planned yet !
                        </Typography>
                      </Box>
                    )}
                  </Box>
                </Box>
                {/* :
                <ChatBox />
                } */}
              </Paper>
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4}>
              <Paper
                sx={{
                  p: "0.75rem",
                  backgroundColor: "#f3f2f7",
                  height: "66vh",
                }}
              >
                {show === "Direct Contact" ? (
                  <DirectContact contactList={contactDetails} />
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
      <FormCreateNewTask
        open={openForm}
        handleCloseForm={handleCloseForm}
        getAllTasksList={getAllTasksList}
      />
      <CreateUserForm
        handleCloseUserForm={handleCloseUserForm}
        getAllContactsList={getAllContactsList}
      />
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

      {/* <MuiDialog
        open={openUserForm}
        handleClose={handleCloseUserForm}
        id={"createUser"}
        title={"Create Contact"}
        maxWidth={"sm"}
      >
        <Divider />
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Formik
                initialValues={{
                  Firstname: "",
                  Lastname: "",
                  email: "",
                  password: "",
                  phNumber: "",
                }}
                onSubmit={(values, { setSubmitting, resetForm }) => {
                  // console.log("values", values);
                  handleCreateNewUser(values, setSubmitting, resetForm);
                }}
              >
                {({ values, isValid, isSubmitting, setFieldValue }) => (
                  <Form>
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <MuiTextField
                          name="Firstname"
                          id="Firstname"
                          label={"First Name"}
                          required={true}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <MuiTextField
                          name="Lastname"
                          id="Lastname"
                          label={"Last Name"}
                          required={true}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <MuiTextField
                          name="email"
                          id="email"
                          label={"Email"}
                          required={true}
                        />
                      </Grid>

                      <Grid item xs={6}>
                        <MuiTextField
                          name="password"
                          id="password"
                          label={"Password"}
                          required={true}
                          type="password"
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <MuiTextField
                          name="phNumber"
                          id="phNumber"
                          label={"Phone Number"}
                          required={true}
                          type="number"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Button
                          color="primary"
                          variant="contained"
                          type="submit"
                          sx={{ textTransform: "capitalize", float: "right" }}
                        >
                          Create New User
                        </Button>
                      </Grid>
                    </Grid>
                  </Form>
                )}
              </Formik>
            </Grid>
          </Grid>
        </DialogContent>
      </MuiDialog> */}
      <>{popen ? <PremiumDailog /> : ""}</>
    </>
  );
};
export default Dashboard;

// const list = [
//   {
//     time: "8:00 AM",
//     meetingTitle: "City of Atlanta Inspection",
//     subTitle: "Meet them at the gallery first; then take them to lunch",
//     isChecked: false,
//   },
//   {
//     time: "10:00 AM",
//     meetingTitle: "Fire Dept Inspection",
//     subTitle: "",
//     isChecked: false,
//   },
//   {
//     time: "3:00 PM",
//     meetingTitle: "Prepare for Full Team Meeting Tomorrow",
//     subTitle: "",
//     isChecked: false,
//   },
//   {
//     time: "6:00 PM",
//     meetingTitle: "Complete Daily Log before Closing Out",
//     subTitle: "",
//     isChecked: false,
//   },
// ];

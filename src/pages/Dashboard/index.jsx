import React, { useEffect, useState, memo, useRef, useContext } from "react";
import InputEmoji from "react-input-emoji";

import { getMeetingsList, deleteMeetingApi, createContactApi, getContactsList } from "../../services/request";
import { allMessages } from "./messages";

import employee from "../../Images/employee.png";
import send from "../../Images/send.svg";
import attach from "../../Images/attach.svg";
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
  TextField,
} from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import MuiDialog from "../../components/MuiDialog";
import { useTranslation } from "react-i18next";
import noDataImg from "../../Images/NoData.png";

//ned to after
import MuiDatePicker from "../../components/Formik/MuiDatePicker";
import MuiTimePicker from "../../components/Formik/MuiTimePicker";
import MuiTextArea from "../../components/Formik/MuiTextArea";
import { createMeetingApi } from "../../services/request";
import MuiTextField from "../../components/Formik/MuiTextField";
import moment from "moment";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import MuiFileUpload from "../../components/Formik/MuiFileUpload";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import InputAdornment from "@mui/material/InputAdornment";
import { GlobalState } from "../../Context/Context";
import Avatar from "@mui/material/Avatar";
import Profile from "../../Images/avatar.png";
import PremiumDailog from "../../components/premiumDailog";
import MuiSelectField from "../../components/Formik/MuiSelectField";

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

const validationSchema = Yup.object().shape({
  taskName: Yup.string().required().nullable(),
  startDate: Yup.string().required().nullable(),
  endDate: Yup.string().required().nullable(),
  startTime: Yup.string().required().nullable(),
  endTime: Yup.string().required().nullable(),
  partiesInvolved: Yup.string().required().nullable(),
  notes: Yup.string().required().nullable(),
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
  const inputRef = useRef(null);
  const userId = localStorage.getItem("userId");
  const userFirstName = localStorage.getItem("userFirstName");
  const classes = useStyle();
  const {
    selectedChat,
    setSelectedChat,
    popen,
    openUserForm,
    setOpenUserForm,
    list, setList
  } = useContext(GlobalState);
  const [show, setShow] = useState("Direct Contact");
  const [taskDetails, setTaskDetails] = useState(null);
  const [detailsList, setDetailsList] = useState([]);
  const [openCancle, setOpenCancle] = useState(false);
  const [cancleItem, setCancleItem] = useState(null);
  const [contactDetails, setContactDetails] = useState([]);
  const [openForm, setOpenForm] = useState(false);
  const [msgInput, setMsgInput] = useState("");

  useEffect(() => {
    console.log(msgInput);
  }, [msgInput]);

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

  const handleCloseForm = () => {
    setOpenForm(false);
  };

  const handleCloseUserForm = () => {
    setOpenUserForm(false);
  };

  const getAllTasksList = () => {
    if (userId) {
      getMeetingsList(userId, moment(new Date()).format("YYYY-MM-DD"))
        .then((res) => {
          if (res.status === 200) {
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
          getAllTasksList();
          setOpenCancle(false);
        }
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  const handleClick = () => {
    // 👇️ open file input box on click of other element
    inputRef.current.click();
  };

  const handleCreateNewUser = (values, setSubmitting, resetForm) => {
    let obj = {
      firstName: values.Firstname,
      lastName: values.Lastname,
      email: values.email,
      password: values.password,
      phoneNumber: values.phNumber,
      ownerId: localStorage.getItem("userId"),
    };
    console.log(obj)
    createContactApi(obj)
        .then((res) => {
          console.log(res)
          if (res.status === 200) {
            let ownerId = localStorage.getItem("userId");
            let role = localStorage.getItem("role");
            if(role === "Owner"){
              getContactsList(ownerId, "Contractor")
                .then((res) => {
                  if (res.status === 200) {
                    console.log(res)
                    if (res?.data?.length > 0) {
                      setList([...res?.data]);
                    } else {
                      setList([]);
                    }
                    setOpenUserForm(false)
                  }
                })
                .catch((error) => {
                  let errorObj = error;
                  console.log(errorObj);
                  setOpenUserForm(false)
                });
            }
          }
        })
        .catch((error) => {
          let errorObj = error;
          console.log(errorObj);
        });
  };

  // const handleCreateNewUser = (values, setSubmitting, resetForm) => {
  //   console.log("values", values.email);
  //   let obj = {
  //     firstName: "swaroop",
  //     lastName: "Ravuri",
  //     email: values.email,
  //     password: "swaroop123@",
  //     phoneNumber: "9949957772",
  //     ownerId: "638dfd5d341004a22e73e577",
  //   };
  //   console.log(obj, "jjjj");
  // };

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
              <Paper sx={{ p: "0.75rem", backgroundColor: "#f3f2f7" }}>
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
                        <img src={noDataImg} alt="" />
                      </Box>
                    )}
                  </Box>
                </Box>
                {/* :
                <Box className={classes.flow} sx={{background:"#E5E5EA"}}>
                  <Stack
                  direction="row"
                  // justifyContent="space-between"
                  alignItems="center"
                >
                    <IconButton
                      size="small"
                      onClick={(event) => setSelectedChat({})}
                    >
                      <ArrowBackIosIcon />
                    </IconButton>
                    <Avatar alt="" src={Profile} className={classes.avatar} />
                    <Typography className={classes.chatTitle}>
                      {Object.keys(selectedChat).length > 0 ? `${selectedChat.name} | ${selectedChat.role}` : ""}
                    </Typography>
                  </Stack>
                  <Box sx={{ height: "55vh", overflowY: "auto", margin: "1vh 2rem", background: "#F2F2F7", p:"0.75rem", borderRadius:"5px", display:"flex", flexDirection:"column", justifyContent:"space-around" }}>
                    <Box className={classes.messageBox}>
                      {allMessages.filter(element => {
                          return(
                              element.sender === selectedChat.name || element.reciever === selectedChat.name
                          )
                      }).map((each, i) => {
                        return(
                          <Box sx={{textAlign: each.sender === selectedChat.name ? "left" : "Right", display:"flex", flexDirection:"column", alignItems: each.sender === selectedChat.name ? "flex-start" : "flex-end"}}>
                            <Box sx={{background: each.sender === selectedChat.name ? "#3A3A3C" : "white", color: each.sender === selectedChat.name ? "white" : "#3A3A3C", padding:"10px 15px", borderRadius:"5px", margin:"10px", width:"fit-content"}}>{each.message}</Box>
                            <Box sx={{margin:"0px 10px", color:"#3A3A3C"}}>{each.time}</Box>
                          </Box>
                        )
                      })
                    }
                    </Box>
                    <Box className={classes.messageInputBox}>
                      <Grid container spacing={1} sx={{display:"flex", justifyContent:"space-between", alignItems:"center", height:"100%", width:"100%"}}>
                        <Grid item xs={10}>
                          
                          <InputEmoji
                            value={msgInput}
                            onChange={setMsgInput}
                            // cleanOnEnter
                            // onEnter={handleOnEnter}
                            placeholder="Send Message"
                            className={classes.msgInput}
                          />
                        </Grid>
                        <Grid item xs={1}>
                          
                           <label for="file-input">
                            <img src={attach} alt=""
                            className={classes.msgicon}/>
                          </label>

                          <input className={classes.upload} id="file-input" type="file" />
                        </Grid>
                        <Grid item xs={1}>
                          <img
                            src={send}
                            alt=""
                            className={classes.msgicon}
                          />
                        </Grid>
                      </Grid>
                    </Box>
                  </Box>
                </Box>
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
      <MuiDialog
        open={openForm}
        handleClose={handleCloseForm}
        id={"createTask"}
        title={t("create_task")}
        maxWidth={"sm"}
      >
        <Divider />
        <DialogContent>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Formik
                initialValues={{
                  taskName: "",
                  startDate: null,
                  endDate: null,
                  startTime: null,
                  endTime: null,
                  partiesInvolved: "",
                  notes: "",
                  attachment: null,
                  fileName: "",
                }}
                enableReinitialize
                validationSchema={validationSchema}
                onSubmit={(values, { setSubmitting, resetForm }) => {
                  let fileUploaded = values.attachment;
                  let formData = new FormData();
                  formData.append("attachment", fileUploaded);
                  formData.append("title", values.taskName);
                  formData.append("description", values.notes);
                  formData.append(
                    "startDate",
                    moment(values.startDate).format("YYYY-MM-DD")
                  );
                  formData.append(
                    "endDate",
                    moment(values.endDate).format("YYYY-MM-DD")
                  );
                  formData.append(
                    "startTime",
                    moment(values.startTime).format("hh:mm A")
                  );
                  formData.append(
                    "endTime",
                    moment(values.endTime).format("hh:mm A")
                  );
                  formData.append("userId", userId);
                  createMeetingApi(formData)
                    .then((res) => {
                      if (res.status === 200) {
                        getAllTasksList();
                        resetForm();
                        setSubmitting(false);
                        setOpenForm(false);
                      }
                    })
                    .catch((error) => {
                      console.log("error", error);
                      setSubmitting(false);
                    });
                }}
              >
                {({ values, isValid, isSubmitting, setFieldValue }) => (
                  <Form>
                    <Grid container spacing={3}>
                      <Grid item xs={12}>
                        <MuiTextField
                          name="taskName"
                          id="taskName"
                          label={t("task_name")}
                          required={true}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <MuiDatePicker
                          name="startDate"
                          id="startDate"
                          label={t("start_date")}
                          disablePast
                          value={values?.startDate}
                          required={true}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <MuiDatePicker
                          name="endDate"
                          id="endDate"
                          label={t("end_date")}
                          disablePast
                          disabled={values?.startDate === null}
                          minDate={values?.startDate}
                          value={values?.endDate}
                          required={true}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <MuiTimePicker
                          name="startTime"
                          id="startTime"
                          label={t("start_time")}
                          disablePast
                          value={values?.startTime}
                          required={true}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <MuiTimePicker
                          name="endTime"
                          id="endTime"
                          label={t("end_time")}
                          disablePast
                          value={values?.endTime}
                          required={true}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <input
                          id="attachment"
                          name="attachment"
                          type="file"
                          ref={inputRef}
                          style={{ display: "none" }}
                          onChange={(event) => {
                            setFieldValue(
                              "attachment",
                              event.currentTarget.files[0]
                            );
                            setFieldValue(
                              "fileName",
                              event.currentTarget.files[0].name
                            );
                          }}
                        />
                        <TextField
                          id="fileName"
                          name="fileName"
                          fullWidth
                          size="small"
                          label={t("attachments")}
                          value={values.fileName}
                          required
                          inputProps={{ readOnly: true }}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton size="small" onClick={handleClick}>
                                  <CloudUploadIcon />
                                </IconButton>
                              </InputAdornment>
                            ),
                          }}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <MuiTextField
                          name="partiesInvolved"
                          id="partiesInvolved"
                          label={t("parties_involved")}
                          required={true}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <MuiTextArea
                          name="notes"
                          id="notes"
                          label={t("notes")}
                        />
                      </Grid>
                      <Grid item xs={12} sx={{ textAlign: "right" }}>
                        <Button
                          variant="contained"
                          type="submit"
                          size="small"
                          disabled={!isValid || isSubmitting}
                        >
                          {t("create_task")}
                        </Button>
                      </Grid>
                    </Grid>
                  </Form>
                )}
              </Formik>
            </Grid>
          </Grid>
        </DialogContent>
      </MuiDialog>
      <MuiDialog
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
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <MuiTextField
                          name="phNumber"
                          id="phNumber"
                          label={"Phone Number"}
                          required={true}
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
      </MuiDialog>
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

{
  /* <Formik
                  initialValues={{
                    Firstname: "",
                    Lastname: "",
                    email: "",
                    password: "",
                    // role: "",
                    phNumber: "",
                    // address: "",
                  }}
                  enableReinitialize
                  validationSchema={userValidationSchema}
                  onSubmit={(values, { setSubmitting, resetForm }) => {
                    console.log("values", values);
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
                        />
                      </Grid>
                      {/* <Grid item xs={12}>
                        <MuiSelectField
                          name="role"
                          id="role"
                          label={"Role"}
                          options={["Owner", "User"]}
                          required={true}
                        />
                      </Grid> */
}
// <Grid item xs={6}>
//   <MuiTextField
//     name="phNumber"
//     id="phNumber"
//     label={"Phone Number"}
//     required={true}
//   />
// </Grid>
{
  /* <Grid item xs={6}>
                        <MuiTextField
                          name="address"
                          id="address"
                          label={"Address"}
                          required={true}
                        />
                      </Grid> */
}

//       <Grid item xs={12} />
//       <Grid item xs={12}>
//         <Button
//           color="primary"
//           variant="contained"
//           type="submit"
//           sx={{ textTransform: "capitalize", float: "right" }}
//         >
//           Create New User
//         </Button>
//       </Grid>
//     </Grid>
//   </Form>
//   )}
// </Formik> */}

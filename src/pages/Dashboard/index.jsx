import React, { useEffect, useState, memo, useRef, useContext } from "react";

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
  TextField,
} from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
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
  chatTitle:{
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
  flow:{
    animation: "slide-left .4s forwards",
    transform: "translateX(20%)",
  },
  flowright:{
    animation: "slide-right .4s forwards",
    transform: "translateX(-50%)",
  },
  avatar: {
    borderRadius: "15px",
    border: "3px solid #000",
    filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))",
    margin: "0px 10px"
  },
}));

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
  const inputRef = useRef(null);
  const userId = localStorage.getItem("userId");
  const userFirstName = localStorage.getItem("userFirstName");
  const classes = useStyle();
  const { selectedChat, setSelectedChat } = useContext(GlobalState);
  const [show, setShow] = useState("Direct Contact");
  const [taskDetails, setTaskDetails] = useState(null);
  const [detailsList, setDetailsList] = useState([]);
  const [openCancle, setOpenCancle] = useState(false);
  const [cancleItem, setCancleItem] = useState(null);
  const [contactDetails, setContactDetails] = useState([]);
  const [openForm, setOpenForm] = useState(false);

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
              <Typography className={classes.messageText}>
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
              <Paper sx={{ p: "0.75rem", backgroundColor: "#E5E5EA" }}>
                {Object.keys(selectedChat).length === 0 ?
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
                <Box sx={{ height: "57vh", overflowY: "auto", p: "5px" }}>
                  {detailsList.length > 0 ? (
                    detailsList?.map((item, i) => (
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
                :
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
                  <Box sx={{ height: "55vh", overflowY: "auto", margin: "1vh 2rem", background: "#F2F2F7", p:"0.75rem", borderRadius:"5px" }}></Box>
                </Box>
                }
                
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

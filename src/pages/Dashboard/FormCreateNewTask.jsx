import React, { useState, useRef, memo, useContext } from "react";
import { Formik, Form, ErrorMessage } from "formik";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";
import { createMeetingApi } from "../../services/request";
import { ShowSnackbar } from "../../components/Snackbar";
import { GlobalState } from "../../Context/Context";

import {
  Grid,
  Box,
  IconButton,
  DialogContent,
  Button,
  Divider,
  TextField,
} from "@mui/material";
import moment from "moment";
import { makeStyles } from "@mui/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import InputAdornment from "@mui/material/InputAdornment";

import MuiDialog from "../../components/MuiDialog";
import MuiTextArea from "../../components/Formik/MuiTextArea";
import MuiTimePicker from "../../components/Formik/MuiTimePicker";
import MuiDatePicker from "../../components/Formik/MuiDatePicker";
import MuiTextField from "../../components/Formik/MuiTextField";

const useStyle = makeStyles(() => ({
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

const validationSchema = Yup.object().shape({
  taskName: Yup.string().required("Task Name is a required").trim().nullable(),
  startDate: Yup.string()
    .required("Start Date is a required")
    .trim()
    .nullable(),
  endDate: Yup.string().required("End Date is a required").trim().nullable(),
  startTime: Yup.string()
    .required("Start Time is a required")
    .trim()
    .nullable(),
  endTime: Yup.string().required("End Time is a required").trim().nullable(),
  partiesInvolved: Yup.string()
    .required("Parties Involved is a required")
    .trim()
    .nullable(),
  notes: Yup.string().required("Notes is a required").trim().nullable(),
  fileName: Yup.string().required().trim().nullable(),
});

const FormCreateNewTask = (props) => {
  const { open, handleCloseForm, getAllTasksList } = props;
  const classes = useStyle();
  const { t } = useTranslation();
  const inputRef = useRef(null);
  const userId = localStorage.getItem("userId");

  const { setIsLoading } = useContext(GlobalState);

  const handleClick = () => {
    inputRef?.current?.click();
  };

  return (
    <>
      <MuiDialog
        open={open}
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
                  setIsLoading(true);
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
                    moment(values.startTime).format("HH:mm")
                  );
                  formData.append(
                    "endTime",
                    moment(values.endTime).format("HH:mm")
                  );
                  formData.append("userId", userId);

                  console.log("formData", formData);

                  createMeetingApi(formData)
                    .then((res) => {
                      if (res.status === 200) {
                        getAllTasksList();
                        resetForm();
                        setSubmitting(false);
                        handleCloseForm();
                        ShowSnackbar("success", "Task Created Successfully");
                      }
                    })
                    .catch((error) => {
                      let errorObj = error?.response?.data;
                      ShowSnackbar("error", errorObj?.message);
                      setSubmitting(false);
                      setIsLoading(false);
                    });
                }}
              >
                {({
                  values,
                  isValid,
                  isSubmitting,
                  setFieldValue,
                  errors,
                  touched,
                }) => (
                  <Form>
                    <Grid container spacing={3}>
                      <Grid item xs={12}>
                        <Box className={classes.fieldWrappper}>
                          <MuiTextField
                            name="taskName"
                            id="taskName"
                            label={t("task_name")}
                          />
                          <ErrorMessage
                            name="taskName"
                            component="div"
                            className={classes.errorText}
                          />
                        </Box>
                      </Grid>
                      <Grid item xs={6}>
                        <Box className={classes.fieldWrappper}>
                          <MuiDatePicker
                            name="startDate"
                            id="startDate"
                            label={t("start_date")}
                            disablePast
                            value={values?.startDate}
                          />
                          <ErrorMessage
                            name="startDate"
                            component="div"
                            className={classes.errorText}
                          />
                        </Box>
                      </Grid>
                      <Grid item xs={6}>
                        <Box className={classes.fieldWrappper}>
                          <MuiDatePicker
                            name="endDate"
                            id="endDate"
                            label={t("end_date")}
                            disablePast
                            disabled={values?.startDate === null}
                            minDate={values?.startDate}
                            value={values?.endDate}
                          />
                          <ErrorMessage
                            name="endDate"
                            component="div"
                            className={classes.errorText}
                          />
                        </Box>
                      </Grid>
                      <Grid item xs={6}>
                        <Box className={classes.fieldWrappper}>
                          <MuiTimePicker
                            name="startTime"
                            id="startTime"
                            label={t("start_time")}
                            disablePast
                            value={values?.startTime}
                          />
                          <ErrorMessage
                            name="startTime"
                            component="div"
                            className={classes.errorText}
                          />
                        </Box>
                      </Grid>
                      <Grid item xs={6}>
                        <Box className={classes.fieldWrappper}>
                          <MuiTimePicker
                            name="endTime"
                            id="endTime"
                            label={t("end_time")}
                            disablePast
                            value={values?.endTime}
                          />
                          <ErrorMessage
                            name="endTime"
                            component="div"
                            className={classes.errorText}
                          />
                        </Box>
                      </Grid>
                      <Grid item xs={12}>
                        <Box className={classes.fieldWrappper}>
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
                            // required
                            inputProps={{ readOnly: true }}
                            InputProps={{
                              endAdornment: (
                                <InputAdornment position="end">
                                  <IconButton
                                    size="small"
                                    onClick={handleClick}
                                  >
                                    <CloudUploadIcon />
                                  </IconButton>
                                </InputAdornment>
                              ),
                            }}
                          />
                          <ErrorMessage
                            name="fileName"
                            component="div"
                            className={classes.errorText}
                          />
                        </Box>
                      </Grid>
                      <Grid item xs={12}>
                        <Box className={classes.fieldWrappper}>
                          <MuiTextField
                            name="partiesInvolved"
                            id="partiesInvolved"
                            label={t("parties_involved")}
                          />
                          <ErrorMessage
                            name="partiesInvolved"
                            component="div"
                            className={classes.errorText}
                          />
                        </Box>
                      </Grid>
                      <Grid item xs={12}>
                        <Box className={classes.fieldWrappper}>
                          <MuiTextArea
                            name="notes"
                            id="notes"
                            label={t("notes")}
                          />
                          <ErrorMessage
                            name="notes"
                            component="div"
                            className={classes.noteText}
                          />
                        </Box>
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
export default memo(FormCreateNewTask);

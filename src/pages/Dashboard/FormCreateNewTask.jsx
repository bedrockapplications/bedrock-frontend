import React, { useState, useRef, memo } from "react";
import { Formik, Form, ErrorMessage } from "formik";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";
import { createMeetingApi } from "../../services/request";

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
  taskName: Yup.string().required("Task Name is a required").nullable(),
  startDate: Yup.string().required("Start Date is a required").nullable(),
  endDate: Yup.string().required("End Date is a required").nullable(),
  startTime: Yup.string().required("Start Time is a required").nullable(),
  endTime: Yup.string().required("End Time is a required").nullable(),
  partiesInvolved: Yup.string()
    .required("Parties Involved is a required")
    .nullable(),
  notes: Yup.string().required("Notes is a required").nullable(),
  fileName: Yup.string().required().nullable(),
});

const FormCreateNewTask = (props) => {
  const { open, handleCloseForm, getAllTasksList } = props;
  const classes = useStyle();
  const { t } = useTranslation();
  const inputRef = useRef(null);
  const userId = localStorage.getItem("userId");

  const handleClick = () => {
    inputRef.current.click();
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
                        handleCloseForm();
                      }
                    })
                    .catch((error) => {
                      console.log("error", error);
                      setSubmitting(false);
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
                            required={true}
                            error={errors?.taskName && touched?.taskName}
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
                            required={true}
                            error={errors?.startDate && touched?.startDate}
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
                            required={true}
                            error={errors?.endDate && touched?.endDate}
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
                            required={true}
                            error={errors?.startTime && touched?.startTime}
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
                            required={true}
                            error={errors?.endTime && touched?.endTime}
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
                            required
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
                            required={true}
                            error={
                              errors?.partiesInvolved &&
                              touched?.partiesInvolved
                            }
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
                            error={errors?.notes && touched?.notes}
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

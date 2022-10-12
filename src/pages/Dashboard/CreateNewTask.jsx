import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import MuiTextField from "../../components/Formik/MuiTextField";
import moment from "moment";
import { Grid, Typography, TextField, Box, Button } from "@mui/material";
import MuiDatePicker from "../../components/Formik/MuiDatePicker";
import MuiTimePicker from "../../components/Formik/MuiTimePicker";
import MuiTextArea from "../../components/Formik/MuiTextArea";
import { useTranslation } from "react-i18next";
import { createMeetingApi } from "../../services/request";

const validationSchema = Yup.object().shape({
  taskName: Yup.string().required().nullable(),
  startDate: Yup.string().required().nullable(),
  endDate: Yup.string().required().nullable(),
  startTime: Yup.string().required().nullable(),
  endTime: Yup.string().required().nullable(),
  partiesInvolved: Yup.string().required().nullable(),
  notes: Yup.string().required().nullable(),
});

const CreateNewTask = (props) => {
  const { getAllTasksList } = props;
  const { t } = useTranslation();
  const userId = localStorage.getItem("userId");

  return (
    <Box>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Typography
            variant="h6"
            fontWeight={600}
            sx={{ textShadow: "1px 0px #242b3c" }}
          >
            {t("create_task")}
          </Typography>
        </Grid>
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
            }}
            enableReinitialize
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting, resetForm }) => {
              let payload = {
                title: values.taskName,
                description: values.notes,
                startDate: moment(values.startDate).format("YYYY-MM-DD"),
                endDate: moment(values.endDate).format("YYYY-MM-DD"),
                startTime: moment(values.startTime).format("hh:mm A"),
                endTime: moment(values.endTime).format("hh:mm A"),
                userId: userId,
              };
              createMeetingApi(payload)
                .then((res) => {
                  if (res.status === 200) {
                    getAllTasksList();
                    resetForm();
                    setSubmitting(false);
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
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <MuiTextField
                      name="taskName"
                      id="taskName"
                      label={t("task_name")}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <MuiDatePicker
                      name="startDate"
                      id="startDate"
                      label={t("start_date")}
                      disablePast
                      value={values?.startDate}
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
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <MuiTimePicker
                      name="startTime"
                      id="startTime"
                      label={t("start_time")}
                      disablePast
                      value={values?.startTime}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <MuiTimePicker
                      name="endTime"
                      id="endTime"
                      label={t("end_time")}
                      disablePast
                      value={values?.endTime}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <MuiTextField
                      name="partiesInvolved"
                      id="partiesInvolved"
                      label={t("parties_involved")}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <MuiTextArea name="notes" id="notes" label={t("notes")} />
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
    </Box>
  );
};

export default CreateNewTask;

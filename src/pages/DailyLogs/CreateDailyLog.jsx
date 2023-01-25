import React, { useState } from "react";
import { Formik, Form, ErrorMessage } from "formik";
import { makeStyles } from "@mui/styles";

import MuiDatePicker from "../../components/Formik/MuiDatePicker";
import MuiTimePicker from "../../components/Formik/MuiTimePicker";
import MuiTextField from "../../components/Formik/MuiTextField";
import MuiSelectField from "../../components/Formik/MuiSelectField";
import MuiTextArea from "../../components/Formik/MuiTextArea";

import MuiDialog from "../../components/MuiDialog";
import {
  Divider,
  DialogContent,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
  Grid,
  Button,
  DialogActions,
  Box,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";

import weatherApp from "../../Images/weatherApp.svg";

const useStyle = makeStyles(() => ({
  accordionTitle: {
    width: "50%",
    flexShrink: 0,
    fontSize: "1rem",
    fontWeight: "600",
    letterSpacing: "0.02rem",
    lineHeight: "24px",
  },
}));

const CreateDailyLog = (props) => {
  const { open, handleClose, id, title } = props;
  const classes = useStyle();

  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    console.log("panel", panel, isExpanded, event);
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <>
      <MuiDialog
        open={open}
        handleClose={handleClose}
        id={id}
        title={title}
        maxWidth={"md"}
      >
        {/* <Divider /> */}
        <DialogContent dividers>
          <Formik
            initialValues={{
              date: null,
              time: null,
              selectProject: "",
              reportingPerson: "",
              workStatus: "",
              address: "",
              country: "",
              state: "",
              city: "",
              zipcode: "",
            }}
            validationSchema={null}
            onSubmit={(values, { setSubmitting, resetForm }) => {
              console.log("values", values);
            }}
          >
            {({ values, isValid, isSubmitting, handleSubmit }) => (
              <Form onSubmit={handleSubmit}>
                <Accordion
                  expanded={expanded === "dateTime"}
                  onChange={handleChange("dateTime")}
                >
                  <AccordionSummary
                    expandIcon={<AddIcon />}
                    aria-controls="dateTime"
                    id="dateTime"
                  >
                    <Typography className={classes.accordionTitle}>
                      Date & Time
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Grid container spacing={2}>
                      <Grid item xs={3}>
                        <MuiDatePicker
                          name="date"
                          id="date"
                          label={"Date"}
                          disablePast
                          value={values?.Date}
                        />
                      </Grid>
                      <Grid item xs={3}>
                        <MuiTimePicker
                          name="time"
                          id="time"
                          label={"Time"}
                          disablePast
                          value={values?.time}
                        />
                      </Grid>
                      <Grid item xs={12} sx={{ textAlign: "right" }}>
                        <Button variant="contained" type="submit" size="small">
                          Next
                        </Button>
                      </Grid>
                    </Grid>
                  </AccordionDetails>
                </Accordion>
                <Accordion
                  expanded={expanded === "selectProject"}
                  onChange={handleChange("selectProject")}
                >
                  <AccordionSummary
                    expandIcon={<AddIcon />}
                    aria-controls="selectProject"
                    id="selectProject"
                  >
                    <Typography className={classes.accordionTitle}>
                      Select Project
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Grid container spacing={2}>
                      <Grid item xs={4}>
                        <MuiSelectField
                          name="selectProject"
                          id="selectProject"
                          label="Select Project"
                          options={[]}
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <MuiSelectField
                          name="reportingPerson"
                          id="reportingPerson"
                          label="Reporting Person"
                          options={[]}
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <MuiTextField
                          name="workStatus"
                          id="workStatus"
                          label="% of Planned Work Completed Today"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <MuiTextField
                          name="address"
                          id="address"
                          label="Address"
                        />
                      </Grid>
                      <Grid item xs={3}>
                        <MuiTextField
                          name="country"
                          id="country"
                          label="Country"
                        />
                      </Grid>
                      <Grid item xs={3}>
                        <MuiTextField name="state" id="state" label="State" />
                      </Grid>
                      <Grid item xs={3}>
                        <MuiTextField name="city" id="city" label="City" />
                      </Grid>
                      <Grid item xs={3}>
                        <MuiTextField
                          name="zipcode"
                          id="zipcode"
                          label="Zipcode"
                        />
                      </Grid>
                      <Grid item xs={12} sx={{ textAlign: "right" }}>
                        <Button variant="contained" type="submit" size="small">
                          Next
                        </Button>
                      </Grid>
                    </Grid>
                  </AccordionDetails>
                </Accordion>
                <Accordion
                  expanded={expanded === "Weather"}
                  onChange={handleChange("Weather")}
                >
                  <AccordionSummary
                    expandIcon={<AddIcon />}
                    aria-controls="Weather-content"
                    id="Weather-header"
                  >
                    <Typography className={classes.accordionTitle}>
                      Add Observed Weather Conditions
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Grid container spacing={2}>
                      {[1, 2, 3, 4].map((item, i) => (
                        <Grid item xs={3} key={item + i}>
                          <Box
                            sx={{
                              padding: "1rem",
                              textAlign: "center",
                              boxShadow:
                                "inset 0px 1px 4px rgba(0, 0, 0, 0.25)",
                            }}
                          >
                            <img src={weatherApp} alt="" />
                            <Typography>Morning</Typography>
                            <Typography>20° Celsius</Typography>
                          </Box>
                        </Grid>
                      ))}

                      <Grid item xs={12} sx={{ textAlign: "right" }}>
                        <Button variant="contained" type="submit" size="small">
                          Next
                        </Button>
                      </Grid>
                    </Grid>
                  </AccordionDetails>
                </Accordion>{" "}
                <Accordion
                  expanded={expanded === "Schedule"}
                  onChange={handleChange("Schedule")}
                >
                  <AccordionSummary
                    expandIcon={<AddIcon />}
                    aria-controls="Schedule-content"
                    id="Schedule-header"
                  >
                    <Typography className={classes.accordionTitle}>
                      Add Schedule / Plan Change Details
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Grid container spacing={2}>
                      <Grid item xs={3}>
                        <MuiDatePicker
                          name="date"
                          id="date"
                          label={"Date"}
                          disablePast
                          value={values?.Date}
                        />
                      </Grid>
                      <Grid item xs={3}>
                        <MuiTimePicker
                          name="time"
                          id="time"
                          label={"Time"}
                          disablePast
                          value={values?.time}
                        />
                      </Grid>
                      <Grid item xs={12} sx={{ textAlign: "right" }}>
                        <Button variant="contained" type="submit" size="small">
                          Next
                        </Button>
                      </Grid>
                    </Grid>
                  </AccordionDetails>
                </Accordion>{" "}
                <Accordion
                  expanded={expanded === "ManPower"}
                  onChange={handleChange("ManPower")}
                >
                  <AccordionSummary
                    expandIcon={<AddIcon />}
                    aria-controls="ManPower-content"
                    id="ManPower-header"
                  >
                    <Typography className={classes.accordionTitle}>
                      Add ManPower Details
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Grid container spacing={2}>
                      <Grid item xs={3}>
                        <MuiDatePicker
                          name="date"
                          id="date"
                          label={"Date"}
                          disablePast
                          value={values?.Date}
                        />
                      </Grid>
                      <Grid item xs={3}>
                        <MuiTimePicker
                          name="time"
                          id="time"
                          label={"Time"}
                          disablePast
                          value={values?.time}
                        />
                      </Grid>
                      <Grid item xs={12} sx={{ textAlign: "right" }}>
                        <Button variant="contained" type="submit" size="small">
                          Next
                        </Button>
                      </Grid>
                    </Grid>
                  </AccordionDetails>
                </Accordion>{" "}
                <Accordion
                  expanded={expanded === "Inspection"}
                  onChange={handleChange("Inspection")}
                >
                  <AccordionSummary
                    expandIcon={<AddIcon />}
                    aria-controls="Inspection-content"
                    id="Inspection-header"
                  >
                    <Typography className={classes.accordionTitle}>
                      Add Visitor / Inspection Details
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Grid container spacing={2}>
                      <Grid item xs={3}>
                        <MuiDatePicker
                          name="date"
                          id="date"
                          label={"Date"}
                          disablePast
                          value={values?.Date}
                        />
                      </Grid>
                      <Grid item xs={3}>
                        <MuiTimePicker
                          name="time"
                          id="time"
                          label={"Time"}
                          disablePast
                          value={values?.time}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Button variant="contained" type="submit" size="small">
                          Next
                        </Button>
                      </Grid>
                    </Grid>
                  </AccordionDetails>
                </Accordion>{" "}
                <Accordion
                  expanded={expanded === "Inventory"}
                  onChange={handleChange("Inventory")}
                >
                  <AccordionSummary
                    expandIcon={<AddIcon />}
                    aria-controls="Inventory-content"
                    id="Inventory-header"
                  >
                    <Typography className={classes.accordionTitle}>
                      Add Inventory Data
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Grid container spacing={2}>
                      <Grid item xs={3}>
                        <MuiDatePicker
                          name="date"
                          id="date"
                          label={"Date"}
                          disablePast
                          value={values?.Date}
                        />
                      </Grid>
                      <Grid item xs={3}>
                        <MuiTimePicker
                          name="time"
                          id="time"
                          label={"Time"}
                          disablePast
                          value={values?.time}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Button variant="contained" type="submit" size="small">
                          Next
                        </Button>
                      </Grid>
                    </Grid>
                  </AccordionDetails>
                </Accordion>{" "}
                <Accordion
                  expanded={expanded === "On-Site"}
                  onChange={handleChange("On-Site")}
                >
                  <AccordionSummary
                    expandIcon={<AddIcon />}
                    aria-controls="On-Site-content"
                    id="On-Site-header"
                  >
                    <Typography className={classes.accordionTitle}>
                      Add On-Site Issues
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Grid container spacing={2}>
                      <Grid item xs={3}>
                        <MuiDatePicker
                          name="date"
                          id="date"
                          label={"Date"}
                          disablePast
                          value={values?.Date}
                        />
                      </Grid>
                      <Grid item xs={3}>
                        <MuiTimePicker
                          name="time"
                          id="time"
                          label={"Time"}
                          disablePast
                          value={values?.time}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Button variant="contained" type="submit" size="small">
                          Next
                        </Button>
                      </Grid>
                    </Grid>
                  </AccordionDetails>
                </Accordion>{" "}
                <Accordion
                  expanded={expanded === "Photos"}
                  onChange={handleChange("Photos")}
                >
                  <AccordionSummary
                    expandIcon={<AddIcon />}
                    aria-controls="Photos-content"
                    id="Photos-header"
                  >
                    <Typography className={classes.accordionTitle}>
                      Add Photos / Documents / Videos
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Grid container spacing={2}>
                      <Grid item xs={3}>
                        <MuiDatePicker
                          name="date"
                          id="date"
                          label={"Date"}
                          disablePast
                          value={values?.Date}
                        />
                      </Grid>
                      <Grid item xs={3}>
                        <MuiTimePicker
                          name="time"
                          id="time"
                          label={"Time"}
                          disablePast
                          value={values?.time}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Button variant="contained" type="submit" size="small">
                          Next
                        </Button>
                      </Grid>
                    </Grid>
                  </AccordionDetails>
                </Accordion>{" "}
                <Accordion
                  expanded={expanded === "Notes"}
                  onChange={handleChange("Notes")}
                >
                  <AccordionSummary
                    expandIcon={<AddIcon />}
                    aria-controls="Notes-content"
                    id="Notes-header"
                  >
                    <Typography className={classes.accordionTitle}>
                      Notes / Comments
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <MuiTextArea name="notes" id="notes" label={"Notes"} />
                      </Grid>
                      <Grid item xs={12}>
                        <Button variant="contained" type="submit" size="small">
                          Next
                        </Button>
                      </Grid>
                    </Grid>
                  </AccordionDetails>
                </Accordion>
                <Accordion
                  expanded={expanded === "Signature"}
                  onChange={handleChange("Signature")}
                >
                  <AccordionSummary
                    expandIcon={<AddIcon />}
                    aria-controls="Signature-content"
                    id="Signature-header"
                  >
                    <Typography className={classes.accordionTitle}>
                      Add Signature{" "}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Grid container spacing={2}>
                      <Grid item xs={3}>
                        <MuiDatePicker
                          name="date"
                          id="date"
                          label={"Date"}
                          disablePast
                          value={values?.Date}
                        />
                      </Grid>
                      <Grid item xs={3}>
                        <MuiTimePicker
                          name="time"
                          id="time"
                          label={"Time"}
                          disablePast
                          value={values?.time}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Button variant="contained" type="submit" size="small">
                          Next
                        </Button>
                      </Grid>
                    </Grid>
                  </AccordionDetails>
                </Accordion>
              </Form>
            )}
          </Formik>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" type="submit" size="small">
            Submit
          </Button>
        </DialogActions>
      </MuiDialog>
    </>
  );
};

export default CreateDailyLog;

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
  FormGroup,
  FormControlLabel,
  Checkbox,
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
  timeOfDay: {
    fontWeight: "800",
    fontSize: "14px",
    textAlign: "center",
    color: "rgba(58, 58, 60, 0.5)",
  },
  temperature: {
    fontWeight: "900",
    fontSize: "14px",
    textAlign: "center",
    color: "#3A3A3C",
  },
}));

const CreateDailyLog = (props) => {
  const { open, handleClose, id, title } = props;
  const classes = useStyle();

  const weatherData = [
    {
      timeOfDay: "Morning",
      temperature: "20° Fahrenheit",
    },
    {
      timeOfDay: "AfterNoon",
      temperature: "25° Fahrenheit",
    },
    {
      timeOfDay: "Evening",
      temperature: "18° Fahrenheit",
    },
    {
      timeOfDay: "Night",
      temperature: "10° Fahrenheit",
    },
  ];

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
                    expandIcon={<AddIcon sx={{ color: expanded === "dateTime" ? "#FFFFFF" : ""}}/>}
                    aria-controls="dateTime"
                    id="dateTime"
                    sx={{
                      backgroundColor: expanded === "dateTime" ? "#3A3A3C" : "",
                      color: expanded === "dateTime" ? "#FFFFFF" : "",
                    }}
                  >
                    <Typography className={classes.accordionTitle}>
                      Date & Time
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails sx={{paddingTop: "20px"}}>
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
                    expandIcon={<AddIcon sx={{ color: expanded === "selectProject" ? "#FFFFFF" : ""}} />}
                    aria-controls="selectProject"
                    id="selectProject"
                    sx={{
                      backgroundColor: expanded === "selectProject" ? "#3A3A3C" : "",
                      color: expanded === "selectProject" ? "#FFFFFF" : "",
                    }}
                  >
                    <Typography className={classes.accordionTitle}>
                      Select Project
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails sx={{paddingTop: "20px"}}>
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
                    expandIcon={
                      <AddIcon
                        sx={{ color: expanded === "Weather" ? "#FFFFFF" : ""}}
                      />
                    }
                    aria-controls="Weather-content"
                    id="Weather-header"
                    sx={{
                      backgroundColor: expanded === "Weather" ? "#3A3A3C" : "",
                      color: expanded === "Weather" ? "#FFFFFF" : "",
                    }}
                  >
                    <Typography className={classes.accordionTitle}>
                      Add Observed Weather Conditions
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails sx={{paddingTop: "20px"}}>
                    <Grid container spacing={3}>
                      {weatherData.map((item, i) => (
                        <Grid item xs={3} key={item + i}>
                          <Box
                            sx={{
                              padding: "1rem",
                              textAlign: "center",
                              boxShadow:
                                "inset 0px 1px 4px rgba(0, 0, 0, 0.25)",
                              filter:
                                "drop-shadow(0px 1px 4px rgba(0, 0, 0, 0.25))",
                              borderRadius: "5px",
                            }}
                          >
                            <img src={weatherApp} alt="" />
                            <Typography className={classes.timeOfDay}>
                              {item.timeOfDay}
                            </Typography>
                            <Typography className={classes.temperature}>
                              {item.temperature}
                            </Typography>
                          </Box>
                        </Grid>
                      ))}
                      <Grid item xs={4}>
                        <FormGroup>
                          <FormControlLabel
                            control={<Checkbox />}
                            label="Add Weather Data"
                          />
                        </FormGroup>
                      </Grid>
                      <Grid item xs={4}>
                        <MuiSelectField
                          name="weatherStatus"
                          id="weatherStatus"
                          label="Weather Status"
                          options={["Fine", "Rain", "Cloud", "Wind", "Snow"]}
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <MuiSelectField
                          name="groundConditions"
                          id="groundConditions"
                          label="Ground Conditions"
                          options={["Dry", "Damp", "Wet", "Dusty", "Frozen"]}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <MuiTextArea
                          name="weathernotes"
                          id="weathernotes"
                          label={"comments"}
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
                  expanded={expanded === "Schedule"}
                  onChange={handleChange("Schedule")}
                >
                  <AccordionSummary
                    expandIcon={<AddIcon sx={{ color: expanded === "Schedule" ? "#FFFFFF" : ""}} />}
                    aria-controls="Schedule-content"
                    id="Schedule-header"
                    sx={{
                      backgroundColor: expanded === "Schedule" ? "#3A3A3C" : "",
                      color: expanded === "Schedule" ? "#FFFFFF" : "",
                    }}
                  >
                    <Typography className={classes.accordionTitle}>
                      Add Schedule / Plan Change Details
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails sx={{paddingTop: "20px"}}>
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
                    expandIcon={<AddIcon sx={{ color: expanded === "ManPower" ? "#FFFFFF" : ""}} />}
                    aria-controls="ManPower-content"
                    id="ManPower-header"
                    sx={{
                      backgroundColor: expanded === "ManPower" ? "#3A3A3C" : "",
                      color: expanded === "ManPower" ? "#FFFFFF" : "",
                    }}
                  >
                    <Typography className={classes.accordionTitle}>
                      Add ManPower Details
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails sx={{paddingTop: "20px"}}>
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
                    expandIcon={<AddIcon sx={{ color: expanded === "Inspection" ? "#FFFFFF" : ""}}/>}
                    aria-controls="Inspection-content"
                    id="Inspection-header"
                    sx={{
                      backgroundColor: expanded === "Inspection" ? "#3A3A3C" : "",
                      color: expanded === "Inspection" ? "#FFFFFF" : "",
                    }}
                  >
                    <Typography className={classes.accordionTitle}>
                      Add Visitor / Inspection Details
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails sx={{paddingTop: "20px"}}>
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
                    expandIcon={<AddIcon sx={{ color: expanded === "Inventory" ? "#FFFFFF" : ""}}/>}
                    aria-controls="Inventory-content"
                    id="Inventory-header"
                    sx={{
                      backgroundColor: expanded === "Inventory" ? "#3A3A3C" : "",
                      color: expanded === "Inventory" ? "#FFFFFF" : "",
                    }}
                  >
                    <Typography className={classes.accordionTitle}>
                      Add Inventory Data
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails sx={{paddingTop: "20px"}}>
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
                    expandIcon={<AddIcon sx={{ color: expanded === "On-Site" ? "#FFFFFF" : ""}}/>}
                    aria-controls="On-Site-content"
                    id="On-Site-header"
                    sx={{
                      backgroundColor: expanded === "On-Site" ? "#3A3A3C" : "",
                      color: expanded === "On-Site" ? "#FFFFFF" : "",
                    }}
                  >
                    <Typography className={classes.accordionTitle}>
                      Add On-Site Issues
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails sx={{paddingTop: "20px"}}>
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
                    expandIcon={<AddIcon sx={{ color: expanded === "Photos" ? "#FFFFFF" : ""}}/>}
                    aria-controls="Photos-content"
                    id="Photos-header"
                    sx={{
                      backgroundColor: expanded === "Photos" ? "#3A3A3C" : "",
                      color: expanded === "Photos" ? "#FFFFFF" : "",
                    }}
                  >
                    <Typography className={classes.accordionTitle}>
                      Add Photos / Documents / Videos
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails sx={{paddingTop: "20px"}}>
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
                    expandIcon={<AddIcon sx={{ color: expanded === "Notes" ? "#FFFFFF" : ""}}/>}
                    aria-controls="Notes-content"
                    id="Notes-header"
                    sx={{
                      backgroundColor: expanded === "Notes" ? "#3A3A3C" : "",
                      color: expanded === "Notes" ? "#FFFFFF" : "",
                    }}
                  >
                    <Typography className={classes.accordionTitle}>
                      Notes / Comments
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails  sx={{paddingTop: "20px"}}>
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
                    expandIcon={<AddIcon sx={{ color: expanded === "Signature" ? "#FFFFFF" : ""}}/>}
                    aria-controls="Signature-content"
                    id="Signature-header"
                    sx={{
                      backgroundColor: expanded === "Signature" ? "#3A3A3C" : "",
                      color: expanded === "Signature" ? "#FFFFFF" : "",
                    }}
                  >
                    <Typography className={classes.accordionTitle}>
                      Add Signature{" "}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails sx={{paddingTop: "20px"}}>
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

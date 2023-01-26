import React, { memo, Fragment, useState, useContext } from "react";
import { Formik, Form, ErrorMessage, FieldArray } from "formik";
import { makeStyles } from "@mui/styles";
import { GlobalState } from "../../Context/Context";

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

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import AddIcon from "@mui/icons-material/Add";

import weatherApp from "../../Images/weatherApp.svg";
import MuiAccordion from "../../components/MuiAccordion";

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
  const { expanded, setExpanded } = useContext(GlobalState);
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

  // const [expanded, setExpanded] = useState(false);

  // const handleChange = (panel) => (event, isExpanded) => {
  //   console.log("panel", panel, isExpanded, event);
  //   setExpanded(isExpanded ? panel : false);
  // };

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
              schedule: [
                {
                  activity: "",
                  choose: "",
                  comments: "",
                },
              ],
            }}
            validationSchema={null}
            onSubmit={(values, { setSubmitting, resetForm }) => {
              console.log("values", values);
            }}
          >
            {({ values, isValid, isSubmitting, handleSubmit }) => (
              <Form onSubmit={handleSubmit}>
                <MuiAccordion title="Date & Time" selectedPanel="dateTime">
                  {expanded === "dateTime"?
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
                  :""}
                </MuiAccordion>
                <MuiAccordion
                  title="Select Project"
                  selectedPanel="selectProject"
                >
                   {expanded === "selectProject"?
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
                  :""}
                </MuiAccordion>
                <MuiAccordion
                  title="Add Observed Weather Conditions"
                  selectedPanel="Weather"
                >
                  {expanded === "Weather"?
                  <Grid container spacing={3}>
                    {weatherData.map((item, i) => (
                      <Grid item xs={3} key={item + i}>
                        <Box
                          sx={{
                            padding: "1rem",
                            textAlign: "center",
                            boxShadow: "inset 0px 1px 4px rgba(0, 0, 0, 0.25)",
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
                  :""}
                </MuiAccordion>
                <MuiAccordion
                  title=" Add Schedule / Plan Change Details"
                  selectedPanel="Schedule"
                >
                  {expanded === "Schedule"?
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <FieldArray name="schedule">
                        {({ insert, remove, push }) => (
                          <>
                            <Grid item xs={12}>
                              <Button
                                variant="contained"
                                size="small"
                                onClick={() =>
                                  push({
                                    activity: "",
                                    choose: "",
                                    comments: "",
                                  })
                                }
                              >
                                Add Line Item
                              </Button>
                            </Grid>
                            <Grid item xs={12}>
                              <TableContainer component={Paper}>
                                <Table
                                  sx={{ minWidth: 650 }}
                                  aria-label="simple table"
                                >
                                  <TableHead>
                                    <TableRow>
                                      <TableCell>Action</TableCell>
                                      <TableCell align="right">
                                        Activity
                                      </TableCell>
                                      <TableCell align="right">
                                        Contractor
                                      </TableCell>
                                      <TableCell align="right">
                                        Comments
                                      </TableCell>
                                    </TableRow>
                                  </TableHead>
                                  <TableBody>
                                    {values.schedule.map((item, index) => (
                                      <TableRow
                                        key={index}
                                        sx={{
                                          "&:last-child td, &:last-child th": {
                                            border: 0,
                                          },
                                        }}
                                      >
                                        <TableCell align="right">
                                          <Button
                                            variant="contained"
                                            size="small"
                                            onClick={() => remove(index)}
                                          >
                                            Delete{" "}
                                          </Button>
                                        </TableCell>
                                        <TableCell align="right">
                                          <MuiTextField
                                            name={`schedule.${index}.activity`}
                                            id={`schedule.${index}.activity`}
                                            label="Activity"
                                          />
                                        </TableCell>
                                        <TableCell align="right">
                                          <MuiSelectField
                                            name={`schedule.${index}.choose`}
                                            id={`schedule.${index}.choose`}
                                            label="Choose"
                                            options={[]}
                                          />
                                        </TableCell>
                                        <TableCell align="right">
                                          <MuiTextField
                                            name={`schedule.${index}.comments`}
                                            id={`schedule.${index}.comments`}
                                            label="Comments"
                                          />
                                        </TableCell>
                                      </TableRow>
                                    ))}
                                  </TableBody>
                                </Table>
                              </TableContainer>
                            </Grid>
                          </>
                        )}
                      </FieldArray>
                    </Grid>

                    <Grid item xs={12} sx={{ textAlign: "right" }}>
                      <Button variant="contained" size="small">
                        Next
                      </Button>
                    </Grid>
                  </Grid>
                  :""}
                </MuiAccordion>
                <MuiAccordion
                  title="Add ManPower Details"
                  selectedPanel="ManPower"
                >
                  {expanded === "ManPower"?
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
                  :""}
                </MuiAccordion>
                <MuiAccordion
                  title="Add Visitor / Inspection Details"
                  selectedPanel="Inspection"
                >
                  {expanded === "Inspection"?
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
                  :""}
                </MuiAccordion>{" "}
                <MuiAccordion
                  title="Add Inventory Data"
                  selectedPanel="Inventory"
                >
                  {expanded === "Inspection"?
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
                  :""}
                </MuiAccordion>{" "}
                <MuiAccordion
                  title="Add On-Site Issues"
                  selectedPanel="On-Site"
                >
                  {expanded === "On-Site"?
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
                  :""}
                </MuiAccordion>{" "}
                <MuiAccordion
                  title="Add Photos / Documents / Videos"
                  selectedPanel="Photos"
                >
                  {expanded === "Photos"?
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
                  :""}
                </MuiAccordion>{" "}
                <MuiAccordion title="Notes / Comments" selectedPanel="Notes">
                {expanded === "Notes"?
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
                  :""}
                </MuiAccordion>{" "}
                <MuiAccordion title="Add Signature" selectedPanel="Signature">
                {expanded === "Signature"?
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
                  :""}
                </MuiAccordion>
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

export default memo(CreateDailyLog);

import React, { memo, useState } from "react";
import { Formik, Form, ErrorMessage, FieldArray } from "formik";
import { makeStyles } from "@mui/styles";
import { GlobalState } from "../../Context/Context";

import MuiDatePicker from "../../components/Formik/MuiDatePicker";
import MuiTimePicker from "../../components/Formik/MuiTimePicker";
import MuiTextField from "../../components/Formik/MuiTextField";
import MuiSelectField from "../../components/Formik/MuiSelectField";
import MuiTextArea from "../../components/Formik/MuiTextArea";
import DeleteIcon from '@mui/icons-material/Delete';

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
import { useCallback } from "react";
import FileUpload from "../../components/docUpload";
import PicUpload from "./dropZone";

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
  headerText: {
    backgroundColor: "#3A3A3C",
    color: "#fff",
    textAlign: "left",
  },
}));

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

const CreateDailyLog = (props) => {
  const { open, handleClose, id, title } = props;
  // const { expanded, setExpanded } = useContext(GlobalState);
  const classes = useStyle();

  const [expandedPanels, setExpandedPanels] = useState({
    dateTime: false,
    selectProject: false,
    Weather: false,
    Schedule: false,
    ManPower: false,
    Inspection: false,
    Inventory: false,
    OnSite: false,
    Photos: false,
    Notes: false,
    Signature: false,
  });
  const [copy, setCopy] = useState("");

  const handleChange = useCallback(
    (panel) => (event, isExpanded) => {
      console.log({ ...expandedPanels, [panel]: !expandedPanels.panel });
      setCopy(panel);
      setExpandedPanels({
        ...expandedPanels,
        [panel]: !expandedPanels.panel,
        [copy]: false,
      });
    },
    []
  );

  // const handleChange = useCallback((panel) => {
  //   const newExpandedPanels = {...expandedPanels};
  //   newExpandedPanels[panel] = !newExpandedPanels[panel];
  //   newExpandedPanels[copy] = false;
  //   setExpandedPanels(newExpandedPanels);
  //   setCopy(panel);
  // }, [expandedPanels, copy]);

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
              manpower: [
                {
                  team: "",
                  count: "",
                  hours: "",
                  comments: "",
                },
              ],
              visitor: [
                {
                  entryType: "",
                  name: "",
                  comments: "",
                },
              ],
              inventory: [
                {
                  type: "",
                  material: "",
                  quantity: "",
                  unitOfMeasure: "",
                },
              ],
              onsite: [
                {
                  type: "",
                  reason: "",
                  comments: "",
                },
              ],
              docuploads: null,
            }}
            validationSchema={null}
            onSubmit={(values, { setSubmitting, resetForm }) => {
              console.log("values", values);
            }}
          >
            {({ values, isValid, isSubmitting, handleSubmit }) => (
              <Form onSubmit={handleSubmit}>
                <MuiAccordion
                  title="Date & Time"
                  selectedPanel="dateTime"
                  expanded={expandedPanels.dateTime}
                  handleChange={handleChange("dateTime")}
                >
                  {expandedPanels.dateTime ? (
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
                        <Button variant="contained" type="submit" size="small" onClick={handleChange("selectProject")}>
                          Next
                        </Button>
                      </Grid>
                    </Grid>
                  ) : (
                    ""
                  )}
                </MuiAccordion>
                <MuiAccordion
                  title="Select Project"
                  selectedPanel="selectProject"
                  expanded={expandedPanels.selectProject}
                  handleChange={handleChange("selectProject")}
                >
                  {expandedPanels.selectProject ? (
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
                        <Button variant="contained" type="submit" size="small" onClick={handleChange("Weather")}>
                          Next
                        </Button>
                      </Grid>
                    </Grid>
                  ) : (
                    ""
                  )}
                </MuiAccordion>
                <MuiAccordion
                  title="Add Observed Weather Conditions"
                  selectedPanel="Weather"
                  expanded={expandedPanels.Weather}
                  handleChange={handleChange("Weather")}
                >
                  {expandedPanels.Weather ? (
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
                        <Button variant="contained" type="submit" size="small" onClick={handleChange("Schedule")}>
                          Next
                        </Button>
                      </Grid>
                    </Grid>
                  ) : (
                    ""
                  )}
                </MuiAccordion>
                <MuiAccordion
                  title=" Add Schedule / Plan Change Details"
                  selectedPanel="Schedule"
                  expanded={expandedPanels.Schedule}
                  handleChange={handleChange("Schedule")}
                >
                  {expandedPanels.Schedule ? (
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <FieldArray name="schedule">
                          {({ insert, remove, push }) => (
                            <>
                              <Grid container spacing={2}>
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
                                      // sx={{ minWidth: 650 }}
                                      aria-label="simple table"
                                    >
                                      <TableHead>
                                        <TableRow>
                                          <TableCell
                                            className={classes.headerText}
                                          >
                                            Action
                                          </TableCell>
                                          <TableCell
                                            className={classes.headerText}
                                          >
                                            Activity
                                          </TableCell>
                                          <TableCell
                                            className={classes.headerText}
                                          >
                                            Contractor
                                          </TableCell>
                                          <TableCell
                                            className={classes.headerText}
                                          >
                                            Comments
                                          </TableCell>
                                        </TableRow>
                                      </TableHead>
                                      <TableBody>
                                        {values?.schedule?.map(
                                          (item, index) => (
                                            <TableRow
                                              key={index}
                                              sx={{
                                                "&:last-child td, &:last-child th":
                                                  {
                                                    border: 0,
                                                  },
                                              }}
                                            >
                                              <TableCell
                                                align="right"
                                                sx={{ width: "100px" }}
                                              >
                                                <Button
                                                  variant="contained"
                                                  size="small"
                                                  onClick={() => remove(index)}
                                                >
                                                  Delete
                                                </Button>
                                              </TableCell>
                                              <TableCell
                                                align="right"
                                                sx={{ width: "170px" }}
                                              >
                                                <MuiTextField
                                                  name={`schedule.${index}.activity`}
                                                  id={`schedule.${index}.activity`}
                                                  label="Activity"
                                                />
                                              </TableCell>
                                              <TableCell
                                                align="right"
                                                sx={{ width: "170px" }}
                                              >
                                                <MuiSelectField
                                                  name={`schedule.${index}.choose`}
                                                  id={`schedule.${index}.choose`}
                                                  label="Choose"
                                                  options={[]}
                                                />
                                              </TableCell>
                                              <TableCell
                                                align="right"
                                                sx={{ width: "170px" }}
                                              >
                                                <MuiTextField
                                                  name={`schedule.${index}.comments`}
                                                  id={`schedule.${index}.comments`}
                                                  label="Comments"
                                                />
                                              </TableCell>
                                            </TableRow>
                                          )
                                        )}
                                      </TableBody>
                                    </Table>
                                  </TableContainer>
                                </Grid>
                              </Grid>
                            </>
                          )}
                        </FieldArray>
                      </Grid>

                      <Grid item xs={12} sx={{ textAlign: "right" }}>
                        <Button variant="contained" size="small" onClick={handleChange("ManPower")}>
                          Next
                        </Button>
                      </Grid>
                    </Grid>
                  ) : (
                    ""
                  )}
                </MuiAccordion>
                <MuiAccordion
                  title="Add ManPower Details"
                  selectedPanel="ManPower"
                  expanded={expandedPanels.ManPower}
                  handleChange={handleChange("ManPower")}
                >
                  {expandedPanels.ManPower ? (
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <FieldArray name="manpower">
                          {({ insert, remove, push }) => (
                            <>
                              <Grid container spacing={2}>
                                <Grid item xs={12}>
                                  <Button
                                    variant="contained"
                                    size="small"
                                    onClick={() =>
                                      push({
                                        team: "",
                                        count: "",
                                        hours: "",
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
                                          <TableCell
                                            className={classes.headerText}
                                          >
                                            Action
                                          </TableCell>
                                          <TableCell
                                            className={classes.headerText}
                                          >
                                            Team
                                          </TableCell>
                                          <TableCell
                                            className={classes.headerText}
                                          >
                                            Count
                                          </TableCell>
                                          <TableCell
                                            className={classes.headerText}
                                          >
                                            Hours
                                          </TableCell>
                                          <TableCell
                                            className={classes.headerText}
                                          >
                                            Comments
                                          </TableCell>
                                        </TableRow>
                                      </TableHead>
                                      <TableBody>
                                        {values.manpower.map((item, index) => (
                                          <TableRow
                                            key={index + 1}
                                            sx={{
                                              "&:last-child td, &:last-child th":
                                                {
                                                  border: 0,
                                                },
                                            }}
                                          >
                                            <TableCell
                                              align="right"
                                              sx={{ width: "100px" }}
                                            >
                                              <Button
                                                variant="contained"
                                                size="small"
                                                onClick={() => remove(index)}
                                              >
                                                Delete{" "}
                                              </Button>
                                            </TableCell>
                                            <TableCell
                                              align="right"
                                              sx={{ width: "200px" }}
                                            >
                                              <MuiSelectField
                                                name={`manpower.${index}.team`}
                                                id={`manpower.${index}.team`}
                                                label="Choose"
                                                options={[]}
                                              />
                                            </TableCell>
                                            <TableCell
                                              align="right"
                                              sx={{ width: "200px" }}
                                            >
                                              <MuiTextField
                                                name={`manpower.${index}.count`}
                                                id={`manpower.${index}.count`}
                                                label="0"
                                              />
                                            </TableCell>
                                            <TableCell
                                              align="right"
                                              sx={{ width: "200px" }}
                                            >
                                              <MuiTextField
                                                name={`manpower.${index}.hours`}
                                                id={`manpower.${index}.hours`}
                                                label="0"
                                              />
                                            </TableCell>
                                            <TableCell
                                              align="right"
                                              sx={{ width: "200px" }}
                                            >
                                              <MuiTextField
                                                name={`manpower.${index}.comments`}
                                                id={`manpower.${index}.comments`}
                                                label="Comments"
                                              />
                                            </TableCell>
                                          </TableRow>
                                        ))}
                                      </TableBody>
                                    </Table>
                                  </TableContainer>
                                </Grid>
                              </Grid>
                            </>
                          )}
                        </FieldArray>
                      </Grid>

                      <Grid item xs={12} sx={{ textAlign: "right" }}>
                        <Button variant="contained" size="small" onClick={handleChange("Inspection")}>
                          Next
                        </Button>
                      </Grid>
                    </Grid>
                  ) : (
                    ""
                  )}
                </MuiAccordion>
                <MuiAccordion
                  title="Add Visitor / Inspection Details"
                  selectedPanel="Inspection"
                  expanded={expandedPanels.Inspection}
                  handleChange={handleChange("Inspection")}
                >
                  {expandedPanels.Inspection ? (
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <FieldArray name="visitor">
                          {({ insert, remove, push }) => (
                            <>
                              <Grid container spacing={2}>
                                <Grid item xs={12}>
                                  <Button
                                    variant="contained"
                                    size="small"
                                    onClick={() =>
                                      push({
                                        entryType: "",
                                        name: "",
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
                                          <TableCell
                                            className={classes.headerText}
                                          >
                                            Action
                                          </TableCell>
                                          <TableCell
                                            className={classes.headerText}
                                          >
                                            Entry Type
                                          </TableCell>
                                          <TableCell
                                            className={classes.headerText}
                                          >
                                            Name
                                          </TableCell>
                                          <TableCell
                                            className={classes.headerText}
                                          >
                                            Comments
                                          </TableCell>
                                        </TableRow>
                                      </TableHead>
                                      <TableBody>
                                        {values.visitor.map((item, index) => (
                                          <TableRow
                                            key={index}
                                            sx={{
                                              "&:last-child td, &:last-child th":
                                                {
                                                  border: 0,
                                                },
                                            }}
                                          >
                                            <TableCell
                                              align="right"
                                              sx={{ width: "100px" }}
                                            >
                                              <Button
                                                variant="contained"
                                                size="small"
                                                onClick={() => remove(index)}
                                              >
                                                Delete{" "}
                                              </Button>
                                            </TableCell>
                                            <TableCell
                                              align="right"
                                              sx={{ width: "200px" }}
                                            >
                                              <MuiSelectField
                                                name={`visitor.${index}.entryType`}
                                                id={`visitor.${index}.entryType`}
                                                label="Choose"
                                                options={[
                                                  "Visitor",
                                                  "Inspector",
                                                  "Others",
                                                ]}
                                              />
                                            </TableCell>
                                            <TableCell
                                              align="right"
                                              sx={{ width: "200px" }}
                                            >
                                              <MuiTextField
                                                name={`visitor.${index}.name`}
                                                id={`visitor.${index}.name`}
                                                label="Name"
                                              />
                                            </TableCell>
                                            <TableCell
                                              align="right"
                                              sx={{ width: "200px" }}
                                            >
                                              <MuiTextField
                                                name={`visitor.${index}.comments`}
                                                id={`visitor.${index}.comments`}
                                                label="Comments"
                                              />
                                            </TableCell>
                                          </TableRow>
                                        ))}
                                      </TableBody>
                                    </Table>
                                  </TableContainer>
                                </Grid>
                              </Grid>
                            </>
                          )}
                        </FieldArray>
                      </Grid>

                      <Grid item xs={12} sx={{ textAlign: "right" }}>
                        <Button variant="contained" size="small" onClick={handleChange("Inventory")}>
                          Next
                        </Button>
                      </Grid>
                    </Grid>
                  ) : (
                    ""
                  )}
                </MuiAccordion>{" "}
                <MuiAccordion
                  title="Add Inventory Data"
                  selectedPanel="Inventory"
                  expanded={expandedPanels.Inventory}
                  handleChange={handleChange("Inventory")}
                >
                  {expandedPanels.Inventory ? (
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <FieldArray name="inventory">
                          {({ insert, remove, push }) => (
                            <>
                              <Grid container spacing={2}>
                                <Grid item xs={12}>
                                  <Button
                                    variant="contained"
                                    size="small"
                                    onClick={() =>
                                      push({
                                        type: "",
                                        material: "",
                                        quantity: "",
                                        unitOfMeasure: "",
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
                                          <TableCell
                                            className={classes.headerText}
                                          >
                                            Action
                                          </TableCell>
                                          <TableCell
                                            className={classes.headerText}
                                          >
                                            Type
                                          </TableCell>
                                          <TableCell
                                            className={classes.headerText}
                                          >
                                            Material
                                          </TableCell>
                                          <TableCell
                                            className={classes.headerText}
                                          >
                                            Quantity
                                          </TableCell>
                                          <TableCell
                                            className={classes.headerText}
                                          >
                                            Unit Of Measure
                                          </TableCell>
                                        </TableRow>
                                      </TableHead>
                                      <TableBody>
                                        {values.inventory.map((item, index) => (
                                          <TableRow
                                            key={index}
                                            sx={{
                                              "&:last-child td, &:last-child th":
                                                {
                                                  border: 0,
                                                },
                                            }}
                                          >
                                            <TableCell
                                              align="right"
                                              sx={{ width: "100px" }}
                                            >
                                              <Button
                                                variant="contained"
                                                size="small"
                                                onClick={() => remove(index)}
                                              >
                                                Delete{" "}
                                              </Button>
                                            </TableCell>
                                            <TableCell
                                              align="right"
                                              sx={{ width: "200px" }}
                                            >
                                              <MuiSelectField
                                                name={`inventory.${index}.type`}
                                                id={`inventory.${index}.type`}
                                                label="Choose"
                                                options={["Incoming", "Outing"]}
                                              />
                                            </TableCell>
                                            <TableCell
                                              align="right"
                                              sx={{ width: "200px" }}
                                            >
                                              <MuiTextField
                                                name={`inventory.${index}.material`}
                                                id={`inventory.${index}.material`}
                                                label="Name"
                                              />
                                            </TableCell>
                                            <TableCell
                                              align="right"
                                              sx={{ width: "200px" }}
                                            >
                                              <MuiTextField
                                                name={`inventory.${index}.quantity`}
                                                id={`inventory.${index}.quantity`}
                                                label="0"
                                              />
                                            </TableCell>
                                            <TableCell
                                              align="right"
                                              sx={{ width: "200px" }}
                                            >
                                              <MuiTextField
                                                name={`inventory.${index}.unitOfMeasure`}
                                                id={`inventory.${index}.unitOfMeasure`}
                                                label="Units"
                                              />
                                            </TableCell>
                                          </TableRow>
                                        ))}
                                      </TableBody>
                                    </Table>
                                  </TableContainer>
                                </Grid>
                              </Grid>
                            </>
                          )}
                        </FieldArray>
                      </Grid>

                      <Grid item xs={12} sx={{ textAlign: "right" }}>
                        <Button variant="contained" size="small"  onClick={handleChange("OnSite")}>
                          Next
                        </Button>
                      </Grid>
                    </Grid>
                  ) : (
                    ""
                  )}
                </MuiAccordion>{" "}
                <MuiAccordion
                  title="Add On-Site Issues"
                  selectedPanel="OnSite"
                  expanded={expandedPanels.OnSite}
                  handleChange={handleChange("OnSite")}
                >
                  {expandedPanels.OnSite ? (
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <FieldArray name="onsite">
                          {({ insert, remove, push }) => (
                            <>
                              <Grid container spacing={2}>
                                <Grid item xs={12}>
                                  <Button
                                    variant="contained"
                                    size="small"
                                    onClick={() =>
                                      push({
                                        type: "",
                                        reason: "",
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
                                          <TableCell
                                            className={classes.headerText}
                                          >
                                            Action
                                          </TableCell>
                                          <TableCell
                                            className={classes.headerText}
                                          >
                                            Type
                                          </TableCell>
                                          <TableCell
                                            className={classes.headerText}
                                          >
                                            Reason
                                          </TableCell>
                                          <TableCell
                                            className={classes.headerText}
                                          >
                                            Comments
                                          </TableCell>
                                        </TableRow>
                                      </TableHead>
                                      <TableBody>
                                        {values.inventory.map((item, index) => (
                                          <TableRow
                                            key={index}
                                            sx={{
                                              "&:last-child td, &:last-child th":
                                                {
                                                  border: 0,
                                                },
                                            }}
                                          >
                                            <TableCell
                                              align="right"
                                              sx={{ width: 100 }}
                                            >
                                              <Button
                                                variant="contained"
                                                size="small"
                                                onClick={() => remove(index)}
                                              >
                                                Delete{" "}
                                              </Button>
                                            </TableCell>
                                            <TableCell
                                              align="right"
                                              sx={{ width: 200 }}
                                            >
                                              <MuiSelectField
                                                name={`onsite.${index}.type`}
                                                id={`onsite.${index}.type`}
                                                label="Choose"
                                                options={[
                                                  "Damages",
                                                  "Saftey",
                                                  "Security",
                                                  "Other",
                                                ]}
                                              />
                                            </TableCell>
                                            <TableCell
                                              align="right"
                                              sx={{ width: 200 }}
                                            >
                                              <MuiTextField
                                                name={`onsite.${index}.reason`}
                                                id={`onsite.${index}.reason`}
                                                label="Reason"
                                              />
                                            </TableCell>
                                            <TableCell
                                              align="right"
                                              sx={{ width: 200 }}
                                            >
                                              <MuiTextField
                                                name={`onsite.${index}.comments`}
                                                id={`onsite.${index}.comments`}
                                                label="Comments"
                                              />
                                            </TableCell>
                                          </TableRow>
                                        ))}
                                      </TableBody>
                                    </Table>
                                  </TableContainer>
                                </Grid>
                              </Grid>
                            </>
                          )}
                        </FieldArray>
                      </Grid>

                      <Grid item xs={12} sx={{ textAlign: "right" }}>
                        <Button variant="contained" size="small" onClick={handleChange("Photos")}>
                          Next
                        </Button>
                      </Grid>
                    </Grid>
                  ) : (
                    ""
                  )}
                </MuiAccordion>{" "}
                <MuiAccordion
                  title="Add Photos / Documents / Videos"
                  selectedPanel="Photos"
                  expanded={expandedPanels.Photos}
                  handleChange={handleChange("Photos")}
                >
                  {expandedPanels.Photos ? (
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                       <FileUpload 
                       id="docuploads"
                       name="docuploads"
                       maxFiles={5}
                       multiple={true}
                       />
                       <Typography
                      variant="h6"
                      fontWeight="bold"
                      sx={{ padding: "10px 0px" }}
                    >
                      Uploaded Files:
                    </Typography>
                    <Box>
                      {values?.docuploads?.map((file, i) => (
                        <Typography
                          key={file + i}
                          sx={{
                            width: "fit-content",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            border:"1px solid rgba(1, 167, 104, 1)",
                            borderRadius:"5px",
                            padding:"5px 15px"
                          }}
                        >{`${i + 1}. ${file.name}`}</Typography>
                      ))}
                    </Box>
                      </Grid>
                      
                      <Grid item xs={12} sx={{ textAlign: "right" }}>
                        <Button variant="contained" type="submit" size="small"  onClick={handleChange("Notes")}>
                          Next
                        </Button>
                      </Grid>
                    </Grid>
                  ) : (
                    ""
                  )}
                </MuiAccordion>{" "}
                <MuiAccordion
                  title="Notes / Comments"
                  selectedPanel="Notes"
                  expanded={expandedPanels.Notes}
                  handleChange={handleChange("Notes")}
                >
                  {expandedPanels.Notes ? (
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <MuiTextArea
                          name="fullnotes"
                          id="fullnotes"
                          label={"comments"}
                        />
                      </Grid>
                      <Grid item xs={12} sx={{ textAlign: "right" }}>
                        <Button variant="contained" type="submit" size="small"  onClick={handleChange("Signature")}>
                          Next
                        </Button>
                      </Grid>
                    </Grid>
                  ) : (
                    ""
                  )}
                </MuiAccordion>{" "}
                <MuiAccordion
                  title="Add Signature"
                  selectedPanel="Signature"
                  expanded={expandedPanels.Signature}
                  handleChange={handleChange("Signature")}
                >
                  {expandedPanels.Signature ? (
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <PicUpload />
                      </Grid>
                      {/* <Grid item xs={12} sx={{ textAlign: "right" }}>
                        <Button variant="contained" type="submit" size="small">
                          Next
                        </Button>
                      </Grid> */}
                    </Grid>
                  ) : (
                    ""
                  )}
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

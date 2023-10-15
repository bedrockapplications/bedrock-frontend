import React, { useContext } from "react";
import MuiDialog from "../../components/MuiDialog";
import {
  Grid,
  DialogContent,
  Divider,
  Button,
  Typography,
  Box,
  IconButton
} from "@mui/material";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import MuiSelectField from "../../components/Formik/MuiSelectField";
import FileUpload from "./docUpload";
import { uploadDocumentApi } from "../../services/request";
import { GlobalState } from "../../Context/Context";
import { ShowSnackbar } from "../../components/Snackbar";
import MuiTextField from "../../components/Formik/MuiTextField";
import MUIDataTable from "mui-datatables";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import MuiDatePicker from "../../components/Formik/MuiDatePicker";
import { useState } from "react";
import MuiTextArea from "../../components/Formik/MuiTextArea";
import { makeStyles } from "@mui/styles";
import DeleteIcon from "@mui/icons-material/Delete";
import DropdownTreeSelect from "react-dropdown-tree-select";
import data from "./dropData.json";
import { createNewProjectApi } from "../../services/request";
import { getManagerProjects } from "../../services/request";
import { useEffect } from "react";

const useStyle = makeStyles(() => ({
  Addresslabel: {
    fontSize: "20px",
    marginLeft: "1.5rem",
    color: "#3A3A3C",
    fontWeight: "700",
    lineHeight: "30px",
    opacity: 0.7,
  },
  headerText: {
    backgroundColor: "#3A3A3C",
    color: "#fff",
    textAlign: "left",
  },
  imgTexts:{
    display:"flex",
    flexWrap:"wrap",
    width:"96%",
    margin:"auto",
  },
  imgName:{
    margin:"20px 10px 0px 10px",
    display:"flex",
    justifyContent:"space-between",
    width: "44%",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    border: "1px solid rgba(1, 167, 104, 1)",
    borderRadius: "5px",
    padding: "5px 15px",
  },
}));

const categoryList = ["DesignDocuments", "Photos", "Submittals"];
const selectedNodesMain = []

const onChange = (currentNode, selectedNodes) => {
  selectedNodesMain = selectedNodes
};

const assignObjectPaths = (obj, stack) => {
  Object.keys(obj).forEach(k => {
    const node = obj[k];
    if (typeof node === "object") {
      node.path = stack ? `${stack}.${k}` : k;
      assignObjectPaths(node, node.path);
    }
  });
};

const UploadForm = (props) => {
  const classes = useStyle();
  const {
    open,
    handleClose,
    GetDocumentsLists,
    projectOptions,
    categoryType,
    GetSearchOptions,
  } = props;
  const { openMode, setIsLoading, setProjectTableData, step, setStep, rowData } = useContext(GlobalState);

  const [formSubmitted, setFormSubmitted] = useState(false)

  const userId = localStorage.getItem("userId");

  assignObjectPaths(data);

  const handleSave = (data, setSubmitting, resetForm) => {
    setIsLoading(true);
    setSubmitting(true);
    let formData = new FormData();
    formData.append("projectId", data.projectId);
    formData.append("categoryType", data.categoryType);
    formData.append("userId", userId);
    data?.docs?.forEach((doc) => {
      formData.append("docs", doc);
    });
    uploadDocumentApi(formData)
      .then((res) => {
        if (res.status === 200) {
          setSubmitting(false);
          handleGetAllProject();
          resetForm();
          handleClose();
          setOpenMode("")
          ShowSnackbar("success", res?.data);
        }
      })
      .catch((error) => {
        console.log("error", error);
        setSubmitting(false);
        setIsLoading(false);
      });
  };

  const handleGetAllProject = () => {
    setIsLoading(true)
    getManagerProjects().then(res => {
      if(res.data.status){
        setProjectTableData(res.data.data)
        setIsLoading(false)
      }
    }).catch(error => {
      setIsLoading(false)
    })
  }

  return (
    <>
      <MuiDialog
        open={open}
        handleClose={handleClose}
        id={"newFile"}
        title={openMode=== "" ? "Create Project" : openMode=== "Edit" ? "Edit Project" : "View Project" }
        maxWidth="xs"
        // sx={{height:"84vh", position:"relative"}}
      >
        <Divider />
        <DialogContent>
          {/* <Grid container spacing={3}>
            <Grid item xs={12}> */}
          <Formik
            initialValues={{
              clientName: openMode === "" ? "" : rowData.clientName,
              clientPhNumber:openMode === "" ? "" : rowData.clientPhNumber,
              projectName: openMode === "" ? "" : rowData.projectName,
              projectDescription:openMode === "" ? "" : rowData.projectDescription,
              address:openMode === "" ? "" : rowData.address,
              city:openMode === "" ? "" : rowData.city,
              state:openMode === "" ? "" : rowData.state,
              country:openMode === "" ? "" : rowData.country,
              zipcode:openMode === "" ? "" : rowData.zipcode,
              projectType:openMode === "" ? "" : rowData.projectType,
              startDate: openMode === "" ? null: new Date(rowData.startDate),
              endDate: openMode === "" ? null: new Date(rowData.endDate),
              moveDate:openMode === "" ? null: new Date(rowData.moveDate),
              documents: null,
            }}
            enableReinitialize
            onSubmit={(values, { setSubmitting, resetForm }) => {
              if(formSubmitted){
                console.log(values)
                handleSave(values, setSubmitting, resetForm);
              }
            }}
          >
            {({ values, isSubmitting, isValid, setFieldValue }) => (
              <Form>
                <Grid container spacing={3}>
                  {step === 0 ? (
                    <>
                      <Grid item xs={12}>
                        <MuiTextField
                          name="clientName"
                          id="clientName"
                          label="Vendor Name"
                          // options={projectOptions}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <MuiTextField
                          name="clientPhNumber"
                          id="clientPhNumber"
                          label="Vendor Phone Number"
                          // options={projectOptions}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <MuiTextField
                          name="projectName"
                          id="projectName"
                          label="Project Name"
                          // options={categoryList}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <MuiTextArea
                          name="projectDescription"
                          id="projectDescription"
                          label="Project Description"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <MuiTextField
                          name="address"
                          id="address"
                          label="Address"
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <MuiTextField name="city" id="city" label="City" />
                      </Grid>
                      <Grid item xs={6}>
                        <MuiTextField
                          name="state"
                          id="state"
                          label="Province/State"
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <MuiTextField
                          name="country"
                          id="country"
                          label="Country"
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <MuiTextField
                          name="zipcode"
                          id="zipcode"
                          label="ZIP Code"
                        />
                      </Grid>
                      <Grid item xs={12} sx={{ textAlign: "right" }}>
                        <Button
                          variant="contained"
                          size="small"
                          onClick={() => setStep(1)}
                        >
                          Next
                        </Button>
                      </Grid>
                    </>
                  ) : (
                    <>
                      <Grid item xs={12}>
                        <MuiSelectField
                          name="projectType"
                          id="projectType"
                          label="Project Type"
                        options={["RenovateAI", "DesignAI", "EstimateAI"]}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <DropdownTreeSelect data={data} onChange={onChange} className="mdl-demo" />
                      </Grid>
                      <Grid item xs={6}>
                        <MuiDatePicker
                          name="startDate"
                          id="startDate"
                          label={"Project Start Date"}
                          // disablePast
                          value={values?.startDate}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <MuiDatePicker
                          name="endDate"
                          id="endDate"
                          label={"Proposed List Date"}
                          // disablePast
                          value={values?.endDate}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <MuiDatePicker
                          name="moveDate"
                          id="moveDate"
                          label={"Anticipated Move-In Date"}
                          // disablePast
                          value={values?.moveDate}
                        />
                      </Grid>
                      <Grid item xs={12} style={{display: openMode !== "" ? "none" : ""}}>
                        <FileUpload
                          id="documents"
                          name="documents"
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
                      </Grid>
                      <Grid item xs={12}>
                      <Box className={classes.imgTexts}>
                          {values?.documents?.map((file, i) => (
                            <Typography
                              key={file + i}
                              className={classes.imgName}
                            >{`${i + 1}. ${file.name.substr(0, 16)}`}
                            {/* <span>
                            <IconButton size="small" color="primary" onClick={() => values?.documents.splice(i, 1)}>
                              <DeleteIcon fontSize="16px" />
                            </IconButton>
                            </span> */}
                            </Typography>
                          ))}
                        </Box>
                        </Grid>
                      <Grid item xs={6} sx={{ textAlign: "left"}}>
                        <Button
                          variant="contained"
                          size="small"
                          onClick={() => setStep(0)}
                        >
                          Previous
                        </Button>
                      </Grid>
                      <Grid item xs={6} sx={{ textAlign: "right"}}>
                        <Button
                          variant="contained"
                          type="submit"
                          size="small"
                          onClick={() => setFormSubmitted(true)}
                        >
                          Submit
                        </Button>
                      </Grid>
                    </>
                  )}
                </Grid>
              </Form>
            )}
          </Formik>
          {/* </Grid>
          </Grid> */}
        </DialogContent>
      </MuiDialog>
    </>
  );
};

export default UploadForm;

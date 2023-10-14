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
import FileUpload from "../../components/docUpload";
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
    marginTop:"20px",
    marginRight:"2%",
    display:"flex",
    justifyContent:"space-between",
    width: "30%",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    border: "1px solid rgba(1, 167, 104, 1)",
    borderRadius: "5px",
    padding: "5px 15px",
  },
}));

const validationSchema = Yup.object().shape({
  projectId: Yup.string().required().nullable(),
});

const categoryList = ["DesignDocuments", "Photos", "Submittals"];

const onChange = (currentNode, selectedNodes) => {
  console.log("path::", currentNode.path);
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
  const { page, rowsPerPage, setIsLoading } = useContext(GlobalState);
  const [step, setStep] = useState(0);

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
          GetSearchOptions(data?.categoryType);
          GetDocumentsLists(page, rowsPerPage);
          setSubmitting(false);
          resetForm();
          handleClose();
          setIsLoading(false);
          ShowSnackbar("success", res?.data);
        }
      })
      .catch((error) => {
        console.log("error", error);
        setSubmitting(false);
        setIsLoading(false);
      });
  };

  return (
    <>
      <MuiDialog
        open={open}
        handleClose={handleClose}
        id={"newFile"}
        title="Create Project"
        maxWidth="xs"
      >
        <Divider />
        <DialogContent>
          {/* <Grid container spacing={3}>
            <Grid item xs={12}> */}
          <Formik
            initialValues={{
              projectId: "",
              categoryType: "",
              docs: null,
              startDate: null,
              endDate: null,
              docuploads: null,
            }}
            enableReinitialize
            validationSchema={validationSchema}
            // onSubmit={(values, { setSubmitting, resetForm }) => {
            //   handleSave(values, setSubmitting, resetForm);
            // }}
          >
            {({ values, isSubmitting, isValid, setFieldValue }) => (
              <Form>
                <Grid container spacing={3}>
                  {step === 0 ? (
                    <>
                      <Grid item xs={12}>
                        <MuiTextField
                          name="clientId"
                          id="clientId"
                          label="Select Client"
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
                          name="Address"
                          id="Address"
                          label="Address"
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <MuiTextField name="city" id="city" label="City" />
                      </Grid>
                      <Grid item xs={6}>
                        <MuiTextField
                          name="province"
                          id="province"
                          label="Province/Sate"
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
                          name="zipCode"
                          id="zipCode"
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
                        // options={projectOptions}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        {/* <MuiSelectField
                          name="projectType"
                          id="projectType"
                          label="Category Type"
                        // options={projectOptions}
                        /> */}
                        <DropdownTreeSelect data={data} onChange={onChange} className="mdl-demo" />
                      </Grid>
                      <Grid item xs={6}>
                        <MuiDatePicker
                          name="projectStartDate"
                          id="projectStartDate"
                          label={"Project Start Date"}
                          // disablePast
                          value={values?.startDate}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <MuiDatePicker
                          name="proposedListDate"
                          id="proposedListDate"
                          label={"Proposed List Date"}
                          // disablePast
                          value={values?.startDate}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <MuiDatePicker
                          name="anticipatedMoveInDate"
                          id="anticipatedMoveInDate"
                          label={"Anticipated Move-In Date"}
                          // disablePast
                          value={values?.startDate}
                        />
                      </Grid>
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
                      </Grid>
                      <Box className={classes.imgTexts}>
                          {values?.docuploads?.map((file, i) => (
                            <Typography
                              key={file + i}
                              className={classes.imgName}
                            >{`${i + 1}. ${file.name}`}
                            <span>
                            <IconButton size="small" color="primary" onClick={() => console.log()}>
                              <DeleteIcon fontSize="16px" />
                            </IconButton>
                            </span>
                            </Typography>
                          ))}
                        </Box>
                      <Grid item xs={6} sx={{ textAlign: "left" }}>
                        <Button
                          variant="contained"
                          size="small"
                          onClick={() => setStep(0)}
                        >
                          Previous
                        </Button>
                      </Grid>
                      <Grid item xs={6} sx={{ textAlign: "right" }}>
                        <Button
                          variant="contained"
                          type="submit"
                          size="small"
                          onClick={() => handleClose()}
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

import React, { useContext } from "react";
import MuiDialog from "../../components/MuiDialog";
import {
  Grid,
  DialogContent,
  Divider,
  Button,
  Typography,
  Box,
} from "@mui/material";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import MuiSelectField from "../../components/Formik/MuiSelectField";
import FileUpload from "../../components/Drag&DropUpload";
import { uploadDocumentApi } from "../../services/request";
import { GlobalState } from "../../Context/Context";
import { ShowSnackbar } from "../../components/Snackbar";
import MuiTextField from "../../components/Formik/MuiTextField";
import MUIDataTable from "mui-datatables";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from 'dayjs';
import MuiDatePicker from "../../components/Formik/MuiDatePicker";

const validationSchema = Yup.object().shape({
  projectId: Yup.string().required().nullable(),
});

const categoryList = ["DesignDocuments", "Photos", "Submittals"];

const UploadForm = (props) => {
  const {
    open,
    handleClose,
    GetDocumentsLists,
    projectOptions,
    categoryType,
    GetSearchOptions,
  } = props;
  const { page, rowsPerPage, setIsLoading } = useContext(GlobalState);

  const userId = localStorage.getItem("userId");

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
        title="Upload Form"
        maxWidth="xs"
      >
        <Divider />
        <DialogContent>
          {/* <Grid container spacing={3}>
            <Grid item xs={12}> */}
          <Formik
            initialValues={{ projectId: "", categoryType: "", docs: null,startDate:null,endDate:null }}
            enableReinitialize
            validationSchema={validationSchema}
          // onSubmit={(values, { setSubmitting, resetForm }) => {
          //   handleSave(values, setSubmitting, resetForm);
          // }}
          >
            {({ values, isSubmitting, isValid, setFieldValue }) => (
              <Form>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <MuiSelectField
                      name="clientId"
                      id="clientId"
                      label="Select Client"
                    // options={projectOptions}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <MuiSelectField
                      name="projectId"
                      id="projectId"
                      label="Select Project"
                    // options={categoryList}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <MuiTextField
                      name="serviceId"
                      id="serviceId"
                      label="Services Needed"
                    // options={categoryList}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <MuiDatePicker
                      name="startDate"
                      id="startDate"
                      label={"Project Start Date"}
                      disablePast
                      value={values?.startDate}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <MuiDatePicker
                      name="endDate"
                      id="endDate"
                      label="Project End Date"
                      disablePast
                      disabled={values?.startDate === null}
                      minDate={values?.startDate}
                      value={values?.endDate}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <MuiTextField
                      name="commentId"
                      id="commentId"
                      label="Comments"
                    // options={categoryList}
                    />
                  </Grid>
                  {/* <Grid item xs={12}>
                    <FileUpload
                      id="docs"
                      name="docs"
                      maxFiles={5}
                      multiple={true}
                    />
                    <Typography
                      variant="h6"
                      fontWeight="bold"
                      sx={{ padding: "10px 0px" }}
                    >
                      Files
                    </Typography>
                    <Box>
                      {values?.docs?.map((file, i) => (
                        <Typography
                          key={file + i}
                          sx={{
                            width: "100%",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >{`${i + 1}. ${file.name}`}</Typography>
                      ))}
                    </Box>
                  </Grid> */}
                  <Grid item xs={12} sx={{ textAlign: "right" }}>
                    <Button variant="contained" type="submit" size="small" onClick={()=>handleClose()}>
                      Submit
                    </Button>
                  </Grid>
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

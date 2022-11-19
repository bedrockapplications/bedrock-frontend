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

const validationSchema = Yup.object().shape({
  projectId: Yup.string().required().nullable(),
});

const categoryList = ["DesignDocuments", "Photos", "Submittals"];

const AddNewFiles = (props) => {
  const { open, handleClose, GetDocumentsLists, projectOptions, categoryType } =
    props;
  const { page, rowsPerPage } = useContext(GlobalState);

  const userId = localStorage.getItem("userId");

  const handleSave = (data, setSubmitting, resetForm) => {
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
          GetDocumentsLists(page, rowsPerPage);
          setSubmitting(false);
          resetForm();
          handleClose();
        }
      })
      .catch((error) => {
        console.log("error", error);
        setSubmitting(false);
      });
  };

  return (
    <>
      <MuiDialog
        open={open}
        handleClose={handleClose}
        id={"newFile"}
        title="Add New Files"
        maxWidth="xs"
      >
        <Divider />
        <DialogContent>
          {/* <Grid container spacing={3}>
            <Grid item xs={12}> */}
          <Formik
            initialValues={{ projectId: "", categoryType: "", docs: null }}
            enableReinitialize
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting, resetForm }) => {
              handleSave(values, setSubmitting, resetForm);
            }}
          >
            {({ values, isSubmitting, isValid, setFieldValue }) => (
              <Form>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <MuiSelectField
                      name="projectId"
                      id="projectId"
                      label="Project"
                      options={projectOptions}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <MuiSelectField
                      name="categoryType"
                      id="categoryType"
                      label="Category Type"
                      options={categoryList}
                    />
                  </Grid>
                  <Grid item xs={12}>
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
                  </Grid>
                  <Grid item xs={12} sx={{ textAlign: "right" }}>
                    <Button variant="contained" type="submit" size="small">
                      Save
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

export default AddNewFiles;

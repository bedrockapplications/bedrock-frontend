import React from "react";
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
import MuiSelectField from "../../components/Formik/MuiSelectField";
import FileUpload from "../../components/Drag&DropUpload";
import { updateDocumentApi } from "../../services/request";
import MuiTextField from "../../components/Formik/MuiTextField";

const categoryList = ["DesignDocuments", "Photos", "Submittals"];

const EditUploadFiles = (props) => {
  const { open, handleClose, data, projectOptions, GetDocumentsLists } = props;
  const userId = localStorage.getItem("userId");
  const handleSaveEditFiles = (values, setSubmitting, resetForm) => {
    setSubmitting(true);
    const payload = {
      projectId: values.projectId,
      fileName: values.fileName,
      mediaId: data.mediaId,
      categoryType: values.categoryType,
    };
    updateDocumentApi(data.mainId, payload)
      .then((res) => {
        if (res.status === 200) {
          setSubmitting(false);
          GetDocumentsLists();
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
        id={"edit_upload"}
        title="Edit Files"
        maxWidth="xs"
      >
        <Divider />
        <DialogContent>
          <Formik
            initialValues={{
              projectId: data?.projectId,
              categoryType: data?.categoryType,
              fileName: data.fileName,
            }}
            enableReinitialize
            onSubmit={(values, { setSubmitting, resetForm }) => {
              handleSaveEditFiles(values, setSubmitting, resetForm);
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
                    <MuiTextField
                      name="fileName"
                      id="fileName"
                      label="File Name"
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
                    <Button variant="contained" type="submit" size="small">
                      Update
                    </Button>
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>
        </DialogContent>
      </MuiDialog>
    </>
  );
};
export default EditUploadFiles;

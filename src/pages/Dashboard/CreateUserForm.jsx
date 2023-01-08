import React, { memo, useContext } from "react";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";

import { makeStyles } from "@mui/styles";
import {
  Grid,
  Box,
  IconButton,
  DialogContent,
  Button,
  Divider,
  TextField,
} from "@mui/material";

import MuiDialog from "../../components/MuiDialog";
import MuiTextField from "../../components/Formik/MuiTextField";
import MuiEmailField from "../../components/Formik/MuiEmailField";
import MuiPasswordField from "../../components/Formik/MuiPassword";
import { createContactApi } from "../../services/request";
import { GlobalState } from "../../Context/Context";
import { ShowSnackbar } from "../../components/Snackbar";

const useStyle = makeStyles(() => ({
  fieldWrappper: {
    position: "relative",
  },
  errorText: {
    position: "absolute",
    left: 0,
    top: "40px",
    fontSize: "12px",
    color: "rgb(244, 67, 54)",
  },
}));

const validationSchema = Yup.object().shape({
  Firstname: Yup.string().required("Firstname is a required").trim().nullable(),
  Lastname: Yup.string().required("Lastname is a required").trim().nullable(),
  email: Yup.string().email().required("Email is a required").trim().nullable(),
  password: Yup.string()
    .min(8)
    .required("Password is a required")
    .trim()
    .nullable(),
  phNumber: Yup.string()
    .required("Phone Number is a required")
    .trim()
    .nullable(),
});

const CreateUserForm = (props) => {
  const { handleCloseUserForm, getAllContactsList } = props;
  const classes = useStyle();

  const { openUserForm, setOpenUserForm, list, setList } =
    useContext(GlobalState);
  let userRole = localStorage.getItem("role");

  const handleCreateNewUser = (values, setSubmitting, resetForm) => {
    let payload = {
      firstName: values.Firstname,
      lastName: values.Lastname,
      email: values.email,
      password: values.password,
      phoneNumber: values.phNumber,
      ownerId: localStorage.getItem("userId"),
    };
    createContactApi(payload)
      .then((res) => {
        if (res.status === 200) {
          ShowSnackbar("success", "User Created Successfully");
          if (userRole === "Owner") {
            getAllContactsList();
          }
        }
      })
      .catch((error) => {
        let errorObj = error;
        console.log(errorObj);
      });
  };
  return (
    <>
      <MuiDialog
        open={openUserForm}
        handleClose={handleCloseUserForm}
        id={"createUser"}
        title={"Create Contact"}
        maxWidth={"sm"}
      >
        <Divider />
        <DialogContent>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Formik
                initialValues={{
                  Firstname: "",
                  Lastname: "",
                  email: "",
                  password: "",
                  phNumber: "",
                }}
                validationSchema={validationSchema}
                onSubmit={(values, { setSubmitting, resetForm }) => {
                  handleCreateNewUser(values, setSubmitting, resetForm);
                }}
              >
                {({ values, isValid, isSubmitting }) => (
                  <Form>
                    <Grid container spacing={3}>
                      <Grid item xs={6}>
                        <Box className={classes.fieldWrappper}>
                          <MuiTextField
                            name="Firstname"
                            id="Firstname"
                            label={"First Name *"}
                          />
                          <ErrorMessage
                            name="Firstname"
                            component="div"
                            className={classes.errorText}
                          />
                        </Box>
                      </Grid>
                      <Grid item xs={6}>
                        <Box className={classes.fieldWrappper}>
                          <MuiTextField
                            name="Lastname"
                            id="Lastname"
                            label={"Last Name *"}
                          />
                          <ErrorMessage
                            name="Lastname"
                            component="div"
                            className={classes.errorText}
                          />
                        </Box>
                      </Grid>
                      <Grid item xs={12}>
                        <Box className={classes.fieldWrappper}>
                          <MuiEmailField
                            name="email"
                            id="email"
                            label={"Email *"}
                          />
                          <ErrorMessage
                            name="email"
                            component="div"
                            className={classes.errorText}
                          />
                        </Box>
                      </Grid>
                      <Grid item xs={6}>
                        <Box className={classes.fieldWrappper}>
                          <MuiPasswordField
                            name="password"
                            id="password"
                            label={"Password *"}
                          />
                          <ErrorMessage
                            name="password"
                            component="div"
                            className={classes.errorText}
                          />
                        </Box>
                      </Grid>
                      <Grid item xs={6}>
                        <Box className={classes.fieldWrappper}>
                          <MuiTextField
                            name="phNumber"
                            id="phNumber"
                            label={"Phone Number *"}
                            type="number"
                          />
                          <ErrorMessage
                            name="phNumber"
                            component="div"
                            className={classes.errorText}
                          />
                        </Box>
                      </Grid>
                      <Grid item xs={12}>
                        <Button
                          color="primary"
                          variant="contained"
                          type="submit"
                          sx={{ textTransform: "capitalize", float: "right" }}
                        >
                          Create New User
                        </Button>
                      </Grid>
                    </Grid>
                  </Form>
                )}
              </Formik>
            </Grid>
          </Grid>
        </DialogContent>
      </MuiDialog>
    </>
  );
};

export default memo(CreateUserForm);

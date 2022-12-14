import React, { memo, useContext } from "react";
import { Formik, Form, ErrorMessage } from "formik";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";
import { GlobalState } from "../../Context/Context";
import { createContactApi } from "../../services/request";
import {
  Grid,
  Box,
  IconButton,
  DialogContent,
  Button,
  Divider,
  TextField,
} from "@mui/material";
import { makeStyles } from "@mui/styles";

import MuiDialog from "../../components/MuiDialog";
import MuiTextField from "../../components/Formik/MuiTextField";

const CreateUserForm = (props) => {
  const { handleCloseUserForm, getAllContactsList } = props;
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
          console.log("res", res);
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
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Formik
                initialValues={{
                  Firstname: "",
                  Lastname: "",
                  email: "",
                  password: "",
                  phNumber: "",
                }}
                onSubmit={(values, { setSubmitting, resetForm }) => {
                  handleCreateNewUser(values, setSubmitting, resetForm);
                }}
              >
                {({ values, isValid, isSubmitting }) => (
                  <Form>
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <MuiTextField
                          name="Firstname"
                          id="Firstname"
                          label={"First Name"}
                          required={true}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <MuiTextField
                          name="Lastname"
                          id="Lastname"
                          label={"Last Name"}
                          required={true}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <MuiTextField
                          name="email"
                          id="email"
                          label={"Email"}
                          required={true}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <MuiTextField
                          name="password"
                          id="password"
                          label={"Password"}
                          required={true}
                          type="password"
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <MuiTextField
                          name="phNumber"
                          id="phNumber"
                          label={"Phone Number"}
                          required={true}
                          type="number"
                        />
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

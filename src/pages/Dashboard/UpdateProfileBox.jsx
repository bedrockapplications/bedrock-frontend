import React, { memo, useContext } from "react";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useHistory, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { makeStyles } from "@mui/styles";
import {
    Grid,
    Box,
    IconButton,
    DialogContent,
    Typography,
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
    align: {
        margin: "auto"
    },
    mainText: {
        color: "rgba(0, 0, 0, 1)",
        textAlign: "center",
        fontWeight: "600",
        fontSize: "24px",
        maxWidth: "313px",
        margin: "auto",
        lineHeight: "36px"
    },
    buttonGrp: {
        display: "flex",
        justifyContent: "space-between",
        marginTop: "30px"
    },
    buttonAlign: {
        width: "100px",
        height: "35px",
        fontSize: "16px",
        fontWeight: "600",
        borderRadius: "7px"
    }
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

const UpdateProfileBox = (props) => {
    const { open, handleCloseUserForm, getAllContactsList } = props;
    const classes = useStyle();
    const history = useHistory();

    const { openUserForm, setOpenUserForm, list, setList,profKey, setProfKey } =
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
                open={open}
                handleClose={handleCloseUserForm}
                id={"createUser"}
                // title={"Create Contact"}
                maxWidth={"sm"}
            >
                {/* <Divider /> */}
                <DialogContent className={classes.align}>
                    <Typography className={classes.mainText}>
                        Please Complete your profile details
                    </Typography>
                    <Box sx={{ marginBottom: "2rem" }} className={classes.buttonGrp}>
                        <Button
                            variant="outlined"
                            color="primary"
                            size="small"
                            sx={{ marginRight: "10px", fontWeight: 700 }}
                            className={classes.buttonAlign}
                            onClick={() => setProfKey(false)}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="outlined"
                            size="small"
                            sx={{ marginLeft: "10px", fontWeight: 700, color: "white", background: "black" }}
                            className={classes.buttonAlign}
                            onClick={()=>history.push("/settings")}
                        // onClick={handleCloseDeleteLog}
                        >
                            Continue
                        </Button>
                    </Box>
                    {/* <Grid container spacing={3}>
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
          </Grid> */}
                </DialogContent>
            </MuiDialog>
        </>
    );
};

export default memo(UpdateProfileBox);

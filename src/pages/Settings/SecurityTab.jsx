import React, { useState, useContext } from "react";
import { GlobalState } from "../../Context/Context";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { makeStyles } from "@mui/styles";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

import {
  Grid,
  Paper,
  Typography,
  Box,
  Button,
  InputAdornment,
  IconButton,
  Divider,
} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import MuiTextField from "../../components/Formik/MuiTextField";
import {
  getCheckExestingPassword,
  updateUserPassword,
} from "../../services/request";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const useStyle = makeStyles(() => ({
  companyText: {
    fontSize: "18px",
    letterSpacing: "0.15px",
    fontWeight: "600",
    color: "#253858",
    padding: "7px 1rem",
  },
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
  existingpassword: Yup.string()
    .min(8)
    .max(20)
    .required("Password is required"),
  newpassword: Yup.string().min(8).max(20).required("New Password is required"),
  confirmpassword: Yup.string()
    .min(8)
    .max(20)
    .oneOf([Yup.ref("newpassword"), null], "Passwords must match"),
});

const SecurityTab = () => {
  const classes = useStyle();
  const { userDetails, setUserDetails } = useContext(GlobalState);
  const [checkPassword, setCheckPassword] = useState(true);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [color, setColor] = useState("success");

  const handleCheckPassword = (values) => {
    if (values.existingpassword.length > 0) {
      getCheckExestingPassword(values?.existingpassword, userDetails._id)
        .then((res) => {
          if (res.status === 200) {
            setOpen(true);
            setColor("success");
            setCheckPassword(false);
            setMessage("Success Password Matched");
          }
        })
        .catch((error) => {
          setOpen(true);
          setColor("error");
          setCheckPassword(true);
          setMessage("The password you entered is incorrect");
        });
    }
  };

  const handleSaveEditFiles = (values, setSubmitting, resetForm) => {
    console.log("values", values);
    let payload = {
      email: userDetails.email,
      password: values.newpassword,
    };
    updateUserPassword(payload)
      .then((res) => {
        if (res.status === 200) {
          setOpen(true);
          setColor("success");
          setMessage(res.data.success);
          resetForm();
        }
      })
      .catch((error) => {
        setColor("error");
        setOpen(true);
        setMessage("Something Went Worng");
      });
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Formik
        initialValues={{
          existingpassword: "",
          newpassword: "",
          confirmpassword: "",
        }}
        enableReinitialize
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          handleSaveEditFiles(values, setSubmitting, resetForm);
        }}
      >
        {({ values, isValid, isSubmitting, setFieldValue }) => (
          <Form>
            <Box
              sx={{
                border: "4px solid #3A3A3C",
                borderRadius: "5px",
                flexGrow: "1",
                padding: "7px",
                // height: "65vh",
                // height: "calc(100vh - 220px)",
              }}
            >
              <Grid container spacing={4}>
                <Grid item xs={12} sm={12} md={12}>
                  <Paper
                  // sx={{ height: "calc(100vh - 240px)" }}
                  >
                    <Typography className={classes.companyText}>
                      Change Your Password
                    </Typography>
                    <Divider />
                    <Box sx={{ padding: "7px 1rem" }}>
                      <Grid container spacing={2}>
                        <Grid item xs={12} sx={{ margin: "40px 0px" }}>
                          <Typography
                            sx={{ marginBottom: "15px", fontWeight: "600" }}
                          >
                            Exisiting Password
                          </Typography>
                          <Grid container spacing={3}>
                            <Grid item xs={4}>
                              <Box className={classes.fieldWrappper}>
                                <MuiTextField
                                  name="existingpassword"
                                  id="existingpassword"
                                  label="Password"
                                  type="password"
                                  handleBlur={() => handleCheckPassword(values)}
                                />
                                <ErrorMessage
                                  name="existingpassword"
                                  component="div"
                                  className={classes.errorText}
                                />
                              </Box>
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid item xs={12}>
                          <Typography
                            sx={{ marginBottom: "15px", fontWeight: "600" }}
                          >
                            New Password
                          </Typography>
                          <Grid container spacing={3}>
                            <Grid item xs={4}>
                              <Box className={classes.fieldWrappper}>
                                <MuiTextField
                                  name="newpassword"
                                  id="newpassword"
                                  label="Password"
                                  type="password"
                                  disabled={checkPassword}
                                />
                                <ErrorMessage
                                  name="newpassword"
                                  component="div"
                                  className={classes.errorText}
                                />
                              </Box>
                            </Grid>
                            <Grid item xs={4}>
                              <Box className={classes.fieldWrappper}>
                                <MuiTextField
                                  name="confirmpassword"
                                  id="confirmpassword"
                                  label="Confirm Password"
                                  type="password"
                                  disabled={checkPassword}
                                />
                                <ErrorMessage
                                  name="confirmpassword"
                                  component="div"
                                  className={classes.errorText}
                                />
                              </Box>
                            </Grid>
                            <Grid item xs={12} align="right">
                              <Button
                                variant="contained"
                                type="submit"
                                size="small"
                              >
                                Submit
                              </Button>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Box>
                  </Paper>
                </Grid>
              </Grid>
              {/* <Grid container>
                  <Grid item xs={12} md={4}>
                    <Paper
                      elevation={1}
                      sx={{ textAlign: "center", padding: "1rem 2rem" }}
                    >
                      <Avatar
                        alt="Remy Sharp"
                        src=""
                        sx={{ width: 100, height: 100 }}
                      />
                      <Typography>dummy.user@devias.io</Typography>
                      <Typography>Your plan: Premium</Typography>
                      <Typography>Remove Picture</Typography>
                      <MuiTextField name="email" id="email" label="email" />
                      <MuiTextField
                        name="phoneNo"
                        id="phoneNo"
                        label="Phone Number"
                      />
                    </Paper>
                  </Grid>
                  <Grid item xs={12} md={8}>
                    <Paper elevation={1}>
                      <Typography className={classes.companyText}>
                        Company Profile
                      </Typography>
                      <Divider />
                      <Grid container spacing={2} sx={{ flexGrow: 1 }}>
                      <Grid item xs={12}>
                        <Grid container rowSpacing={2} columnSpacing={2}>
                          <Grid item xs={8}>
                            <Typography>Address</Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                    </Paper>
                  </Grid>
                </Grid> */}
            </Box>
          </Form>
        )}
      </Formik>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={color} sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default SecurityTab;

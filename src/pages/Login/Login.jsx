import React from "react";
import { Button, Grid, Stack, Typography } from "@mui/material";
import loginSideImg from "../../Images/login_side_img.svg";
import { makeStyles } from "@mui/styles";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import MuiEmailField from "../../components/Formik/MuiEmailField";
import MuiPasswordField from "../../components/Formik/MuiPassword";
import { loginApi, getUserDetails } from "../../services/request";
import { useHistory } from "react-router-dom";
import { ShowSnackbar } from "../../components/Snackbar";

const useStyle = makeStyles((theme) => ({
  bgImgContainer: {
    backgroundImage: `url(${loginSideImg})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    width: "inherit",
    height: "inherit",
    [theme.breakpoints.only("xs")]: {
      display: "none",
    },
    [theme.breakpoints.only("sm")]: {
      display: "none",
    },
  },
  formContainer: {
    padding: "5rem 7rem 3rem",
    [theme.breakpoints.only("xs")]: {
      padding: "4rem 4rem 3rem",
    },
    [theme.breakpoints.only("sm")]: {
      padding: "4rem 4rem 3rem",
    },
  },
  formStack: {
    width: "100%",
    height: "100%",
  },
  signInText: {
    fontSize: "2rem",
    fontWeight: "bold",
    color: "#000",
  },
}));

const validationSchema = Yup.object().shape({
  email: Yup.string().required("Please enter your email address").nullable(),
  password: Yup.string().required("Please enter your password").nullable(),
});

const LoginPage = () => {
  const classes = useStyle();
  const history = useHistory();

  const GetUserDetailsApi = (id) => {
    getUserDetails(id)
      .then((res) => {
        if (res.status === 200) {
          let data = res.data;
          let userFirstName = data.firstName;
          let uname = data.firstName + " " + data.lastName;
          localStorage.setItem("userName", uname);
          localStorage.setItem("userFirstName", userFirstName);
          localStorage.setItem("userId", data._id);
          localStorage.setItem("role", data.role);
          ShowSnackbar("success", "Logged in Successfully");
          setTimeout(() => {
            history.push({
              pathname: "/dashboard",
            });
          }, 500);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleForget = () => {
    history.push("/forgotpassword");
  };

  const handleSignup = () => {
    history.push("/signup");
  };

  return (
    <>
      <Grid container sx={{ height: "100vh", backgroundColor: "#fff" }}>
        <Grid item xs={6} className={classes.bgImgContainer}></Grid>
        <Grid
          item
          xs={12}
          sm={12}
          md={6}
          lg={6}
          className={classes.formContainer}
        >
          <Stack
            direction="column"
            justifyContent="space-between"
            alignItems="center"
            className={classes.formStack}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography className={classes.signInText}>Sign in</Typography>
              </Grid>
              <Grid item xs={12}>
                <Formik
                  initialValues={{
                    email: null,
                    password: null,
                  }}
                  enableReinitialize
                  validateOnMount
                  validationSchema={validationSchema}
                  onSubmit={(values, { setSubmitting, resetForm }) => {
                    loginApi(values)
                      .then((res) => {
                        if (res.status === 200) {
                          let id = res?.data?._id;
                          if (id) {
                            GetUserDetailsApi(id);
                          }
                        }
                      })
                      .catch((error) => {
                        console.log("error");
                      });
                  }}
                >
                  {({ values, isValid, isSubmitting, handleSubmit }) => (
                    <Form onSubmit={handleSubmit}>
                      <Grid container spacing={3}>
                        <Grid item xs={12}>
                          <MuiEmailField
                            id="email"
                            name="email"
                            label="Email Address"
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <MuiPasswordField
                            id="password"
                            name="password"
                            label="Password"
                          />
                        </Grid>
                        <Grid item xs={12} sx={{ textAlign: "center" }}>
                          <Button
                            variant="contained"
                            color="primary"
                            sx={{ width: "50%", textTransform: "capitalize" }}
                            type="submit"
                          >
                            Sign In
                          </Button>
                        </Grid>
                        <Grid item xs={12} sx={{ textAlign: "center" }}>
                          <Typography
                            sx={{
                              textDecoration: "underline",
                              cursor: "pointer",
                            }}
                            onClick={handleForget}
                          >
                            Forgot Password?
                          </Typography>
                        </Grid>
                      </Grid>
                    </Form>
                  )}
                </Formik>
              </Grid>
            </Grid>
            <Grid container spacing={3}>
              <Grid item xs={12} sx={{ textAlign: "center" }}>
                <Typography>
                  New User Registration?{" "}
                  <span
                    style={{ color: "#FFC100", cursor: "pointer" }}
                    onClick={handleSignup}
                  >
                    Sign Up
                  </span>
                </Typography>
              </Grid>
            </Grid>
          </Stack>
        </Grid>
      </Grid>
    </>
  );
};

export default LoginPage;

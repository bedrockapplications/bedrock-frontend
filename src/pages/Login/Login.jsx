import React, { useContext } from "react";
import { Button, Grid, Stack, Typography, Box } from "@mui/material";
// import loginSideImg from "../../Images/login_side_img.svg";
import bubble from "../../Images/bubble.svg";
import bedlogin from "../../Images/bedlogin.svg";
import welcome from "../../Images/welcome.svg";
import { makeStyles } from "@mui/styles";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import MuiEmailField from "../../components/Formik/MuiEmailField";
import MuiPasswordField from "../../components/Formik/MuiPassword";
import { loginApi, getUserDetails } from "../../services/request";
import { useHistory } from "react-router-dom";
import { ShowSnackbar } from "../../components/Snackbar";
import { GlobalState } from "../../Context/Context"

const useStyle = makeStyles((theme) => ({
  bgImgContainer: {
    background: "#3A3A3C",
    height: '100vh',
    width: "inherit",
    height: "inherit",
    [theme.breakpoints.only("xs")]: {
      display: "none",
    },
    [theme.breakpoints.only("sm")]: {
      display: "none",
    },
  },
  bgInnerContainer: {
    padding: "0vh 0px 12vh 0px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
    height: "100vh",
    width: "50vw",
    backgroundImage: `url(${bubble})`,
    backgroundSize: "100%",
    backgroundPosition: "bottom",
    backgroundRepeat: "no-repeat",
  },
  bgwelcome: {
    height: "20vh"
  },
  bgbedicon: {
    height: "48vh"
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

  const { userRole, setUserRole } = useContext(GlobalState);
  const classes = useStyle();
  const history = useHistory();

  const GetUserDetailsApi = (id) => {
    console.log(userRole)
    getUserDetails(id)
      .then((res) => {
        if (res.data.status) {
          let data = res.data.data;
          let userFirstName = data.fullName;
          // let uname = data.fullName + " " + data?.lastName;
          let uname = data.fullName
          localStorage.setItem("userName", uname);
          localStorage.setItem("userFirstName", userFirstName);
          localStorage.setItem("userId", data._id);
          localStorage.setItem("role", data.role);
          setUserRole(data.role)
          ShowSnackbar("success", "Logged in Successfully");
          setTimeout(() => {
            if (data.role === "owner") {
              history.push({
                pathname: "/dashboard",
              });
            } else {
              history.push({
                pathname: "/allprojects",
              });
            }
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

  const handleContactorSignup = () => {
    history.push("/signupcontractor");
  };



  return (
    <>
      <Grid container sx={{ height: "100vh", backgroundColor: "#fff" }}>
        <Grid item xs={6} className={classes.bgImgContainer}>
          <Box xs={12} className={classes.bgInnerContainer}>
            <div className={classes.bgwelcome}>
              <img className={classes.bgwelcome} src={welcome} alt="" />
            </div>
            <div className={classes.bgbedicon}>
              <img className={classes.bgbedicon} src={bedlogin} alt="" />
            </div>
          </Box>
        </Grid>
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
                        // console.log(res , "res-login")
                        if (res.data.status) {
                          let id = res?.data?.data?.user_id;
                          if (id) {
                            GetUserDetailsApi(id);
                          }
                        } else {
                          ShowSnackbar("error", res?.data?.message)
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
                        <Grid item xs={12} sx={{ marginTop: "3vh" }}>
                          <MuiEmailField
                            id="email"
                            name="email"
                            label="Email Address"
                          />
                        </Grid>
                        <Grid item xs={12} sx={{ marginTop: "3vh" }}>
                          <MuiPasswordField
                            id="password"
                            name="password"
                            label="Password"
                          />
                        </Grid>
                        <Grid item xs={12} sx={{ textAlign: "center", marginTop: "3vh" }}>
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
                  New Contractor Registration?{" "}
                  <span
                    style={{ color: "#FFC100", cursor: "pointer" }}
                    onClick={handleContactorSignup}
                  >
                    Sign Up
                  </span>
                </Typography>
              </Grid>
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
import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { makeStyles } from "@mui/styles";

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

const useStyle = makeStyles(() => ({
  companyText: {
    fontSize: "18px",
    letterSpacing: "0.15px",
    fontWeight: "600",
    color: "#253858",
    padding: "7px 1rem",
  },
}));

const SecurityTab = () => {
  const classes = useStyle();
  return (
    <>
      <Formik
        initialValues={{}}
        enableReinitialize
        validationSchema={""}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          console.log("values", values);
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
                height: "calc(100vh - 220px)",
              }}
            >
              <Grid container spacing={4}>
                <Grid item xs={12} sm={12} md={12}>
                  <Paper sx={{ height: "calc(100vh - 240px)" }}>
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
                              <MuiTextField
                                name="existingpassword"
                                id="existingpassword"
                                label="Password"
                                type="password"
                              />
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
                              <MuiTextField
                                name="newpassword"
                                id="newpassword"
                                label="Password"
                                type="password"
                              />
                            </Grid>
                            <Grid item xs={4}>
                              <MuiTextField
                                name="confirmpassword"
                                id="confirmpassword"
                                label="Confirm Password"
                                type="password"
                              />
                            </Grid>
                            <Grid item xs={12}>
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
    </>
  );
};

export default SecurityTab;

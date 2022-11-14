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

const BillingTab = () => {
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
                height: "calc(100vh - 220px)"
              }}
            >
              <Grid container spacing={4}>
                <Grid item xs={12} sm={12} md={12}>
                  <Paper sx={{height: "calc(100vh - 240px)"}}>
                    <Typography className={classes.companyText}>
                    Manage Your Plan
                    </Typography>
                    <Divider />
                    <Box sx={{ padding: "7px 1rem" }}>
                      <Grid container spacing={2}>
                        <Grid item xs={8}>
                        <Typography className={classes.companyText} sx={{margin:"30px 0px 15px 0px", padding:"0 !important"}}>
                        Billing Address
                    </Typography>
                          <Grid container spacing={3}>
                            <Grid item xs={12}>
                              <MuiTextField
                                name="address1"
                                id="address1"
                                label="Address Line 1"
                              />
                            </Grid>
                            <Grid item xs={8}>
                              <MuiTextField
                                name="address2"
                                id="address2"
                                label="Address Line 2"
                              />
                            </Grid>
                            <Grid item xs={4}>
                              <MuiTextField
                                name="city"
                                id="city"
                                label="City"
                              />
                            </Grid>
                            <Grid item xs={4}>
                              <MuiTextField
                                name="state"
                                id="state"
                                label="State"
                              />
                            </Grid>
                            <Grid item xs={4}>
                              <MuiTextField
                                name="zipCode"
                                id="zipCode"
                                label="Zip Code"
                              />
                            </Grid>
                            <Grid item xs={4}>
                              <MuiTextField
                                name="country"
                                id="country"
                                label="Country"
                              />
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid container spacing={2} sx={{marginTop:"30px"}}>
                        <Grid item xs={3}>
                        <Typography sx={{marginBottom:"5px", fontWeight:"600"}}>(Billing) E-mail Address</Typography>
                          <MuiTextField
                            name="email"
                            id="email"
                            label="email"
                          />
                        </Grid>
                        <Grid item xs={3}>
                        <Typography sx={{marginBottom:"5px", fontWeight:"600"}}>(Billing) Phone Number</Typography>
                          <MuiTextField
                            name="phoneNumber"
                            id="phoneNumber"
                            label="Phone Number"
                          />
                        </Grid>
                        <Grid item xs={3}>
                        <Typography sx={{marginBottom:"5px", fontWeight:"600"}}>(Billing) Full Name</Typography>
                          <MuiTextField
                            name="fullname"
                            id="fullname"
                            label="Full Name"
                          />
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

export default BillingTab;

import React, { useState, useContext } from "react";
import { GlobalState } from "../../Context/Context";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { makeStyles } from "@mui/styles";

import { Grid, Paper, Typography, Box, Button, Divider } from "@mui/material";
import MuiTextField from "../../components/Formik/MuiTextField";
import { updateUserDetails } from "../../services/request";

const useStyle = makeStyles(() => ({
  companyText: {
    fontSize: "18px",
    letterSpacing: "0.15px",
    fontWeight: "600",
    color: "#253858",
    padding: "7px 1rem",
  },
  mainBox: {
    border: "4px solid #3A3A3C",
    borderRadius: "5px",
    flexGrow: "1",
    padding: "7px",
  },
  miniText: {
    margin: "15px 0px",
    padding: "5px !important",
    background: "#F2F2F7",
    border: "1px solid #D3D3D3",
    borderRadius: "5px",
    textAlign: "center",
  },
  linkText: {
    margin: "15px 0px",
    padding: "0 !important",
    color: "#007AFF",
    textDecoration: "underline",
    cursor: "pointer",
  },
}));

const BillingTab = () => {
  const classes = useStyle();
  const { userDetails, setUserDetails } = useContext(GlobalState);

  const handleSaveEditFiles = (values, setSubmitting, resetForm) => {
    let billerDetails = {
      fullName: values?.fullName,
      contactNum: values?.contactNum,
      billEmail: values?.billEmail,
    };
    let obj = userDetails;
    obj.billingInformation.BillingAddress.street = values.address2;
    obj.billingInformation.BillingAddress.city = values.city;
    obj.billingInformation.BillingAddress.state = values.state;
    obj.billingInformation.BillingAddress.zipcode = values.zipCode;
    obj.billingInformation.BillingAddress.country = values.country;
    obj.billingInformation.BillingContact = { ...billerDetails };
    setUserDetails(obj);
    updateUserDetails(obj?._id, obj)
      .then((res) => {
        if (res.status === 200) {
          console.log("res", res);
        }
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  return (
    <>
      <Formik
        initialValues={{
          address2:
            userDetails?.billingInformation?.BillingAddress?.street || "",
          city: userDetails?.billingInformation?.BillingAddress?.city || "",
          state: userDetails?.billingInformation?.BillingAddress?.state || "",
          zipCode:
            userDetails?.billingInformation?.BillingAddress?.zipcode || "",
          country:
            userDetails?.billingInformation?.BillingAddress?.country || "",
          billEmail:
            userDetails?.billingInformation?.BillingContact?.billEmail || "",
          contactNum:
            userDetails?.billingInformation?.BillingContact?.contactNum || "",
          fullName:
            userDetails?.billingInformation?.BillingContact?.fullName || "",
        }}
        enableReinitialize
        validationSchema={""}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          handleSaveEditFiles(values, setSubmitting, resetForm);
        }}
      >
        {({ values, isValid, isSubmitting, setFieldValue }) => (
          <Form>
            <Box className={classes.mainBox}>
              <Grid container spacing={4}>
                <Grid item xs={12} sm={12} md={12}>
                  <Paper>
                    <Typography className={classes.companyText}>
                      Manage Your Plan
                    </Typography>
                    <Divider />
                    <Box sx={{ padding: "7px 1rem" }}>
                      <Grid container spacing={2}>
                        <Grid item>
                          <Typography
                            sx={{
                              margin: "15px 0px",
                              padding: "0 !important",
                            }}
                          >
                            Your Plan:
                          </Typography>
                        </Grid>
                        <Grid item xs={2}>
                          <Typography className={classes.miniText}>
                            Basic
                          </Typography>
                        </Grid>
                        <Grid item>
                          <Typography className={classes.linkText}>
                            Upgrade Plan
                          </Typography>
                        </Grid>
                      </Grid>
                      <Grid container spacing={2}>
                        <Grid item xs={8}>
                          <Typography
                            className={classes.companyText}
                            sx={{
                              padding: "1rem 0 !important",
                            }}
                          >
                            Billing Address
                          </Typography>
                          <Grid container spacing={3}>
                            <Grid item xs={8}>
                              <MuiTextField
                                name="address2"
                                id="address2"
                                label="Address"
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
                      <Grid container spacing={2}>
                        <Grid item xs={12}>
                          <Typography
                            className={classes.companyText}
                            sx={{ padding: "1rem 0px 0px 0px !important" }}
                          >
                            Billing Contact
                          </Typography>
                        </Grid>
                        <Grid item xs={3}>
                          <MuiTextField
                            name="billEmail"
                            id="billEmail"
                            label="E-mail Address"
                          />
                        </Grid>
                        <Grid item xs={3}>
                          <MuiTextField
                            name="contactNum"
                            id="contactNum"
                            label="Phone Number"
                          />
                        </Grid>
                        <Grid item xs={3}>
                          <MuiTextField
                            name="fullName"
                            id="fullName"
                            label="Full Name"
                          />
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
                    </Box>
                  </Paper>
                </Grid>
              </Grid>
            </Box>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default BillingTab;

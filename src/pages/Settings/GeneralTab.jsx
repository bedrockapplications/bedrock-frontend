import React, {useContext} from "react";
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
import { Direction } from "react-data-table-component";
import { useTranslation } from "react-i18next";
import { GlobalState } from "../../Context/Context";

const useStyle = makeStyles(() => ({
  companyText: {
    fontSize: "18px",
    letterSpacing: "0.15px",
    fontWeight: "600",
    color: "#253858",
    padding: "7px 1rem",
  },
  userName:{
    fontSize: "24px",
    color: "#253858",
    fontWeight:"700",
  }
}));

const GeneralTab = () => {
  const classes = useStyle();
  const { t } = useTranslation();
  const {userDetails, setUserDetails} = useContext(GlobalState);

  const handleSaveEditFiles = (values, setSubmitting, resetForm) => {
    setSubmitting(true);
  };
  return (
    <>
      <Formik
        initialValues={{
              email: userDetails?.email,
              phoneNo: userDetails?.phoneNumber,
        }}
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
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={4}>
                  <Paper sx={{ textAlign: "center", padding: "1rem 2rem", height: "calc(100vh - 240px)", 
                display:"flex", flexDirection:"column", justifyContent:"space-evenly", alignItems:"center" }}>
                    <Avatar
                      alt="Remy Sharp"
                      src=""
                      sx={{ width: 100, height: 100 }}
                    />
                    <Typography className={classes.userName}>{userDetails?.email}</Typography>
                    <Typography>Your plan: Premium</Typography>
                    <Typography sx={{fontWeight:"700"}}>Remove Picture</Typography>
                    <MuiTextField name="email" id="email" label="email" required/>
                    <MuiTextField
                      name="phoneNo"
                      id="phoneNo"
                      label="Phone Number"
                      required
                    />
                  </Paper>
                </Grid>
                <Grid item xs={12} sm={12} md={8}>
                  <Paper sx={{
                height: "calc(100vh - 240px)",
              }}>
                    <Typography className={classes.companyText}>
                      Company Profile
                    </Typography>
                    <Divider />
                    <Box sx={{ padding: "7px 1rem" , height: "calc(100vh - 282px)", display:"flex", flexDirection:"column", justifyContent:"space-evenly"}}>
                      <Grid container spacing={2}>
                        <Grid item xs={8}>
                          <Typography sx={{marginBottom:"5px", fontWeight:"600"}}>Address</Typography>
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
                        <Grid item xs={4}>
                          <Typography sx={{marginBottom:"5px", fontWeight:"600"}}>Position / Title</Typography>
                          <Grid container spacing={3}>
                            <Grid item xs={12}>
                              <MuiTextField
                                name="type"
                                id="type"
                                label="Type"
                              />
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Typography className={classes.companyText} sx={{padding:"0 !important"}}>
                        Emergency Contact
                      </Typography>
                      <Grid container spacing={2}>
                        <Grid item xs={3}>
                        <Typography sx={{marginBottom:"5px", fontWeight:"600"}}>Full Name</Typography>
                          <MuiTextField
                            name="fullName"
                            id="fullName"
                            label="Full Name"
                          />
                        </Grid>
                        <Grid item xs={3}>
                        <Typography sx={{marginBottom:"5px", fontWeight:"600"}}>Phone Number</Typography>
                          <MuiTextField
                            name="phoneNumber"
                            id="phoneNumber"
                            label="Phone Number"
                          />
                        </Grid>
                        <Grid item xs={3}>
                        <Typography sx={{marginBottom:"5px", fontWeight:"600"}}>Relationship</Typography>
                          <MuiTextField
                            name="relationship"
                            id="relationship"
                            label="Relationship"
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <Button
                            variant="contained"
                            type="submit"
                            size="small"
                          >
                            {t("submit")}
                          </Button>
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

export default GeneralTab;

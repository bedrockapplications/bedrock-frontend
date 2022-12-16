import React, { useContext } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { makeStyles } from "@mui/styles";

import { Grid, Paper, Typography, Box, Button, Divider } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import MuiTextField from "../../components/Formik/MuiTextField";
import { useTranslation } from "react-i18next";
import { GlobalState } from "../../Context/Context";
import { updateUserDetails } from "../../services/request";

const useStyle = makeStyles(() => ({
  companyText: {
    fontSize: "18px",
    letterSpacing: "0.15px",
    fontWeight: "600",
    color: "#253858",
    padding: "7px 1rem",
  },
  userName: {
    fontSize: "24px",
    color: "#253858",
    fontWeight: "700",
  },
  mainBox: {
    border: "4px solid #3A3A3C",
    borderRadius: "5px",
    flexGrow: "1",
    padding: "7px",
  },
  leftBox: {
    textAlign: "center",
    padding: "1.65rem 2rem",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
  },
  rightMiniBox: {
    padding: "1rem",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
  },
}));

const GeneralTab = () => {
  const classes = useStyle();
  const { t } = useTranslation();
  const { userDetails, setUserDetails } = useContext(GlobalState);

  const handleSaveEditFiles = (values, setSubmitting, resetForm) => {
    let emergencyDetails = {
      fullName: values?.fullName,
      contactNum: values.contactNum,
      relationship: values.relationship,
    };

    let obj = userDetails;
    obj.email = values.email;
    obj.phoneNumber = values.phoneNo;
    obj.companyInformation.companycurrentAddress.street = values.address2;
    obj.companyInformation.companycurrentAddress.city = values.city;
    obj.companyInformation.companycurrentAddress.state = values.state;
    obj.companyInformation.companycurrentAddress.zipcode = values.zipCode;
    obj.companyInformation.companycurrentAddress.country = values.country;
    obj.companyInformation.emergencyContact = { ...emergencyDetails };
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
          email: userDetails?.email || "",
          phoneNo: userDetails?.phoneNumber || "",
          address2:
            userDetails?.companyInformation?.companycurrentAddress?.street ||
            "",
          city:
            userDetails?.companyInformation?.companycurrentAddress?.city || "",
          state:
            userDetails?.companyInformation?.companycurrentAddress?.state || "",
          zipCode:
            userDetails?.companyInformation?.companycurrentAddress?.zipcode ||
            "",
          country:
            userDetails?.companyInformation?.companycurrentAddress?.country ||
            "",
          fullName:
            userDetails?.companyInformation?.emergencyContact?.fullName || "",
          contactNum:
            userDetails?.companyInformation?.emergencyContact?.contactNum || "",
          relationship:
            userDetails?.companyInformation?.emergencyContact?.relationship ||
            "",
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
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={4}>
                  <Paper className={classes.leftBox}>
                    <Avatar
                      alt="Remy Sharp"
                      src=""
                      sx={{ width: 80, height: 80 }}
                    />
                    <Typography className={classes.userName}>
                      {userDetails
                        ? `${userDetails.firstName} ${userDetails.lastName}`
                        : ""}
                    </Typography>
                    <Typography>Your plan: Premium</Typography>
                    <Typography
                      sx={{ fontWeight: "700", marginBottom: "1rem" }}
                    >
                      Remove Picture
                    </Typography>
                    <Grid container spacing={3.5}>
                      <Grid item xs={12}>
                        <MuiTextField
                          name="email"
                          id="email"
                          label="email"
                          required
                          disabled="true"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <MuiTextField
                          name="phoneNo"
                          id="phoneNo"
                          label="Phone Number"
                          required
                        />
                      </Grid>
                    </Grid>
                  </Paper>
                </Grid>
                <Grid item xs={12} sm={12} md={8}>
                  <Paper
                    sx={{
                      padding: "0.5rem 0",
                    }}
                  >
                    <Typography className={classes.companyText}>
                      Company Profile
                    </Typography>
                    <Divider />
                    <Box className={classes.rightMiniBox}>
                      <Grid container spacing={2}>
                        <Grid item xs={8}>
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
                      <Typography
                        className={classes.companyText}
                        sx={{ padding: "1rem 0px !important" }}
                      >
                        Emergency Contact
                      </Typography>
                      <Grid container spacing={2}>
                        <Grid item xs={3}>
                          <MuiTextField
                            name="fullName"
                            id="fullName"
                            label="Full Name"
                            onChange={(e) =>
                              console.log(e.target.value, "jjjjj")
                            }
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
                            name="relationship"
                            id="relationship"
                            label="Relationship"
                          />
                        </Grid>
                        <Grid item xs={12} align="right">
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
            </Box>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default GeneralTab;

import React, { useState, memo, useEffect, useContext } from "react";
import {
  Button,
  Grid,
  Paper,
  Typography,
  IconButton,
  Box,
} from "@mui/material";

import { makeStyles } from "@mui/styles";
import { Formik, Form, ErrorMessage } from "formik";
import MuiTextField from "../../components/Formik/MuiTextField";
import { useTranslation } from "react-i18next";
import { GlobalState } from "../../Context/Context";
import PremiumDailog from "../../components/premiumDailog";
import AutoMeasureTabularView from "./autoMeasureTable";
import FileUpload from "../../components/docUpload";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";


const useStyle = makeStyles(() => ({
  projectHeader: {
    backgroundColor: "#3A3A3C !important",
    padding: "26px 0px 36px 26px",
    color: "#fff !important",
    borderRadius: "10px !important",
  },
  projectText: {
    fontSize: "1.5rem !important",
    fontWeight: "700 !important",
    lineHeight: "2.25rem !important",
    fontStyle: "normal",
  },
  ongoingText: {
    fontSize: "0.938rem !important",
    fontWeight: "500 !important",
    lineHeight: "1.406rem !important",
    fontStyle: "normal",
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
  rightHead: {
    fontWeight: "700",
    fontSize: "24px",
    lineHeight: "36px",
    color: "#3A3A3C",
  },
  imgTexts: {
    display: "flex",
  },
  imgName: {
    marginTop: "20px",
    marginRight: "2%",
    display: "flex",
    justifyContent: "space-between",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    border: "1px solid rgba(1, 167, 104, 1)",
    borderRadius: "5px",
    padding: "5px 15px",
  },
  uploadlabel: {
    fontWeight: "700",
    fontSize: "15px",
    lineHeight: "22px",
    marginBottom: "10px",
    color: "#3A3A3C",
  },
}));



const AutoMeasure = () => {
  const classes = useStyle();
  const { t } = useTranslation();
  const { popen, setPopen, setIsLoading } = useContext(GlobalState);
  const [file, setfile] = useState([]);

  const handleUpload = (values) => {
    if(values.docuploads !== null) {
      setfile(values.docuploads[0]);
      console.log(values?.docuploads[0], "mmmm")
    }                   
    
  }

  useEffect(() => {
    let payload = {
      email: "adithya.namada@bedrockapps.org", 
      password: "Adithya@123"
    }
    console.log("hello","kreo")
    axios.post('https://takeoff.kreo.net/api/auto-measure/v1/auth/login', payload)
    .then((res) => {
      if (res.status === 200) {
        console.log("res", res);
      }
    })
    .catch((error) => {
      console.log("error", error);
    });
  }, [])


  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Paper elevation={0} className={classes.projectHeader}>
            <Typography className={classes.projectText}>
              AI Auto Measure
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={8} sx={{ minHeight: "72vh" }}>
          <AutoMeasureTabularView data="" />
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper
            elevation={2}
            sx={{
              height: "100%",
              padding: "1rem",
              border: "3px solid #3A3A3C",
            }}
          >
            <Formik
              initialValues={{
                docuploads: null,
              }}
              validationSchema={null}
              // innerRef={formikRef}
              onSubmit={(values, { setSubmitting, resetForm }) => {
                console.log("values", values);
                // handleCreateDailyLog(values);
                handleUpload(values);
              }}
            >
              {({
                values,
                isValid,
                isSubmitting,
                handleSubmit,
                setFieldValue,
              }) => (
                <Form onSubmit={handleSubmit}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Typography className={classes.rightHead}>
                        Upload Document :
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography className={classes.uploadlabel}>
                        Upload File :
                      </Typography>
                      <Box>
                        <FileUpload
                          id="docuploads"
                          name="docuploads"
                          maxFiles={1}
                          multiple={false}
                        />
                      </Box>
                      <Box className={classes.imgTexts}>
                        {values?.docuploads?.map((file, i) => (
                          <Typography
                            key={file + i}
                            className={classes.imgName}
                          >
                            {`${i + 1}. ${file.name.substring(0, 20)}`}
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <span>
                              <IconButton
                                size="small"
                                color="primary"
                                onClick={() => console.log()}
                              >
                                <DeleteIcon fontSize="16px" />
                              </IconButton>
                            </span>
                          </Typography>
                        ))}
                      </Box>
                    </Grid>
                    <Grid item xs={6}>
                      <MuiTextField
                        name="frompageno"
                        id="frompageno"
                        label="From Page No"
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <MuiTextField
                        name="topageno"
                        id="topageno"
                        label="To Page No"
                      />
                    </Grid>
                  </Grid>
                  <Grid item xs={12} align="right" sx={{paddingTop:"5vh"}}>
                    <Button
                      variant="contained"
                      type="submit"
                      size="small"
                    >
                      Submit
                    </Button>
                  </Grid>
                </Form>
              )}
            </Formik>
          </Paper>
        </Grid>
      </Grid>
      <>{popen ? <PremiumDailog /> : ""}</>
    </>
  );
};
export default memo(AutoMeasure);


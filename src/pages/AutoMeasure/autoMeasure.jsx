import React, {
  useState,
  memo,
  useEffect,
  useContext,
  useCallback,
} from "react";
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
import PDFViewer from "./PDFViewer";
import {
  getKreoLoginApi,
  uploadFiletoKero,
  getKreoProjectDetails,
} from "../../services/request";

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
  const [openData, setOpenData] = useState(true);
  const [KreoProjectDetails, setKreoProjectDetails] = useState({});

  const handleUpload = (values) => {
    if (values.docuploads !== null) {
      setfile(values.docuploads[0]);
      console.log(values?.docuploads[0], "mmmm");
    }
  };

  useEffect(() => {
    getKreoLoginApi()
      .then((res) => {
        if (res.status === 200) {
          if (res?.data?.length > 0) {
            let token = res?.data[0]?.split("=")[1]?.split(";")[0];
            localStorage.setItem("kreoToken", token);
          }
        }
      })
      .catch((error) => {
        console.log("error", error);
      });
  }, []);

  const handleOpenData = () => {
    // setOpenData(true);
  };

  const handleCloseData = useCallback(() => {
    setOpenData(false);
  }, []);

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
                pageIndexFrom: "",
                pageIndexTo: "",
              }}
              validationSchema={null}
              // innerRef={formikRef}
              onSubmit={(values, { setSubmitting, resetForm }) => {
                let formData = new FormData();
                formData.append("attachment", values?.docuploads[0]);
                formData.append(
                  "kreo_auth_access_token",
                  localStorage.getItem("kreoToken")
                );
                formData.append("pageIndexFrom", values?.pageIndexFrom);
                formData.append("pageIndexTo", values?.pageIndexTo);
                uploadFiletoKero(formData)
                  .then((res) => {
                    if (res.status === 200) {
                      let data = res.data;
                      setKreoProjectDetails({ ...data });
                      setOpenData(true);
                    }
                  })
                  .catch((error) => {
                    console.log("error", error);
                  });
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
                        name="pageIndexFrom"
                        id="pageIndexFrom"
                        label="From Page No"
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <MuiTextField
                        name="pageIndexTo"
                        id="pageIndexTo"
                        label="To Page No"
                      />
                    </Grid>
                  </Grid>
                  <Grid item xs={12} align="right" sx={{ paddingTop: "5vh" }}>
                    <Button variant="contained" type="submit" size="small">
                      Submit
                    </Button>
                  </Grid>
                </Form>
              )}
            </Formik>
          </Paper>
        </Grid>
      </Grid>
      {file && (
        <PDFViewer
          title="MEASURED DATA :"
          id="measureddata"
          open={openData}
          handleClose={handleCloseData}
          myPdfFile={file}
          kreoProjectObj={KreoProjectDetails}
        />
      )}
      <>{popen ? <PremiumDailog /> : ""}</>
    </>
  );
};
export default memo(AutoMeasure);

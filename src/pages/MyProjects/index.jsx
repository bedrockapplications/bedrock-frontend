import React, { useState, memo, useEffect } from "react";
import { Button, Grid, Paper, Typography } from "@mui/material";
import { getAllProjectList, createNewProjectApi } from "../../services/request";

import { makeStyles } from "@mui/styles";
import ProjectTable from "../../components/MuiTable";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import MuiTextField from "../../components/Formik/MuiTextField";
import { useTranslation } from "react-i18next";

// import ProjectDataTable from "./ProjectDataTable";
// import CardMedia from "@mui/material/CardMedia";
// import { CardActionArea } from "@mui/material";
// import { Box } from "@mui/system";
// import Card from "@mui/material/Card";
// import CardActions from "@mui/material/CardActions";
// import CardContent from "@mui/material/CardContent";
// import Button from "@mui/material/Button";
// import plus from "../../Images/Plus.png";

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
}));

let disableFilter = {
  filter: false,
  sort: false,
};

const MyProjects = () => {
  const classes = useStyle();
  const { t } = useTranslation();
  const uId = localStorage.getItem("userId");
  const [projectsList, setProjectsList] = useState([]);

  const handleCreateNewProject = (values, setSubmitting, resetForm) => {
    let payload = {
      projectName: values.projectName,
      ClientPhNumber: "",
      Address: values.address,
      City: values.city,
      State: values.state,
      Zipcode: values.Zipcode,
      StartDate: new Date(),
      userId: uId,
    };
    setSubmitting(true);
    createNewProjectApi(payload)
      .then((res) => {
        if (res.status === 200) {
          console.log("res", res.data);
          getProjects();
          resetForm();
          setSubmitting(false);
        }
      })
      .catch((error) => {
        const errorObj = error;
        setSubmitting(false);
        console.log("errorObj", errorObj);
      });
  };

  const columns = [
    {
      name: "projectName",
      label: `${t("myProject.name")}`,
      options: {
        ...disableFilter,
        customBodyRender: (value) => (value ? value : `---`),
      },
    },
    // {
    //   name: "type",
    //   label: `${t("myProject.type")}`,
    //   options: {
    //     ...disableFilter,
    //     customBodyRender: (value) => (value ? value : `---`),
    //   },
    // },
    // {
    //   name: "status",
    //   label: `${t("myProject.status")}`,
    //   options: {
    //     ...disableFilter,
    //     customBodyRender: (value) => (value ? value : `---`),
    //   },
    // },
    // {
    //   name: "projectManager",
    //   label: `${t("myProject.projectManager")}`,
    //   options: {
    //     ...disableFilter,
    //     customBodyRender: (value) => (value ? value : `---`),
    //   },
    // },
    {
      name: "State",
      label: `${t("myProject.location")}`,
      options: {
        ...disableFilter,
        customBodyRender: (value) => (value ? value : `---`),
      },
    },
    {
      name: "Zipcode",
      label: "ZipCode",
      options: {
        ...disableFilter,
        customBodyRender: (value) => (value ? value : `---`),
      },
    },
  ];

  const options = {
    onRowClick: (rowData, rowMeta) => {
      let selectedItem = projectsList[rowMeta?.dataIndex];
      console.log("selectedItem", selectedItem);
    },
  };

  const arrayBufferToBase64 = (buffer) => {
    let binary = "";
    let bytes = new Uint8Array(buffer);
    let len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  };

  const getProjects = () => {
    getAllProjectList(uId)
      .then((res) => {
        if (res.status === 200) {
          if (res?.data?.length > 0) {
            setProjectsList([...res?.data]);
          } else {
            setProjectsList([]);
          }
        }
      })
      .catch((error) => {
        let errorObj = error;
        console.log(errorObj);
      });
  };

  useEffect(() => {
    getProjects();
  }, []);

  const handleClickCard = () => {};

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Paper elevation={0} className={classes.projectHeader}>
            <Typography className={classes.projectText}>
              {t("myProject.projectDirectory")}
            </Typography>
            <Typography className={classes.ongoingText}>
              {t("myProject.createSelect")}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={8}>
          <Paper
            elevation={2}
            sx={{ height: "100%", backgroundColor: "#E5E5EA", padding: "10px" }}
          >
            <ProjectTable
              columns={columns}
              data={projectsList}
              options={options}
            />
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper
            elevation={2}
            sx={{ height: "100%", backgroundColor: "#E5E5EA", padding: "1rem" }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography className={classes.projectText}>
                  Create Project
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Formik
                  initialValues={{
                    projectName: "",
                    address: "",
                    Zipcode: "",
                    city: "",
                    state: "",
                    country: "",
                  }}
                  enableReinitialize
                  validationSchema={""}
                  onSubmit={(values, { setSubmitting, resetForm }) => {
                    console.log("values", values);
                    handleCreateNewProject(values, setSubmitting, resetForm);
                  }}
                >
                  <Form>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <MuiTextField
                          name="projectName"
                          id="projectName"
                          label={t("myProject.projectName")}
                          required={true}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Typography>{t("myProject.address")}</Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <MuiTextField
                          name="address"
                          id="address"
                          label={t("myProject.streetAddress")}
                          required={true}
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <MuiTextField
                          name="Zipcode"
                          id="Zipcode"
                          label={t("myProject.zipCode")}
                          required={true}
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <MuiTextField
                          name="city"
                          id="city"
                          label={t("myProject.city")}
                          required={true}
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <MuiTextField
                          name="state"
                          id="state"
                          label={t("myProject.state")}
                          required={true}
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <MuiTextField
                          name="country"
                          id="country"
                          label={t("myProject.country")}
                          required={true}
                        />
                      </Grid>
                      <Grid item xs={12} />
                      <Grid item xs={12}>
                        <Button
                          color="primary"
                          variant="contained"
                          type="submit"
                          sx={{ textTransform: "capitalize", float: "right" }}
                        >
                          {t("myProject.createNewProject")}
                        </Button>
                      </Grid>
                    </Grid>
                  </Form>
                </Formik>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};
export default memo(MyProjects);

// const tableData = [
//   {
//     name: "McDonald’s Renovation",
//     type: "Med Com.",
//     status: "Pre-Con",
//     projectManager: "Jim Willis",
//     location: "Tampa, Fl",
//     amount: "01873",
//   },
//   {
//     name: "McDonald’s Renovation",
//     type: "Med Com.",
//     status: "Pre-Con",
//     projectManager: "Jim Willis",
//     location: "Tampa, Fl",
//     amount: "01873",
//   },
//   {
//     name: "McDonald’s Renovation",
//     type: "Med Com.",
//     status: "Pre-Con",
//     projectManager: "Jim Willis",
//     location: "Tampa, Fl",
//     amount: "01873",
//   },
// ];

{
  /* <Grid container spacing={3}>
        <Grid item xs={12}>
          <Grid conatiner spacing={2}>
            <Grid
              item
              xs={12}
              sx={{
                backgroundColor: "#3A3A3C",
                padding: "1rem",
                borderRadius: "15px",
              }}
            >
              <Typography variant="h4" color="#fff" fontWeight="600">
                Project Directory
              </Typography>
              <Typography variant="h6" color="#fff">
                Ongoing Projects
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={2}>
          <Card sx={{ backgroundColor: "#3A3A3C", height: "10rem" }}>
            <CardActionArea>
              <CardContent sx={{ p: "1rem" }}>
                <Box sx={{ textAlign: "center", height: "110px" }}>
                  <img
                    src={plus}
                    alt=""
                    width="100%"
                    height="100%"
                    style={{ objectFit: "contain" }}
                  />
                </Box>
                <Box sx={{ textAlign: "center" }}>
                  <Typography color="#FFF" fontWeight={600}>
                    Create A Project
                  </Typography>
                </Box>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
        {projectsList?.map((item, i) => (
          <Grid item xs={2} key={item?._id}>
            <Card
              onClick={handleClickCard}
              sx={{ backgroundColor: "#b6a360", height: "10rem" }}
            >
              <CardActionArea>
                <CardContent sx={{ p: "0.62rem" }}>
                  <Box sx={{ textAlign: "center", height: "110px" }}>
                    <img
                      src={
                        "data:" +
                        item?.Photos[0]?.contentType +
                        ";base64," +
                        arrayBufferToBase64(item?.Photos[0]?.data?.data)
                      }
                      alt=""
                      width="100%"
                      height="100%"
                    />
                  </Box>
                  <Box sx={{ textAlign: "center", margin: "4px 0px" }}>
                    <Typography color="#FFF" fontWeight={600}>
                      {item?.projectName}
                    </Typography>
                  </Box>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid> */
}

import React, { useState, memo, useEffect } from "react";
import { Button, Grid, Paper, Typography } from "@mui/material";
import { getAllProjectList, createNewProjectApi } from "../../services/request";

import { makeStyles } from "@mui/styles";
import ProjectTable from "../../components/MuiTable";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import MuiTextField from "../../components/Formik/MuiTextField";
import MuiSelectField from "../../components/Formik/MuiSelectField";

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

const data = [
  {
    firstName: "Mayuran",
    lastName: "---",
    email: "Mayuran123@gmail.com",
    role: "Admin",
    phNumber: "1234567890",
  },
  {
    firstName: "Adithya",
    lastName: "Namada",
    email: "Adithya123@gmail.com",
    role: "Admin",
    phNumber: "1234567890",
  },
  {
    firstName: "Nagesh",
    lastName: "",
    email: "nagesh@gmail.com",
    role: "Admin",
    phNumber: "1234567890",
  },
  {
    firstName: "Srikanth",
    lastName: "",
    email: "srikanth123@gmail.com",
    role: "Admin",
    phNumber: "1234567890",
  },
];

const userValidationSchema = Yup.object().shape({
  firstName: Yup.string().min(2).max(20).required().nullable(),
  lastName: Yup.string().min(2).max(20).required().nullable(),
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().min(2).max(20).required('Password is required').nullable(),
  role: Yup.string().required().nullable(),
  phNumber: Yup.string().min(10).required().nullable(),
  address: Yup.string().min(2).max(20).required().nullable(),
});

const UserCreation = () => {
  const classes = useStyle();
  const uId = localStorage.getItem("userId");
  const [usersList, setUsersList] = useState([]);

  const handleCreateNewUser = (values, setSubmitting, resetForm) => {
    console.log("values", values);
  };

  const columns = [
    {
      name: "firstName",
      label: "First Name",
      options: {
        ...disableFilter,
        customBodyRender: (value) => (value ? value : `---`),
      },
    },
    {
      name: "lastName",
      label: "Last Name",
      options: {
        ...disableFilter,
        customBodyRender: (value) => (value ? value : `---`),
      },
    },
    {
      name: "email",
      label: "Email",
      options: {
        ...disableFilter,
        customBodyRender: (value) => (value ? value : `---`),
      },
    },
    {
      name: "role",
      label: "Role",
      options: {
        ...disableFilter,
        customBodyRender: (value) => (value ? value : `---`),
      },
    },
    {
      name: "phNumber",
      label: "Phone Number",
      options: {
        ...disableFilter,
        customBodyRender: (value) => (value ? value : `---`),
      },
    },
  ];

  const getUsersList = () => {
    getAllProjectList(uId)
      .then((res) => {
        if (res.status === 200) {
          if (res?.data?.length > 0) {
            setUsersList([...data]);
          } else {
            setUsersList([]);
          }
        }
      })
      .catch((error) => {
        let errorObj = error;
        console.log(errorObj);
      });
  };

  useEffect(() => {
    getUsersList();
  }, []);

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Paper elevation={0} className={classes.projectHeader}>
            <Typography className={classes.projectText}>
              User Creation
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={8}>
          <Paper
            elevation={2}
            sx={{ height: "100%", backgroundColor: "#E5E5EA", padding: "10px" }}
          >
            <ProjectTable columns={columns} data={usersList} />
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
                  Create User
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Formik
                  initialValues={{
                    Firstname: "",
                    Lastname: "",
                    email: "",
                    password: "",
                    role: "",
                    phNumber: "",
                    address: "",
                  }}
                  enableReinitialize
                  validationSchema={userValidationSchema}
                  onSubmit={(values, { setSubmitting, resetForm }) => {
                    console.log("values", values);
                    handleCreateNewUser(values, setSubmitting, resetForm);
                  }}
                >
                  <Form>
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <MuiTextField
                          name="Firstname"
                          id="Firstname"
                          label={"First Name"}
                          required={true}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <MuiTextField
                          name="Lastname"
                          id="Lastname"
                          label={"Last Name"}
                          required={true}
                        />
                      </Grid>

                      <Grid item xs={12}>
                        <MuiTextField
                          name="email"
                          id="email"
                          label={"Email"}
                          required={true}
                        />
                      </Grid>

                      <Grid item xs={12}>
                        <MuiTextField
                          name="password"
                          id="password"
                          label={"Password"}
                          required={true}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <MuiSelectField
                          name="role"
                          id="role"
                          label={"Role"}
                          options={[]}
                          required={true}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <MuiTextField
                          name="phNumber"
                          id="phNumber"
                          label={"Phone Number"}
                          required={true}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <MuiTextField
                          name="address"
                          id="address"
                          label={"Address"}
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
                          Create New User
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
export default memo(UserCreation);

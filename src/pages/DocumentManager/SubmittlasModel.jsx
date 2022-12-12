import React, { useState, memo, useEffect } from "react";
import MuiDialog from "../../components/MuiDialog";
import { makeStyles } from "@mui/styles";
import Profile from "../../Images/avatar.png";
import { Formik, Form } from "formik";
import MuiTextArea from "../../components/Formik/MuiTextArea";
import MuiSelectField from "../../components/Formik/MuiSelectField";

import {
  Grid,
  Box,
  IconButton,
  Stack,
  Paper,
  Typography,
  Tooltip,
  DialogContent,
  DialogActions,
  Button,
  Divider,
  TextField,
  Avatar,
} from "@mui/material";
import MuiTextField from "../../components/Formik/MuiTextField";

const useStyle = makeStyles(() => ({
  attachmentText: {
    fontSize: "1.5rem",
    color: "#3A3A3C",
    fontWeight: "700",
    lineHeight: "2rem",
  },
  avatar: {
    width: "66px",
    height: "66px",
    borderRadius: "15px",
    border: "3px solid #000",
    filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))",
  },
  nameText: {
    fontSize: "12px",
    fontWeight: "700",
    lineHeight: "15px",
    color: "#000",
    paddingTop: "5px",
  },
  roleText: {
    fontSize: "12px",
    fontWeight: "500",
    lineHeight: "15px",
    color: "#000",
    paddingBottom: "5px",
  },
  deadlineText: {
    fontWeight: "400",
    fontSize: "12px",
    lineHeight: "18px",
    color: "#000",
  },
}));

const Priority = ["Low", "Medium", "High", "EMERGENCY"];

let submittalsData = [
  {
    img: Profile,
    name: "Fuad H.",
    role: "Architect",
  },
  {
    img: Profile,
    name: "Aravind G.",
    role: "Owner",
  },
  {
    img: Profile,
    name: "Karol C.",
    role: "Drywall",
  },
  {
    img: Profile,
    name: "Jeff W.",
    role: "Sub-contractor",
  },
  {
    img: Profile,
    name: "Sarah M.",
    role: "Plumbing",
  },
  {
    img: Profile,
    name: "Tim B.",
    role: "Inspector",
  },
];

const SubmittalsDialog = (props) => {
  const classes = useStyle();
  const { data, open, handleCloseSubmittals } = props;
  return (
    <>
      <MuiDialog
        open={open}
        handleClose={handleCloseSubmittals}
        id={"submittals"}
        title={data?.fileName}
        maxWidth={"md"}
      >
        <Divider />
        <DialogContent>
          <Formik
            initialValues={{}}
            enableReinitialize
            validationSchema={""}
            onSubmit={(values, { setSubmitting, resetForm }) => {
            }}
          >
            {({ values, isValid, isSubmitting, setFieldValue }) => (
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Typography className={classes.attachmentText}>
                    Send Attachment To :
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <Grid container spacing={2}>
                    {submittalsData.map((item, i) => (
                      <Grid
                        item
                        xs={4}
                        key={item.name + i}
                        sx={{ textAlign: "-webkit-center" }}
                      >
                        <Avatar
                          alt=""
                          src={item.img}
                          className={classes.avatar}
                        />
                        <Typography className={classes.nameText}>
                          {item.name}
                        </Typography>
                        <Typography className={classes.roleText}>
                          {item.role}
                        </Typography>
                      </Grid>
                    ))}
                  </Grid>
                </Grid>
                <Grid item xs={4}>
                  <MuiTextArea
                    name="message"
                    id="message"
                    label={"Message"}
                    rows={9}
                  />
                </Grid>
                <Grid item xs={4}>
                  <Grid container spacing={4}>
                    <Grid item xs={12}>
                      <MuiTextField
                        name="deadline"
                        id="deadline"
                        label=" Select Deadline"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <MuiSelectField
                        name="selectPriority"
                        id="selectPriority"
                        label="Select Priority"
                        options={Priority}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Button
                        variant="contained"
                        type="submit"
                        size="small"
                        fullWidth
                      >
                        Save
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            )}
          </Formik>
        </DialogContent>
      </MuiDialog>
    </>
  );
};
export default memo(SubmittalsDialog);

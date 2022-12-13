import React, { memo, useContext } from "react";
import { GlobalState } from "../../Context/Context";
import { makeStyles } from "@mui/styles";
import FilePresentOutlinedIcon from "@mui/icons-material/FilePresentOutlined";
import { Box, Typography, Grid, IconButton } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

const useStyle = makeStyles(() => ({
  title: {
    fontStyle: "normal",
    fontWeight: 500,
    fontSize: "20px",
    lineHeight: "30px",
    marginBottom: "5px !important",
  },
  text: {
    fontStyle: "normal",
    fontWeight: 500,
    fontSize: "12px",
    lineHeight: "18px",
    color: "#1C1C1E",
    marginBottom: "5px !important",
  },
  noteContainer: {
    backgroundColor: "#e6e5ea",
    padding: "0.62rem",
    borderRadius: "5px",
  },
}));

const TaskDetails = (props) => {
  const { show, setShow, setTaskDetails } = useContext(GlobalState);
  const classes = useStyle();

  const { details } = props;

  return (
    <Grid container spacing={2}>
      <Grid item xs={1}>
        <IconButton
          size="small"
          onClick={() => {
            setTaskDetails(null);
            setShow("Direct Contact");
          }}
        >
          <ArrowBackIosIcon />
        </IconButton>
      </Grid>
      <Grid item xs={11}>
        <Typography className={classes.title}>{details?.title}</Typography>
        {/* <Typography className={classes.text}>
        Supervisor, Sub-contractor, Owner
      </Typography> */}
        <Typography className={classes.text}>Attached File:</Typography>
        <FilePresentOutlinedIcon fontSize="large" />
        <Typography className={classes.text}>
          {details?.attachments?.filename}{" "}
        </Typography>
        <Typography className={classes.text} sx={{ marginTop: "7px" }}>
          Notes:
        </Typography>
        <Box className={classes.noteContainer}>
          <Typography className={classes.text}>
            {details?.description || "---"}
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
};
export default memo(TaskDetails);

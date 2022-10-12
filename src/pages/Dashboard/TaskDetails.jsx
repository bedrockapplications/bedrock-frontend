import React, { memo } from "react";
import { makeStyles } from "@mui/styles";
import FilePresentOutlinedIcon from "@mui/icons-material/FilePresentOutlined";
import { Box, Typography } from "@mui/material";
const useStyle = makeStyles(() => ({
  title: {
    fontWeight: "600 !important",
    marginBottom: "5px !important",
  },
  text: {
    fontSize: "0.75rem !important",
    fontWeight: "600 !important",
    marginBottom: "5px !important",
  },
  noteContainer: {
    backgroundColor: "#e6e5ea",
    padding: "0.62rem",
    borderRadius: "5px",
  },
}));

const TaskDetails = (props) => {
  const classes = useStyle();

  const { details } = props;
  return (
    <>
      <Typography className={classes.title}>{details?.title}</Typography>
      <Typography className={classes.text}>
        Supervisor, Sub-contractor, Owner
      </Typography>
      <Typography className={classes.text}>Attach Files:</Typography>
      <FilePresentOutlinedIcon fontSize="large" />
      <Typography className={classes.text}>Notes:</Typography>
      <Box className={classes.noteContainer}>
        <Typography className={classes.text}>
          {details?.description || "---"}
        </Typography>
      </Box>
    </>
  );
};
export default memo(TaskDetails);

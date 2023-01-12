import { Box, TableBody, Typography } from "@mui/material";
import React from "react";
import openBox from "../Images/openbox.svg";
import { makeStyles } from "@mui/styles";

const useStyle = makeStyles(() => ({
  boxContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    left: " 50%",
    top: "50%",
    webkitTransform: "translate(-50%, -50%)",
    transform: "translate(-50%, -50%)",
  },
  noRecordText: {
    fontSize: "20px",
    marginLeft: "1.5rem",
    color: "#3A3A3C",
    fontWeight: "700",
    lineHeight: "30px",
    opacity: 0.7,
  },
}));

const EmptyTableBody = () => {
  const classes = useStyle();
  return (
    <>
      <TableBody>
        <Box className={classes.boxContainer}>
          <img src={openBox} alt="" style={{ opacity: "0.6" }} />
          <Typography className={classes.noRecordText}>
            No Records Found!
          </Typography>
        </Box>
      </TableBody>
    </>
  );
};
export default EmptyTableBody;

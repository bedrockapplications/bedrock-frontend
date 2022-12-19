import React, { useContext } from "react";
import { makeStyles } from "@mui/styles";
import { Backdrop } from "@mui/material";
import { GlobalState } from "../../src/Context/Context";
import loadingAnimation from "../Images/loading-animation.gif";
import squareLoader from "../Images/square-loader.gif";
import circleLoader from "../Images/circle-loader.gif";
const useStyle = makeStyles(() => ({
  backdrop: {
    zIndex: 3000,
    flexDirection: "column",
  },
}));

const Loading = () => {
  const classes = useStyle();
  const { isLoading } = useContext(GlobalState);

  return (
    <>
      <Backdrop open={isLoading} className={classes.backdrop}>
        <img src={loadingAnimation} alt="" width={"20%"} />
      </Backdrop>
    </>
  );
};

export default Loading;

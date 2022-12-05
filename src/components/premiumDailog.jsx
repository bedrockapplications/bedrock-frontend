import React, {useState, useContext} from 'react';
import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';
import DialogContent from '@mui/material/DialogContent';
import {
  Grid,
  Box,
  Button,
} from "@mui/material";
import { GlobalState } from "../Context/Context";
import { makeStyles } from "@mui/styles";
import chat from '../Images/chat.svg';
import dashboard from '../Images/dashboard.svg';
import logs from '../Images/logs.svg';
import premium from '../Images/premium.svg';



const useStyle = makeStyles(() => ({

}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const PremiumDailog = () => {
  const { popen, setPopen } = useContext(GlobalState);

  const handleClickOpen = () => {
    setPopen(true);
  };

  const handleClose = () => {
    setPopen(false);
  };
  return (
    <Box>
      <Dialog
        open={popen}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        // aria-describedby="alert-dialog-slide-description"
      >
        <DialogContent>PremiumDailog</DialogContent>
      </Dialog>
    </Box>
  )
}

export default PremiumDailog;
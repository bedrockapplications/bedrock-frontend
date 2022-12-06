import React, { useState, useContext } from "react";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import DialogContent from "@mui/material/DialogContent";
import { Grid, Box, Button, Typography } from "@mui/material";
import { GlobalState } from "../Context/Context";
import { makeStyles } from "@mui/styles";
import chat from "../Images/chat.svg";
import dashboard from "../Images/dashboard.svg";
import logs from "../Images/logs.svg";
import premium from "../Images/premium.svg";
import close1 from "../Images/close1.svg";
import Avatar from "@mui/material/Avatar";

const useStyle = makeStyles(() => ({
  closebox:{
    width: "100%",
    display: "flex",
    justifyContent: "end",
    cursor:"pointer",
  },
  mainbox: {
    background: "#D9D9D9",
  },
  premiumimgbox: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    marginTop:"-15px",
  },
  premiumtitle: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    textAlign: "center",
    fontWeight: "700",
    fontSize: "25px",
    lineHeight: "30px",
    color: "#3A3A3C",
  },
  boxicon: {
    height: "60px",
    width: "60px",
    borderRadius: "0px",
  },
  minititle: {
    fontWeight: "600",
    fontSize: "18px",
    lineHeight: "27px",
    color: "#3A3A3C",
  },
  minidesc: {
    fontWeight: "400",
    fontSize: "14px",
    lineHeight: "21px",
    color: "#3A3A3C",
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const PremiumDailog = () => {
  const classes = useStyle();
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
        PaperProps={{
          style: { borderRadius: "24px" }
        }}
        open={popen}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        // aria-describedby="alert-dialog-slide-description"
        sx={{ borderRadius: "24px" }}
      >
        <DialogContent sx={{ p: 2, width:"450px"}} className={classes.mainbox}>
          <Box className={classes.closebox} onClick={() => setPopen(false)}>
            <Avatar alt="" src={close1} sx={{height:"20px", width:"20px"}}/>
          </Box>
          <Box className={classes.premiumimgbox} sx={{ mb: 1 }}>
            <Avatar alt="" src={premium} sx={{height:"55px", width:"55px"}}/>
          </Box>
          <Typography className={classes.premiumtitle} sx={{ mb: 1 }}>
            Get Premium Now !
          </Typography>
          <Grid container spacing={2} sx={{ mt: 1, display:"flex", justifyContent:"end" }}>
            <Grid item xs={2.5} sx={{ display: "flex", alignItems: "center" }}>
              <Avatar alt="" src={dashboard} className={classes.boxicon} />
            </Grid>
            <Grid item xs={9}>
              <Typography className={classes.minititle}>
                Project Dashboard
              </Typography>
              <Typography className={classes.minidesc}>
                Our Specially Designed Dashboard covers project status, meetings
                at one place.... etc.
              </Typography>
            </Grid>
          </Grid>
          <Grid container spacing={2} sx={{ mt: 1, display:"flex", justifyContent:"end"  }}>
            <Grid item xs={2.5} sx={{ display: "flex", alignItems: "center" }}>
              <Avatar alt="" src={chat} className={classes.boxicon} />
            </Grid>
            <Grid item xs={9}>
              <Typography className={classes.minititle}>Quick Chat</Typography>
              <Typography className={classes.minidesc}>
                Our Quick chat can be used to interact and share files between
                contacts...etc.
              </Typography>
            </Grid>
          </Grid>
          <Grid container spacing={2} sx={{ mt: 1, display:"flex", justifyContent:"end"  }}>
            <Grid item xs={2.5} sx={{ display: "flex", alignItems: "center" }}>
              <Avatar alt="" src={logs} className={classes.boxicon} />
            </Grid>
            <Grid item xs={9}>
              <Typography className={classes.minititle}>Daily Logs</Typography>
              <Typography className={classes.minidesc}>
                One can create / check the tasks on daily basis using our Daily
                Logs.... etc.
              </Typography>
            </Grid>
          </Grid>
          <Typography className={classes.minititle} sx={{ mt: 2, ml:2 }}>
            and many more ...!
          </Typography>
          <Grid container>
            <Grid item xs={12} align="center">
              <Button
                variant="contained"
                type="submit"
                size="medium"
                sx={{ mt: 2, mb:2}}
                onClick={() =>
                  window.open("https://bedrockapps.org/", "_blank")
                }
              >
                Check Premium Plan
              </Button>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default PremiumDailog;

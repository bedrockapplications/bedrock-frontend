import React from "react";
import { makeStyles } from "@mui/styles";
import {
    Box,
    Grid,
    Paper,
    Typography,
    Stack,
    IconButton,
  } from "@mui/material";

import Divider from "@mui/material/Divider";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import DownloadForOfflineOutlinedIcon from "@mui/icons-material/DownloadForOfflineOutlined";
import ShareIcon from "@mui/icons-material/Share";
import LinearProgress from "@mui/material/LinearProgress";
import projectImg from "../../Images/projectImg.png";
import ownerImg from "../../Images/owner.svg";
import contarctorImg from "../../Images/contractor.svg";

const useStyle = makeStyles(() => ({
    dateText: {
      fontWeight: 700,
      fontSize: "12px",
      lineHeight: "15px",
      padding: "5px",
      border: "1px solid #3A3A3C",
      borderRadius: "5px",
      textAlign: "center",
    },
    stackcontainer: {
      marginTop: "1rem",
      marginBottom: "1rem",
    },
    titles: {
      width:"120px",
      textAlign:"right",
      marginRight:"10px",
      fontWeight: 700,
      fontSize: "14px",
      color: "#000",
      whiteSpace: "pre-wrap",
    },
    valueText: {
      fontSize: "14px",
      color: "#000",
      whiteSpace: "pre-wrap",
    },
    stackbox: {
      display:"flex",
      justifyContent:"space-between",
    },
    containerBox: {
      display:"flex",
      justifyContent:"space-between",
      padding:"15px 20px",
      height:"65vh",
      overflowY:"scroll",
    },
  }));

const CardView = () => {
    const classes = useStyle();
  return (
    <>
      <Grid container spacing={2} className={classes.containerBox}>
        {Array(10).fill().map((item, i) => (
          <Grid item xs={12} sm={6} md={6} lg={3.9}>
            <Paper
              sx={{
                background: "rgba(214, 214, 219, 0.48)",
                padding: "1rem",
                margin:"10px 0px",
              }}
            >
              <Stack
                direction="row"
                divider={<Divider orientation="vertical" flexItem />}
                spacing={1}
                className={classes.stackbox}
              >
                <Box>
                  <Typography className={classes.dateText}>
                    01/06/2020
                  </Typography>
                  <Box>
                    <IconButton size="small" color="primary">
                      <EditIcon fontSize="16px" />
                    </IconButton>
                    <IconButton size="small" color="primary">
                      <DownloadForOfflineOutlinedIcon fontSize="16px" />
                    </IconButton>
                    <IconButton size="small" color="primary">
                      <ShareIcon fontSize="16px" color="#000" />
                    </IconButton>
                    <IconButton size="small" color="primary">
                      <DeleteIcon fontSize="16px" color="#000" />
                    </IconButton>
                  </Box>
                </Box>
                <Box>
                  <Typography
                    sx={{
                      fontSize: "12px",
                      fontWeight: "600",
                      color: "#000",
                      marginBottom:"10px",
                    }}
                  >
                    Project :{" "}
                    <a href="" style={{ fontSize: "10px" }}>
                      MVP CONSTRUCTIONS
                    </a>
                  </Typography>
                  <Stack direction="row">
                    <Typography
                      sx={{
                        fontSize: "12px",
                        fontWeight: "600",
                        color: "#000",
                      }}
                    >
                      Status :{" "}
                    </Typography>
                    <Stack direction="column">
                    <Stack direction="row">
                      <Typography
                        sx={{ fontSize: "11px", marginLeft:"5px", marginRight: "30px" }}
                      >
                        Progress
                      </Typography>
                      <Typography sx={{ fontSize: "11px" }}>80%</Typography>
                    </Stack>
                    <LinearProgress variant="determinate" value={80} color="secondary" />
                    </Stack>
                  </Stack>
                  {/*  */}
                </Box>
                <Box>
                  <img src={projectImg} alt="" width="fit-content" />
                </Box>
              </Stack>
              <Stack direction="row" className={classes.stackcontainer}>
                <Typography className={classes.titles}>Location :</Typography>
                <Typography className={classes.valueText}>
                <span style={{fontWeight:700, marginRight:"10px"}}>Alaska</span>
                  <span
                    style={{
                      background: "#2ED47A",
                      color: "#fff",
                      padding: "3px 5px",
                      fontSize: "12px",
                      borderRadius: "5px",
                      marginRight:"10px",
                    }}
                  >
                    Sunny
                  </span>
                  85 ° F
                </Typography>
              </Stack>
              <Stack
                direction="row"
                alignItems={"center"}
                className={classes.stackcontainer}
              >
                <Typography className={classes.titles}>
                  Created By :{" "}
                </Typography>
                <Stack direction="row" sx={{height:"45px", display:"flex", alignItems:"center"}}>
                  <img src={ownerImg} alt="" width={"45px"}/>
                  <Typography className={classes.valueText} sx={{marginLeft:"10px"}}>
                    <span style={{fontWeight:700}}>Aravind G.</span> - Owner
                  </Typography>
                </Stack>
              </Stack>
              <Stack
                direction="row"
                className={classes.stackcontainer}
                alignItems={"center"}
              >
                <Typography className={classes.titles}>
                  Reporting To :{" "}
                </Typography>
                <Stack direction="row" sx={{height:"45px", display:"flex", alignItems:"center"}}>
                  <img src={contarctorImg} alt="" width={"45px"}/>
                  <Typography className={classes.valueText} sx={{marginLeft:"10px"}}>
                    <span style={{fontWeight:"700"}}>Sarah M.</span> - Contarctor
                  </Typography>
                </Stack>
              </Stack>
              <Stack direction="row" className={classes.stackcontainer}>
                <Typography className={classes.titles}>
                  Work Activity :{" "}
                </Typography>
                <Typography className={classes.valueText}>Excavator</Typography>
              </Stack>
              <Stack direction="row" className={classes.stackcontainer}>
                <Typography className={classes.titles}>Notes : </Typography>
                <Typography className={classes.valueText}>
                  Material Need to be delivered
                </Typography>
              </Stack>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default CardView;

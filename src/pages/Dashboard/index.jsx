import React from "react";
import Typography from "@mui/material/Typography";
import { Grid, Box } from "@mui/material";
import employee from "../../Images/employee.png";
import cloud from "../../Images/CLoud.png";
import crane from "../../Images/crane.png";
import { makeStyles } from "@mui/styles";
import Paper from "@mui/material/Paper";

const useStyle = makeStyles(() => ({
  employeeImg: {
    width: "10rem",
    height: "6.5rem",
    background: `url(${cloud})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    position: "relative",
  },
  personimg: {
    position: "absolute",
    top: "-15px",
    left: "20px",
    width: "88%",
  },
  craneImg: {
    width: "inherit",
    transform: "rotateY(-180deg)",
  },
  paper: {
    width: "100%",
    backgroundColor: "#e5e5e5 !important",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));

const Dashboard = () => {
  const classes = useStyle();

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Grid
            container
            sx={{
              background: "#242b3c",
              paddingLeft: "2rem",
              borderRadius: "15px",
            }}
          >
            <Grid item xs={2} className={classes.employeeImg}>
              <img
                src={employee}
                alt="employee"
                className={classes.personimg}
              />
            </Grid>
            <Grid
              item
              xs={12}
              sm={12}
              md={8}
              lg={8}
              sx={{ padding: "1rem 2rem" }}
            >
              <Typography variant="h5" color="#fff" fontWeight="600">
                Hi Ganesh
              </Typography>
              <Typography variant="p" color="#fff" fontSize={15}>
                You have completed 2 of your Projects this week, there are 3
                Projects to go, keep on rolling and reach your goal!
              </Typography>
            </Grid>
            <Grid item xs={2} sx={{ width: "6rem", textAlign: "end" }}>
              <img src={crane} alt="crane" className={classes.craneImg} />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <Paper
                elevation={0}
                className={classes.paper}
                sx={{ height: "420px" }}
              >
                <Typography
                  fontWeight={600}
                  sx={{ width: "50%", textAlign: "center" }}
                >
                  Place Holder for something importan Consult W/Team
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={6} lg={6}>
                  <Paper
                    elevation={0}
                    className={classes.paper}
                    sx={{ height: "125px" }}
                  >
                    <Typography
                      fontWeight={600}
                      sx={{ width: "50%", textAlign: "center" }}
                    >
                      Place Holder for something importan Consult W/Team
                    </Typography>
                  </Paper>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6}>
                  <Paper
                    elevation={0}
                    className={classes.paper}
                    sx={{ height: "125px" }}
                  >
                    <Typography
                      fontWeight={600}
                      sx={{ width: "50%", textAlign: "center" }}
                    >
                      Place Holder for something importan Consult W/Team
                    </Typography>
                  </Paper>
                </Grid>
                <Grid item xs={12}>
                  <Paper
                    elevation={0}
                    className={classes.paper}
                    sx={{ height: "280px" }}
                  >
                    <Typography
                      fontWeight={600}
                      sx={{ width: "50%", textAlign: "center" }}
                    >
                      Place Holder for something importan Consult W/Team
                    </Typography>
                  </Paper>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};
export default Dashboard;

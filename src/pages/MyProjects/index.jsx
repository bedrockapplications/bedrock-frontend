import React from "react";
import { Grid, Typography } from "@mui/material";

const MyProjects = () => {
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Grid conatiner spacing={2}>
            <Grid
              item
              xs={12}
              sx={{
                backgroundColor: "#242b3c",
                padding: "1rem",
                borderRadius: "15px",
              }}
            >
              <Typography variant="h4" color="#fff" fontWeight="600">
                Project Directory
              </Typography>
              <Typography variant="h6" color="#fff">
                Ongoing Projects
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};
export default MyProjects;

import React, { memo } from "react";
import { Grid, Paper, Typography } from "@mui/material";
import { getAllProjectList } from "../../services/request";
import { useEffect } from "react";
import { useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import plus from "../../Images/Plus.png";
import { Box } from "@mui/system";
import { CardActionArea } from "@mui/material";
import CardMedia from "@mui/material/CardMedia";
import { makeStyles } from "@mui/styles";
import ProjectTable from "../../components/MuiTable";
import ProjectDataTable from "./ProjectDataTable";

const useStyle = makeStyles(() => ({
  projectHeader: {
    backgroundColor: "#3A3A3C !important",
    padding: "26px 0px 36px 26px",
    color: "#fff !important",
    borderRadius: "10px !important",
  },
  projectText: {
    fontSize: "1.5rem !important",
    fontWeight: "700 !important",
    lineHeight: "2.25rem !important",
    fontStyle: "normal",
  },
  ongoingText: {
    fontSize: "0.938rem !important",
    fontWeight: "500 !important",
    lineHeight: "1.406rem !important",
    fontStyle: "normal",
  },
}));

const tableData = [
  {
    name: "McDonald’s Renovation",
    type: "Med Com.",
    status: "Pre-Con",
    projectManager: "Jim Willis",
    location: "Tampa, Fl",
    amount: "01873",
  },
  {
    name: "McDonald’s Renovation",
    type: "Med Com.",
    status: "Pre-Con",
    projectManager: "Jim Willis",
    location: "Tampa, Fl",
    amount: "01873",
  },
  {
    name: "McDonald’s Renovation",
    type: "Med Com.",
    status: "Pre-Con",
    projectManager: "Jim Willis",
    location: "Tampa, Fl",
    amount: "01873",
  },
];

let disableFilter = {
  filter: false,
  sort: false,
};

const MyProjects = () => {
  const classes = useStyle();
  const uId = localStorage.getItem("userId");
  const [projectsList, setProjectsList] = useState([]);

  const columns = [
    {
      name: "name",
      label: "Name",
      options: {
        ...disableFilter,
        customBodyRender: (value) => (value ? value : `---`),
      },
    },
    {
      name: "type",
      label: "Type",
      options: {
        ...disableFilter,
        customBodyRender: (value) => (value ? value : `---`),
      },
    },
    {
      name: "status",
      label: "Status",
      options: {
        ...disableFilter,
        customBodyRender: (value) => (value ? value : `---`),
      },
    },
    {
      name: "projectManager",
      label: "Project Manager",
      options: {
        ...disableFilter,
        customBodyRender: (value) => (value ? value : `---`),
      },
    },
    {
      name: "location",
      label: "Location",
      options: {
        ...disableFilter,
        customBodyRender: (value) => (value ? value : `---`),
      },
    },
    {
      name: "amount",
      label: "#",
      options: {
        ...disableFilter,
        customBodyRender: (value) => (value ? value : `---`),
      },
    },
  ];

  const arrayBufferToBase64 = (buffer) => {
    let binary = "";
    let bytes = new Uint8Array(buffer);
    let len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  };

  const getProjects = () => {
    getAllProjectList(uId)
      .then((res) => {
        if (res.status === 200) {
          if (res?.data?.length > 0) {
            setProjectsList([...res?.data]);
          } else {
            setProjectsList([]);
          }
        }
      })
      .catch((error) => {
        let errorObj = error;
        console.log(errorObj);
      });
  };

  useEffect(() => {
    getProjects();
  }, []);

  const handleClickCard = () => {};

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Grid conatiner spacing={2}>
            <Grid
              item
              xs={12}
              sx={{
                backgroundColor: "#3A3A3C",
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
        <Grid item xs={2}>
          <Card sx={{ backgroundColor: "#3A3A3C", height: "10rem" }}>
            <CardActionArea>
              <CardContent sx={{ p: "1rem" }}>
                <Box sx={{ textAlign: "center", height: "110px" }}>
                  <img
                    src={plus}
                    alt=""
                    width="100%"
                    height="100%"
                    style={{ objectFit: "contain" }}
                  />
                </Box>
                <Box sx={{ textAlign: "center" }}>
                  <Typography color="#FFF" fontWeight={600}>
                    Create A Project
                  </Typography>
                </Box>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
        {projectsList?.map((item, i) => (
          <Grid item xs={2} key={item?._id}>
            <Card
              onClick={handleClickCard}
              sx={{ backgroundColor: "#b6a360", height: "10rem" }}
            >
              <CardActionArea>
                <CardContent sx={{ p: "0.62rem" }}>
                  <Box sx={{ textAlign: "center", height: "110px" }}>
                    <img
                      src={
                        "data:" +
                        item?.Photos[0]?.contentType +
                        ";base64," +
                        arrayBufferToBase64(item?.Photos[0]?.data?.data)
                      }
                      alt=""
                      width="100%"
                      height="100%"
                    />
                  </Box>
                  <Box sx={{ textAlign: "center", margin: "4px 0px" }}>
                    <Typography color="#FFF" fontWeight={600}>
                      {item?.projectName}
                    </Typography>
                  </Box>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
      {/* <Grid container spacing={2}>
        <Grid item xs={12}>
          <Paper elevation={0} className={classes.projectHeader}>
            <Typography className={classes.projectText}>
              Project Directory
            </Typography>
            <Typography className={classes.ongoingText}>
              Create or Select on Ongoing Projects
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={8}>
          <Paper
            elevation={2}
            sx={{ height: "100%", backgroundColor: "#E5E5EA", padding: "10px" }}
          >
            <ProjectTable columns={columns} data={tableData} />
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper
            elevation={2}
            sx={{ height: "100%", backgroundColor: "#E5E5EA" }}
          ></Paper>
        </Grid>
      </Grid> */}
    </>
  );
};
export default memo(MyProjects);

import React from "react";
import { Grid, Paper, Typography } from "@mui/material";
import { getAllProjectList } from "../../services/request";
import {  useState,useEffect, useContext } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import plus from "../../Images/Plus.png";
import { Box } from "@mui/system";
import { CardActionArea } from "@mui/material";
import CardMedia from "@mui/material/CardMedia";
import { Text, LanguageContext } from "../../containers/language";

const MyProjects = () => {
  const uId = localStorage.getItem("userId");
  const [projectsList, setProjectsList] = useState([]);

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
  //language 
  const { dictionary } = useContext(LanguageContext);
  return (
    <>

      <Grid container spacing={3}>
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
                <Text tid="exploreHeader" />
              </Typography>
              <Typography variant="h6" color="#fff">
                <Text tid="description"/>
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={2}>
          <Card sx={{ backgroundColor: "#242b3c", height: "10rem" }}>
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
                    <Text tid="buttontxt"/>
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
    </>
  );
};
export default MyProjects;

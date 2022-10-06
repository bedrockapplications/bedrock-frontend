import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import { Grid, Typography } from "@mui/material";
import Profile from "../../Images/avatar.png";

const DirectContact = (props) => {
  const { list } = props;
  return (
    <>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Typography
            variant="h6"
            fontWeight={600}
            sx={{ textShadow: "1px 0px #242b3c" }}
          >
            Direct Contact
          </Typography>
        </Grid>
        <Grid
          item
          xs={12}
          sx={{ height: "55vh", overflowY: "auto", paddingRight: "5px" }}
        >
          {list?.map((item, i) => (
            <List
              disablePadding
              key={item?.name + i}
              sx={{
                width: "100%",
                bgcolor: "#e6e5ea",
                borderRadius: "5px",
                marginBottom: "10px",
              }}
            >
              <ListItem alignItems="center">
                <ListItemAvatar sx={{ margin: "0px" }}>
                  <Avatar
                    alt=""
                    src={Profile}
                    sx={{ borderRadius: "25%", border: "3px solid #000 " }}
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <>
                      <Typography
                        fontSize={14}
                        sx={{ textShadow: "1px 0px #242b3c" }}
                      >
                        {`${item?.name} | ${item?.role}`}
                      </Typography>
                    </>
                  }
                  secondary={`${item?.mail}`}
                ></ListItemText>
              </ListItem>
            </List>
          ))}
        </Grid>
      </Grid>
    </>
  );
};
export default DirectContact;

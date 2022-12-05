import React, { useState, useContext } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import { Grid, Typography } from "@mui/material";
import Profile from "../../Images/avatar.png";
import { useTranslation } from "react-i18next";
import { makeStyles } from "@mui/styles";
import { GlobalState } from "../../Context/Context";

const useStyle = makeStyles(() => ({
  titleText: {
    fontSize: "1.5rem",
    fontWeight: "700",
    fontStyle: "normal",
    lineHeight: "36px",
    color: "#3A3A3C",
  },
  nameText: {
    fontWeight: 400,
    fontSize: "12px",
    lineHeight: "18px",
    color: "#000",
  },
  emailText: {
    fontWeight: 400,
    fontSize: "12px",
    lineHeight: "18px",
    color: "rgba(0, 0, 0, 0.5)",
  },
  avatar: {
    borderRadius: "15px",
    border: "3px solid #000",
    filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))",
  },
}));

const DirectContact = (props) => {
  const classes = useStyle();
  const { t } = useTranslation();
  const { list } = props;
  const { selectedChat, setSelectedChat, setPopen } = useContext(GlobalState);
  return (
    <>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Typography className={classes.titleText}>
            {t("direct_contacts")}
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
                cursor:"pointer"
              }}
              onClick={() => {
                setPopen(true);
                setSelectedChat(item);
              }}
            >
              <ListItem alignItems="center">
                <ListItemAvatar sx={{ margin: "0px" }}>
                  <Avatar alt="" src={Profile} className={classes.avatar} />
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <>
                      <Typography
                        className={classes.nameText}
                      >{`${item?.name} | ${item?.role}`}</Typography>
                    </>
                  }
                  secondary={
                    <>
                      <Typography
                        className={classes.emailText}
                      >{`${item?.mail}`}</Typography>
                    </>
                  }
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

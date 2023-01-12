import React, { useState, useContext } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import { Grid, Typography, IconButton, Tooltip } from "@mui/material";
import Profile from "../../Images/avatar.png";
import { useTranslation } from "react-i18next";
import { makeStyles } from "@mui/styles";
import { GlobalState } from "../../Context/Context";
import ContactPageIcon from "@mui/icons-material/ContactPage";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import logo from "../../Images/Bedrock Rock .png";
import { useEffect } from "react";
import { getContactsList } from "../../services/request";
import { Box } from "@mui/system";
import phonebook from "../../Images/phonebook.svg";

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
  const { contactList } = props;
  const userRole = localStorage.getItem("role");
  const classes = useStyle();
  const { t } = useTranslation();
  const {
    selectedChat,
    setSelectedChat,
    setPopen,
    openUserForm,
    setOpenUserForm,
    list,
    setList,
  } = useContext(GlobalState);

  // useEffect(() => {
  //   let ownerId = localStorage.getItem("userId");
  //   let role = localStorage.getItem("role");
  //   if (role === "Owner") {
  //     getContactsList(ownerId, "Contractor")
  //       .then((res) => {
  //         if (res.status === 200) {
  //           console.log(res);
  //           if (res?.data?.length > 0) {
  //             setList([...res?.data]);
  //           } else {
  //             setList([]);
  //           }
  //         }
  //       })
  //       .catch((error) => {
  //         let errorObj = error;
  //         console.log(errorObj);
  //       });
  //   }
  // }, []);

  return (
    <>
      {userRole === "Owner" ? (
        <>
          <Grid container spacing={1}>
            <Grid item xs={11}>
              <Typography className={classes.titleText}>
                {t("direct_contacts")}
              </Typography>
            </Grid>
            <Grid item xs={1}>
              <IconButton
                color="primary"
                size="small"
                onClick={() => setOpenUserForm(true)}
              >
                <Tooltip title={"create contact"}>
                  <PersonAddIcon />
                </Tooltip>
              </IconButton>
            </Grid>
            <Grid
              item
              xs={12}
              sx={{ height: "55vh", overflowY: "auto", paddingRight: "5px" }}
            >
              {contactList?.length > 0 ? (
                contactList?.map((item, i) => (
                  <List
                    disablePadding
                    key={item?.firstName + i}
                    sx={{
                      width: "100%",
                      bgcolor: "#e6e5ea",
                      borderRadius: "5px",
                      marginBottom: "10px",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      setPopen(true);
                      setSelectedChat(item);
                    }}
                  >
                    <ListItem alignItems="center">
                      <ListItemAvatar sx={{ margin: "0px" }}>
                        <Avatar
                          alt=""
                          src={Profile}
                          className={classes.avatar}
                        />
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <>
                            <Typography
                              className={classes.nameText}
                            >{`${item?.firstName} ${item?.lastName} | ${item?.role}`}</Typography>
                          </>
                        }
                        secondary={
                          <>
                            <Typography
                              className={classes.emailText}
                            >{`${item?.email} | Ph No: ${item?.phoneNumber}`}</Typography>
                          </>
                        }
                      ></ListItemText>
                    </ListItem>
                  </List>
                ))
              ) : (
                <Grid
                  container
                  spacing={1}
                  sx={{
                    display: "flex",
                    // flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                    height: "inherit",
                  }}
                >
                  <Grid item xs={8}>
                    <img src={phonebook} alt="" width={"70px"} />
                    <Typography
                      sx={{
                        mt: 1,
                        fontSize: "20px",
                        fontWeight: "700",
                        opacity: 0.6,
                      }}
                    >
                      No Contacts Found!
                    </Typography>
                  </Grid>
                </Grid>
              )}
            </Grid>
          </Grid>
        </>
      ) : (
        <>
          <Grid
            container
            spacing={1}
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <Grid item xs={8} sx={{ mt: 5 }}>
              <Avatar
                alt=""
                src={logo}
                sx={{ height: "200px", width: "200px", borderRadius: "0px" }}
              />
            </Grid>
            <Grid
              item
              xs={8}
              sx={{ mt: 1, fontSize: "20px", fontWeight: "700" }}
            >
              Welcome to BedRock!
            </Grid>
          </Grid>
        </>
      )}
    </>
  );
};
export default DirectContact;

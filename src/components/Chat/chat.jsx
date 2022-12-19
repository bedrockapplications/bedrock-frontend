import React, { useState, useContext } from "react";
import InputEmoji from "react-input-emoji";
import { makeStyles } from "@mui/styles";
import { GlobalState } from "../../Context/Context";
import {
    Grid,
    Box,
    IconButton,
    Stack,
    Typography,
  } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import Avatar from "@mui/material/Avatar";
import Profile from "../../Images/avatar.png";
import { allMessages } from "../../pages/Dashboard/messages";
import send from "../../Images/send.svg";
import attach from "../../Images/attach.svg";


const useStyle = makeStyles(() => ({
    flow: {
        animation: "slide-left .4s forwards",
        transform: "translateX(20%)",
      },
      flowright: {
        animation: "slide-right .4s forwards",
        transform: "translateX(-50%)",
      },
      avatar: {
        borderRadius: "15px",
        border: "3px solid #000",
        filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))",
        margin: "0px 10px",
      },
      messageBox: {
        height: "42vh",
        overflow: "hidden scroll",
      },
      messageInputBox: {
        height: "10vh",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      },
      msgInput: {
        width: "100%",
        height: "100%",
        padding: "10px 15px",
        border: "none",
        fontWeight: "700",
        fontSize: "14px",
        lineHeight: "18px",
        color: "#3A3A3C",
        background: "#FFFFFF",
        borderRadius: "5px",
        outline: "none",
      },
      msgicon: {
        height: "33px",
        width: "33px",
        cursor: "pointer",
        "&:hover": {
          transform: "scale(1.1)",
          transition: "cubic-bezier(0.215, 0.610, 0.355, 1)",
        },
      },
      upload: {
        display: "none",
      },
      fieldWrappper: {
        position: "relative",
      },
      errorText: {
        position: "absolute",
        left: 0,
        top: "40px",
        fontSize: "12px",
        color: "rgb(244, 67, 54)",
      },
      noteText: {
        position: "absolute",
        left: 0,
        top: "90px",
        fontSize: "12px",
        color: "rgb(244, 67, 54)",
      },
}));



const ChatBox = (props) => {
    const classes = useStyle();
    const {
        selectedChat,
        setSelectedChat,
      } = useContext(GlobalState);
    const [msgInput, setMsgInput] = useState("");
    //   const { } = props;
    console.log(selectedChat)
  return (
    <Box className={classes.flow}>
                  <Stack
                  direction="row"
                  // justifyContent="space-between"
                  alignItems="center"
                >
                    <IconButton
                      size="small"
                      onClick={(event) => setSelectedChat({})}
                    >
                      <ArrowBackIosIcon />
                    </IconButton>
                    <Avatar alt="" src={Profile} className={classes.avatar} />
                    <Typography className={classes.chatTitle}>
                      {Object.keys(selectedChat).length > 0 ? `${selectedChat.firstName} ${selectedChat.lastName} | ${selectedChat.role}` : ""}
                    </Typography>
                  </Stack>
                  <Box sx={{ height: "55vh", overflowY: "auto", margin: "1vh 2rem", background:"#E5E5EA", p:"0.75rem", borderRadius:"5px", display:"flex", flexDirection:"column", justifyContent:"space-around" }}>
                    <Box className={classes.messageBox}>
                      {allMessages.filter(element => {
                          return(
                              element.sender === selectedChat.firstName || element.reciever === selectedChat.firstName
                          )
                      }).map((each, i) => {
                        return(
                          <Box sx={{textAlign: each.sender === selectedChat.firstName ? "left" : "Right", display:"flex", flexDirection:"column", alignItems: each.sender === selectedChat.firstName ? "flex-start" : "flex-end"}}>
                            <Box sx={{background: each.sender === selectedChat.firstName ? "#3A3A3C" : "white", color: each.sender === selectedChat.firstName ? "white" : "#3A3A3C", padding:"10px 15px", borderRadius:"5px", margin:"10px", width:"fit-content"}}>{each.message}</Box>
                            <Box sx={{margin:"0px 10px", color:"#3A3A3C"}}>{each.time}</Box>
                          </Box>
                        )
                      })
                    }
                    </Box>
                    <Box className={classes.messageInputBox}>
                      <Grid container spacing={1} sx={{display:"flex", justifyContent:"space-between", alignItems:"center", height:"100%", width:"100%"}}>
                        <Grid item xs={10}>
                          
                          <InputEmoji
                            value={msgInput}
                            onChange={setMsgInput}
                            // cleanOnEnter
                            // onEnter={handleOnEnter}
                            placeholder="Send Message"
                            className={classes.msgInput}
                          />
                        </Grid>
                        <Grid item xs={1}>
                          
                           <label for="file-input">
                            <img src={attach} alt=""
                            className={classes.msgicon}/>
                          </label>

                          <input className={classes.upload} id="file-input" type="file" />
                        </Grid>
                        <Grid item xs={1}>
                          <img
                            src={send}
                            alt=""
                            className={classes.msgicon}
                          />
                        </Grid>
                      </Grid>
                    </Box>
                  </Box>
                </Box>
  );
};

export default ChatBox;

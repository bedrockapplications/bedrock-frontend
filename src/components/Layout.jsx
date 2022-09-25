import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import EngineeringIcon from "@mui/icons-material/Engineering";
import DescriptionIcon from "@mui/icons-material/Description";
import Bedrock_Black from "../Images/Bedrock Black.png";
import Dashboard from "../pages/Dashboard";
import Avatar from "@mui/material/Avatar";
import userProfile from "../Images/avatar.png";
import notification from "../Images/notification.png";
import { makeStyles } from "@mui/styles";
import { useState } from "react";
import { useEffect } from "react";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import CircleIcon from "@mui/icons-material/Circle";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import dotted_img from "../Images/Dotted Circles.png";
import { NavLink as RouterLink } from "react-router-dom";
import Tooltip from "@mui/material/Tooltip";

const drawerWidth = 240;

const useStyle = makeStyles(() => ({
  userText: {
    textTransform: "capitalize",
    color: `#242b3c`,
    fontWeight: "600 !important",
  },
  timeText: {
    fontSize: "0.95rem !important",
    fontWeight: "500 ! important",
    color: `#242b3c`,
    textShadow: "1px 0px #242b3c",
  },
  dayText: {
    fontSize: "0.95rem !important",
    fontWeight: "500 ! important",
    textShadow: "1px 0px #242b3c",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  logo: {
    width: "100%",
    height: "80px",
    objectFit: "contain",
  },
  bottedImg: {
    width: "30px",
    height: "30px",
    marginRight: "0.62rem",
  },
}));

const sideLinks = [
  { icon: <DashboardIcon />, label: "Dashboard", link: "/dashboard" },
  {
    icon: <EngineeringIcon />,
    label: "My Projects",
    link: "/myprojects",
  },
  { icon: <DescriptionIcon />, label: "Document Manager", link: "/docManager" },
  // { icon: <CalendarMonthIcon />, label: "Tasks/Calendar",},
];

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: `calc(100% - 65px)`,
  zIndex: theme.zIndex.drawer + 1,
  backgroundColor: "#ecf1f5",
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  padding: "1rem",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function MiniDrawer(props) {
  const theme = useTheme();
  const classes = useStyle();
  const userName = localStorage.getItem("userName");
  const [open, setOpen] = React.useState(true);
  const [clockState, setClockState] = useState("");
  const [dayState, setDayState] = useState("");

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const GetDateAndTime = () => {
    setInterval(() => {
      const date = new Date();
      let time = date.toLocaleString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      });
      setClockState(time);
      let hrs = date.getHours();
      if (hrs < 12) {
        setDayState("Good Morning");
      } else if (hrs >= 12 && hrs <= 15) {
        setDayState("Good Afternoon");
      } else if (hrs > 15 && hrs <= 20) {
        setDayState("Good Evening");
      } else if (hrs > 20 && hrs <= 24) {
        setDayState("Good Night");
      }
      console.log("time", time);
    }, 1000);
  };

  useEffect(() => {
    GetDateAndTime();
  }, []);

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar elevation={0} position="fixed" open={open}>
        <Toolbar>
          <Box sx={{ width: "60%", display: { xs: "none", md: "flex" } }}>
            <Box>
              <Typography color="primary" className={classes.dayText}>
                {dayState === "Good Night" ? (
                  <CircleIcon fontSize="small" />
                ) : (
                  <WbSunnyIcon fontSize="small" sx={{ color: "orange" }} />
                )}
                {`${dayState}`}
              </Typography>
              <Typography color="primary" className={classes.timeText}>
                {`${new Date()?.toDateString()} ${clockState}`}
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              width: "40%",
              display: { xs: "none", md: "flex" },
              alignItems: "center",
              justifyContent: "space-around",
            }}
          >
            <Typography color="primary" className={classes.timeText}>
              Architect Meeting in 1h 12m
            </Typography>
            <IconButton>
              <img alt="" src={notification} width="24px" height={"24px"} />
            </IconButton>
            <Typography className={classes.userText}>{userName}</Typography>
            <Avatar
              alt="user-profile"
              src={userProfile}
              sx={{ filter: "brightness(100%)" }}
            />
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          {/* <Box>
            <img alt="logo" src={Bedrock_Black} className={classes.logo} />
          </Box> */}

          {!open ? (
            <IconButton
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{
                color: "#fff",
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
          ) : (
            <>
              <IconButton
                onClick={handleDrawerClose}
                size="small"
                sx={{ color: "#fff" }}
              >
                {theme.direction === "rtl" ? (
                  <ChevronRightIcon />
                ) : (
                  <ChevronLeftIcon />
                )}
              </IconButton>
            </>
          )}
        </DrawerHeader>
        {/* <Box
          sx={{
            padding: "8px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img alt="logo" src={dotted_img} className={classes.bottedImg} />
          <Typography variant="h6" sx={{ color: "#fff", fontWeight: "600" }}>
            Select Project
          </Typography>
        </Box> */}
        <Divider sx={{ color: "#fff" }} />

        <List>
          {sideLinks?.map((list, index) => (
            <ListItem key={list.label} disablePadding sx={{ display: "block" }}>
              <RouterLink exact to={list?.link}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                    color: "#fff",
                  }}
                >
                  <Tooltip title={list?.label} placement="right-start">
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : "auto",
                        justifyContent: "center",
                        color: "#fff",
                      }}
                    >
                      {list?.icon}
                    </ListItemIcon>
                  </Tooltip>
                  <ListItemText
                    primary={list?.label}
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
              </RouterLink>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 2 }}>
        <DrawerHeader />
        {React.cloneElement(props.children)}
      </Box>
    </Box>
  );
}

// sx={{ minHeight: "48px !important" }}

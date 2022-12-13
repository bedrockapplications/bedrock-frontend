import * as React from "react";
import { useHistory } from "react-router-dom";
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
// import Bedrock_Black from "../Images/Bedrock Black.png";
import Bedrock_Black from "../Images/BedrockWhiteFull.svg";
import Avatar from "@mui/material/Avatar";
import userProfile from "../Images/avatar.png";
import notification from "../Images/notification.png";
import { makeStyles } from "@mui/styles";
import { useState, useContext, useEffect } from "react";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import CircleIcon from "@mui/icons-material/Circle";
import { NavLink as RouterLink } from "react-router-dom";
import Tooltip from "@mui/material/Tooltip";
import { useTranslation } from "react-i18next";
import { Button, Badge } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import TranslateIcon from "@mui/icons-material/Translate";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import favicon from "../Images/Bedrock_Rock_-removebg-preview.png";
import { WindowSharp } from "@mui/icons-material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { getMeetingsList } from "../services/request";
import moment from "moment";
import { GlobalState } from "../Context/Context";

// import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
// import dotted_img from "../Images/Dotted Circles.png";
// import Dashboard from "../pages/Dashboard";

const drawerWidth = 240;

const useStyle = makeStyles(() => ({
  userText: {
    textTransform: "capitalize",
    color: `#242b3c`,
    fontWeight: "600 !important",
  },
  timeText: {
    fontStyle: "normal",
    fontSize: "0.75rem",
    fontWeight: "400",
    lineHeight: "18px",
    color: `#1D242E`,
    textShadow: "1px 0px #1D242E",
  },
  dayText: {
    fontStyle: "normal",
    fontSize: "0.875rem",
    fontWeight: "500",
    lineHeight: "24px",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    textShadow: "1px 0px #1D242E",
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
  link: {
    textDecoration: "none",
  },
  accountpop: {
    background: "#48484A",
    opacity: "0.95",
    color: "#FFFFFF",
  },
}));

const LanguagesList = [
  { label: "English", code: "US", local: "en" },
  { label: "Français", code: "FR", local: "fr" },
  { label: "Español", code: "ES", local: "es" },
];

const sideLinks = [
  { icon: <DashboardIcon />, label: "dashboard", link: "/dashboard" },
  { icon: <DescriptionIcon />, label: "document_manager", link: "/docManager" },
  {
    icon: <EngineeringIcon />,
    label: "my_projects",
    link: "/myprojects",
  },
  // { icon: <PersonAddIcon />, label: "User Creation", link: "/userCreation" },
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
  backgroundColor: "#D6D6DB",
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

const ITEM_HEIGHT = 48;

export default function MiniDrawer(props) {
  let history = useHistory();
  const { i18n, t } = useTranslation();
  const theme = useTheme();
  const classes = useStyle();
  const userName = localStorage.getItem("userName");
  const [open, setOpen] = React.useState(false);
  const [clockState, setClockState] = useState("");
  const [dayState, setDayState] = useState("");
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [account, setAccount] = React.useState(null);
  const [notification, setNotification] = React.useState(null);

  const [selected, setSelectedIndex] = React.useState(
    LanguagesList?.filter(
      (lang) => lang?.local === localStorage?.getItem("i18nextLng")
    )[0]
  );

  const { taskList, setTaskList } = useContext(GlobalState);

  const openLang = Boolean(anchorEl);
  const openAccount = Boolean(account);
  const openNotification = Boolean(notification);

  const handleAccountClick = (event) => {
    setAccount(event.currentTarget);
  };

  const handleNotificationClick = (event) => {
    setNotification(event.currentTarget);
  };

  const handleCloseNotification = () => {
    setTaskList([]);
    localStorage.removeItem("listItem");
    setNotification(null);
  };

  const handleClose = () => {
    setAccount(null);
  };

  const handleDrawerOpen = () => {
    setOpen(!open);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
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
        setDayState("good_morning");
      } else if (hrs < 17) {
        setDayState("good_afternoon");
      } else {
        setDayState("good_evening");
      }
      // } else if (hrs >= 12 && hrs <= 15) {
      //   setDayState("good_afternoon");
      // } else if (hrs > 15 && hrs <= 20) {
      //   setDayState("good_evening");
      // } else if (hrs > 20 && hrs <= 24) {
      //   setDayState("good_night");
      // }
    }, 1000);
  };

  //task list api call

  const GetTaskList = () => {
    let userId = localStorage.getItem("userId");
    let listData =
      localStorage.getItem("listItem") !== null
        ? JSON.parse(localStorage.getItem("listItem"))
        : [];
    console.log("listData", listData);
    console.log("taskList", taskList);
    setTaskList(listData);
    let time = new Date().toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
    let current = moment(time, "HH:mm:ss A").format("hh:mm:ss A");
    getMeetingsList(userId, moment(new Date()).format("YYYY-MM-DD"))
      .then((res) => {
        if (res.status === 200) {
          let data = res.data;
          let finalData = data?.filter((item) => {
            let start_time = moment(item.startTime, "HH:mm:ss A").subtract(
              5,
              "minutes"
            );
            let finalTime = moment(start_time?._d).format("hh:mm:ss A");
            return finalTime === current;
          });
          if (finalData?.length > 0) {
            let filteredList = [...listData, ...finalData];
            console.log("filteredList", filteredList);
            localStorage.setItem("listItem", JSON.stringify(filteredList));
            setTaskList([...filteredList]);
          }
        }
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  useEffect(() => {
    GetDateAndTime();
  }, []);

  useEffect(() => {
    const MINUTE_MS = 60000;
    const interval = setInterval(() => {
      console.log("abcd");
      GetTaskList();
    }, MINUTE_MS);

    return () => clearInterval(interval);
  }, []);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (item) => {
    i18n.changeLanguage(item.local);
    setSelectedIndex(item);
    setAnchorEl(null);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar elevation={0} position="fixed" open={open}>
        <Toolbar>
          <Box sx={{ width: "60%", display: { xs: "none", md: "flex" } }}>
            <Box sx={{ minWidth: "205px", marginRight: "1.5rem" }}>
              <Typography color="primary" className={classes.dayText}>
                {dayState === "Good Night"
                  ? // <CircleIcon fontSize="small" />
                    ""
                  : // <WbSunnyIcon fontSize="small" sx={{ color: "orange" }} />
                    ""}
                {t(dayState)}
              </Typography>
              <Typography color="primary" className={classes.timeText}>
                {`${new Date()?.toDateString()} ${clockState}`}
              </Typography>
            </Box>
            <Button
              id="demo-customized-button"
              aria-controls={openLang ? "demo-customized-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={openLang ? "true" : undefined}
              disableElevation
              onClick={handleClick}
              endIcon={<KeyboardArrowDownIcon fontSize="small" />}
              startIcon={<TranslateIcon />}
              size="small"
              sx={{ textTransform: "capitalize" }}
            >
              {`${selected?.label}   (${selected?.code})`}
            </Button>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={openLang}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
              PaperProps={{
                style: {
                  maxHeight: ITEM_HEIGHT * 4.5,
                  width: "15ch",
                  backgroundColor: "#D6D6DB",
                },
              }}
            >
              {LanguagesList?.map((option) => (
                <MenuItem
                  key={option?.code}
                  selected={option?.label === selected?.label}
                  onClick={() => handleMenuItemClick(option)}
                >
                  {`${option?.label}  (${option?.code})`}
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Box
            sx={{
              width: "40%",
              display: { xs: "none", md: "flex" },
              alignItems: "center",
              justifyContent: "end",
            }}
          >
            {/* <Typography color="primary" className={classes.timeText}>
              Architect Meeting in 1h 12m
            </Typography> */}
            {/* <IconButton>
              <img alt="" src={notification} width="24px" height={"24px"} />
            </IconButton> */}
            <Tooltip
              title={`You Have ${
                taskList !== null ? taskList.length : 0
              } New Notifications!`}
            >
              <IconButton
                onClick={handleNotificationClick}
                size="small"
                sx={{ ml: 5 }}
                aria-controls={
                  openNotification ? "notification-menu" : undefined
                }
                aria-haspopup="true"
                aria-expanded={openNotification ? "true" : undefined}
              >
                <Badge badgeContent={taskList?.length} color="error">
                  <NotificationsIcon color="action" />
                </Badge>
              </IconButton>
            </Tooltip>
            <Menu
              anchorEl={notification}
              id="notification-menu"
              open={openNotification}
              onClose={handleCloseNotification}
              onClick={handleCloseNotification}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: "visible",
                  bgcolor: "#48484A",
                  color: "#FFFFFF",
                  filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                  display: taskList?.length > 0 ? "block" : "none",
                  mt: 0.3,
                  opacity: 0.95,
                  "& .MuiAvatar-root": {
                    width: 32,
                    height: 32,
                    mr: 1,
                  },
                  "&:before": {
                    content: '""',
                    display: "block",
                    position: "absolute",
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: "#48484A",
                    transform: "translateY(-50%) rotate(45deg)",
                    zIndex: 0,
                  },
                },
              }}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              {taskList?.map((each, i) => (
                <MenuItem
                  key={each?._id}
                >{`Your Meeting Regarding ${each?.title} will be starting on ${each?.startTime}`}</MenuItem>
              ))}
            </Menu>

            <Typography sx={{ ml: 5 }} className={classes.userText}>
              {userName}
            </Typography>
            <IconButton
              onClick={handleAccountClick}
              size="small"
              sx={{ ml: 5 }}
              aria-controls={openAccount ? "account-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={openAccount ? "true" : undefined}
            >
              <Avatar
                alt="user-profile"
                src={userProfile}
                sx={{ filter: "brightness(100%)" }}
              />
            </IconButton>
          </Box>
          <Menu
            anchorEl={account}
            id="account-menu"
            open={openAccount}
            onClose={handleClose}
            onClick={handleClose}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: "visible",
                bgcolor: "#48484A",
                color: "#FFFFFF",
                filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                mt: 0.3,
                ml: -0.8,
                opacity: 0.95,
                "& .MuiAvatar-root": {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                "&:before": {
                  content: '""',
                  display: "block",
                  position: "absolute",
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: "#48484A",
                  transform: "translateY(-50%) rotate(45deg)",
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            <MenuItem onClick={() => history.push("/settings")}>
              Settings
            </MenuItem>
            <MenuItem onClick={handleLogout}>Sign Out</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          {open ? (
            <Box>
              <img alt="logo" src={Bedrock_Black} className={classes.logo} />
            </Box>
          ) : (
            <img alt="" src={favicon} style={{ width: "45px" }} />
          )}

          {/* {!open ? (
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
              <Box>
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
              </Box>
            </>
          )} */}
        </DrawerHeader>
        <Divider sx={{ color: "#fff" }} />
        <List>
          <ListItem disablePadding sx={{ display: "block" }}>
            <ListItemButton
              onClick={handleDrawerOpen}
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
                color: "#fff",
              }}
            >
              {!open ? (
                <MenuIcon />
              ) : (
                <>
                  {theme.direction === "rtl" ? (
                    <ChevronRightIcon />
                  ) : (
                    <ChevronLeftIcon />
                  )}
                </>
              )}
              <ListItemText
                primary={"       "}
                sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>
          {sideLinks?.map((list, index) => (
            <ListItem
              key={list?.label + index}
              disablePadding
              sx={{ display: "block" }}
            >
              <RouterLink exact to={list?.link} className={classes.link}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                    color: "#fff",
                  }}
                >
                  <Tooltip title={t(list?.label)} placement="right-start">
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
                    primary={t(list?.label)}
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
              </RouterLink>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 2, height: "100vh" }}>
        <DrawerHeader />
        {React.cloneElement(props.children)}
      </Box>
    </Box>
  );
}

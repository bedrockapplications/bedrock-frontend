import React, { useState, memo } from "react";
import { makeStyles } from "@mui/styles";
import {
  Grid,
  Paper,
  Typography,
  Box,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Stack,
  Button,
  Autocomplete,
  TextField,
  InputAdornment,
  Tabs,
  Tab,
  IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import DocumentTable from "../../components/MuiTable";
import TabPanel from "../../components/MuiTabPanel";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import moment from "moment";

const useStyle = makeStyles(() => ({
  bgPaper: {
    backgroundColor: "#3A3A3C",
    padding: "1.375rem 0rem 1.813rem 2.438rem",
    borderRadius: "10px",
  },
  documentText: {
    fontStyle: "normal",
    fontWeight: 700,
    fontSize: "24px",
    lineHeight: "36px",
    color: " #FFFFFF",
  },
  addBtn: {
    fontSize: "20px",
    fontWeight: "700",
    lineHeight: "30px",
    borderRadius: "10px",
    textTransform: "capitalize",
    backgroundColor: "#fff",
    "&:hover": {
      background: "#fff",
    },
  },
  autoField: {
    backgroundColor: "#fff",
    borderRadius: "10px",
    "&:hover": {
      borderRadius: "10px",
    },
  },
  tabsWapper: {
    minHeight: "36px",
  },
  tab: {
    borderRight: "1px solid #fff",
    borderTopLeftRadius: "5px",
    borderTopRightRadius: "5px",
    minHeight: "36px",
    height: "36px",
    textTransform: "capitalize",
  },
}));

const sortOptions = [
  "Name",
  "Upload Date",
  "Date Last Opened",
  "Date Modified",
];

let disableFilter = {
  filter: false,
  sort: false,
};


function a11yProps(index) {
  return {
    id: `document-manager-${index}`,
    "aria-controls": `document-manager-${index}`,
  };
}
const Settings = () => {
  const classes = useStyle();
  const { t } = useTranslation();
  const userId = localStorage.getItem("userId");
  const [tabValue, setTabValue] = useState(0);
  const [categoryType, setCategoryType] = useState("General");



  const handleChangeTab = (event, newValue) => {
    if (newValue === 0) {
      setCategoryType("General");
    } else if (newValue === 1) {
      setCategoryType("Billing");
    } else {
      setCategoryType("Security");
    }
    setTabValue(newValue);
  };



  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Paper elevation={0} className={classes.bgPaper}>
            <Typography className={classes.documentText}>
              {t("settings.account_overview")}
            </Typography>
          </Paper>
        </Grid>
      </Grid>
      <Grid container sx={{ marginTop: "1rem", height: "calc(100% - 35%)" }}>
        <Grid item xs={12}>
          <Tabs
            value={tabValue}
            onChange={handleChangeTab}
            aria-label="Document Manager Tabs"
            className={classes.tabsWapper}
            TabIndicatorProps={{
              style: {
                display: "none",
              },
            }}
          >
            <Tab
              label={t("settings.general")}
              disableFocusRipple
              disableRipple
              {...a11yProps(0)}
              className={classes.tab}
            />
            <Tab
              label={t("settings.billing")}
              disableFocusRipple
              disableRipple
              {...a11yProps(1)}
              className={classes.tab}
            />
            <Tab
              label={t("settings.security")}
              disableFocusRipple
              disableRipple
              {...a11yProps(2)}
              className={classes.tab}
            />
          </Tabs>
          <TabPanel value={tabValue} index={0}>
          </TabPanel>
          <TabPanel value={tabValue} index={1}>
          </TabPanel>
          <TabPanel value={tabValue} index={2}>
          </TabPanel>
        </Grid>
      </Grid>

      
    </>
  );
};

export default memo(Settings);
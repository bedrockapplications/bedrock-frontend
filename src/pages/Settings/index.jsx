import React, { useEffect, useState, useContext } from "react";
import { makeStyles } from "@mui/styles";
import {
  Grid,
  Paper,
  Typography,
  Tabs,
  Tab,
} from "@mui/material";
import TabPanel from "../../components/MuiTabPanel";
import { useTranslation } from "react-i18next";
import GeneralTab from "./GeneralTab";
import BillingTab from "./BillingTab";
import SecurityTab from "./SecurityTab";
import { getUserDetails } from "../../services/request";
import { GlobalState } from "../../Context/Context";

const useStyle = makeStyles(() => ({
  bgPaper: {
    backgroundColor: "#3A3A3C",
    padding: "1.375rem 0rem 1.813rem 2.438rem",
    borderRadius: "10px",
  },
  accountText: {
    fontStyle: "normal",
    fontWeight: 700,
    fontSize: "24px",
    lineHeight: "36px",
    color: " #FFFFFF",
  },
  tabsWapper: {
    minHeight: "36px",
  },
  tab: {
    width: "110px",
    borderRight: "1px solid #fff",
    borderTopLeftRadius: "5px",
    borderTopRightRadius: "5px",
    minHeight: "36px",
    height: "36px",
    textTransform: "capitalize",
  },
}));

function a11yProps(index) {
  return {
    id: `settings-${index}`,
    "aria-controls": `settings-${index}`,
  };
}

const Settings = () => {
  const classes = useStyle();
  const { t } = useTranslation();

  const { userDetails, setUserDetails } = useContext(GlobalState);
  const [tabValue, setTabValue] = useState(0);

  const handleChangeTab = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleUserDetails = () => {
    let id = localStorage.userId;
    getUserDetails(id).then((res) => {
      if (res.status === 200 && res.data.hasOwnProperty("email")) {
        setUserDetails(res.data);
      } else {
        console.log(res.data.message);
      }
    });
  };

  useEffect(() => {
    handleUserDetails();
  }, []);

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Paper elevation={0} className={classes.bgPaper}>
            <Typography className={classes.accountText}>
              Account Overview
            </Typography>
          </Paper>
        </Grid>
      </Grid>
      <Grid container sx={{ marginTop: "10px" }}>
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
              label={"General"}
              disableFocusRipple
              disableRipple
              {...a11yProps(0)}
              className={classes.tab}
            />
            <Tab
              label={"Billing"}
              disableFocusRipple
              disableRipple
              {...a11yProps(1)}
              className={classes.tab}
            />
            <Tab
              label={"Security"}
              disableFocusRipple
              disableRipple
              {...a11yProps(2)}
              className={classes.tab}
            />
          </Tabs>
          <TabPanel value={tabValue} index={0}>
            <GeneralTab />
          </TabPanel>
          <TabPanel value={tabValue} index={1}>
            <BillingTab />
          </TabPanel>
          <TabPanel value={tabValue} index={2}>
            <SecurityTab />
          </TabPanel>
        </Grid>
      </Grid>
    </>
  );
};

export default Settings;

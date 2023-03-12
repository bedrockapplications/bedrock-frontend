import React, { useState, useEffect } from "react";
import { Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { makeStyles } from "@mui/styles";

const useStyle = makeStyles(() => ({
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
  timeText: {
    fontStyle: "normal",
    fontSize: "0.75rem",
    fontWeight: "400",
    lineHeight: "18px",
    color: `#1D242E`,
    textShadow: "1px 0px #1D242E",
  },
}));

const DigitalClock = () => {
  const classes = useStyle();
  const { t } = useTranslation();

  const [clockState, setClockState] = useState("");
  const [dayState, setDayState] = useState("");

  // const GetDateAndTime = () => {
  //   setInterval(() => {
  //     const date = new Date();
  //     let time = date.toLocaleString("en-US", {
  //       hour: "2-digit",
  //       minute: "2-digit",
  //       second: "2-digit",
  //       hour12: true,
  //     });
  //     setClockState(time);
  //     let hrs = date.getHours();
  //     if (hrs < 12) {
  //       setDayState("good_morning");
  //     } else if (hrs < 17) {
  //       setDayState("good_afternoon");
  //     } else {
  //       setDayState("good_evening");
  //     }
  //   }, 1000);
  // };

  useEffect(() => {
    const intervalId = setInterval(() => {
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
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <Typography color="primary" className={classes.dayText}>
        {t(dayState)}
      </Typography>
      <Typography color="primary" className={classes.timeText}>
        {`${new Date()?.toDateString()} ${clockState}`}
      </Typography>
    </>
  );
};
export default DigitalClock;

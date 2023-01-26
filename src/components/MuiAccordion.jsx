import React, { memo, useState, useContext } from "react";
import { makeStyles } from "@mui/styles";
import { GlobalState } from "../Context/Context";

import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import AddIcon from "@mui/icons-material/Add";
import Typography from "@mui/material/Typography";

const useStyle = makeStyles(() => ({
  accordionTitle: {
    width: "50%",
    flexShrink: 0,
    fontSize: "1rem",
    fontWeight: "600",
    letterSpacing: "0.02rem",
    lineHeight: "24px",
  },
}));

const MuiAccordion = (props) => {
  const { title, selectedPanel, children } = props;
  const classes = useStyle();

  // const [expanded, setExpanded] = useState(false);
  const { expanded, setExpanded } = useContext(GlobalState);

  const handleChange = (panel) => (event, isExpanded) => {
    console.log("s1", panel)
    console.log("e1",expanded)
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <>
    {console.log("s2", selectedPanel)}
    {console.log("e2", expanded)}
      <Accordion
        expanded={expanded === selectedPanel}
        onChange={handleChange(selectedPanel)}
      >
        <AccordionSummary
          expandIcon={
            <AddIcon
              sx={{ color: expanded === selectedPanel ? "#FFFFFF" : "" }}
            />
          }
          aria-controls={selectedPanel}
          id={selectedPanel}
          sx={{
            backgroundColor: expanded === selectedPanel ? "#3A3A3C" : "",
            color: expanded === selectedPanel ? "#FFFFFF" : "",
          }}
        >
          <Typography className={classes.accordionTitle}>{title}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {expanded === selectedPanel ? children : null}
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default memo(MuiAccordion);

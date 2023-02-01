import React, { memo, useState, useContext, useMemo } from "react";
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
  const { title, selectedPanel, children, expanded, handleChange } = props;
  const classes = useStyle();

  //   //   const [expanded, setExpanded] = useState(false);
  //   // //   const { expanded, setExpanded } = useContext(GlobalState);

  //   const handleChange = (panel) => (event, isExpanded) => {
  //     console.log("s1", panel);
  //     console.log("e1", expanded);
  //     setExpanded(isExpanded ? panel : false);
  //   };

  return (
    <>
      {console.log("e2", expanded)}
      <Accordion expanded={expanded} onChange={handleChange}>
        <AccordionSummary
          expandIcon={<AddIcon sx={{ color: expanded ? "#FFFFFF" : "" }} />}
          aria-controls={selectedPanel}
          id={selectedPanel}
          sx={{
            backgroundColor: expanded ? "#3A3A3C" : "",
            color: expanded ? "#FFFFFF" : "",
          }}
        >
          <Typography className={classes.accordionTitle}>{title}</Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ padding: "1.5rem 1rem 1rem" }}>
          {expanded ? children : null}
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default memo(MuiAccordion);

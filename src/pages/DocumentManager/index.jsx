import React, { useState, useEffect, memo } from "react";
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
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import DocumentTable from "../../components/MuiTable";
import TabPanel from "../../components/MuiTabPanel";

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

const tableData = [
  {
    name: "McDonald’s Foundation Update",
    type: "PDF",
    uploadDate: "10/1/2022, 6:00 PM",
  },
  {
    name: "McDonald’s Foundation Update",
    type: "BPDF",
    uploadDate: "10/1/2022, 6:00 PM",
  },
  {
    name: "McDonald’s Foundation Update",
    type: "DOC",
    uploadDate: "10/1/2022, 6:00 PM",
  },
  {
    name: "McDonald’s Foundation Update",
    type: "TXT",
    uploadDate: "10/1/2022, 6:00 PM",
  },
  {
    name: "McDonald’s Foundation Update",
    type: "PDF",
    uploadDate: "10/1/2022, 6:00 PM",
  },
  {
    name: "McDonald’s Foundation Update",
    type: "BPDF",
    uploadDate: "10/1/2022, 6:00 PM",
  },
  {
    name: "McDonald’s Foundation Update",
    type: "DOC",
    uploadDate: "10/1/2022, 6:00 PM",
  },
  {
    name: "McDonald’s Foundation Update",
    type: "TXT",
    uploadDate: "10/1/2022, 6:00 PM",
  },
  {
    name: "McDonald’s Foundation Update",
    type: "PDF",
    uploadDate: "10/1/2022, 6:00 PM",
  },
  {
    name: "McDonald’s Foundation Update",
    type: "BPDF",
    uploadDate: "10/1/2022, 6:00 PM",
  },
  {
    name: "McDonald’s Foundation Update",
    type: "DOC",
    uploadDate: "10/1/2022, 6:00 PM",
  },
  {
    name: "McDonald’s Foundation Update",
    type: "TXT",
    uploadDate: "10/1/2022, 6:00 PM",
  },
];
function a11yProps(index) {
  return {
    id: `document-manager-${index}`,
    "aria-controls": `document-manager-${index}`,
  };
}
const DocumentManager = () => {
  const classes = useStyle();

  const [sortBy, setSortBy] = useState("");
  const [tabValue, setTabValue] = useState(0);

  const handleSortBy = (event) => {
    setSortBy(event.target.value);
  };

  const columns = [
    {
      name: "name",
      label: "Name",
      options: {
        ...disableFilter,
        customBodyRender: (value) => (value ? value : `---`),
      },
    },
    {
      name: "type",
      label: "Type",
      options: {
        ...disableFilter,
        customBodyRender: (value) => (value ? value : `---`),
      },
    },
    {
      name: "uploadDate",
      label: "Upload Date",
      width: "40%",
      options: {
        ...disableFilter,
        customBodyRender: (value) => (value ? value : `---`),
      },
    },
    {
      name: "",
      label: "Actions",
      options: {
        ...disableFilter,
        customBodyRender: (value) => (value ? value : `---`),
      },
    },
  ];

  const handleChangeTab = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Paper elevation={0} className={classes.bgPaper}>
            <Typography className={classes.documentText}>
              Document Manager
            </Typography>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="flex-start"
              spacing={3}
              sx={{ paddingTop: "5px" }}
            >
              <Box sx={{ width: "253px" }}>
                <FormControl fullWidth size="small" placeholder="Sort By">
                  <InputLabel id="sortBy"></InputLabel>
                  <Select
                    labelId="sortBy"
                    id="sortBy"
                    value={sortBy}
                    label=""
                    onChange={handleSortBy}
                    sx={{ backgroundColor: "#fff", borderRadius: "10px" }}
                  >
                    {sortOptions.map((item, i) => (
                      <MenuItem key={item + i} value={item}>
                        {item}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
              <Box sx={{ width: "450px" }}>
                <Autocomplete
                  id="search"
                  freeSolo
                  options={[]?.map((option) => option?.title)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label=""
                      size="small"
                      className={classes.autoField}
                      placeholder="Search all documents"
                      InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                          <InputAdornment position="end">
                            <SearchIcon />
                          </InputAdornment>
                        ),
                      }}
                    />
                  )}
                />
              </Box>
              <Box sx={{ width: "258px" }}>
                <Button
                  fullWidth
                  className={classes.addBtn}
                  startIcon={<AddIcon />}
                  size="small"
                >
                  New Document
                </Button>
              </Box>
            </Stack>
          </Paper>
        </Grid>
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
              label="Design Documents"
              disableFocusRipple
              disableRipple
              {...a11yProps(0)}
              className={classes.tab}
            />
            <Tab
              label="Photos"
              disableFocusRipple
              disableRipple
              {...a11yProps(1)}
              className={classes.tab}
            />
            <Tab
              label="Submittals"
              disableFocusRipple
              disableRipple
              {...a11yProps(2)}
              className={classes.tab}
            />
          </Tabs>
          <TabPanel value={tabValue} index={0}>
            <DocumentTable columns={columns} data={tableData} />
          </TabPanel>
          <TabPanel value={tabValue} index={1}>
            <DocumentTable columns={columns} data={tableData} />
          </TabPanel>
          <TabPanel value={tabValue} index={2}>
            <DocumentTable columns={columns} data={tableData} />
          </TabPanel>
        </Grid>
      </Grid>
    </>
  );
};

export default memo(DocumentManager);

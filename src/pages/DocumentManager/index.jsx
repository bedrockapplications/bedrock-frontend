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
import EditIcon from "@mui/icons-material/Edit";
import EmailIcon from "@mui/icons-material/Email";
import DeleteIcon from "@mui/icons-material/Delete";
import { useTranslation } from "react-i18next";
import AddNewFiles from "./AddNewFiles";
import {
  getAllProjectList,
  getAllDocumentListApi,
  deleteDocumentApi,
} from "../../services/request";
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

const tableData = [
  {
    id: "1",
    name: "McDonald’s Foundation Update",
    type: "PDF",
    uploadDate: "10/1/2022, 6:00 PM",
  },
  {
    id: "2",
    name: "McDonald’s Foundation Update",
    type: "BPDF",
    uploadDate: "10/1/2022, 6:00 PM",
  },
  {
    id: "3",
    name: "McDonald’s Foundation Update",
    type: "DOC",
    uploadDate: "10/1/2022, 6:00 PM",
  },
  {
    id: "4",
    name: "McDonald’s Foundation Update",
    type: "TXT",
    uploadDate: "10/1/2022, 6:00 PM",
  },
  {
    id: "5",
    name: "McDonald’s Foundation Update",
    type: "PDF",
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
  const { t } = useTranslation();
  const userId = localStorage.getItem("userId");

  const [sortBy, setSortBy] = useState("");
  const [tabValue, setTabValue] = useState(0);
  const [openFileModel, setOpenFileModel] = useState(false);
  const [projectOptions, setProjectOptions] = useState([]);
  const [categoryType, setCategoryType] = useState("DesignDocuments");
  const [designTableData, setDesignTableData] = useState([]);
  const [photoTableData, setPhotoTableData] = useState([]);
  const [submittalsTableData, setSubmittalsTableData] = useState([]);

  const handleSortBy = (event) => {
    setSortBy(event.target.value);
  };

  const GetAllProjectsList = () => {
    getAllProjectList(userId)
      .then((res) => {
        if (res.status === 200) {
          if (res.data.length > 0) {
            let projectList = res?.data?.map((item) => {
              return { value: item._id, label: item?.projectName };
            });
            setProjectOptions([...projectList]);
          } else {
            setProjectOptions([]);
          }
        }
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  const GetDocumentsLists = () => {
    getAllDocumentListApi(userId)
      .then((res) => {
        if (res.status === 200) {
          const data = res.data.data;
          setDesignTableData([...data.DesignDocuments]);
          setPhotoTableData([...data.Photos]);
          setSubmittalsTableData([...data.Submittals]);
        }
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  const handleDeleteDocument = (doc) => {
    deleteDocumentApi(doc._id)
      .then((res) => {
        if (res.status === 200) {
          GetDocumentsLists();
        }
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  const handleEditDocument = (docId) => {
    console.log("id", docId);
  };

  useEffect(() => {
    GetAllProjectsList();
    GetDocumentsLists();
  }, []);

  const Documentscolumns = [
    {
      name: "documents",
      label: "File Name",
      options: {
        ...disableFilter,
        // setCellProps: () => ({ style: { width: "300px" } }),
        customBodyRender: (value) => (value ? value[0]?.fileName : "---"),
      },
    },
    {
      name: "documents",
      label: "Type",
      options: {
        ...disableFilter,
        customBodyRender: (value) => (value ? value[0]?.contentType : `---`),
      },
    },
    {
      name: "updatedAt",
      label: "Upload Date",
      width: "40%",
      options: {
        ...disableFilter,
        // setCellProps: () => ({ style: { width: "700px" } }),
        customBodyRender: (value) =>
          value ? moment(value).format("DD-MM-YYYY") : `---`,
      },
    },
    {
      name: "",
      label: "Actions",
      options: {
        ...disableFilter,
        customBodyRenderLite: (dataIndex, rowIndex) => (
          <>
            <IconButton
              size="small"
              color="primary"
              onClick={() => handleEditDocument(designTableData[dataIndex])}
            >
              <EditIcon fontSize="small" />
            </IconButton>
            <IconButton size="small" color="primary">
              <EmailIcon fontSize="small" />
            </IconButton>
            <IconButton
              size="small"
              color="primary"
              onClick={() => handleDeleteDocument(designTableData[dataIndex])}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </>
        ),
      },
    },
  ];

  const photosColumns = [
    {
      name: "documents",
      label: "File Name",
      options: {
        ...disableFilter,
        // setCellProps: () => ({ style: { width: "300px" } }),
        customBodyRender: (value) => (value ? value[0]?.fileName : "---"),
      },
    },
    {
      name: "documents",
      label: "Type",
      options: {
        ...disableFilter,
        customBodyRender: (value) => (value ? value[0]?.contentType : `---`),
      },
    },
    {
      name: "updatedAt",
      label: "Upload Date",
      width: "40%",
      options: {
        ...disableFilter,
        // setCellProps: () => ({ style: { width: "700px" } }),
        customBodyRender: (value) =>
          value ? moment(value).format("DD-MM-YYYY") : `---`,
      },
    },
    {
      name: "",
      label: "Actions",
      options: {
        ...disableFilter,
        customBodyRenderLite: (dataIndex, rowIndex) => (
          <>
            <IconButton
              size="small"
              color="primary"
              onClick={() => handleEditDocument(photoTableData[dataIndex])}
            >
              <EditIcon fontSize="small" />
            </IconButton>
            <IconButton size="small" color="primary">
              <EmailIcon fontSize="small" />
            </IconButton>
            <IconButton
              size="small"
              color="primary"
              onClick={() => handleDeleteDocument(photoTableData[dataIndex])}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </>
        ),
      },
    },
  ];

  const submittalsColumns = [
    {
      name: "documents",
      label: "File Name",
      options: {
        ...disableFilter,
        // setCellProps: () => ({ style: { width: "300px" } }),
        customBodyRender: (value) => (value ? value[0]?.fileName : "---"),
      },
    },
    {
      name: "documents",
      label: "Type",
      options: {
        ...disableFilter,
        customBodyRender: (value) => (value ? value[0]?.contentType : `---`),
      },
    },
    {
      name: "updatedAt",
      label: "Upload Date",
      width: "40%",
      options: {
        ...disableFilter,
        // setCellProps: () => ({ style: { width: "700px" } }),
        customBodyRender: (value) =>
          value ? moment(value).format("DD-MM-YYYY") : `---`,
      },
    },
    {
      name: "",
      label: "Actions",
      options: {
        ...disableFilter,
        customBodyRenderLite: (dataIndex, rowIndex) => (
          <>
            <IconButton
              size="small"
              color="primary"
              onClick={() => handleEditDocument(submittalsTableData[dataIndex])}
            >
              <EditIcon fontSize="small" />
            </IconButton>
            <IconButton size="small" color="primary">
              <EmailIcon fontSize="small" />
            </IconButton>
            <IconButton
              size="small"
              color="primary"
              onClick={() =>
                handleDeleteDocument(submittalsTableData[dataIndex])
              }
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </>
        ),
      },
    },
  ];

  const handleChangeTab = (event, newValue) => {
    if (newValue === 0) {
      setCategoryType("DesignDocuments");
    } else if (newValue === 1) {
      setCategoryType("Photos");
    } else {
      setCategoryType("Submittals");
    }
    setTabValue(newValue);
  };

  const handleCloseFileModel = () => {
    setOpenFileModel(false);
  };

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Paper elevation={0} className={classes.bgPaper}>
            <Typography className={classes.documentText}>
              {t("document.document_manager")}
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
                    {projectOptions?.map((item, i) => (
                      <MenuItem key={item + i} value={item.value}>
                        {item.label}
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
                      placeholder={t(`document.search_all_documents`)}
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
                  onClick={() => setOpenFileModel(true)}
                >
                  {t("document.new_file")}
                </Button>
              </Box>
            </Stack>
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
              label={t("document.design_documents")}
              disableFocusRipple
              disableRipple
              {...a11yProps(0)}
              className={classes.tab}
            />
            <Tab
              label={t("document.photos")}
              disableFocusRipple
              disableRipple
              {...a11yProps(1)}
              className={classes.tab}
            />
            <Tab
              label={t("document.submittals")}
              disableFocusRipple
              disableRipple
              {...a11yProps(2)}
              className={classes.tab}
            />
          </Tabs>
          <TabPanel value={tabValue} index={0}>
            <DocumentTable columns={Documentscolumns} data={designTableData} />
          </TabPanel>
          <TabPanel value={tabValue} index={1}>
            <DocumentTable columns={photosColumns} data={photoTableData} />
          </TabPanel>
          <TabPanel value={tabValue} index={2}>
            <DocumentTable
              columns={submittalsColumns}
              data={submittalsTableData}
            />
          </TabPanel>
        </Grid>
      </Grid>

      {/* <Grid item xs={12}>
          
        </Grid> */}
      <AddNewFiles
        open={openFileModel}
        handleClose={handleCloseFileModel}
        GetDocumentsLists={GetDocumentsLists}
        projectOptions={projectOptions}
        categoryType={categoryType}
      />
    </>
  );
};

export default memo(DocumentManager);

// Dont remove this code
{
  /* <Grid container spacing={4}>
              <Grid item xs={12} md={2.5} lg={2.5}>
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
              </Grid>
              <Grid item xs={12} md={5} lg={5}>
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
                      placeholder={t(`document.search_all_documents`)}
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
              </Grid>
              <Grid item xs={12} md={2.5} lg={2.5}>
                <Button
                  fullWidth
                  className={classes.addBtn}
                  startIcon={<AddIcon />}
                  size="small"
                  onClick={() => setOpenFileModel(true)}
                >
                  {t("document.new_file")}
                </Button>
              </Grid>
            </Grid> */
}

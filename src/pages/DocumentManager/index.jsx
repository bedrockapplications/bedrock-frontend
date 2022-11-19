import React, { useState, memo, useContext } from "react";
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
import TabPanel from "../../components/MuiTabPanel";
import { useTranslation } from "react-i18next";
import AddNewFiles from "./AddNewFiles";
import {
  getAllProjectList,
  getAllDocumentListApi,
} from "../../services/request";
import { useEffect } from "react";
import DesignDocumentTable from "./DesignDocumentTable";
import PhotosDocTable from "./PhotosDocTable";
import SubmittalsDocTable from "./SubmittalsDocTable";
import { GlobalState } from "../../Context/Context";
import MuiTextField from "../../components/Formik/MuiTextField";

// import DocumentTable from "../../components/MuiTable";
// import EditIcon from "@mui/icons-material/Edit";
// import EmailIcon from "@mui/icons-material/Email";
// import DeleteIcon from "@mui/icons-material/Delete";
// import moment from "moment";

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

let disableFilter = {
  filter: false,
  sort: false,
};

const Placeholder = ({ children }) => {
  return <Box sx={{ color: "#aaa" }}>{children}</Box>;
};

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
  const {
    page,
    setPage,
    rowsPerPage,
    setRowsPerPage,
    selectedProjected,
    setSelectedProjected,
    search,
    setSearch,
  } = useContext(GlobalState);

  const [tabValue, setTabValue] = useState(0);
  const [openFileModel, setOpenFileModel] = useState(false);
  const [projectOptions, setProjectOptions] = useState([]);
  const [categoryType, setCategoryType] = useState("DesignDocuments");
  const [designTableData, setDesignTableData] = useState([]);
  const [photoTableData, setPhotoTableData] = useState([]);
  const [submittalsTableData, setSubmittalsTableData] = useState([]);

  const [totalCount, setTotalCount] = useState(0);
  const [photosCount, setPhotosCount] = useState(0);
  const [submittalsCount, setSubmittalsCount] = useState(0);

  const handleChangeProject = (event) => {
    setPage(0);
    GetDocumentsLists(0, rowsPerPage, event.target.value);
    setSelectedProjected(event.target.value);
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

  const GetDocumentsLists = (pageNumber, limit, projectId, searchValue) => {
    getAllDocumentListApi(
      pageNumber || 0,
      limit || 10,
      userId,
      projectId || "",
      searchValue
    )
      .then((res) => {
        if (res.status === 200) {
          const data = res.data.data;
          setDesignTableData([...data.DesignDocuments]);
          setPhotoTableData([...data.Photos]);
          setSubmittalsTableData([...data.Submittals]);
          setTotalCount(data.DesignDocumentsCount);
          setPhotosCount(data.PhotosCount);
          setSubmittalsCount(data.SubmittalsCount);
        }
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  useEffect(() => {
    GetAllProjectsList();
    GetDocumentsLists();
  }, []);

  const handleChangeTab = (event, newValue) => {
    if (newValue === 0) {
      setCategoryType("DesignDocuments");
    } else if (newValue === 1) {
      setCategoryType("Photos");
    } else {
      setCategoryType("Submittals");
    }
    setTabValue(newValue);
    setPage(0);
    setRowsPerPage(10);
    GetDocumentsLists(0, 10, selectedProjected, search);
  };

  const handleCloseFileModel = () => {
    setOpenFileModel(false);
  };

  const handleSearch = (searchValue) => {
    setSearch(searchValue);
    GetDocumentsLists(0, 10, selectedProjected, searchValue);
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
                  <InputLabel id="projectId"></InputLabel>
                  <Select
                    labelId="projectId"
                    id="projectId"
                    value={selectedProjected}
                    label=""
                    displayEmpty
                    onChange={handleChangeProject}
                    renderValue={
                      selectedProjected !== ""
                        ? undefined
                        : () => <Placeholder>Select Project</Placeholder>
                    }
                    sx={{ backgroundColor: "#fff", borderRadius: "10px" }}
                  >
                    <MenuItem value={""}>None</MenuItem>
                    {projectOptions?.map((item, i) => (
                      <MenuItem key={item + i} value={item.value}>
                        {item.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
              <Box sx={{ width: "450px" }}>
                <TextField
                  id="search"
                  name="search"
                  placeholder={t(`document.search_all_documents`)}
                  variant="outlined"
                  sx={{ backgroundColor: "#fff", borderRadius: "10px" }}
                  fullWidth
                  size="small"
                  onChange={(e) => handleSearch(e.target.value)}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
                />

                {/* <Autocomplete
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
                /> */}
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
            <DesignDocumentTable
              data={designTableData}
              GetDocumentsLists={GetDocumentsLists}
              projectOptions={projectOptions}
              totalCount={totalCount}
            />
          </TabPanel>
          <TabPanel value={tabValue} index={1}>
            <PhotosDocTable
              data={photoTableData}
              GetDocumentsLists={GetDocumentsLists}
              projectOptions={projectOptions}
              totalCount={photosCount}
            />
          </TabPanel>
          <TabPanel value={tabValue} index={2}>
            <SubmittalsDocTable
              data={submittalsTableData}
              GetDocumentsLists={GetDocumentsLists}
              projectOptions={projectOptions}
              totalCount={submittalsCount}
            />
          </TabPanel>
        </Grid>
      </Grid>
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

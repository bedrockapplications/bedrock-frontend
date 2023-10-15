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
// import AddNewFiles from "./AddNewFiles";
import {
  getAllProjectList,
  getAllDocumentListApi,
  getSearchFileList,
} from "../../services/request";
import { useEffect } from "react";
// import DesignDocumentTable from "./DesignDocumentTable";
// import PhotosDocTable from "./PhotosDocTable";
// import SubmittalsDocTable from "./SubmittalsDocTable";
import { GlobalState } from "../../Context/Context";
import OldProjectsTable from "./oldProjectsTable";
// import MuiTextField from "../../components/Formik/MuiTextField";

// import DocumentTable from "../../components/MuiTable";
// import EditIcon from "@mui/icons-material/Edit";
// import EmailIcon from "@mui/icons-material/Email";
// import DeleteIcon from "@mui/icons-material/Delete";
// import moment from "moment";

const useStyle = makeStyles(() => ({
  bgPaper: {
    backgroundColor: "#3A3A3C",
    padding: "1.375rem 2.438rem 1.813rem 2.438rem",
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
const MySubProjects = () => {
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
    setIsLoading,
  } = useContext(GlobalState);

  const [tabValue, setTabValue] = useState(0);
  const [openFileModel, setOpenFileModel] = useState(false);
  const [projectOptions, setProjectOptions] = useState([]);
  const [categoryType, setCategoryType] = useState("DesignDocuments");
  const [designTableData, setDesignTableData] = useState([]);
  const [photoTableData, setPhotoTableData] = useState([]);
  const [submittalsTableData, setSubmittalsTableData] = useState([]);
  const [searchOptions, setSearchOptions] = useState([]);

  const [totalCount, setTotalCount] = useState(0);
  const [photosCount, setPhotosCount] = useState(0);
  const [submittalsCount, setSubmittalsCount] = useState(0);

  const handleChangeProject = (event) => {
    setSearch("");
    setPage(0);
    GetDocumentsLists(0, rowsPerPage, event.target.value, "");
    setSelectedProjected(event.target.value);
    GetSearchOptions(categoryType, event.target.value);
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

  const GetSearchOptions = (category, project) => {
    getSearchFileList(
      userId,
      project || selectedProjected,
      category || categoryType
    )
      .then((res) => {
        if (res.status === 200) {
          if (res.data.length > 0) {
            setSearchOptions([...res.data]);
          } else {
            setSearchOptions([]);
          }
        }
      })
      .catch((error) => {
        let errorObj = error;
        console.log(errorObj);
      });
  };

  const GetDocumentsLists = (pageNumber, limit, projectId, searchValue) => {
    setIsLoading(true);
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
          setIsLoading(false);
        }
      })
      .catch((error) => {
        console.log("error", error);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    GetSearchOptions();
    GetAllProjectsList();
    GetDocumentsLists();
  }, []);

  const handleChangeTab = (event, newValue) => {
    setSearch("");
    if (newValue === 0) {
      setCategoryType("DesignDocuments");
      GetSearchOptions("DesignDocuments");
    } else if (newValue === 1) {
      setCategoryType("Photos");
      GetSearchOptions("Photos");
    } else {
      setCategoryType("Submittals");
      GetSearchOptions("Submittals");
    }
    setTabValue(newValue);
    setPage(0);
    setRowsPerPage(10);
    GetDocumentsLists(0, 10, selectedProjected, "");
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
              {t("my_sub_projects.my_projects")}
            </Typography>
            {/* <Grid container spacing={4}>
              <Grid item xs={12} md={2.5} lg={2.5}>
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
                    <MenuItem value={""}>ALL</MenuItem>
                    {projectOptions?.map((item, i) => (
                      <MenuItem key={item + i} value={item.value}>
                        {item.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={5} lg={5}>
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
            </Grid> */}
          </Paper>
        </Grid>
      </Grid>
      <Grid container sx={{ marginTop: "1rem", height: "calc(100% - 35%)" }}>
        <Grid item xs={12}>
          <Tabs
            value={tabValue}
            onChange={handleChangeTab}
            aria-label="My Project Tabs"
            className={classes.tabsWapper}
            TabIndicatorProps={{
              style: {
                display: "none",
              },
            }}
          >
            <Tab
              label={t("my_sub_projects.old_projects")}
              disableFocusRipple
              disableRipple
              {...a11yProps(0)}
              className={classes.tab}
            />
            <Tab
              label={t("my_sub_projects.new_projects")}
              disableFocusRipple
              disableRipple
              {...a11yProps(1)}
              className={classes.tab}
            />
            <Tab
              label={t("my_sub_projects.applied_projects")}
              disableFocusRipple
              disableRipple
              {...a11yProps(2)}
              className={classes.tab}
            />
          </Tabs>
          <TabPanel value={tabValue} index={0}>
            <OldProjectsTable
              data={designTableData}
              GetDocumentsLists={GetDocumentsLists}
              projectOptions={projectOptions}
              totalCount={totalCount}
              status="completed"
            />
          </TabPanel>
          <TabPanel value={tabValue} index={1}>
            <OldProjectsTable
              data={photoTableData}
              GetDocumentsLists={GetDocumentsLists}
              projectOptions={projectOptions}
              totalCount={photosCount}
              status="active"
            />
          </TabPanel>
          <TabPanel value={tabValue} index={2}>
            <OldProjectsTable
              data={submittalsTableData}
              GetDocumentsLists={GetDocumentsLists}
              projectOptions={projectOptions}
              totalCount={submittalsCount}
              status="pending"
            />
          </TabPanel>
        </Grid>
      </Grid>
      {/* <AddNewFiles
        open={openFileModel}
        handleClose={handleCloseFileModel}
        GetDocumentsLists={GetDocumentsLists}
        projectOptions={projectOptions}
        categoryType={categoryType}
        GetSearchOptions={GetSearchOptions}
      /> */}
    </>
  );
};

export default memo(MySubProjects);
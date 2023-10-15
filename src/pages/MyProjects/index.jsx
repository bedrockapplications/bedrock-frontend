import React, { useCallback, useContext } from "react";
import { makeStyles } from "@mui/styles";
import {
  Box,
  Grid,
  Paper,
  Typography,
  Button,
  TextField,
  InputAdornment,
  Stack,
  Switch,
  IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import SearchIcon from "@mui/icons-material/Search";
import { styled } from "@mui/material/styles";
import { useState } from "react";
import ProjectDataTable from "../MyProjects/ProjectDataTable";
import { useTranslation } from "react-i18next";
import UploadForm from "./uploadForm";
import { getManagerProjects } from "../../services/request";
import { GlobalState } from "../../Context/Context";
import { useEffect } from "react";


const useStyle = makeStyles(() => ({
  PageHeader: {
    background: "#3A3A3C",
    borderRadius: "10px",
    padding: "20px 30px 20px 30px",
  },
  titleText: {
    fontSize: "1.5rem",
    fontWeight: 700,
    lineHeight: "36px",
    color: "#fff",
  },
  createBtn: {
    fontSize: "1rem",
    fontWeight: "700",
    lineHeight: "27px",
    borderRadius: "10px",
    textTransform: "capitalize",
    backgroundColor: "#fff",
    "&:hover": {
      background: "#fff",
    },
  },
  switchText: {
    fontSize: "1rem",
    fontWeight: "700",
    lineHeight: "24px",
    color: "#fff",
  },
}));

const MySubProjects = () => {
  const classes = useStyle();
  const { t } = useTranslation();
  const {
    projectTableData,
    setProjectTableData,
    isLoading,
    setIsLoading,
    setStep,
    openFileModel,
    setOpenFileModel,
    setOpenMode
  } = useContext(GlobalState);

  const [viewToggle, setViewToggle] = useState(false);

  const handleCloseFileModel = () => {
    setOpenFileModel(false);
  };

  const handleSearch = (value) => {
    console.log("first")
    if (value?.trim() === "") {
      handleGetAllProject();
    } else {
      let data = projectTableData.filter(
        (item) =>
          item?.projectName?.toLowerCase()?.startsWith(value) ||
          item?.projectType?.toLowerCase()?.startsWith(value) ||
          item?.address?.toLowerCase()?.startsWith(value) ||
          item?.status?.toLowerCase()?.startsWith(value) ||
          item?.clientName?.toLowerCase()?.startsWith(value)
      );
      setProjectTableData(data);
    }
  };

  const handleGetAllProject = () => {
    setIsLoading(true);
    getManagerProjects()
      .then((res) => {
        console.log(res.data, "hggf")
        if (res.data.status) {
          console.log(res.data.data, "vgvcvc")
          setProjectTableData(res.data.data);
          setIsLoading(false);
        }
      })
      .catch((error) => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    handleGetAllProject();
  }, []);

  return (
    <>
      <Box sx={{ height: "calc(100% - 65px)" }}>
        <Grid container spacing={0}>
          <Grid item xs={12}>
            <Paper elevation={0} className={classes.PageHeader}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Typography className={classes.titleText}>
                    {t("myProject.projectDirectory")}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6}>
                  <TextField
                    id="search"
                    name="search"
                    placeholder={"Search"}
                    variant="outlined"
                    size="small"
                    sx={{ backgroundColor: "#fff", borderRadius: "10px" }}
                    fullWidth
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
                <Grid item xs={12} sm={6} md={3} lg={3}>
                  <Button
                    startIcon={<AddIcon />}
                    fullWidth
                    className={classes.createBtn}
                    onClick={() => {
                      setStep(0);
                      setOpenMode("")
                      setOpenFileModel(true);
                    }}
                  >
                    New Project
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
        <Box sx={{ width: "100%", marginTop: "1rem" }}>
          <ProjectDataTable data={projectTableData} />
        </Box>
        <UploadForm
          open={openFileModel}
          handleClose={handleCloseFileModel}
          // GetDocumentsLists={GetDocumentsLists}
          // projectOptions={projectOptions}
          // categoryType={categoryType}
          // GetSearchOptions={GetSearchOptions}
        />
      </Box>
    </>
  );
};

export default MySubProjects;

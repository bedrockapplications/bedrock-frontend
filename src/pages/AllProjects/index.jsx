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
import { useTranslation } from "react-i18next";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import DropDownArrow from "@mui/icons-material/ArrowDropDown";
import crane from "../../Images/crane.png";
import AllProjectsTable from "./allProjectsTable";
// import UploadForm from "./uploadForm";



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
        fontSize: "14px",
        fontWeight: "700",
        lineHeight: "30px",
        paddingLeft: "20px",
        borderRadius: "10px",
        textTransform: "capitalize",
        backgroundColor: "#fff",
        color: "#3A3A3C",
        justifyContent: "flex-start",
        "&:hover": {
            background: "#fff",
        },
    },
    DropBtn: {
        justifyContent: "flex-end",
        float: "right",
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
    craneImg: {
        width: "inherit",
        transform: "rotateY(-180deg)",
        marginTop: "-36px"
    },
}));




const AllProjects = () => {
    const [openFileModel, setOpenFileModel] = useState(false);
    const classes = useStyle();
    const { t } = useTranslation();

    const handleCloseFileModel = () => {
        setOpenFileModel(false);
    };
    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Paper elevation={0} className={classes.bgPaper}>
                        <Typography className={classes.documentText}>
                            {t("all_projects.all_projects")}
                        </Typography>
                        {/* <Grid container spacing={4}>
                            <Grid item xs={12} md={5} lg={5}>
                                <TextField
                                    id="search"
                                    name="search"
                                    placeholder={t(`renovate.search_all_projects`)}
                                    variant="outlined"
                                    sx={{ backgroundColor: "#fff", borderRadius: "10px" }}
                                    fullWidth
                                    size="small"
                                    //   onChange={(e) => handleSearch(e.target.value)}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <SearchIcon />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} md={3.5} lg={3.5}>
                                <Button
                                    fullWidth
                                    className={classes.addBtn}
                                    startIcon={<AddIcon />}
                                    size="small"
                                    onClick={() => setOpenFileModel(true)}
                                >
                                    &nbsp;&nbsp;{t("renovate.submit_intake_form")}
                                    <Button className={classes.DropBtn} endIcon={<DropDownArrow />} size="small">
                                    </Button>
                                </Button>

                            </Grid>
                            <Grid item xs={2} sx={{
                                width: "6rem", textAlign: "end", marginLeft: "auto",
                            }}>
                                <img src={crane} alt="crane" className={classes.craneImg} />
                            </Grid>
                        </Grid> */}
                    </Paper>
                </Grid>
            </Grid>
            <Grid container sx={{ marginTop: "1rem", height: "calc(100% - 35%)" }}>
                <Grid item xs={12}>
                    <AllProjectsTable
                    // data={designTableData}
                    // GetDocumentsLists={GetDocumentsLists}
                    // projectOptions={projectOptions}
                    // totalCount={totalCount}
                    />
                </Grid>
            </Grid>
            {/* <UploadForm
                open={openFileModel}
                handleClose={handleCloseFileModel}
        
            /> */}
        </>
    )
}

export default memo(AllProjects);

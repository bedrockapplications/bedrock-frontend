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
import detailsMain from "../../Images/detailMain.svg"
// import AllProjectsTable from "./allProjectsTable";
import SubmitBidForm from "./submitBidForm";



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
    backDisplay: {
        color: "white",
        background: "#E5E5EA",
        padding: "45px 30px",
        borderTopLeftRadius: "10px",
        borderTopRightRadius: "10px",
        marginTop: "20px",
        display: "flex"
    },
    textTitle: {
        color: "black",
        fontSize: "32px",
        fontStyle: "normal",
        fontWeight: "700",
    },
    text: {
        color: "black",
        fontSize: "14px",
        fontStyle: "normal",
        fontWeight: "300",
        lineHeight: "181.5%"/* 25.41px */
    },
    btnGroups: {
        display: "flex",
        marginTop: "20px",
        flexWrap: "wrap",
        borderBottomLeftRadius: "10px",
        borderBottomRightRadius: "10px"
    },
    detailButton: {
        borderRadius: "11px",
        background: "#7A7A7A",
        color: "white",
        fontWeight: "700",
        padding: "10px",
        width: "120px",
        textAlign: "center",
    },
    attachedText: {
        color: "black",
        fontSize: "20px",
        fontStyle: "normal",
        fontWeight: "600",
        marginTop: "30px"
    },
    docFile: {
        width: "350px",
        maxWidth: "90%",
        background: "white",
        color: "black",
        border: "1px solid",
        borderRadius: "6px",
        marginTop: "15px",
        justifyContent: "space-between",
        display: "flex",
        paddingLeft: "15px",
        alignItems: "center"
    },
    viewBtn: {
        background: "black",
        color: "white",
        padding: "10px 16px",
        cursor: "pointer",
        borderTopRightRadius: "6px",
        borderBottomRightRadius: "6px"
    },
    darkText: {
        fontWeight: "700"
    },
    normalText: {
        fontSize: "17px",
        color: "black",
        marginTop: "5px"
    },
    btnGroup: {
        display: "flex",
        justifyContent: "center",
        paddingBottom: "30px",
        background: "#E5E5EA",
        marginBottom: "40px"
    },
    btn1: {
        background: "#000000",
        padding: "10px 40px",
        color: "white",
        fontWeight: "600",
        borderRadius: "7px",
        cursor: "pointer"
    },
    btn2: {
        padding: "10px 60px",
        border: "1px solid black",
        color: "black",
        fontWeight: "600",
        borderRadius: "7px",
        cursor: "pointer"
    }
}));




const ProjectDetail = () => {
    const classes = useStyle();
    const { t } = useTranslation();
    const [openFileModel, setOpenFileModel] = useState(false);

    const handleCloseFileModel = () => {
        setOpenFileModel(false);
    };

    const detailArray = ["Interior", "Painting", "Electrical"]
    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Paper elevation={0} className={classes.bgPaper}>
                        <Typography className={classes.documentText}>
                            {t("project_name")}
                        </Typography>
                    </Paper>
                </Grid>
            </Grid>
            <div className={classes.backDisplay}>
                <Grid container spacing={0}>
                    <Grid item xs={12} md={8} lg={6}>
                        <img src={detailsMain} alt="main-img" />
                    </Grid>
                    <Grid item xs={12} md={4} lg={6}>
                        <h2 className={classes.textTitle}>Project Name</h2>
                        <br />
                        <p className={classes.text}>The project involves the distribution of 50,000 solar cookers to rural households in Zhenping County, Henan Province. The majority of the rural households in Zhenping use coal-fired stoves for water boiling and cooking. Using coal-fired stoves not only leads to significant greenhouse gas emissions but also air pollution which represents a high risk for the health of the residents. In addition, the use of coal-fired stoves needs families to spend money on purchasing coal.</p>
                        <div className={classes.btnGroups}>
                            {detailArray?.map((item, i) => (
                                <>
                                    <p className={classes.detailButton}>{item}</p>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                </>
                            ))}
                        </div>
                        <p className={classes.attachedText}>Attached Documents : </p>
                        <div className={classes.docFile}>
                            <p>Blue Print Of Home.PDF</p>
                            <p className={classes.viewBtn}>View</p>
                        </div>
                        <div className={classes.docFile}>
                            <p>Agreement.PDF</p>
                            <p className={classes.viewBtn}>View</p>
                        </div>
                        <br />
                        <p className={classes.normalText}><span className={classes.darkText}>Project Start Date :</span> 20-08-2023</p>
                        <p className={classes.normalText}><span className={classes.darkText}>Project End Date :</span> 26-08-2023</p>
                    </Grid>
                </Grid>
            </div>
            <div className={classes.btnGroup}>
                <p className={classes.btn1} onClick={() => setOpenFileModel(true)}
                >Apply to Bid</p>
                &nbsp; &nbsp; &nbsp;
                <p className={classes.btn2}>Deny</p>
            </div>
            <SubmitBidForm
                open={openFileModel}
                handleClose={handleCloseFileModel}
            // GetDocumentsLists={GetDocumentsLists}
            // projectOptions={projectOptions}
            // categoryType={categoryType}
            // GetSearchOptions={GetSearchOptions}
            />
        </>
    )
}

export default memo(ProjectDetail);

import React, { useContext, useState } from "react";
import MuiDialog from "../../components/MuiDialog";
import {
    Grid,
    DialogContent,
    Divider,
    Button,
    Typography,
    Box,
    Checkbox
} from "@mui/material";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import MuiSelectField from "../../components/Formik/MuiSelectField";
import FileUpload from "../../components/Drag&DropUpload";
import { submitBid } from "../../services/request";
import { GlobalState } from "../../Context/Context";
import { ShowSnackbar } from "../../components/Snackbar";
import MuiTextField from "../../components/Formik/MuiTextField";
import MUIDataTable from "mui-datatables";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from 'dayjs';
import MuiDatePicker from "../../components/Formik/MuiDatePicker";
import { makeStyles } from "@mui/styles";
import successCheck from "../../Images/successCheck.svg"


const validationSchema = Yup.object().shape({
    projectId: Yup.string().required().nullable(),
});

const categoryList = ["DesignDocuments", "Photos", "Submittals"];

const useStyle = makeStyles(() => ({
    formStyle: {
        padding: "20px",
        marginBottom: "20px"
    },
    formTitle: {
        color: "black",
        fontSize: "20px",
        fontWeight: "600",
        marginBottom: "10px"
    },
    formDesc: {
        color: "black",
        fontSize: "14px",
        fontWeight: "300",
        lineHeight: "181.5%"
    },
    serviceTitle: {
        color: "black",
        fontSize: "17px",
        fontWeight: "600",
        marginTop: "10px"
    },
    btnGroups: {
        display: "flex",
        marginTop: "20px",
        flexWrap: "wrap",
        borderBottomLeftRadius: "10px",
        borderBottomRightRadius: "10px"
    },
    detailButton: {
        borderRadius: "7px",
        background: "#7A7A7A",
        color: "white",
        fontWeight: "700",
        padding: "10px",
        width: "80px",
        textAlign: "center",
        fontSize: "12px",
        cursor: "pointer"
    },
    activeBtn: {
        background: "Black"
    },
    area: {
        borderRadius: "10px",
        border: "1px solid #ACAAAA"
    },
    btn1: {
        background: "#000000",
        padding: "10px 25px",
        color: "white",
        fontWeight: "600",
        borderRadius: "7px",
        cursor: "pointer",
        float: "right",
        width: "100px",
        textAlign: "center"
    },
    btn2: {
        background: "white",
        padding: "10px 25px",
        color: "black",
        border: "1px solid",
        fontWeight: "600",
        borderRadius: "7px",
        cursor: "pointer",
        float: "left",
        width: "100px",
        textAlign: "center"
    },
    curBtn: {
        width: "175px",
    },
    formTerms: {
        fontWeight: "400",
        fontSize: "13px",
        paddingLeft: "10px"
    },
    successBox: {
        height: "500px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        marginTop: "-50px"
    },
    imgTexts: {
        display: "flex",
        flexWrap: "wrap",
        width: "96%",
        margin: "auto",
    },
    imgName: {
        margin: "20px 10px 0px 10px",
        display: "flex",
        justifyContent: "space-between",
        width: "44%",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
        border: "1px solid rgba(1, 167, 104, 1)",
        borderRadius: "5px",
        padding: "5px 15px",
    },
}));


const SubmitBidForm = (props) => {
    const classes = useStyle();
    const {
        open,
        handleClose,
        GetDocumentsLists,
        projectOptions,
        categoryType,
        GetSearchOptions,
        step,
        setStep,
        projectData
    } = props;
    const { page, rowsPerPage, setIsLoading } = useContext(GlobalState);
    const [selectedItem, setSelectedItem] = useState([])
    const [commentData, setCommentData] = useState("")

    const userId = localStorage.getItem("userId");

    const clickedItem = (value) => {
        if (selectedItem.includes(value)) {
            const newArray = selectedItem.filter(item => item !== value);
            setSelectedItem(newArray)
        } else {
            setSelectedItem([...selectedItem, value])
        }
    }

    const handleSave = (data, setSubmitting, resetForm) => {
        console.log(data?.documents, "abcdef")
        let body = {
            projectId: projectData?._id,
            servicesProvided: selectedItem,
            comment: commentData,
            amount: data.amount,
            currency: data.currencySymbol,
            documentLink: "",
            startDate:data.proposedStartDate,
            endDate:data.proposedEndDate
        }
        console.log(body, "bodyyy")
        // setIsLoading(true);
        // setSubmitting(true);
        let formData = new FormData();
        formData.append("projectId", body.projectId);
        formData.append("servicesProvided", body.servicesProvided);
        formData.append("comment", body.comment);
        formData.append("amount", body.amount);
        formData.append("currency", body.currency);
        formData.append("startDate", body.startDate);
        formData.append("endDate", body.endDate);
        data?.documents?.forEach((doc) => {
            formData.append("documentLink", doc);
        });
        submitBid(formData)
            .then((res) => {
                if (res.status === 200) {
                    // GetSearchOptions(data?.categoryType);
                    // GetDocumentsLists(page, rowsPerPage);
                    if (res.data.status) {
                        setStep("success");
                        resetForm();
                    } else {
                        ShowSnackbar("error", res?.data?.message);
                    }
                    // handleClose();
                    setIsLoading(false);
                    // ShowSnackbar("success", res?.data);
                }
            })
            .catch((error) => {
                console.log("error", error);
                setSubmitting(false);
                setIsLoading(false);
            });
    };
    const detailArray = projectData?.serviceNeeded
    const currencyList = ["CAD", "USD", "INR"];


    const ConditionalData = (values) => {
        switch (step) {
            case "success":
                return <div className={classes.successBox}>
                    <img src={successCheck} alt="success" width="100px" />
                    <br />
                    <p className={classes.formTitle}>Bid Submitted Successfully Wait for the Approval.</p>
                </div>
            case "form1":
                return <div className={classes.formStyle}>
                    <p className={classes.formTitle}>Upload document (if any)</p>

                    <Grid item xs={12} >
                        <FileUpload
                            id="documents"
                            name="documents"
                            maxFiles={3}
                            multiple={true}
                        />
                        <Typography
                            variant="h6"
                            fontWeight="bold"
                            sx={{ padding: "10px 0px" }}
                        >
                            Uploaded Files: (MAX 3 files can be uploaded)
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Box className={classes.imgTexts}>
                            {values?.documents?.map((file, i) => (
                                <Typography
                                    key={file + i}
                                    className={classes.imgName}
                                >{`${i + 1}. ${file.name.substr(0, 16)}`}
                                </Typography>
                            ))}
                        </Box>
                    </Grid>
                    <br />
                    <p className={classes.formTitle}>Estimation for the service that you provide*</p>
                    <Grid container spacing={1}>
                        <Grid item xs={4}>
                            <div className={classes.curBtn}>
                                <MuiSelectField
                                    name="currencySymbol"
                                    id="currencySymbol"
                                    label="Select Currency"
                                    options={currencyList}
                                />
                            </div>
                        </Grid>
                        <Grid item xs={5}>
                            <div className={classes.curBtn}>
                                <MuiTextField
                                    name="amount"
                                    id="amount"
                                    label="Enter Amount"
                                />
                            </div>
                        </Grid>
                    </Grid>

                    <br />
                    <p className={classes.formTitle}>Terms & Conditions*</p>
                    <Checkbox defaultChecked /><span className={classes.formTitle}>By Checking this means to agree to these terms:</span> <br />
                    <p className={classes.formTerms}>Bid on project as per specs, No bid time extension, Bid amount final, Daily work updates, Stick to project scope, Timely delivery crucial, Keep info confidential, IP rights transfer on completion, Termination rights, Governed by [Applicable Jurisdiction] law.</p>
                    <br />
                    <br />
                    <span className={classes.btn2} onClick={() => setStep("default")}>Back</span>
                    <Grid item xs={6} sx={{ textAlign: "right" }}>
                        <Button
                            variant="contained"
                            style={{ width: "150px" }}
                            className={classes.btn1}
                            type="submit"
                        >
                            Submit Bid
                        </Button>
                    </Grid>
                    <br />
                </div >
            default:
                return <div className={classes.formStyle}>
                    <p className={classes.formTitle}>{projectData?.projectName}</p>
                    <p className={classes.formDesc}>The project involves the distribution of 50,000 solar cookers to rural households in Zhenping County, Henan Province. The majority of the rural households in Zhenping use coal-fired stoves for water boiling and cooking.........</p>
                    <p className={classes.serviceTitle}>Select the Services that you can provide*</p>
                    <div className={classes.btnGroups}>
                        {detailArray?.map((item, i) => {
                            return (

                                <>
                                    <div onClick={() => clickedItem(item)}>
                                        <p style={{ background: selectedItem.includes(item) ? "black" : "#7A7A7A" }} className={classes.detailButton}>{item}</p>
                                    </div>
                                    &nbsp;&nbsp;
                                </>
                            )
                        })}
                    </div>
                    <br />
                    <textarea value={commentData} onChange={(e) => setCommentData(e.target.value)} className={classes.area} rows="7" cols="70"></textarea>
                    <br />
                    <br />
                    <p className={classes.formTitle}>Proposed Date for Whole Project</p>
                    <div className={classes.datesPara}>

                        <Grid container spacing={3}>
                            <Grid item xs={5}>
                                <MuiDatePicker
                                    name="proposedStartDate"
                                    id="proposedStartDate"
                                    label={"Proposed Start Date"}
                                    // disablePast
                                    disabled
                                    value={values?.proposedStartDate}
                                />
                            </Grid>
                            <Grid item xs={1}>
                                <p>-</p>
                            </Grid>
                            <Grid item xs={5}>
                                <MuiDatePicker
                                    name="proposedEndDate"
                                    id="proposedEndDate"
                                    label="Proposed End Date"
                                    // disablePast
                                    disabled
                                    // minDate={values?.proposedStartDate}
                                    value={values?.proposedEndDate}
                                />
                            </Grid>
                        </Grid>


                    </div>
                    <br />
                    <p className={classes.formTitle}>Time Availability*</p>
                    <div className={classes.datesPara}>

                        <Grid container spacing={3}>
                            <Grid item xs={5}>
                                <MuiDatePicker
                                    name="startDate"
                                    id="startDate"
                                    label={"Proposed Start Date"}
                                    disablePast
                                    value={values?.startDate}
                                />
                            </Grid>
                            <Grid item xs={1}>
                                <p>-</p>
                            </Grid>
                            <Grid item xs={5}>
                                <MuiDatePicker
                                    name="endDate"
                                    id="endDate"
                                    label="Proposed End Date"
                                    disablePast
                                    disabled={values?.startDate === null}
                                    minDate={values?.startDate}
                                    value={values?.endDate}
                                />
                            </Grid>
                        </Grid>
                    </div>
                    <br />
                    <br />
                    <p className={classes.btn1} onClick={() => setStep("form1")}>Next</p>
                    <br />
                </div>
        }
    }


    return (
        <>
            <MuiDialog
                open={open}
                handleClose={handleClose}
                id={"newFile"}
                title="Apply For Bid"
                maxWidth="sm"
            >
                <Formik
                    initialValues={{
                        proposedStartDate: projectData?.startDate, proposedEndDate: projectData?.endDate,
                        startDate: null, endDate: null, amount: "",
                        currencySymbol: "CAD",
                        documents: null
                    }}
                    enableReinitialize
                    onSubmit={(values, { setSubmitting, resetForm }) => {
                        handleSave(values, setSubmitting, resetForm);
                    }}
                >
                    {({ values, isSubmitting, isValid, setFieldValue }) => (
                        <Form>
                            {ConditionalData(values)}
                        </Form>
                    )}
                </Formik>
            </MuiDialog>
        </>
    );
};

export default SubmitBidForm;

import React, { useContext, useState } from "react";
import MuiDialog from "../../components/MuiDialog";
import {
    Grid,
    DialogContent,
    Divider,
    Button,
    Typography,
    Box,
} from "@mui/material";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import MuiSelectField from "../../components/Formik/MuiSelectField";
import FileUpload from "../../components/Drag&DropUpload";
import { uploadDocumentApi } from "../../services/request";
import { GlobalState } from "../../Context/Context";
import { ShowSnackbar } from "../../components/Snackbar";
import MuiTextField from "../../components/Formik/MuiTextField";
import MUIDataTable from "mui-datatables";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from 'dayjs';
import MuiDatePicker from "../../components/Formik/MuiDatePicker";
import { makeStyles } from "@mui/styles";

const validationSchema = Yup.object().shape({
    projectId: Yup.string().required().nullable(),
});

const categoryList = ["DesignDocuments", "Photos", "Submittals"];

const useStyle = makeStyles(() => ({
    formStyle: {
        padding: "20px"
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
    }
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
    } = props;
    const { page, rowsPerPage, setIsLoading } = useContext(GlobalState);
    const [selectedItem, setSelectedItem] = useState("Interior")

    const userId = localStorage.getItem("userId");

    const handleSave = (data, setSubmitting, resetForm) => {
        setIsLoading(true);
        setSubmitting(true);
        let formData = new FormData();
        formData.append("projectId", data.projectId);
        formData.append("categoryType", data.categoryType);
        formData.append("userId", userId);
        data?.docs?.forEach((doc) => {
            formData.append("docs", doc);
        });
        uploadDocumentApi(formData)
            .then((res) => {
                if (res.status === 200) {
                    GetSearchOptions(data?.categoryType);
                    GetDocumentsLists(page, rowsPerPage);
                    setSubmitting(false);
                    resetForm();
                    handleClose();
                    setIsLoading(false);
                    ShowSnackbar("success", res?.data);
                }
            })
            .catch((error) => {
                console.log("error", error);
                setSubmitting(false);
                setIsLoading(false);
            });
    };
    const detailArray = ["Interior", "Painting", "Electrical"]


    return (
        <>
            <MuiDialog
                open={open}
                handleClose={handleClose}
                id={"newFile"}
                title="Apply For Bid"
                maxWidth="sm"
            >
                <div className={classes.formStyle}>
                    <p className={classes.formTitle}>Project Name</p>
                    <p className={classes.formDesc}>The project involves the distribution of 50,000 solar cookers to rural households in Zhenping County, Henan Province. The majority of the rural households in Zhenping use coal-fired stoves for water boiling and cooking.........</p>
                    <p className={classes.serviceTitle}>Select the Services that you can provide*</p>
                    <div className={classes.btnGroups}>
                        {detailArray?.map((item, i) => (
                            <>
                                <div onClick={() => setSelectedItem(item)}>
                                    <p style={{ background: item === selectedItem ? "black" : "#7A7A7A" }} className={classes.detailButton}>{item}</p>
                                </div>
                                &nbsp;&nbsp;
                            </>
                        ))}
                    </div>
                    <br />
                    <textarea className={classes.area} rows="7" cols="70"></textarea>
                    <br />
                    <p className={classes.formTitle}>Proposed Date for Whole Project</p>
                    <div className={classes.datesPara}>
                        <Formik
                            initialValues={{ projectId: "", categoryType: "", docs: null, startDate: null, endDate: null }}
                            enableReinitialize
                            validationSchema={validationSchema}
                        // onSubmit={(values, { setSubmitting, resetForm }) => {
                        //   handleSave(values, setSubmitting, resetForm);
                        // }}
                        >
                            {({ values, isSubmitting, isValid, setFieldValue }) => (
                                <Form>
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
                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>
            </MuiDialog>
        </>
    );
};

export default SubmitBidForm;

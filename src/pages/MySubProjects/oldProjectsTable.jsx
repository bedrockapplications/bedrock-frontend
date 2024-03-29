import React, { useState, useContext, useEffect } from "react";
// import DocumentTable from "../../components/MuiTable";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import EmailIcon from "@mui/icons-material/Email";
import DeleteIcon from "@mui/icons-material/Delete";
import moment from "moment";
// import DeleteDocument from "./DeleteDocument";
import { deleteDocumentApi, getMyProjects } from "../../services/request";
// import EditUploadFiles from "./EditUploadeFiles";
import { GlobalState } from "../../Context/Context";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TablePagination from "@mui/material/TablePagination";
import { makeStyles } from "@mui/styles";
import SortingTableHeader from "./SortingTableHeaders";
import { getComparator, stableSort } from "./SortingTableHeaders";
// import SubmittalsDialog from "./SubmittlasModel";
import PremiumDailog from "../../components/premiumDailog";
import EmptyTableBody from "../../components/EmptyTableBody";

const useStyle = makeStyles(() => ({
    headerText: {
        backgroundColor: "#3A3A3C",
        color: "#fff",
        textAlign: "left",
    },
}));

const headCells = [
    {
        id: "project_name",
        numeric: false,
        disablePadding: true,
        label: "project_name",
    },
    {
        id: "type",
        numeric: false,
        disablePadding: false,
        label: "type",
    },
    {
        id: "location",
        numeric: false,
        disablePadding: false,
        label: "location",
    },
    {
        id: "project_manager",
        numeric: false,
        disablePadding: false,
        label: "project_manager",
    },
    {
        id: "status",
        numeric: false,
        disablePadding: false,
        label: "status",
    },
    {
        id: "actions",
        numeric: false,
        disablePadding: false,
        label: "actions",
    },
];

const OldProjectsTable = (props) => {
    const classes = useStyle();

    const { data, GetDocumentsLists, projectOptions, totalCount, status } = props;
    const {
        page,
        setPage,
        rowsPerPage,
        setRowsPerPage,
        selectedProjected,
        setSelectedProjected,
        search,
        setSearch,
        popen,
        setPopen,
    } = useContext(GlobalState);

    // console.log(status)

    const [deleteOpen, setDeleteOpen] = useState(false);
    const [deleteItem, setDeleteItem] = useState({});
    const [editOpen, setEditOpen] = useState(false);
    const [editData, setEditData] = useState({});
    const [dense, setDense] = React.useState(false);
    const [order, setOrder] = React.useState("asc");
    const [orderBy, setOrderBy] = React.useState("");
    const [openSubmittals, setOpenSubmittals] = useState(false);
    const [submittalsData, setSubmittalsData] = useState(null);
    const [myProjectsData, setMyProjectsData] = useState([])

    let mysubprojects = [
        {
            project_name: "Project 1",
            type: "Renovate Ai",
            location: "Tampa, Fi",
            project_manager: "Jim Willis",
            status: "Initial Estimation",
        },
        {
            project_name: "Project 1",
            type: "Renovate Ai",
            location: "Tampa, Fi",
            project_manager: "Jim Willis",
            status: "Initial Estimation",
        }
    ]


    useEffect(() => {
        const allProjects = async () => {
            const allProjectsData = await getMyProjects(status);
            console.log(allProjectsData.data.data)
            if (allProjectsData.status === 200) {
                if (allProjectsData.data.data.length > 0) {
                    console.log(allProjectsData.data.data)
                    setMyProjectsData(allProjectsData.data.data)
                } else {
                    setMyProjectsData([])
                }
            }
        };
        allProjects();
    }, [])

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === "asc";
        setOrder(isAsc ? "desc" : "asc");
        setOrderBy(property);
    };

    const handleEditOpen = (item) => {
        const data = {
            projectId: item?.projectId?._id,
            categoryType: item?.categoryType,
            fileName: item?.fileName,
            id: item._id,
        };
        setEditData(data);
        setEditOpen(true);
    };

    // const handleEditClose = () => {
    //     setEditData({});
    //     setEditOpen(false);
    // };

    const handleOpenDelete = (item) => {
        setDeleteItem(item._id);
        setDeleteOpen(true);
    };

    // const handleCloseDelete = () => {
    //     setDeleteOpen(false);
    // };

    // const handleDeleteDocument = () => {
    //     deleteDocumentApi(deleteItem)
    //         .then((res) => {
    //             if (res.status === 200) {
    //                 GetDocumentsLists();
    //                 setDeleteOpen(false);
    //             }
    //         })
    //         .catch((error) => {
    //             console.log("error", error);
    //         });
    // };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
        GetDocumentsLists(newPage, rowsPerPage, selectedProjected, search);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value));
        setPage(0);
        GetDocumentsLists(0, event.target.value, selectedProjected, search);
    };

    // const handleCloseSubmittals = () => {
    //     setOpenSubmittals(false);
    // };

    const handleOpenSubmittals = (item) => {
        setSubmittalsData(item);
        setOpenSubmittals(true);
        setPopen(true);
    };

    return (
        <>
            <Paper sx={{ width: "100%", border: "3px solid #3A3A3C" }}>
                <TableContainer
                    sx={{
                        height: mysubprojects?.length > 0 ? 320 : 370,
                        maxHeight: mysubprojects?.length > 0 ? 320 : 370,
                        position: "relative",
                    }}
                >
                    <Table stickyHeader aria-label="simple table">
                        <SortingTableHeader
                            headCells={headCells}
                            order={order}
                            orderBy={orderBy}
                            onRequestSort={handleRequestSort}
                            rowCount={myProjectsData.length}
                        //   rowCount={data.length}
                        />
                        {myProjectsData?.length > 0 ? (
                            <TableBody>
                                {stableSort(myProjectsData, getComparator(order, orderBy))?.map(
                                    (item, i) => (
                                        <TableRow key={item._id}>
                                            <TableCell align="right">
                                                {item?.projectId?.projectName}
                                            </TableCell>
                                            <TableCell align="right">
                                                {item?.projectId?.projectType}
                                            </TableCell>
                                            <TableCell align="right">
                                                {item?.projectId?.state},{item?.projectId?.country}
                                            </TableCell>
                                            <TableCell align="right">
                                                {item?.projectId?.clientPhNumber}
                                            </TableCell>
                                            <TableCell align="right">
                                                {/* {moment(item?.updatedAt).format("DD-MM-YYYY")} */}
                                                {item.status}
                                            </TableCell>
                                            <TableCell align="right">
                                                <IconButton
                                                    size="small"
                                                    color="primary"
                                                // onClick={() => handleOpenDownload(item)}
                                                >
                                                    <RemoveRedEyeIcon fontSize="small" />
                                                </IconButton>
                                                <IconButton
                                                    size="small"
                                                    color="primary"
                                                    onClick={() => handleEditOpen(item)}
                                                >
                                                    <EditIcon fontSize="small" />
                                                </IconButton>
                                                <IconButton
                                                    size="small"
                                                    color="primary"
                                                    onClick={() => handleOpenSubmittals(item)}
                                                >
                                                    <EmailIcon fontSize="small" />
                                                </IconButton>
                                                <IconButton
                                                    size="small"
                                                    color="primary"
                                                    onClick={() => handleOpenDelete(item)}
                                                >
                                                    <DeleteIcon fontSize="small" />
                                                </IconButton>
                                            </TableCell>
                                            {/* <TableCell align="right">
                                                {item?.projectId?.projectName}
                                            </TableCell>' */}
                                        </TableRow>
                                    )
                                )}
                            </TableBody>
                        ) : (
                            <EmptyTableBody />
                        )}
                    </Table>
                </TableContainer>
                {mysubprojects?.length > 0 && (
                    <TablePagination
                        rowsPerPageOptions={[10, 25, 50, 100]}
                        component="div"
                        count={mysubprojects.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                )}
            </Paper>

            {/* <DeleteDocument
        open={deleteOpen}
        handleClose={handleCloseDelete}
        deleteItemData={deleteItem}
        handleDeleteDocument={handleDeleteDocument}
      /> */}
            {/* <EditUploadFiles
        open={editOpen}
        handleClose={handleEditClose}
        data={editData}
        projectOptions={projectOptions}
        GetDocumentsLists={GetDocumentsLists}
      /> */}
            {/* <SubmittalsDialog
        data={submittalsData}
        open={openSubmittals}
        handleCloseSubmittals={handleCloseSubmittals}
      /> */}
            <>{popen ? <PremiumDailog /> : ""}</>
        </>
    );
};

export default OldProjectsTable;


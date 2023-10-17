import React, { useState, useContext, useEffect } from "react";
// import DocumentTable from "../../components/MuiTable";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import EmailIcon from "@mui/icons-material/Email";
import DeleteIcon from "@mui/icons-material/Delete";
import moment from "moment";
// import DeleteDocument from "./DeleteDocument";
import { deleteDocumentApi } from "../../services/request";
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
import { Button } from "@mui/material";
import { styled } from '@mui/material/styles';
import { purple, grey } from '@mui/material/colors';
import { getAllProjects } from '../../services/request'

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

const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(grey[900]),
    padding: '6px 12px',
    textTransform: "initial",
    backgroundColor: grey[900],
    '&:hover': {
        backgroundColor: grey[900],
    },
}));

const AllProjectsTable = (props) => {
    const classes = useStyle();

    const { GetDocumentsLists } = props;
    const {
        page,
        setPage,
        rowsPerPage,
        setRowsPerPage,
        selectedProjected,
        search,
        popen,
        setProjectId
    } = useContext(GlobalState);

    const [order, setOrder] = React.useState("asc");
    const [orderBy, setOrderBy] = React.useState("");
    const [allProjects, setAllProjects] = useState([])

    let mysubprojects = [
        {
            _id: 1,
            project_name: "Project 1",
            type: "Renovate Ai",
            location: "Tampa, Fi",
            project_manager: "Jim Willis",
            status: "Initial Estimation",
        },
        {
            _id: 2,
            project_name: "Project 1",
            type: "Renovate Ai",
            location: "Tampa, Fi",
            project_manager: "Jim Willis",
            status: "Initial Estimation",
        }
    ]

    useEffect(() => {
        const allProjects = async () => {
            const allProjectsData = await getAllProjects();
            // console.log(allProjectsData.data.data.length)
            if (allProjectsData.status === 200) {
                if (allProjectsData.data.data.length > 0) {
                    setAllProjects(allProjectsData.data.data)
                } else {
                    setAllProjects([])
                }
            }
        };
        allProjects();
    }, []);

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === "asc";
        setOrder(isAsc ? "desc" : "asc");
        setOrderBy(property);
    };


    const handleChangePage = (event, newPage) => {
        setPage(newPage);
        GetDocumentsLists(newPage, rowsPerPage, selectedProjected, search);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value));
        setPage(0);
        GetDocumentsLists(0, event.target.value, selectedProjected, search);
    };

    return (
        <>
            <Paper sx={{ width: "100%", border: "3px solid #3A3A3C" }}>
                <TableContainer
                    sx={{
                        height: allProjects?.length > 0 ? 600 : 370,
                        maxHeight: allProjects?.length > 0 ? 600 : 370,
                        position: "relative",
                    }}
                >
                    <Table stickyHeader aria-label="simple table">
                        <SortingTableHeader
                            headCells={headCells}
                            order={order}
                            orderBy={orderBy}
                            onRequestSort={handleRequestSort}
                            rowCount={allProjects.length}
                        //   rowCount={data.length}
                        />
                        {allProjects.length > 0 ? (
                            <TableBody>
                                {stableSort(allProjects, getComparator(order, orderBy))?.map(
                                    (item, i) => (
                                        <TableRow key={item._id}>
                                            <TableCell align="right">
                                                {item.projectName}
                                            </TableCell>
                                            <TableCell align="right">
                                                {item?.projectType}
                                            </TableCell>
                                            <TableCell align="right">
                                                {item.state} , {item.country}
                                            </TableCell>
                                            <TableCell align="right">
                                                {item.clientPhNumber}
                                            </TableCell>
                                            <TableCell align="right">
                                                {/* {moment(item?.updatedAt).format("DD-MM-YYYY")} */}
                                                {item.status}
                                            </TableCell>
                                            <TableCell align="right">
                                                <ColorButton onClick={() => {
                                                    setProjectId(item._id)
                                                    window.open(`/projectDetail/${item._id}`)
                                                }}>View Details</ColorButton>
                                                {/* <IconButton
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
                                                </IconButton> */}
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
                {allProjects?.length > 0 && (
                    <TablePagination
                        rowsPerPageOptions={[10, 25, 50, 100]}
                        component="div"
                        count={allProjects.length}
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

export default AllProjectsTable;


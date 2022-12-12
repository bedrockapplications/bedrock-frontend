import React, { useState, useContext, useEffect } from "react";
import DocumentTable from "../../components/MuiTable";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import EmailIcon from "@mui/icons-material/Email";
import DeleteIcon from "@mui/icons-material/Delete";
import moment from "moment";
import DeleteDocument from "./DeleteDocument";
import { deleteDocumentApi } from "../../services/request";
import EditUploadFiles from "./EditUploadeFiles";
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
import SubmittalsDialog from "./SubmittlasModel";
import PremiumDailog from "../../components/premiumDailog";

const useStyle = makeStyles(() => ({
  headerText: {
    backgroundColor: "#3A3A3C",
    color: "#fff",
    textAlign: "left",
  },
}));

const headCells = [
  {
    id: "fileName",
    numeric: false,
    disablePadding: true,
    label: "fileName",
  },
  {
    id: "contentType",
    numeric: false,
    disablePadding: false,
    label: "type",
  },
  {
    id: "projectId",
    numeric: false,
    disablePadding: false,
    label: "projectName",
  },
  {
    id: "updatedAt",
    numeric: false,
    disablePadding: false,
    label: "uploadDate",
  },
  {
    id: "actions",
    numeric: false,
    disablePadding: false,
    label: "actions",
  },
];

const DesignDocumentTable = (props) => {
  const classes = useStyle();

  const { data, GetDocumentsLists, projectOptions, totalCount } = props;
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

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteItem, setDeleteItem] = useState({});
  const [editOpen, setEditOpen] = useState(false);
  const [editData, setEditData] = useState({});
  const [dense, setDense] = React.useState(false);
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("");
  const [openSubmittals, setOpenSubmittals] = useState(false);
  const [submittalsData, setSubmittalsData] = useState(null);

  // useEffect(() =>{
  //   console.log(popen, "kkkkk")
  // }, [])

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

  const handleEditClose = () => {
    setEditData({});
    setEditOpen(false);
  };

  const handleOpenDelete = (item) => {
    setDeleteItem(item._id);
    setDeleteOpen(true);
  };

  const handleCloseDelete = () => {
    setDeleteOpen(false);
  };

  const handleDeleteDocument = () => {
    deleteDocumentApi(deleteItem)
      .then((res) => {
        if (res.status === 200) {
          GetDocumentsLists();
          setDeleteOpen(false);
        }
      })
      .catch((error) => {
        console.log("error", error);
      });
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

  const handleCloseSubmittals = () => {
    setOpenSubmittals(false);
  };

  const handleOpenSubmittals = (item) => {
    setSubmittalsData(item);
    setOpenSubmittals(true);
    setPopen(true);
  };

  return (
    <>
      <Paper sx={{ width: "100%", border: "3px solid #3A3A3C" }}>
        <TableContainer sx={{ height: 320, maxHeight: 320 }}>
          <Table stickyHeader aria-label="simple table">
            <SortingTableHeader
              headCells={headCells}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={data.length}
            />

            <TableBody>
              {stableSort(data, getComparator(order, orderBy))?.map(
                (item, i) => (
                  <TableRow key={item._id}>
                    <TableCell align="right">{item?.fileName}</TableCell>
                    <TableCell align="right">{item?.contentType}</TableCell>
                    <TableCell align="right">
                      {item?.projectId?.projectName}
                    </TableCell>
                    <TableCell align="right">
                      {moment(item?.updatedAt).format("DD-MM-YYYY")}
                    </TableCell>
                    <TableCell align="right">
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
                  </TableRow>
                )
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 50, 100]}
          component="div"
          count={totalCount}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

      <DeleteDocument
        open={deleteOpen}
        handleClose={handleCloseDelete}
        deleteItemData={deleteItem}
        handleDeleteDocument={handleDeleteDocument}
      />
      <EditUploadFiles
        open={editOpen}
        handleClose={handleEditClose}
        data={editData}
        projectOptions={projectOptions}
        GetDocumentsLists={GetDocumentsLists}
      />
      {/* <SubmittalsDialog
        data={submittalsData}
        open={openSubmittals}
        handleCloseSubmittals={handleCloseSubmittals}
      /> */}
      <>
        { popen ?
        <PremiumDailog />
        :""
        }
      </>
    </>
  );
};

export default DesignDocumentTable;

{
  /* <TableHead>
              <TableRow>
                <TableCell className={classes.headerText}>File Name</TableCell>
                <TableCell className={classes.headerText}>Type</TableCell>
                <TableCell className={classes.headerText}>
                  Project Name
                </TableCell>
                <TableCell className={classes.headerText}>
                  Upload Date
                </TableCell>
                <TableCell className={classes.headerText}>Actions</TableCell>
              </TableRow>
            </TableHead> */
}

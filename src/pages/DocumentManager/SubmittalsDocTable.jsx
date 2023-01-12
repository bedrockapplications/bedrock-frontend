import React, { useState, useContext } from "react";
import SubmittalsTable from "../../components/MuiTable";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import EmailIcon from "@mui/icons-material/Email";
import DeleteIcon from "@mui/icons-material/Delete";
import moment from "moment";
import { deleteDocumentApi } from "../../services/request";
import DeleteDocument from "./DeleteDocument";
import EditUploadFiles from "./EditUploadeFiles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TablePagination from "@mui/material/TablePagination";
import { makeStyles } from "@mui/styles";
import { GlobalState } from "../../Context/Context";
import SortingTableHeader from "./SortingTableHeaders";
import { getComparator, stableSort } from "./SortingTableHeaders";
import SubmittalsDialog from "./SubmittlasModel";
import PremiumDailog from "../../components/premiumDailog";
import EmptyTableBody from "../../components/EmptyTableBody";

const useStyle = makeStyles(() => ({
  headerText: {
    backgroundColor: "#3A3A3C",
    color: "#fff",
    textAlign: "left",
  },
}));

let disableFilter = {
  filter: false,
  sort: false,
};

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

const SubmittalsDocTable = (props) => {
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
    popen,
    setPopen,
  } = useContext(GlobalState);

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteItem, setDeleteItem] = useState({});
  const [editOpen, setEditOpen] = useState(false);
  const [editData, setEditData] = useState({});
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("");
  const [openSubmittals, setOpenSubmittals] = useState(false);
  const [submittalsData, setSubmittalsData] = useState(null);

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
        <TableContainer
          sx={{
            height: data?.length > 0 ? 320 : 370,
            maxHeight: data?.length > 0 ? 320 : 370,
            position: "relative",
          }}
        >
          <Table stickyHeader aria-label="simple table">
            <SortingTableHeader
              headCells={headCells}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={data.length}
            />
            {data.length > 0 ? (
              <TableBody>
                {stableSort(data, getComparator(order, orderBy))?.map(
                  (item, i) => (
                    <TableRow key={item._id}>
                      <TableCell align="right">
                        <a href={item?.filePath} download={item?.fileName}>
                          {item?.fileName}
                        </a>
                      </TableCell>
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
            ) : (
              <EmptyTableBody />
            )}
          </Table>
        </TableContainer>
        {data?.length > 0 && (
          <TablePagination
            rowsPerPageOptions={[10, 25, 50, 100]}
            component="div"
            count={totalCount}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        )}
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
      <>{popen ? <PremiumDailog /> : ""}</>
    </>
  );
};

export default SubmittalsDocTable;

import React, { useState, useContext } from "react";
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
  } = useContext(GlobalState);

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteItem, setDeleteItem] = useState({});
  const [editOpen, setEditOpen] = useState(false);
  const [editData, setEditData] = useState({});
  const [dense, setDense] = React.useState(false);

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
    GetDocumentsLists(newPage, rowsPerPage, selectedProjected);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value));
    setPage(0);
    GetDocumentsLists(0, event.target.value, selectedProjected);
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

  return (
    <>
      <Paper sx={{ width: "100%", border: "3px solid #3A3A3C" }}>
        <TableContainer sx={{ height: 320, maxHeight: 320 }}>
          <Table stickyHeader aria-label="simple table">
            <TableHead>
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
            </TableHead>
            <TableBody>
              {data?.map((item, i) => (
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
                    <IconButton size="small" color="primary">
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
              ))}
              {/* {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )} */}
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
    </>
  );
};

export default DesignDocumentTable;

{
  /* <DocumentTable columns={columns} data={data} options={options} /> */
}

// const options = {
//   pagination: true,
//   rowsPerPageOptions: [10, 25, 50, 100],
//   serverSide: true,
//   count: totalCount,
//   onChangeRowsPerPage: (numberOfRows) => {
//     setRowsPerPage(numberOfRows);
//     GetDocumentsLists(page, numberOfRows);

//     // setPageSize(numberOfRows);
//     // GetDocumentsLists(pageNo, numberOfRows);
//   },
//   onTableChange: (action, tableState) => {
//     if (action === "changePage") {
//       setPage(tableState?.page);
//       GetDocumentsLists(tableState?.page, rowsPerPage);
//     }
//   },
// };

// const columns = [
//   {
//     name: "fileName",
//     label: "File Name",
//     options: {
//       ...disableFilter,
//       customBodyRender: (value) => (value ? value : "---"),
//     },
//   },
//   {
//     name: "contentType",
//     label: "Type",
//     options: {
//       ...disableFilter,
//       customBodyRender: (value) => (value ? value : `---`),
//     },
//   },
//   {
//     name: "projectId",
//     label: "Type",
//     options: {
//       ...disableFilter,
//       customBodyRender: (value) => (value ? value?.projectName : `---`),
//     },
//   },
//   {
//     name: "updatedAt",
//     label: "Upload Date",
//     width: "40%",
//     options: {
//       ...disableFilter,
//       customBodyRender: (value) =>
//         value ? moment(value).format("DD-MM-YYYY") : `---`,
//     },
//   },
//   {
//     name: "",
//     label: "Actions",
//     options: {
//       ...disableFilter,
//       customBodyRenderLite: (dataIndex, rowIndex) => (
//         <>
//           <IconButton
//             size="small"
//             color="primary"
//             onClick={() => handleEditOpen(data[dataIndex])}
//           >
//             <EditIcon fontSize="small" />
//           </IconButton>
//           <IconButton size="small" color="primary">
//             <EmailIcon fontSize="small" />
//           </IconButton>
//           <IconButton
//             size="small"
//             color="primary"
//             onClick={() => handleOpenDelete(data[dataIndex])}
//           >
//             <DeleteIcon fontSize="small" />
//           </IconButton>
//         </>
//       ),
//     },
//   },
// ];

// const options = {
//   pagination: true,
//   rowsPerPageOptions: [10, 25, 50, 100],
//   serverSide: true,
//   onChangeRowsPerPage: (numberOfRows) => {
//     // setPageSize(numberOfRows);
//     // GetDocumentsLists(pageNo, numberOfRows);
//   },
//   onTableChange: (action, tableState) => {
//     if (action === "changePage") {
//       // setpageNo(tableState?.page);
//       // GetDocumentsLists(tableState?.page, pageSize);
//     }
//   },
// };

{
  /* <DocumentTable columns={columns} data={data} options={options} /> */
}

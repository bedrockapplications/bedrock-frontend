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
  const { page, setPage, rowsPerPage, setRowsPerPage } =
    useContext(GlobalState);

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteItem, setDeleteItem] = useState({});
  const [editOpen, setEditOpen] = useState(false);
  const [editData, setEditData] = useState({});
  const [dense, setDense] = React.useState(false);

  const handleEditOpen = (item, doc) => {
    const data = {
      projectId: item?.projectId?._id,
      categoryType: item?.categoryType,
      mediaId: doc?._id,
      fileName: doc?.fileName,
      mainId: item._id,
    };
    setEditData(data);
    setEditOpen(true);
  };

  const handleEditClose = () => {
    setEditData({});
    setEditOpen(false);
  };

  const handleOpenDelete = (item, doc) => {
    let obj = {
      mediaId: doc._id,
      _id: item._id,
    };
    setDeleteItem(obj);
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
    GetDocumentsLists(newPage, rowsPerPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value));
    setPage(0);
    GetDocumentsLists(0, event.target.value);
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

  return (
    <>
      <Paper sx={{ width: "100%", border: "3px solid #3A3A3C" }}>
        <TableContainer sx={{ maxHeight: 320 }}>
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
              {data.map((item, i) =>
                item.documents.map((doc, j) => (
                  <TableRow key={doc?._id}>
                    <TableCell align="right">{doc?.fileName}</TableCell>
                    <TableCell align="right">{doc.contentType}</TableCell>
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
                        onClick={() => handleEditOpen(item, doc)}
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                      <IconButton size="small" color="primary">
                        <EmailIcon fontSize="small" />
                      </IconButton>
                      <IconButton
                        size="small"
                        color="primary"
                        onClick={() => handleOpenDelete(item, doc)}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              )}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
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

// const columns = [
//   {
//     name: "documents",
//     label: "File Name",
//     options: {
//       ...disableFilter,
//       // setCellProps: () => ({ style: { width: "300px" } }),
//       customBodyRender: (value) =>
//         value ? value?.map((item) => item.fileName) : "---",
//     },
//   },
//   {
//     name: "documents",
//     label: "Type",
//     options: {
//       ...disableFilter,
//       customBodyRender: (value) => (value ? value[0]?.contentType : `---`),
//     },
//   },
//   {
//     name: "updatedAt",
//     label: "Upload Date",
//     width: "40%",
//     options: {
//       ...disableFilter,
//       // setCellProps: () => ({ style: { width: "700px" } }),
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

import React, { memo, useState, useContext } from "react";
import moment from "moment";
import { Button, IconButton, Typography } from "@mui/material";
import { GlobalState } from "../../Context/Context";

import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";

import SortingTableHeader from "../smartSchedule/SortingTableHeaders";
import {
  getComparator,
  stableSort,
} from "../DocumentManager/SortingTableHeaders";

import TableContainer from "@mui/material/TableContainer";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import EmailIcon from "@mui/icons-material/Email";
import DownloadForOfflineOutlinedIcon from "@mui/icons-material/DownloadForOfflineOutlined";
import ShareIcon from "@mui/icons-material/Share";
import MuiDialog from "../../components/MuiDialog";
import DialogContent from "@mui/material/DialogContent";
import cancelImage from "../../Images/cancel.svg";
import { Box } from "@mui/system";
import downloadLog from "../../Images/downloadLog.svg";
import csvicon from "../../Images/csvicon.svg";
import pdficon from "../../Images/pdficon.svg";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import vendor from "../../Images/vendor.png";
import { deleteProjectRow, getManagerProjects } from "../../services/request";
import { ShowSnackbar } from "../../components/Snackbar";


const headCells = [
  {
    id: "clientName",
    numeric: false,
    disablePadding: false,
    label: "Vendor Name",
  },
  {
    id: "projectName",
    numeric: false,
    disablePadding: false,
    label: "project Name",
  },
  {
    id: "projectType",
    numeric: false,
    disablePadding: false,
    label: "Project Type",
  },
  {
    id: "address",
    numeric: false,
    disablePadding: false,
    label: "Address",
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
    label: "Actions",
  },
];

const ProjectDataTable = (props) => {
  const { setOpenMode, openFileModel, setOpenFileModel,  page,
    setPage,
    rowsPerPage,
    setRowsPerPage, setStep, setRowdata,setProjectTableData,setIsLoading} = useContext(GlobalState);
  const { data, totalCount } = props;
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("");
  const [openDeleteModel, setOpenDeleteModel] = useState(false);
  const [deleteItem, setDeleteItem] = useState({})
  const [openDownloadModel, setOpenDownloadModel] = useState(false);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
};

const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value));
    setPage(0);
};

  const handleDeleteLog = () => {
    deleteProjectRow(deleteItem["_id"]).then(res => {
      if(res.status){
        setDeleteItem({})
        setOpenDeleteModel(false);
        handleGetAllProject();
        ShowSnackbar("success", "Record Deleted Successfully!");
      }
    }).catch(err => {
      console.log(err)
    })
    
  };

  const handleGetAllProject = () => {
    setIsLoading(true)
    getManagerProjects().then(res => {
      if(res.data.status){
        setProjectTableData(res.data.data)
        setIsLoading(false)
      }
    }).catch(error => {
      setIsLoading(false)
    })
  }

  const handleCloseDeleteLog = () => {
    setDeleteItem({})
    setOpenDeleteModel(false);
  };

  const handleOpenDownload = (deleteItem) => {
    setOpenDownloadModel(true);
  };

  const handleCloseDownload = () => {
    setOpenDownloadModel(false);
  };
  

  return (
    <>
      <Paper
        sx={{ width: "100%", border: "3px solid #3A3A3C", overflow: "hidden" }}
      >
        <TableContainer
          sx={{
            height: "350px",
            maxHeight: "350px",
            position: "relative",
          }}
        >
          <Table stickyHeader aria-label="simple table" sx={{ minWidth: 750 }}>
            <SortingTableHeader
              headCells={headCells}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={data?.length}
            />
            {data.length > 0 ? (
              <TableBody>
                {stableSort(data, getComparator(order, orderBy))?.map(
                  (item, i) => (
                    <TableRow key={i}>
                      <TableCell >{item?.clientName !== undefined ? item?.clientName : "..."}</TableCell>
                      <TableCell >{item?.projectName}</TableCell>
                      <TableCell >{item?.projectType}</TableCell>
                      <TableCell >{item?.address}</TableCell>
                      <TableCell >
                        {/* <ol>
                          {item?.vendorContacts.map((subItem, i) => (
                            <li key={subItem + i}>{subItem}</li>
                          ))}
                        </ol> */}
                        {/* <IconButton
                          size="small"
                          color="primary"
                          // onClick={() => handleOpenDownload(item)}
                        >
                          <img src={vendor} alt="" style={{width:"80px", height:"30px"}} />
                        </IconButton> */}
                        {item.status}
                      </TableCell>
                      <TableCell>
                      <IconButton
                          size="small"
                          color="primary"
                          onClick={() => {
                            setRowdata(item)
                            setStep(0)
                            setOpenMode("View")
                            setOpenFileModel(true)
                          }}
                        >
                          <RemoveRedEyeIcon fontSize="small" />
                        </IconButton>
                        <IconButton size="small" color="primary" onClick={() => {
                          setRowdata(item)
                          setStep(0)
                          setOpenMode("Edit")
                          setOpenFileModel(true)
                          }}>
                          <EditIcon fontSize="small" />
                        </IconButton>
                        
                        <IconButton size="small" color="primary" disabled>
                          <ShareIcon fontSize="small" />
                        </IconButton>
                        <IconButton
                          size="small"
                          color="primary"
                          onClick={() => {
                            setOpenDeleteModel(true)
                            setDeleteItem(item)
                          }}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  )
                )}
              </TableBody>
            ) : null}
          </Table>
        </TableContainer>
        {data?.length > 0 && (
          <TablePagination
            rowsPerPageOptions={[10, 25, 50, 100]}
            component="div"
            count={ProjectDataTable.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        )}
      </Paper>
      <MuiDialog
        open={openDeleteModel}
        handleClose={handleCloseDeleteLog}
        id={"deletelog"}
        title={""}
        maxWidth={"xs"}
      >
        <DialogContent
          sx={{
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: "1rem",
          }}
        >
          <img src={cancelImage} alt="" />
          <Typography
            sx={{
              width: "280px",
              fontSize: "1rem",
              lineHeight: "24px",
              fontWeight: 700,
              color: "#3A3A3A",
            }}
          >
            Are You Sure, You Want To Delete Selected Record ?
          </Typography>

          <Box sx={{ marginBottom: "2rem" }}>
            <Button
              variant="outlined"
              color="primary"
              size="small"
              sx={{ marginRight: "10px", fontWeight: 700 }}
              onClick={handleCloseDeleteLog}
            >
              Cancel
            </Button>
            <Button
              variant="outlined"
              color="error"
              size="small"
              sx={{ marginLeft: "10px", fontWeight: 700 }}
              onClick={handleDeleteLog}
            >
              Delete
            </Button>
          </Box>
        </DialogContent>
      </MuiDialog>

      {/* <MuiDialog
        open={openDownloadModel}
        handleClose={handleCloseDownload}
        id={"downloadLog"}
        title={""}
        maxWidth={"xs"}
      >
        <DialogContent
          sx={{
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: "1rem",
          }}
        >
          <img src={downloadLog} alt="" />
          <Typography
            sx={{
              width: "280px",
              fontSize: "1rem",
              lineHeight: "24px",
              fontWeight: 700,
              color: "#3A3A3A",
            }}
          >
            Please Select Download Format{" "}
          </Typography>

          <Box sx={{ marginBottom: "2rem" }}>
            <Button
              variant="outlined"
              color="primary"
              size="small"
              startIcon={<img src={csvicon} alt="" />}
              sx={{ marginRight: "10px", fontWeight: 700 }}
              onClick={handleCloseDeleteLog}
            >
              Download as CSV
            </Button>
            <Button
              variant="outlined"
              color="primary"
              size="small"
              startIcon={<img src={pdficon} alt="" />}
              sx={{ marginLeft: "10px", fontWeight: 700 }}
              onClick={handleCloseDeleteLog}
            >
              Download as PDF
            </Button>
          </Box>
        </DialogContent>
      </MuiDialog> */}
    </>
  );
};

export default ProjectDataTable;

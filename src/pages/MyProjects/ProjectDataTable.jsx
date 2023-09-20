import React, { memo, useState } from "react";
import moment from "moment";
import { Button, IconButton, Typography } from "@mui/material";

import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";

import SortingTableHeader from "./SortingTableHeaders";
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


const headCells = [
  {
    id: "client",
    numeric: false,
    disablePadding: false,
    label: "Client",
  },
  {
    id: "projectName",
    numeric: false,
    disablePadding: false,
    label: "project Name",
  },
  {
    id: "category",
    numeric: false,
    disablePadding: false,
    label: "Category",
  },
  {
    id: "address",
    numeric: false,
    disablePadding: false,
    label: "Address",
  },
  {
    id: "vendorContacts",
    numeric: false,
    disablePadding: false,
    label: "Vendor Contacts",
  },
  {
    id: "actions",
    numeric: false,
    disablePadding: false,
    label: "actions",
  },
];

const ProjectDataTable = (props) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const { data, totalCount } = props;
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("");
  const [openDeleteModel, setOpenDeleteModel] = useState(false);
  const [openDownloadModel, setOpenDownloadModel] = useState(false);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  
  const handleChangePage = () => {
    console.log("test");
  };

  const handleChangeRowsPerPage = () => {
    console.log("test1");
  };

  const handleDeleteLog = (deleteItem) => {
    console.log("deleteItem", deleteItem);
    setOpenDeleteModel(true);
  };

  const handleCloseDeleteLog = () => {
    setOpenDeleteModel(false);
  };

  const handleOpenDownload = (deleteItem) => {
    console.log("deleteItem", deleteItem);
    setOpenDownloadModel(true);
  };

  const handleCloseDownload = () => {
    setOpenDownloadModel(false);
  };
  
  let projectdata = [
    {
        client: "Jim Wills",
        projectName: "Project 1",
        category: "Renovate AI",
        address: "North Street,Tampa, Fl",
        vendorContacts: ["k"],
    },
    {
        client: "Jim Wills",
        projectName: "SR Building",
        category: "Renovate AI",
        address: "North Street,Tampa, Fl",
        vendorContacts: ["e"],
    }
]

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
                      <TableCell align="right">{item?.client}</TableCell>
                      <TableCell align="right">{item?.projectName}</TableCell>
                      <TableCell align="right">{item?.category}</TableCell>
                      <TableCell align="right">{item?.address}</TableCell>
                      <TableCell align="right">
                        {/* <ol>
                          {item?.vendorContacts.map((subItem, i) => (
                            <li key={subItem + i}>{subItem}</li>
                          ))}
                        </ol> */}
                        <IconButton
                          size="small"
                          color="primary"
                          // onClick={() => handleOpenDownload(item)}
                        >
                          <img src={vendor} alt="" style={{width:"80px", height:"30px"}} />
                        </IconButton>
                      </TableCell>
                      <TableCell align="right">
                      <IconButton
                          size="small"
                          color="primary"
                          // onClick={() => handleOpenDownload(item)}
                        >
                          <RemoveRedEyeIcon fontSize="small" />
                        </IconButton>
                        <IconButton size="small" color="primary">
                          <EditIcon fontSize="small" />
                        </IconButton>
                        
                        <IconButton size="small" color="primary">
                          <ShareIcon fontSize="small" />
                        </IconButton>
                        <IconButton
                          size="small"
                          color="primary"
                          // onClick={() => handleDeleteLog(item)}
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
            count={100}
            rowsPerPage={10}
            page={0}
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
            Are You Sure You Want To Delete Selected Records ?
          </Typography>

          <Box sx={{ marginBottom: "2rem" }}>
            <Button
              variant="outlined"
              color="primary"
              size="small"
              sx={{ marginRight: "10px", fontWeight: 700 }}
              onClick={handleCloseDeleteLog}
            >
              Cancle
            </Button>
            <Button
              variant="outlined"
              color="error"
              size="small"
              sx={{ marginLeft: "10px", fontWeight: 700 }}
              onClick={handleCloseDeleteLog}
            >
              Delete
            </Button>
          </Box>
        </DialogContent>
      </MuiDialog>

      <MuiDialog
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
      </MuiDialog>
    </>
  );
};

export default ProjectDataTable;

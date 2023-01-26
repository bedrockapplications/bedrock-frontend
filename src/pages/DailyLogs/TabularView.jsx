import React, { memo } from "react";
import moment from "moment";
import { IconButton } from "@mui/material";

import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";

import SortingTableHeader from "../DocumentManager/SortingTableHeaders";
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
const headCells = [
  {
    id: "actions",
    numeric: false,
    disablePadding: false,
    label: "actions",
  },
  {
    id: "createdBy",
    numeric: false,
    disablePadding: false,
    label: "createdBy",
  },
  {
    id: "project",
    numeric: false,
    disablePadding: false,
    label: "project",
  },
  {
    id: "schedule",
    numeric: false,
    disablePadding: false,
    label: "schedule",
  },
  {
    id: "reportingTo",
    numeric: false,
    disablePadding: false,
    label: "reportingTo",
  },
  {
    id: "location",
    numeric: false,
    disablePadding: false,
    label: "location",
  },
  {
    id: "workActivity",
    numeric: false,
    disablePadding: false,
    label: "workActivity",
  },
  {
    id: "notes/comments",
    numeric: false,
    disablePadding: false,
    label: "notes/comments",
  },
];

const TabularView = (props) => {
  const { data, totalCount } = props;
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("");

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

  console.log("i am from child");

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
                    <TableRow key={item._id}>
                      <TableCell align="right">
                        <IconButton size="small" color="primary">
                          <EditIcon fontSize="small" />
                        </IconButton>
                        <IconButton size="small" color="primary">
                          <DownloadForOfflineOutlinedIcon fontSize="small" />
                        </IconButton>
                        <IconButton size="small" color="primary">
                          <ShareIcon fontSize="small" />
                        </IconButton>
                        <IconButton size="small" color="primary">
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </TableCell>
                      <TableCell align="right">{item?.createdBy}</TableCell>
                      <TableCell align="right">{item?.project}</TableCell>
                      <TableCell align="right">{item?.schedule}</TableCell>
                      <TableCell align="right">{item?.reportingTo}</TableCell>
                      <TableCell align="right">{item?.location}</TableCell>
                      <TableCell align="right">
                        <ol>
                          {item?.workActivity.map((subItem, i) => (
                            <li key={subItem + i}>{subItem}</li>
                          ))}
                        </ol>
                      </TableCell>
                      <TableCell align="right">
                        <ol>
                          {item?.notesComments?.map((subItem, i) => (
                            <li key={subItem + i}>{subItem}</li>
                          ))}
                        </ol>
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
    </>
  );
};

export default TabularView;

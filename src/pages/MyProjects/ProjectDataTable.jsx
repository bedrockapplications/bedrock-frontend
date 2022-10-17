import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";

const columns = [
  { id: "name", label: "Name", align: "left" },
  { id: "type", label: "Type", align: "left" },
  { id: "status", label: "Status", align: "left" },
  { id: "projectManager", label: "Project Manager", align: "left" },
  { id: "location", label: "Location", align: "left" },
  { id: "amount", label: "#", align: "left" },
];

const ProjectDataTable = (props) => {
  const { rows } = props;
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;
  return (
    <>
      <TableContainer
        sx={{
          maxHeight: "100%",
          border: "5px solid #3A3A3C",
          borderRadius: "5px",
        }}
      >
        <Table stickyHeader aria-label="My Projects table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  sx={{ backgroundColor: "#3A3A3C", color: "#fff" }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows?.map((row, i) => (
              <TableRow
                key={row.name + i}
                sx={{ margin: "5px", backgroundColor: "#fff" }}
              >
                <TableCell align={columns?.align} width="80px">
                  {row.name}
                </TableCell>
                <TableCell align={columns?.align}>{row.type}</TableCell>
                <TableCell align={columns?.align}>{row.status}</TableCell>
                <TableCell align={columns?.align}>
                  {row.projectManager}
                </TableCell>
                <TableCell align={columns?.align}>{row.location}</TableCell>
                <TableCell align={columns?.align}>{row.amount}</TableCell>
              </TableRow>
            ))}
            {emptyRows >= 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default ProjectDataTable;

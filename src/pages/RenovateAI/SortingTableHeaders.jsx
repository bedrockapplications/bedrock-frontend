import React from "react";
import PropTypes from "prop-types";
import { visuallyHidden } from "@mui/utils";
import {
  Box,
  TableCell,
  TableRow,
  TableHead,
  TableSortLabel,
} from "@mui/material";
import { useTranslation } from "react-i18next";

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

export function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

export function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis?.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const SortingTableHeader = (props) => {
  const { t } = useTranslation();

  const { headCells, order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };
  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            sortDirection={orderBy === headCell.id ? order : false}
            sx={{
              backgroundColor: "#3A3A3C",
              color: "#fff",
              textAlign: "left",
            }}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
              sx={{
                "&.MuiTableSortLabel-root": {
                  color: "white",
                },
                "&.MuiTableSortLabel-root:hover": {
                  color: "white",
                },
                "&.Mui-active": {
                  color: "white",
                },
                "& .MuiTableSortLabel-icon": {
                  color: "white !important",
                },
              }}
            >
              {t(`renovate.${headCell?.label}`)}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

SortingTableHeader.propTypes = {
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
  //   numSelected: PropTypes.number.isRequired,
  //   onSelectAllClick: PropTypes.func.isRequired,
};

export default SortingTableHeader;

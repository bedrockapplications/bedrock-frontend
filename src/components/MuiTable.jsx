import MUIDataTable from "mui-datatables";
import React from "react";

const MuiDataListTable = (props) => {
  const { data, columns, options } = props;
  const tableOptions = {
    responsive: "vertical",
    filterList: false,
    sortFilterList: false,
    confirmFilters: false,
    search: false,
    filter: false,
    checkbox: false,
    download: false,
    print: false,
    fixedSelectColumn: false,
    viewColumns: false,
    selectableRows: "none",
    elevation: 0,
    pagination: false,
    rowsPerPage: 10,
    rowsPerPageOptions: [10, 25, 50, 100],
    tableBodyHeight: "390px",
    tableBodyMaxHeight: "",
    ...options,
  };
  return (
    <MUIDataTable
      title={""}
      data={data}
      columns={columns}
      options={tableOptions}
    />
  );
};

export default MuiDataListTable;

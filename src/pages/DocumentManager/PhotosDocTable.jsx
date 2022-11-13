import React, { useState } from "react";
import PhotosTable from "../../components/MuiTable";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import EmailIcon from "@mui/icons-material/Email";
import DeleteIcon from "@mui/icons-material/Delete";
import moment from "moment";
import { deleteDocumentApi } from "../../services/request";
import DeleteDocument from "./DeleteDocument";
import EditUploadFiles from "./EditUploadeFiles";


let disableFilter = {
  filter: false,
  sort: false,
};

const PhotosDocTable = (props) => {
  const { data,GetDocumentsLists,projectOptions } = props;

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteItem, setDeleteItem] = useState({});
  const [editOpen, setEditOpen] = useState(false);
  const [editData, setEditData] = useState({});

  const handleEditOpen = (item) => {
    setEditData({ ...item });
    setEditOpen(true);
  };

  const handleEditClose = () => {
    setEditData({});
    setEditOpen(false);
  };


  const handleOpenDelete = (docItem) => {
    setDeleteItem({ ...docItem });
    setDeleteOpen(true);
  };

  const handleCloseDelete = () => {
    setDeleteOpen(false);
  };

  const handleEditDocument = (docId) => {
    console.log("id", docId);
  };

  const handleDeleteDocument = () => {
    deleteDocumentApi(deleteItem._id)
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

  const columns = [
    {
      name: "documents",
      label: "File Name",
      options: {
        ...disableFilter,
        // setCellProps: () => ({ style: { width: "300px" } }),
        customBodyRender: (value) => (value ? value[0]?.fileName : "---"),
      },
    },
    {
      name: "documents",
      label: "Type",
      options: {
        ...disableFilter,
        customBodyRender: (value) => (value ? value[0]?.contentType : `---`),
      },
    },
    {
      name: "updatedAt",
      label: "Upload Date",
      width: "40%",
      options: {
        ...disableFilter,
        // setCellProps: () => ({ style: { width: "700px" } }),
        customBodyRender: (value) =>
          value ? moment(value).format("DD-MM-YYYY") : `---`,
      },
    },
    {
      name: "",
      label: "Actions",
      options: {
        ...disableFilter,
        customBodyRenderLite: (dataIndex, rowIndex) => (
          <>
            <IconButton
              size="small"
              color="primary"
              onClick={() => handleEditOpen(data[dataIndex])}
            >
              <EditIcon fontSize="small" />
            </IconButton>
            <IconButton size="small" color="primary">
              <EmailIcon fontSize="small" />
            </IconButton>
            <IconButton
              size="small"
              color="primary"
              onClick={() => handleOpenDelete(data[dataIndex])}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </>
        ),
      },
    },
  ];

  return (
    <>
      <PhotosTable columns={columns} data={data} />
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

export default PhotosDocTable;

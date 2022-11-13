import React from "react";
import MuiDialog from "../../components/MuiDialog";
import {
  Typography,
  DialogActions,
  DialogContent,
  Divider,
  Button,
} from "@mui/material";

const DeleteDocument = (props) => {
  const { open, handleClose, deleteItemData, handleDeleteDocument } = props;

  return (
    <MuiDialog
      open={open}
      handleClose={handleClose}
      id={"DeleteDocument"}
      title={"Delete Document"}
    >
      <Divider />
      <DialogContent>
        <Typography fontSize={14} fontWeight={500}>
          Are you sure You want to Delete{" "}
          <Typography
            variant="span"
            fontWeight={600}
            sx={{ textDecoration: "underline" }}
          >
            {/* {cancleItem?.title}{" "} */}
          </Typography>{" "}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleClose}>
          No
        </Button>
        <Button onClick={handleDeleteDocument} autoFocus>
          Yes
        </Button>
      </DialogActions>
    </MuiDialog>
  );
};

export default DeleteDocument;

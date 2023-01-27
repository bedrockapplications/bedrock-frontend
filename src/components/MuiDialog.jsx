import React, { memo, Children } from "react";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Stack, Typography } from "@mui/material";

const CustomDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const MuiDialog = (props) => {
  const { open, handleClose, id, title, children, maxWidth } = props;
  return (
    <CustomDialog
      aria-labelledby={id || ""}
      onClose={handleClose}
      open={open}
      fullWidth
      maxWidth={maxWidth || "xs"}
      PaperProps={{
        style: {
          backgroundColor: "#f3f2f7",
        },
      }}
    >
      <DialogTitle sx={{ m: 0, padding: "8px 16px" }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="h6" fontWeight={600}>
            {title}
          </Typography>
          {handleClose ? (
            <IconButton
              aria-label="close"
              onClick={handleClose}
              sx={{
                color: (theme) => theme.palette.grey[500],
              }}
            >
              <CloseIcon />
            </IconButton>
          ) : null}
        </Stack>
      </DialogTitle>
      {children}
    </CustomDialog>
  );
};

export default memo(MuiDialog);

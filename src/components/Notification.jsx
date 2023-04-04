import React, { memo } from "react";
import { makeStyles } from "@mui/styles";

import {
    Drawer,
    Stack,
    Typography,
    IconButton,
    CloseIcon,
    Divider,
} from "../material";

const useStyle = makeStyles(() => ({
    drawerContainer: {
        "& .MuiPaper-root": {
            width: "350px",
            backgroundColor: "#FFFFFF",
        },
    },
    notificationText: {
        fontSize: "1.5rem",
        fontWeight: "bold",
    },
}));

const BellNotification = (props) => {
    const classes = useStyle();
    const { open, handleClose, meetingList } = props;

    return (
        <Drawer
            anchor="right"
            open={open}
            className={classes.drawerContainer}
            onClose={handleClose}
        >
            <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                sx={{ padding: "10px" }}
            >
                <Typography className={classes.notificationText}>
                    Notifications
                </Typography>
                <IconButton size="small" onClick={handleClose}>
                    <CloseIcon />
                </IconButton>
            </Stack>
            <Divider />
            {/* {JSON.stringify(meetingList)} */}
        </Drawer>
    );
};

export default memo(BellNotification);

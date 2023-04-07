import React, { memo } from "react";
import { makeStyles } from "@mui/styles";
import moment from "moment";

import {
    Drawer,
    Stack,
    Typography,
    IconButton,
    CloseIcon,
    Divider,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    Checkbox,
    ListItemText,
} from "../material";

const useStyle = makeStyles(() => ({
    drawerContainer: {
        "& .MuiPaper-root": {
            width: "360px",
            backgroundColor: "#FFFFFF",
        },
    },
    notificationText: {
        fontSize: "1.5rem",
        fontWeight: "bold",
    },
    list: {
        padding: "0px",
    },
}));

const BellNotification = (props) => {
    const classes = useStyle();
    const { open, handleClose, meetingList, handleRead } = props;

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
            <List className={classes.list}>
                {meetingList?.map((item, i) => (
                    <React.Fragment key={i}>
                        <ListItem disablePadding>
                            <ListItemButton onClick={() => handleRead(item)}>
                                <ListItemIcon>
                                    <Checkbox edge="start" checked={item?.isRead} disableRipple />
                                </ListItemIcon>
                                <ListItemText
                                    primary={
                                        <Typography fontSize={20} fontWeight={500}>
                                            {item?.title}
                                        </Typography>
                                    }
                                    secondary={
                                        <Typography fontSize={10}>
                                            {`Scheduled on ${moment(item?.startDate).format(
                                                "DD-MMM-YYYY"
                                            )} from ${item?.startTime} - ${item?.endTime}`}
                                        </Typography>
                                    }
                                />
                            </ListItemButton>
                        </ListItem>
                        <Divider />
                    </React.Fragment>
                ))}
            </List>
        </Drawer>
    );
};

export default memo(BellNotification);

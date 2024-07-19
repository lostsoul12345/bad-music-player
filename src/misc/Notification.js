import { Snackbar } from "@mui/material";
import { useDispatch, useSelector } from "react-redux"
import { hideNotifications } from "../redux/state/notificationReducer";

function Notification() {
    const { show, message } = useSelector(state => state.notificationReducer);
    const dispatch = useDispatch()
    const onClose = () => {
        dispatch(hideNotifications())
    }
    return (
        <Snackbar
            open={show}
            autoHideDuration={3000}
            onClose={onClose}
            message={message}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
        />
    )
}

export default Notification
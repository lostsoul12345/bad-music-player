/* Action Types */
const SHOW_SUCCESS_NOTIFICATION = "SHOW_SUCCESS_NOTIFICATION";
const SHOW_FAIL_NOTIFICATION = "SHOW_FAIL_NOTIFICATION";
const HIDE_NOTIFICATIONS = "HIDE_NOTIFICATIONS";

/* Actions */
export function showSuccessNotification(message) {
    return {
        type: SHOW_SUCCESS_NOTIFICATION,
        payload: { message: message || "Successful!" }
    }
}

export function showFailNotification(message) {
    return {
        type: SHOW_FAIL_NOTIFICATION,
        payload: { message: message || "Failed!" }
    }
}

export function hideNotifications() {
    return {
        type: HIDE_NOTIFICATIONS
    }
}

/* Reducer */
const initialState = {}
export function notificationReducer(state = initialState, action) {
    switch (action.type) {
        case SHOW_SUCCESS_NOTIFICATION:
            return { show: true, message: action.payload.message, isSuccess: true };
        case SHOW_FAIL_NOTIFICATION:
            return { show: true, message: action.payload.message, isSuccess: false };
        case HIDE_NOTIFICATIONS:
            return {...state, show: false}
        default:
            return state;
    }
}
const ROOT_URL = "http://192.168.178.1:5001/api";

export const DataRequestAction = (method, type, data, token="") => {
    return function (dispatch) {
        try {
            fetch(`${ROOT_URL}/${type}`, {
                method: method,
                headers: new Headers({
                    "Content-Type": "application/json",
                    'x-auth': token,
                }),
                body: JSON.stringify(data)
            }).then((response) => {
                response.json().then((response) => {
                    if (response.status === "ERROR") {
                        RequestFail(dispatch, type, response.message);
                        addNotification(dispatch, response.message, "error");
                        return;
                    } else {
                        RequestSuccess(dispatch, type, response, data);
                        addNotification(dispatch, response.message, "success");
                    }
                })

            }).catch((err) => {
                RequestFail(dispatch, type, "Request Fail", err);
                addNotification(dispatch, err, "error");
            })
        } catch (error) {
            RequestFail(dispatch, type, "Request Fail", error);
            addNotification(dispatch, error, "error");
        }
    };
};

export const DataGetAction = (type, data, token="") => {
    return function (dispatch) {
        let headers = {
            "Content-Type": "application/json",
            'x-auth': token,
        };
        try {
            fetch(`${ROOT_URL}/${type}${data}`, { headers })
                .then((response) => {
                    response.json().then((response) => {
                        if (response.status === "ERROR") {
                            RequestFail(dispatch, type, response.message);
                            addNotification(dispatch, response.message, "error");
                        } else {
                            RequestSuccess(dispatch, type, response, data);
                            addNotification(dispatch, response.message, "success");
                        }
                    }).catch(err => {
                        RequestFail(dispatch, type, "Request Fail", err);
                        addNotification(dispatch, err, "error");
                    })
                }).catch(err => {
                    RequestFail(dispatch, type, "Request Fail", err);
                    addNotification(dispatch, err, "error");
                })
        } catch (error) {
            RequestFail(dispatch, type, "Request Fail", error);
            addNotification(dispatch, error, "error");
        }
    };
};

function RequestFail(dispatch, type, message, error) {
    dispatch({
        type: `${type}_FAILURE`,
        payload: message,
        error
    });
}

function RequestSuccess(dispatch, type, data, reqData) {
    dispatch({
        type: `${type}_SUCCESS`,
        payload: data,
        reqData,
        dispatch
    });
}

export const restNotificationState = () => {
    return function (dispatch) {
        dispatch({
            type: `REST_NOTIFICATION`,
        });
    }
}

function addNotification(dispatch, message, level, redirectUrl = "") {
    dispatch({
        type: 'SHOW_NOTIFICATION',
        message,
        level,
        redirectUrl
    });
}
const ROOT_URL = process.env.REACT_APP_ROOT_URL;

export const DataRequestAction = (method, type, data, redirectUrl,Loading = "LOADING", showNotification = true) => {
    return function (dispatch) {
        RequestProgress(dispatch, `${Loading}_START`);
        const token = localStorage.getItem('token');
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
                        RequestProgress(dispatch, `${Loading}_STOP`);
                        addNotification(dispatch, response.message, "error");
                    } else {
                        RequestSuccess(dispatch, type, response, data);
                        if (showNotification) {
                            addNotification(dispatch, response.message, "success", redirectUrl);
                        }
                    }
                })

            }).catch((err) => {
                RequestProgress(dispatch, `${Loading}_STOP`);
                addNotification(dispatch, err, "error");

            })
        } catch (error) {
            RequestProgress(dispatch, `${Loading}_STOP`);
            addNotification(dispatch, error, "error");
        }
    };
};

export const DataGetAction = (type, data) => {
    return function (dispatch) {
        const token = localStorage.getItem('token');

        let headers = {
            "Content-Type": "application/json",
            'x-auth': token,
        };

        try {

            if (data !== "") {
                data = "/" + data;
            }

            fetch(`${ROOT_URL}/${type}${data}`, { headers })
                .then((response) => {
                    response.json().then((response) => {
                        RequestSuccess(dispatch, type, response, data)
                    })
                }).catch(err => {
                    RequestFail(dispatch, type, "Request Fail outer", err);
                })
        } catch (error) {
            RequestFail(dispatch, type, "Request Fail", error);
        }
    };
};


export const updateAllState = (type) => {
    return function (dispatch) {
        dispatch({
            type: `${type}_UPDATE`,
        });
    }
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

function RequestProgress(dispatch, type) {
    dispatch({
        type: `${type}`,
    });
}
function rp(promise) {
    return new Promise((resolve, reject) => {
        promise.then(res => {
            resolve([null, res])
        }).catch(err => {
            resolve([err, null])
        })
    })
}

function rpa(promises) {
    return new Promise((resolve, reject) => {
        Promise.all(promises).then(res => {
            resolve([null, res])
        }).catch(err => {
            resolve([err, null])
        })
    })
}

function res(res, code, message, data) {
    res
        .status(code)
        .json({
            code,
            message,
            data
        })
}

module.exports = {
    rp,
    res,
    rpa
}
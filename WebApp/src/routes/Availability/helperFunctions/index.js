const moment = require('moment');

export default function intervals(startString, endString, interval) {
    var start = moment(startString, 'hh:mm a');
    var end = moment(endString, 'hh:mm a');
    var result = [];
    var current = moment(start);
    while (current <= end) {
        result.push(current.format('HH:mm'));
        current.add(interval, 'minutes');
    }
    if(result.length === 1) {
        result.push(end.format('HH:mm'));
    }
    return result;
}

export function compareTime (start, end) {
    var startTime = moment(start, 'h:mm:ss a');
    var endTime = moment(end, 'h:mm:ss a');
    if(startTime.isBefore(endTime)) return true;
    else {
        alert("Error. Start Time is more than End Time");
        return false;
    }
}
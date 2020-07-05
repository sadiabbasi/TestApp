import React from 'react';
import getIntervals from "../helperFunctions/index";

const GetTimeSlots = ({values, defaultValue}) => {
    const {startTime, endTime, duration} = values || {};
    var timeslots = startTime && endTime && duration? getIntervals(startTime, endTime,duration && duration.toString()): [];
    if(!timeslots || (timeslots && timeslots.length <= 0 )) timeslots=defaultValue;
    return (
        <div>
            <h2>Timeslots</h2>
            <div style={{maxHeight: '150px', overflowY:'auto'}}>
                {
                    timeslots && timeslots.map((slot, index) => {
                        if(timeslots[index] && timeslots[index+1])
                        {
                            return <h5 className="gx-mb-2" key={`timeSlot${index}`}>{timeslots[index]} - {timeslots[index+1]}</h5>
                        }
                        return true;
                    })
                }
            </div>            
            {((timeslots && timeslots.length <=0) || !timeslots) && <h5>No slots defined yet</h5>}
        </div>
    );
}

export default GetTimeSlots;
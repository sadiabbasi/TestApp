import React, {useState} from 'react';
import { Card, Button, Switch } from 'antd';
import SetTimeModal from "./SetTimeModal";
import { DataRequestAction } from "../../../appRedux/actions/http";
import { useDispatch } from 'react-redux';
import moment from "moment";
import {compareTime} from "../helperFunctions/index";

const SingleSlotItem = ({days,gridStyle}) => {
    const dispatch = useDispatch();
    const [selectedDay, setDay] = useState('');
    const [timeSlots, setTimeSlot] = useState({})
    const [openModal, setModalVisible] = useState(false)
    const submitAvailability = (values) => {
        if(!compareTime(values.startTime, values.endTime)) return;
        values.startTime = moment(values.startTime).format("HH:mm:ss A");
        values.endTime = moment(values.endTime).format("HH:mm:ss A")
        dispatch(DataRequestAction('POST', 'availability', {day:selectedDay ,data: values}, ""));
    }
    const setTimeSlotFun = (day) => {
        const date =  days && days[day];
        let startTime = date && date['startTime'] && moment(date['startTime'], 'HH:mm:ss');;
        let endTime = date && date['endTime'] && moment(date['endTime'], 'HH:mm:ss')
        let duration = date && date['duration'];
        setTimeSlot({startTime:startTime, endTime:endTime, duration:duration})
    }

    const updateStatus = (e, day) => {
        dispatch(DataRequestAction('PUT', 'availability', {day:day ,status: e}, ""));
    }
    return (
        <>
            {
                Object.keys(days).map((day, index)=> {
                    return(
                        <div key={`timeslot${index}`}>
                            <Card.Grid hoverable={false} style={gridStyle}>{day}</Card.Grid>
                            <Card.Grid hoverable={false} style={gridStyle}>{days[day]['duration'] || "---"}</Card.Grid>
                            <Card.Grid hoverable={false} style={gridStyle}>
                                <Switch size="small" defaultChecked = {days[day]['status']} onClick={(e)=>updateStatus(e, day)}  />
                            </Card.Grid>
                            <Card.Grid hoverable={false} style={gridStyle}>
                                <Button type="primary" size="small" onClick={()=>{setDay(day);setModalVisible(true); setTimeSlotFun(day)}}>Set time</Button>
                            </Card.Grid>
                        </div>
                    )
                })
            }
            <SetTimeModal openModal={openModal} setModalVisible={setModalVisible} submitAvailability={submitAvailability} 
            days={days} day={selectedDay} timeSlots={timeSlots} setTimeSlot={setTimeSlot} />
        </>
    );
}

export default SingleSlotItem;
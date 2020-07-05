import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DataGetAction, DataRequestAction } from "../../appRedux/actions/http";
import Listing from "./components/listing";
import StatusUpdate from "./components/statusUpdate";
import moment from 'moment';

const Appointments = (props) => {
    const dispatch = useDispatch();
    const appointments = useSelector(state => state.Appointments.appointments);
    const fetchData = () => {
        dispatch(DataGetAction('appointments',""))
    }
    useEffect(fetchData, []);

    const updateStatus = (data, status) => {
        dispatch(DataRequestAction('PUT', 'appointments', {appointment: data._id, status: status}, ""));
    }

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: text => <span>{text}</span>,
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: 'Age',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: 'Slot',
            dataIndex: 'slot',
            key: 'slot',
        },
        {
            title: 'Date',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: text => <span>{moment(text).format('dddd, MM YYYY')}</span>,
        },
        {
            title: 'Action',
            dataIndex: 'status',
            key: 'status',
            render: (text, record) => <StatusUpdate text={text} record={record} updateStatus={updateStatus} />
        },
    ];
    return (
        <div>
            <h2>Appointment Lists</h2>
            <Listing columns={columns} appointments= {appointments}/>
        </div>        
    );
}

export default Appointments;
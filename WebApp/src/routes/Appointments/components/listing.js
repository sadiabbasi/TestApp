import React from 'react';
import { Table } from 'antd';

const Listing = ({appointments, columns}) => {
    return (
        <Table 
            className="gx-mt-4 gx-bg-white gx-px-3" 
            columns={columns} 
            dataSource={appointments} 
            rowKey={appointments => appointments._id}
            key="AppointmentTable"
            pagination = {appointments.length > 10 ? true: false}
        />
    );
}

export default Listing;
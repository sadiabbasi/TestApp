import React from 'react';
import { Divider } from 'antd';

const StatusUpdate = ({text, record, updateStatus}) => {
    return (
        <>
            {text ?
                <span className="gx-text-capitalize">{text}</span> : 
                <span size="middle">
                    <span className="gx-link" onClick={()=>updateStatus(record, "accepted")}>Accept</span>
                    <Divider type = "vertical" />
                    <span className="gx-link" onClick={()=>updateStatus(record, "rejected")}>Reject</span>
                </span>
            }
        </>     
    );
}

export default StatusUpdate;
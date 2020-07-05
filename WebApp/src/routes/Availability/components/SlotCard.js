import React from 'react';
import { Card } from 'antd';
import SingleSlotItem from "./SingleSlotItem";

const gridStyle = {
    width: '25%',
    textAlign: 'left',
    boxShadow : '0px 0px',
    padding: "5px"
};
const SlotCard = ({data, ...props}) => {
    return (
        <div className="availabilityCard gx-mt-4">
            <Card>
                {/* Header of days */}
                <Card.Grid hoverable={false} style={gridStyle}><h3 className="gx-mb-3">Day</h3></Card.Grid>
                <Card.Grid hoverable={false} style={gridStyle}><h3 className="gx-mb-3">Duration</h3></Card.Grid>
                <Card.Grid hoverable={false} style={gridStyle}><h3 className="gx-mb-3">Status</h3></Card.Grid>
                <Card.Grid hoverable={false} style={gridStyle}><h3 className="gx-mb-3">Action</h3></Card.Grid>
                {/* days listing component */}
                <SingleSlotItem days={data} gridStyle={gridStyle} />
            </Card>
        </div>
    );
}

export default SlotCard;
import React from "react";
import { Modal, Form } from "antd";
import TimePickerField from "../../../components/dataEntry/Form/TimePicker";
import SelectField from "../../../components/dataEntry/Form/Select";
import GetTimeSlots from "./GetTimeSlots"
import getIntervals from "../helperFunctions/index";
import moment from "moment";

const SetTimeModal = ({ openModal, setModalVisible,submitAvailability,days, day,setTimeSlot, timeSlots,...props }) => {
    const date =  days && days[day];
    let startTime = date && date['startTime'] && moment(date['startTime'], 'HH:mm:ss');;
    let endTime = date && date['endTime'] && moment(date['endTime'], 'HH:mm:ss')
    let duration = date && date['duration'];
    let slots = date && date['slots'];

    const handleSubmit = () =>{
        const { form } = props;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }
            values.slots = getIntervals(values.startTime, values.endTime,values.duration.toString());
            values.status = true;
            submitAvailability(values)
        })
    }
    return (
        <Modal
            maskClosable={false}
            title="Set day time"
            wrapClassName="vertical-center-modal"
            visible={openModal}
            onOk={() => handleSubmit()}
            onCancel={() => setModalVisible(false)}
        >
            <Form layout="vertical">
                <TimePickerField
                    label="From"
                    name="startTime"
                    rules={[{required: true,message: "From time is required"}]}
                    onChange = {(e)=>setTimeSlot({...timeSlots, startTime: e})}
                    defaultValue = {startTime}
                    minuteStep={15}
                    {...props}
                />
                <TimePickerField
                    label="To"
                    name="endTime"
                    rules={[{required: true, message: "To time is required"}]}
                    onChange = {(e)=>setTimeSlot({...timeSlots, endTime: e})}                    
                    defaultValue = {endTime}
                    minuteStep={15}
                    {...props}
                />
                <SelectField
                    label="Slot Duration"
                    name="duration"
                    required={true}
                    message="Required*"
                    data={[{ key: 15, label: "15" },{ key: 30, label: "30" },{ key: 45, label: "45" },{ key: 60, label: "60" },]}
                    onChange = {(e)=>setTimeSlot({...timeSlots, duration: e})}
                    defaultValue={duration}
                    placeholder="Select slot duration"
                    {...props}
                />
            </Form>   
            <GetTimeSlots values = {timeSlots} defaultValue={slots} /> 
        </Modal>
    )
}
const WrappedComp = Form.create()(SetTimeModal);
export default WrappedComp;
import React from "react";
import { Form, TimePicker } from "antd";
const FormItem = Form.Item;

const InputField = (props) => {
    const { getFieldDecorator } = props.form;
    const {
    required,
    message,
    name,
    label,
    labelCol,
    wrapperCol,
    defaultValue,
    disabled,
    className,
    onChange,
    } = props;

    return (
    <FormItem label={label} labelCol={labelCol} wrapperCol={wrapperCol}>
        {getFieldDecorator(name, {
            rules: props.rules
            ? props.rules
            : [{ type: "object", required, message }],
            initialValue: defaultValue,
            
        })(
        <TimePicker
            use12Hours
            minuteStep={props.minuteStep ? props.minuteStep : 1}
            className={className ? className : "gx-mb-3 gx-w-100"}
            format={"hh:mm A"}
            disabled={disabled && disabled ? disabled : false}
            onChange={onChange}
        />
    )}
    </FormItem>
    );
};

export default InputField;

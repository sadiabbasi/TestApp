import React from "react";
import { Form, Input } from "antd";

const FormItem = Form.Item;

const InputField = (props) => {
    const { getFieldDecorator } = props.form;
    const { required, message, prefixIcon,className, placeholder, name, label, labelCol, wrapperCol, defaultValue, type, Inputtype, addonAfter} = props;
    return (
        <FormItem label={label}
            labelCol={labelCol}
            wrapperCol={wrapperCol}
        >
            {getFieldDecorator(name, {
                rules: [{ required, message, type:type }],
                initialValue: defaultValue
            })(
                <Input className={className}  addonAfter={addonAfter} type={Inputtype||''} prefix={prefixIcon} placeholder={placeholder} onChange={props.onChange} />
            )}
        </FormItem>
    );
}

export default InputField;
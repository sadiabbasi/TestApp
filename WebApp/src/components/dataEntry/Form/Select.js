import React from "react";
import { Form, Select } from "antd";
const FormItem = Form.Item;
const Option = Select.Option;

const SelectField = (props) => {
    const { getFieldDecorator } = props.form;
    const { required, message,mode, defaultValue,textClass,placeholder, name, onChange, data, className, label , widthNum, labelCol, wrapperCol} = props;
    return (
        <FormItem className={className} label={label} 
        labelCol={labelCol}
        wrapperCol={wrapperCol}
        >
            {getFieldDecorator(name, {
                rules: [{ required, message }],
                initialValue: defaultValue
            })(
                <Select style={{width: widthNum}}
                className={textClass}
                    placeholder={placeholder}
                    onChange={onChange}
                    mode ={mode?mode:'single'}
                >
                    {
                        data && data.map(Item => <Option key={Item.key} value={Item.key || Item.value}>{Item.value || Item.label}</Option>)
                    }
                </Select>
            )}
        </FormItem>
    );
}

export default SelectField;
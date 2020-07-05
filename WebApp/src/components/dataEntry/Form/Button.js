
import React from "react";
import { Button } from "antd";

const ButtonComponent = (props) => {
    const { type, htmlType, className, title, size } = props;
    return (
        <Button type={type || "default"} size={size||"default"} ghost={type==='danger'? true: false} onClick={props.onClick} htmlType={htmlType} className={`${className} login-form-button`}>
            {title}
        </Button>
    );
}

export default ButtonComponent;
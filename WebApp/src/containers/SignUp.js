import React, {useEffect, useState} from "react";
import {Button, Form, Input, Spin} from "antd";
import {Link} from "react-router-dom";

import {useDispatch, useSelector} from "react-redux";
import { DataRequestAction } from '../appRedux/actions/http'
import TextField from "../components/dataEntry/Form/Input"

const FormItem = Form.Item;

const SignUp = (props) => {
  const dispatch = useDispatch();
  const token = useSelector(({auth}) => auth.token);
  const authdata = useSelector(({auth}) => auth);
  const [formSubmit, setformSubmit] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        values.role = "seller"
        dispatch(DataRequestAction("POST", "signUp", values, "availability"));
        setformSubmit(true)
      }
    });
  };

  useEffect(() => {
    if (token !== null) {
      props.history.push('/');
    }
  }, [token, props.history]);

  const compareToFirstPassword = (rule, value, callback) => {
    const form = props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('Password mismatch');
    } else {
      callback();
    }
  };

  const validateToNextPassword = (rule, value, callback) => {
    const form = props.form;
    if (value && props.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  };

  const {getFieldDecorator} = props.form;
  return (
    <div className="gx-app-login-wrap">
      <div className="gx-app-login-container">
        <div className="gx-app-login-main-content">
          <div className="gx-app-logo-content gx-bg-primary">
            <div className="gx-app-logo-wid">
              <h1>Signup</h1>
              <p>By Signing Up, you can avail full features of our services.</p>
              <p>Get an account !!!</p>
            </div>
          </div>

          <div className="gx-app-login-content">
            <Form onSubmit={handleSubmit} className="gx-signup-form gx-form-row0">
              <TextField name="username" placeholder="Username" required={true} message="Required**" {...props} />
              <TextField required={true} message="Required**" name="email" placeholder="Email" type="email" {...props} />
              <Form.Item>
                {getFieldDecorator('password', {
                  rules: [{
                    required: true, message: 'Required**',
                  }, {
                    validator: validateToNextPassword,
                  }],
                  })(
                    <Input.Password type="password" placeholder="New Password" />
                )}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator('confirmPassword', {
                  rules: [{
                    required: true, message: 'Required**',
                  }, {
                    validator: compareToFirstPassword,
                  }],
                  })(
                    <Input.Password placeholder="Re-enter password" type="password" />
                )}
              </Form.Item>
              <FormItem>
                <Button  type="primary" className="gx-mb-0" htmlType="submit">
                  Signup
                </Button>
                {(formSubmit && authdata.Loader) && <Spin size="small" />}
                <span>or</span> <Link to="/signin">Signin</Link>
              </FormItem>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

const WrappedSignUpForm = Form.create()(SignUp);
export default WrappedSignUpForm;
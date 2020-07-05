import React, { useEffect } from "react";
import { Button, Form, Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { DataRequestAction } from '../appRedux/actions/http';
import { Link } from "react-router-dom";
import TextField from "../components/dataEntry/Form/Input"
const FormItem = Form.Item;

const SignIn = (props) => {
  const token = useSelector(({auth}) => auth.token);
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        dispatch(DataRequestAction("POST", "signIn", values, "appointments"));
      }
    });
  };

  useEffect(() => {
    if (token !== null) {
      props.history.push('/');
    }
  }, [token, props.history]);

  const { getFieldDecorator } = props.form;
  return (
    <div className="gx-app-login-wrap">
      <div className="gx-app-login-container">
        <div className="gx-app-login-main-content">
          <div className="gx-app-logo-content gx-bg-primary">
            <div className="gx-app-logo-wid">
              <h1>Signin</h1>
              <p>Welcome to our site !!!</p>
            </div>
          </div>
          <div className="gx-app-login-content">
            <Form onSubmit={handleSubmit} className="gx-signin-form gx-form-row0">
              <TextField required={true} message="Required**" name="email" placeholder="Email" type="email" {...props} />
              <FormItem>
                {getFieldDecorator('password', {
                  rules: [{ required: true, message: 'Please input your Password!' }],
                })(
                  <Input.Password type="password" placeholder="Password" />
                )}
              </FormItem>
              <FormItem>
                <Button type="primary" className="gx-mb-0" htmlType="submit">Login</Button>
                <span>or</span> <Link to="/signup">Signup</Link>
              </FormItem>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

const WrappedNormalLoginForm = Form.create()(SignIn);
export default WrappedNormalLoginForm;
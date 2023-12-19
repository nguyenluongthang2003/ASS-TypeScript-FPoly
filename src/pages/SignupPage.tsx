import React from "react";
import { LockOutlined, UserOutlined, MailOutlined } from "@ant-design/icons";
import { Button, Form, Input, notification } from "antd";
import { useNavigate } from "react-router-dom";
import { signUp } from "../api/Auth";
import { User } from "../interface/User";

const Signup: React.FC = () => {
  const [api, contextHolder] = notification.useNotification();
  const navigate = useNavigate();
  const onFinish = async (data: User) => {
    await signUp(data)
    api["success"]({
      message: "Register successful!",
    });
    setTimeout(function () {
      navigate("/signin")
    },1500)
  };

  return (
    <div className="login max-w-[500px] text-center m-auto border border-sky-500 mt-6 p-3">
      <h1 className="font-medium mt-[20px] mb-3 "> SIGNUP PAGE</h1>
      <div className="form-login">
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          // validateMessages={validateMessages}
        >
          <Form.Item
            name="username"
            rules={[{ required: true }]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username"
            />
          </Form.Item>
          <Form.Item
            name="email"
            rules={[{ required: true, type:"email" }]}
          >
            <Input
              prefix={<MailOutlined className="site-form-item-icon" />}
              type="email"
              placeholder="Email"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              { required: true },
              // { validator: validatePassword },
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>

          <Form.Item>
            {contextHolder}
            <Button
              htmlType="submit"
              className="login-form-button text-white bg-[#4096FF]"
            >
              Register
            </Button> 
            <br /> or
            <br /><a href="/login" >Login now!</a>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Signup;

import React from "react";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, notification } from "antd";
import { signIn } from "../api/Auth";
import { useNavigate } from "react-router-dom";
import { User } from "../interface/User";

const Login: React.FC = () => {
  const [api, contextHolder] = notification.useNotification();
  const navigate = useNavigate();
  const onFinish = async (data: User) => {
    try {
      const { data: user } = await signIn(data);
      localStorage.setItem("user", JSON.stringify(user));
      api["success"]({
        message: "Login successful!",
      });
      setTimeout(function () {
        navigate("/admin");
      },1500)
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <div className="login max-w-[500px] text-center m-auto border border-sky-500 mt-6 p-3 ">
      <h1 className="font-medium mt-[20px] mb-3 ">LOGIN PAGE</h1>
      <div className="form-login">
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
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
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <a className="login-form-forgot" href="">
              Forgot password
            </a>
          </Form.Item>

          <Form.Item>
          {contextHolder}
            <Button
              htmlType="submit"
              className="login-form-button text-white bg-[#4096FF] mr-3"
            >
              Log in
            </Button>
            Or <a href="/signup">register now!</a>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;

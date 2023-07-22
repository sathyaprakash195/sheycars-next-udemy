"use client";
import { antdFieldValidation } from "@/helpers/validationHelpers";
import { Button, Form, message } from "antd";
import Link from "next/link";
import React from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { SetLoading } from "@/redux/loadersSlice";
import { useRouter } from "next/navigation";

function Register() {
  const router = useRouter();
  const dispatch = useDispatch();
  const onFinish = async (values) => {
    try {
      dispatch(SetLoading(true));
      const response = await axios.post("/api/users/register", values);
      message.success(response.data.message);
      router.push("/login");
    } catch (error) {
      message.error(error.response.data.message || error.message);
    } finally {
      dispatch(SetLoading(false));
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-450 card p-5 card">
        <Form layout="vertical" onFinish={onFinish}>
          <h1 className="text-xl uppercase">SheyCars- Register</h1>

          <div className="divider"></div>

          <div className="flex flex-col gap-5">
            <Form.Item label="Name" name="name" rules={antdFieldValidation}>
              <input type="text" />
            </Form.Item>

            <Form.Item label="Email" name="email" rules={antdFieldValidation}>
              <input type="email" />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={antdFieldValidation}
            >
              <input type="password" />
            </Form.Item>

            <Button type="primary" block htmlType="submit">
              Register
            </Button>

            <Link href="/login">Already have an account? Login</Link>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default Register;

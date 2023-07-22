import { antdFieldValidation } from "@/helpers/validationHelpers";
import { SetLoading } from "@/redux/loadersSlice";
import { SetCurrentUser } from "@/redux/usersSlice";
import { Button, Form, message } from "antd";
import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

function General() {
  const { currentUser } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const onFinish = async (values) => {
    try {
      dispatch(SetLoading(true));
      if (values.password === values.confirmPassword) {
        const response = await axios.put(
          `/api/users/${currentUser._id}`,
          values
        );
        dispatch(SetCurrentUser(response.data.data));
        message.success("Profile updated successfully");
      } else {
        message.error("Passwords do not match");
      }
    } catch (error) {
      message.error(error.response.data.message || error.message);
    } finally {
      dispatch(SetLoading(false));
    }
  };

  return (
    <div>
      <div className="w-450">
        <Form
          layout="vertical"
          onFinish={onFinish}
          initialValues={{
            name: currentUser.name,
            email: currentUser.email,
          }}
        >
          <div className="flex flex-col gap-5">
            <Form.Item label="Name" name="name" rules={antdFieldValidation}>
              <input type="text" />
            </Form.Item>

            <Form.Item label="Email" name="email" rules={antdFieldValidation}>
              <input type="email" />
            </Form.Item>

            <Form.Item
              label="New Password"
              name="password"
              rules={antdFieldValidation}
            >
              <input type="password" />
            </Form.Item>

            <Form.Item
              label="Confirm Password"
              name="confirmPassword"
              rules={antdFieldValidation}
            >
              <input type="password" />
            </Form.Item>

            <Button type="primary" block htmlType="submit">
              Update Profile
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default General;

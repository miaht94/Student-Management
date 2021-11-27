import React ,{useEffect, useState} from 'react';
import 'antd/dist/antd.css';
import { Form, Input, Button} from 'antd';

import {useStudentInfoAction} from '_actions';

export {AddStudentForm} 

function AddStudentForm(props) {

    const [form] = Form.useForm();
    const studentInfoAction = useStudentInfoAction();

    function handleSubmit() {
        form.validateFields()
        .then((values) => {
            studentInfoAction.AddStudent(values.email);
        })
    };

    return (
        <div>
            <Form
                form = {form}
                layout="vertical"
                name="form_in_modal"
                initialValues={{
                    modifier: 'public',
                }}
            >
          <Form.Item
            name="email"
            label="Email của sinh viên: "
            rules={[
              {
                required: true,
                message: 'Ghi địa chỉ email của sinh viên cần thêm ở đây',
              },
            ]}
            >
            <Input />
          </Form.Item>
          <p>Thêm nhiều sinh viên cách nhau bằng dấu ',' </p>
          <p>Sinh viên được thêm vào lớp phải có tài khoản VNU được cấp bởi admin của hệ thống. </p>
          <Form.Item label=" " colon={false}>
                        <Button type="primary" htmlType="submit" onClick = {handleSubmit}>
                            Thêm sinh viên
                        </Button>
                    </Form.Item>
        </Form>
        </div>
    )
}
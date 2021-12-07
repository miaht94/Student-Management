import React ,{useEffect, useState} from 'react';
import 'antd/dist/antd.css';
import { Form, Input, Button, Divider} from 'antd';

import {useClassActions, useStudentInfoAction} from '_actions';
import { UploadForm } from '_components/dbportal/UploadForm';
import { useClassWrapper } from '_helpers';

export {AddStudentForm} 
var upload_form = [
    {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
    },
    {
        title: 'Lỗi',
        dataIndex: 'error',
        key: 'error',
    },
]
function AddStudentForm(props) {

    const [form] = Form.useForm();
    const studentInfoAction = useStudentInfoAction();
    const classWrapper = useClassWrapper();

    // useEffect(() =>{
    //     const curs = JSON.parse(localStorage.getItem('currentClass'));
    //     console.log(curs);
    //     if (curs!=null){
    //         setCurCl(curs.class_id);
    //     }
    //     console.log(curCl);
    // },[props]);

    function handleSubmit() {
        form.validateFields()
        .then((values) => {
            studentInfoAction.AddStudent(values.email);
        })
    };

    return (
        <div>
            <h6> Nhập email sinh viên </h6>
            <Form
                form = {form}
                layout="vertical"
                name="form_in_modal"
                initialValues={{
                    modifier: 'public',
                }}
            >
        <i>Thêm nhiều sinh viên cách nhau bằng dấu ','</i><br/>
        <i>Sinh viên được thêm vào lớp phải có tài khoản VNU được cấp bởi admin của hệ thống.</i><br/><br/>
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
          {/* <p>Thêm nhiều sinh viên cách nhau bằng dấu ',' </p>
          <p>Sinh viên được thêm vào lớp phải có tài khoản VNU được cấp bởi admin của hệ thống. </p> */}
          <Form.Item label=" " colon={false}>
                        <Button type="primary" htmlType="submit" onClick = {handleSubmit}>
                            Thêm sinh viên
                        </Button>
                    </Form.Item>
        </Form>
        <Divider/>
        <h6> Tải file danh sách </h6>
        <i>Thêm sinh viên vào lớp bằng file danh sách email.</i><br/>
        <i>Sinh viên được thêm vào lớp phải có tài khoản VNU được cấp bởi admin của hệ thống.</i><br/><br/>
        <UploadForm columns={upload_form} formurl={classWrapper.curClass != null ? "http://localhost:3000/api/classes/" + classWrapper.curClass.class_id + "/members/import/" : ""}/> 
        <br/><br/>
        </div>
        
    )
}
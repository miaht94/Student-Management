import React ,{useEffect, useState} from 'react';
import 'antd/dist/antd.css';
import { Form, Input, Button, Divider} from 'antd';
import { useClassWrapper } from '_helpers';

export {DownloadForm} 

function DownloadForm(props) {

    const [form] = Form.useForm();

    function handleSubmit() {
        form.validateFields()
        .then((values) => {
            console.log(props.classId)
            console.log(values.semesterId);
            var generated = "http://localhost:8081/api/scores/download/" + props.classId + "/" + values.semesterId;
            openInNewTab(generated);
        })
    };

    const openInNewTab = (url) => {
        const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
        if (newWindow) newWindow.opener = null
    }

    return (
        <div>
            <h6> Nhập mã kì học </h6>
            <Form
                form = {form}
                layout="vertical"
                name="downloadform"
                initialValues={{
                    modifier: 'public',
                }}
            >
        <i>Nhập mã kì học gồm 5 chữ số.</i><br/>
        <i>Ví dụ: 20201,20202...</i><br/><br/>
          <Form.Item
            name="semesterId"
            label="Mã kì học:"
            rules={[
              {
                required: true,
                message: 'Ghi mã kì học ở đây',
              },
              {
                number: true,
                message: 'Chỉ được nhập chữ số',
              },
              {
                maxLength: 5,
                message: 'Số kí tự không hợp lệ',
              }
            ]}
            >
            <Input />
          </Form.Item>
          {/* <p>Thêm nhiều sinh viên cách nhau bằng dấu ',' </p>
          <p>Sinh viên được thêm vào lớp phải có tài khoản VNU được cấp bởi admin của hệ thống. </p> */}
          <Form.Item label=" " colon={false}>
                        <Button type="primary" htmlType="submit" onClick = {handleSubmit}>
                            Tải bảng điểm của kì học
                        </Button>
                    </Form.Item>
        </Form>
        </div>
        
    )
}
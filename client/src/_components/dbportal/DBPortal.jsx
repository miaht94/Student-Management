import { useRecoilState } from 'recoil';
import React ,{useEffect } from 'react';
import { UploadForm } from './UploadForm';
import { Row, Col } from 'antd';

export { DBPortal };

var upload_form_semester = [
    {
      title: 'Mã kỳ học',
      dataIndex: 'semester_id',
      key: 'semester_id',
    },
    {
      title: 'Tên kỳ học',
      dataIndex: 'semester_name',
      key: 'semester_name',
    },
    {
      title: 'Lỗi',
      dataIndex: 'error',
      key: 'error',
    },
  ];
  var upload_form_subject = [
    {
      title: 'Tên môn học',
      dataIndex: 'subject_name',
      key: 'subject_name',
    },
    {
      title: 'Mã môn học',
      dataIndex: 'subject_code',
      key: 'subject_code',
    },
    {
        title: 'Số tín chỉ',
        dataIndex: 'credits_number',
        key: 'credits_number',
      },
    {
      title: 'Lỗi',
      dataIndex: 'error',
      key: 'error',
    },
  ];

  var upload_score_student = [
    {
        title: 'Mã sinh viên',
        dataIndex: 'vnu_id',
        key: 'vnu_id',
    },
    {
        title: 'Mã môn học',
        dataIndex: 'subject_code',
        key: 'subject_code',
    },
    {
        title: 'Điểm',
        dataIndex: 'score',
        key: 'score',
    },
    {
        title: 'Mã kỳ học',
        dataIndex: 'semester_id',
        key: 'semester_id',
    },
    {
        title: 'Lỗi',
        dataIndex: 'error',
        key: 'error',
    },
  ]
  var upload_form_student = [
    {
      title: 'Ngày sinh',
      dataIndex: 'date_of_birth',
      key: 'date_of_birth',
    },
    {
      title: 'Tên',
      dataIndex: 'name',
      key: 'name',
    },
    {
        title: 'Vai trò',
        dataIndex: 'role',
        key: 'role',
    },
    {
        title: 'Quê quán',
        dataIndex: 'location',
        key: 'location',
    },
    {
        title: 'VNU-ID',
        dataIndex: 'vnu_id',
        key: 'vnu_id',
    },
    {
        title: 'Username',
        dataIndex: 'username',
        key: 'username',
    },
    {
        title: 'Password',
        dataIndex: 'password',
        key: 'password',
    },
    {
        title: 'Giới tính',
        dataIndex: 'gender',
        key: 'gender',
    },
    {
        title: 'Số điện thoại',
        dataIndex: 'phone_number',
        key: 'phone_number',
    },
    {
      title: 'Lỗi',
      dataIndex: 'error',
      key: 'error',
    },
  ];
  var upload_form_teacher = [
    {
      title: 'Ngày sinh',
      dataIndex: 'date_of_birth',
      key: 'date_of_birth',
    },
    {
      title: 'Tên',
      dataIndex: 'name',
      key: 'name',
    },
    {
        title: 'Vai trò',
        dataIndex: 'role',
        key: 'role',
    },
    {
        title: 'VNU-ID',
        dataIndex: 'vnu_id',
        key: 'vnu_id',
    },
    {
        title: 'Username',
        dataIndex: 'username',
        key: 'username',
    },
    {
        title: 'Password',
        dataIndex: 'password',
        key: 'password',
    },
    {
        title: 'Giới tính',
        dataIndex: 'gender',
        key: 'gender',
    },
    {
        title: 'Số điện thoại',
        dataIndex: 'phone_number',
        key: 'phone_number',
    },
    {
      title: 'Lỗi',
      dataIndex: 'error',
      key: 'error',
    },
  ];

  var upload_form_status = [
    {
        title: 'VNU-ID',
        dataIndex: 'vnu_id',
        key: 'vnu_id',
    },
    {
        title: 'Trạng thái',
        dataIndex: 'status',
        key: 'status',
    },
    
    {
        title: 'Lỗi',
        dataIndex: 'error',
        key: 'error',
    },

  ]
function DBPortal() {
    return (
        <div className="p-4" style = {{overflow : "auto"}}>
            <h3> Quản lý cơ sở dữ liệu</h3>
            <i> Nơi tải lên dữ liệu sinh viên, điểm số, kì học dành cho Cố vấn học tập </i>
            <br/>
            <br/>

            <Row>
            <Col flex="300px">
                <h4> Danh sách CVHT </h4>
                <i> Tải danh sách tài khoản và thông tin Cố vấn học tập lên hệ thống. </i>
                <br/><br/> <UploadForm columns={upload_form_teacher} formurl="http://localhost:3000/api/upload/dscv"/> <br/>
            </Col>
            <Col flex="300px">
                <h4> Danh sách sinh viên </h4>
                <i> Tải danh sách tài khoản và thông tin sinh viên lên hệ thống.</i>
                <br/><br/> <UploadForm columns={upload_form_student} formurl="http://localhost:3000/api/upload/dssv"/> <br/>
                <i><b>Lưu ý:</b> Các sinh viên sẽ chưa được thêm lớp. Yêu cầu CVHT tạo lớp và thêm tại bảng Thông tin SV. </i>
                <br/>
            </Col>
            <Col flex="300px">
                <h4> Danh sách môn học </h4>
                <i> Tải danh sách môn học lên hệ thống.</i>
                <br/><br/><UploadForm columns={upload_form_subject} formurl="http://localhost:3000/api/upload/dsmh"/>
            </Col>
            <Col flex="auto"></Col>
            </Row>

            <br/>
            <br/>
            <Row>
            <Col flex="300px">
                <h4> Danh sách kì học </h4>
                <i> Tải danh sách kì học lên hệ thống.</i>
                <br/><br/> <UploadForm columns={upload_form_semester} formurl="http://localhost:3000/api/semesters/upload"/>
            </Col>
            <Col flex="300px">
                <h4> Cập nhật bảng điểm </h4>
                <i> Tải danh sách bảng điểm của sinh viên lên hệ thống.</i>
                <br/><br/><UploadForm columns={upload_score_student} formurl="http://localhost:3000/api/scores/import"/>
            </Col>
            <Col flex="300px">
                <h4> Cập nhật tình trạng </h4>
                <i> Tải danh sách tình trạng sinh viên lên hệ thống.</i>
                <br/><br/><UploadForm columns={upload_form_status} formurl="http://localhost:3000/api/status/import"/>
            </Col>
            <Col flex="auto"></Col>
            </Row>

           
        </div>
    )
}
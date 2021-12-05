import { useRecoilState } from 'recoil';
import React ,{useEffect } from 'react';
import { UploadForm } from './UploadForm';
import { Row, Col } from 'antd';

export { DBPortal };


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
                <br/><br/> <UploadForm formurl="http://localhost:3000/api/upload/dscv"/> <br/>
            </Col>
            <Col flex="300px">
                <h4> Danh sách sinh viên </h4>
                <i> Tải danh sách tài khoản và thông tin sinh viên lên hệ thống.</i>
                <br/><br/> <UploadForm formurl="http://localhost:3000/api/upload/dssv"/> <br/>
                <i><b>Lưu ý:</b> Các sinh viên sẽ chưa được thêm lớp. Yêu cầu CVHT tạo lớp và thêm tại bảng Thông tin SV. </i>
                <br/>
            </Col>
            <Col flex="300px">
                <h4> Danh sách môn học </h4>
                <i> Tải danh sách môn học lên hệ thống.</i>
                <br/><br/><UploadForm formurl="http://localhost:3000/api/upload/dsmh"/>
            </Col>
            <Col flex="auto"></Col>
            </Row>

            <br/>
            <br/>
            <Row>
            <Col flex="300px">
                <h4> Danh sách kì học </h4>
                <i> Tải danh sách kì học lên hệ thống.</i>
                <br/><br/> <UploadForm formurl="http://localhost:3000/api/semesters/upload"/>
            </Col>
            <Col flex="300px">
                <h4> Cập nhật bảng điểm </h4>
                <i> Tải danh sách bảng điểm của sinh viên lên hệ thống.</i>
                <br/><br/><UploadForm formurl="http://localhost:3000/api/scores/import"/>
            </Col>
            <Col flex="300px">
                <h4> Cập nhật tình trạng </h4>
                <i> Tải danh sách tình trạng sinh viên lên hệ thống.</i>
                <br/><br/><UploadForm formurl="http://localhost:3000/api/status/import"/>
            </Col>
            <Col flex="auto"></Col>
            </Row>

           
        </div>
    )
}
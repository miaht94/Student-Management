import { Link } from 'react-router-dom';
import { useRecoilValue, useRecoilState } from 'recoil';
import {useEffect, useState} from 'react'
import { authAtom } from '_state';
import { useAuthWrapper, useClassWrapper } from '_helpers';
import { classPickerVisibleAtom } from '_state';
import {Redirect} from 'react-router-dom';
import {Button, Card , Row, Col} from 'antd';

import {
    UserOutlined,
    MessageTwoTone,
    BellTwoTone,
    InfoCircleTwoTone,
    AppstoreTwoTone,
    DashboardTwoTone,
    LayoutTwoTone,
    LeftCircleTwoTone,
    HddTwoTone
} from '@ant-design/icons';
import { useUserActions } from '_actions';

export { StuHome };



function StuHome() {
    const userData = JSON.parse(localStorage.getItem("userData"));
    const classWrapper = useClassWrapper();
    const userActions = useUserActions();
    const [teacherState, setTeacherState] = useState({
        name: 'Nguyễn Việt Anh', 
        email: "koyomihatsune@outlook.jp",
        role: 'teacher',
        gender: 'male',
        phone_number: '02938278424',
        vnu_id: '',
    });
    
    useEffect(() =>{
        console.log("Reconstruct StuHome");
        async function initStuHome(){
            var response = await classWrapper.getCurrentClassTeacherInfo();
            console.log(response);
            if ("vnu_id" in response) {
                setTeacherState(response);
            }
            console.log(teacherState);
        }
        initStuHome();        
    },[]);

    return (userData.role && <>
    
            {(userData.role === "student") && 
                <>
                    <div className="p-4">
                        <div className="container">
                            <h3>Chào mừng đến với Ứng dụng Quản lý Sinh viên - Cố vấn học tập!</h3>
                            <br/>
                            <Row>
                            <Col flex='520px'>
                                        <Link to={`/profile`}>
                                        <Card hoverable style={{ width: 500, height: 310 }}>
                                            <h5>Thông tin cá nhân</h5>
                                            <h3>{userData.name}</h3><br/>
                                            Vai trò<br/>
                                            <h4>{userData.role == "student"? "Sinh viên" : "Cố vấn học tập"}</h4>
                                            Lớp hiện tại<br/>
                                            <h4>{classWrapper.curClass? classWrapper.curClass.class_name : "Vui lòng chọn lớp để bắt đầu" }</h4>
                                        </Card></Link>
                            </Col>
                            <Col flex='200px'>
                                <Row>  
                                    <Card style={{ width: 240, height: 145}} hoverable>
                                        <Link to={`/profile`}>
                                        <UserOutlined twoToneColor="#205ec9"style={{ fontSize: '40px', display: 'inline-block', verticalAlign: 'middle' }}/>
                                        <br/><br/><h5>Thông tin cá nhân</h5>
                                        </Link>
                                    </Card>
                                </Row>
                                <br/>
                                {/* For tuition fee status */}
                                <Row>  
                                    <Card style={{ width: 240, height: 145}} hoverable onClick={userActions.logout}>
                                        <LeftCircleTwoTone twoToneColor="#cf1b4b"style={{ fontSize: '40px', display: 'inline-block', verticalAlign: 'middle' }}/>
                                        <br/><br/><h5>Đăng xuất</h5>
                                    </Card>
                                </Row>
                            </Col>
                            </Row>
                            <br/><br/>

                            {(classWrapper.curClass) &&
                                <>
                                    <h4>Cố vấn học tập & theo dõi điểm</h4>
                                    <Row>
                                        <Col flex='520px'>
                                            <Card hoverable style={{ width: 500, height: 520 }}>
                                                <h5>Thông tin Cố vấn học tập</h5>
                                                <h3>{teacherState.name}</h3><br/>
                                                Vai trò<br/>
                                                <h4>{teacherState.role == "student"? "Sinh viên" : "Cố vấn học tập"}</h4>
                                                Số điện thoại<br/>
                                                <h4>{teacherState.phone_number}</h4>
                                                Email<br/>
                                                <h4>{teacherState.email}</h4>
                                            </Card>
                                        </Col>
                                        <Col flex='200px'>
                                            <Row>  
                                                <Link to={`/${classWrapper.curClass.class_id}/feed`}>
                                                <Card hoverable style={{ width: 240 }}>
                                                <BellTwoTone twoToneColor="#c98e20"style={{ fontSize: '30px', display: 'inline-block', verticalAlign: 'middle' }}/>
                                                <br/><br/><h4>Diễn đàn</h4>
                                                </Card></Link>
                                            </Row>
                                            <br/>
                                            {/* For tuition fee status */}
                                            <Row>  
                                                <Link to={`/chat/${teacherState.vnu_id}`}>
                                                    <Card hoverable style={{ width: 240 }}>
                                                    <MessageTwoTone twoToneColor="#5e20c9"style={{ fontSize: '30px', display: 'inline-block', verticalAlign: 'middle' }}/>
                                                    <br/><br/><h4>Nhắn tin với cố vấn học tập</h4>
                                                </Card></Link>
                                            </Row>
                                            <br/>
                                            {/* For tuition fee status */}
                                            <Row>  
                                                <Link to={`/personalscore`}>
                                                <Card hoverable style={{ width: 240 }}>
                                                    <InfoCircleTwoTone twoToneColor="#52c41a"style={{ fontSize: '30px', display: 'inline-block', verticalAlign: 'middle' }}/>
                                                    <br/><br/><h4>Bảng điểm cá nhân</h4>
                                                    </Card></Link>
                                            </Row>
                                        </Col>
                                        </Row>                                    
                                    <Row>
                                    <Col flex='260px'>
                                        
                                    </Col>
                                    <Col flex='260px'>
                                        
                                    </Col>
                                    </Row>
                                                                        
                                </>
                            }

                            
                            <br/>
                            <b>Ứng dụng Quản lý Sinh viên - Cố vấn học tập</b><br/>
                            <b>Bài tập lớn môn Lập trình ứng dụng Web</b><br/>
                            <b>Thực hiện bởi:</b> {" Trần Xuân Bách, Đặng Thế Hoàng Anh, Nguyễn Việt Anh, Hoàng Hữu Bách, Nguyễn Bá Anh Tuấn"}
                            
                            <br/>
                        </div>
                    </div>
                </>
            }
        </>)
}
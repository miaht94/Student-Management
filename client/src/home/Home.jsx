import { Link } from 'react-router-dom';
import { useRecoilValue, useRecoilState } from 'recoil';
import {useEffect, useState} from 'react'
import { authAtom } from '_state';
import { useAuthWrapper, useClassWrapper } from '_helpers';
import { classPickerVisibleAtom } from '_state';
import {Redirect} from 'react-router-dom';
import {Button, Card , Row, Col} from 'antd';

import {
    HomeOutlined,
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

export { Home };



function Home() {
    const [drawerVisible, setDrawerVisible] = useRecoilState(classPickerVisibleAtom);
    const authWrapper = useAuthWrapper()
    const userData = JSON.parse(localStorage.getItem("userData"));
    const [studentFirstClassLoaded, setStudentFirstClassLoaded] = useState(false);
    const classWrapper = useClassWrapper();
    const userActions = useUserActions();
    

    const onClick = () => {
        classWrapper.getClassList();
        setDrawerVisible(true);
    };

    useEffect(() => {
        
        async function loadFirstClassForStudent(){
            console.log(userData)
            if (userData.role == "student") {
               
                // choose first class if student
                await classWrapper.chooseClassById(null);
                setStudentFirstClassLoaded(true);
                
            }
        }
        loadFirstClassForStudent()
    }) 
    return (userData.role && <>
    
            {(userData.role === "teacher") && 
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
                                    <Card style={{ width: 240, height: 145}} onClick = {onClick} hoverable>
                                        <AppstoreTwoTone twoToneColor="#205ec9"style={{ fontSize: '40px', display: 'inline-block', verticalAlign: 'middle' }}/>
                                        <br/><br/><h5>{classWrapper.curClass ? "Đổi lớp" : "Chọn lớp"}</h5>
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
                                    <h4>Tiện ích liên lạc </h4>
                                    <Row>
                                    <Col flex='260px'>
                                        <Link to={`/${classWrapper.curClass.class_id}/studentinfo`}>
                                        <Card hoverable style={{ width: 240 }}>
                                            <InfoCircleTwoTone twoToneColor="#206cc9"style={{ fontSize: '30px', display: 'inline-block', verticalAlign: 'middle' }}/>
                                            <br/><br/><h4>Thông tin liên hệ</h4>
                                        </Card></Link>
                                    </Col>
                                    <Col flex='260px'>
                                        <Link to={`/${classWrapper.curClass.class_id}/feed`}>
                                        <Card hoverable style={{ width: 240 }}>
                                            <BellTwoTone twoToneColor="#c98e20"style={{ fontSize: '30px', display: 'inline-block', verticalAlign: 'middle' }}/>
                                            <br/><br/><h4>Diễn đàn</h4>
                                        </Card></Link>
                                    </Col>
                                    <Col flex='260px'>
                                        <Link to={`/chat`}>
                                        <Card hoverable style={{ width: 240 }}>
                                            <MessageTwoTone twoToneColor="#5e20c9"style={{ fontSize: '30px', display: 'inline-block', verticalAlign: 'middle' }}/>
                                            <br/><br/><h4>Nhắn tin</h4>
                                        </Card></Link>
                                    </Col>
                                    </Row>
                                    <br/><br/>
                                    <h4>Tiện ích theo dõi & thống kê</h4>
                                    <Row>
                                    <Col flex='260px'>
                                        <Link to={`/${classWrapper.curClass.class_id}/dashboard`}>
                                        <Card hoverable style={{ width: 240 }}>
                                            <DashboardTwoTone twoToneColor="#52c41a"style={{ fontSize: '30px', display: 'inline-block', verticalAlign: 'middle' }}/>
                                            <br/><br/><h4>Bảng theo dõi</h4>
                                        </Card></Link>
                                    </Col>
                                    
                                    <Col flex='260px'>
                                        <Link to={`/${classWrapper.curClass.class_id}/studentscore`}>
                                        <Card hoverable style={{ width: 240 }}>
                                            <LayoutTwoTone twoToneColor="#52c41a"style={{ fontSize: '30px', display: 'inline-block', verticalAlign: 'middle' }}/>
                                            <br/><br/><h4>Bảng điểm</h4>
                                        </Card></Link>
                                    </Col>
                                    <Col flex='260px'>
                                        <Link to={`/dbportal`}>
                                        <Card hoverable style={{ width: 240 }}>
                                            <HddTwoTone twoToneColor="#52c41a"style={{ fontSize: '30px', display: 'inline-block', verticalAlign: 'middle' }}/>
                                            <br/><br/><h4>Quản lý CSDL</h4>
                                        </Card></Link>
                                    </Col>
                                    </Row>
                                                                        
                                </>
                            }

                            
                            <br/>
                            <b>Website Quản lý Sinh viên - Cố vấn học tập</b><br/>
                            <b>Bài tập lớn môn Lập trình ứng dụng Web</b><br/>
                            <b>Thực hiện bởi:</b> {" Trần Xuân Bách, Đặng Thế Hoàng Anh, Nguyễn Việt Anh, Hoàng Hữu Bách, Nguyễn Bá Anh Tuấn"}
                            
                            <br/>
                        </div>
                    </div>
                </>
            }
            {(userData.role === "student") && 
                <>
                    {(studentFirstClassLoaded && !classWrapper.curClass) &&
                        <>
                            <div className="p-4">
                                <div className="container">
                                    <h1>Xin chào, bạn là sinh viên nhưng chưa có lớp!</h1><br>
                                    </br>
                                    <h5>Vui lòng liên hệ với admin hệ thống và nhà trường để được thêm vào trang lớp học của bạn.</h5>
                                </div>
                            </div>
                        </>
                    }
                </>
            }
            {(studentFirstClassLoaded && classWrapper.curClass) &&
                <>
                    <Redirect from="*" to={`/stuhome`} />
                </>
            }
            
            {(userData.role === "admin") && 
                <>
                    <div className="p-4">
                        <div className="container">
                            <h1>Xin chào Admin!</h1>
                        </div>
                    </div>
                </>
            }
        </>)
}
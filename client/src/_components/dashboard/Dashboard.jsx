import { useRecoilState } from 'recoil';
import React ,{useEffect, useState } from 'react';
import { dashboardGPAAtom, studentsAtom, scoreAtom, profileAtom } from '_state';
import { BachComponent } from '_components/subcomponents';
import { InfoCircleOutlined} from '@ant-design/icons';
import { Link } from 'react-router-dom';

import { GPADash } from '_components/dashboard';
import { StatisticBoard } from '_components/dashboard';
import { Row, Col, Card, Button } from 'antd';
import { useStudentScoreAction } from '_actions';
import { useClassWrapper } from '_helpers';

export { Dashboard };


function Dashboard() {
    const [student, setstudent] = useRecoilState(studentsAtom);
    const [score, setScore] = useRecoilState(scoreAtom);
    const classWrapper = useClassWrapper();
    const studentScoreAction = useStudentScoreAction();
    const userData = JSON.parse(localStorage.getItem("userData"));
    // const [profile,setProfile] = useRecoilState(profileAtom);

    const [dashProperties, setDashProperties] = useState({
        className: "Không hiển thị được tên lớp",
        teacherName: "Không hiển thị được tên CVHT",
        studentCount: 0,
        studentThieuTinChi: 0,
        studentThieuHocPhi: 0,
        classID: ""
    })

    useEffect(() =>{
        console.log("Reconstruct GPADash")
        async function initDashboard() {
            var classNameTemp = classWrapper.curClass.class_name;
            var classIDTemp = classWrapper.curClass.class_id;
            var teacherNameTemp = userData.name;
            var studentCountTemp = 0;
            var studentThieuTinChiTemp = 0;
            var studentThieuHocPhiTemp = 0;
            if ("length" in student) studentCountTemp = student.length;
            if (score!= null) {
                if (score!= "You are not teacher in this class")  {
                    console.log(score);
                    score.forEach(object => {
                        if (object.status.includes("Chưa nộp học phí")) studentThieuHocPhiTemp++;
                        if (object.status.includes("Chưa đủ tín")) studentThieuTinChiTemp++;
                    })
                }
            }
            // console.log(student);
            setDashProperties({
                className : classNameTemp,
                teacherName : teacherNameTemp,
                studentCount : studentCountTemp,
                studentThieuTinChi: studentThieuTinChiTemp,
                studentThieuHocPhi: studentThieuHocPhiTemp,
                classID : classIDTemp
            });
        };
        initDashboard();
    },[classWrapper.curClass]);

    return (
        <div className="p-4" style = {{overflow : "auto"}}>
            <center style =  {{padding : -0.25}}>
                <Card title="Bảng theo dõi" style={{ width: 1200 , height: 1400 , overflow: 'auto' }}>
                    <Row justify = "center">
                        {/* For Class name renderer */}
                        <Col>
                            <div className="p-4">
                                <Card style={{width: 600, height: 220}} hoverable>
                                    <span style={{"font-size": '17px'}}>Lớp hiện tại</span><br/>
                                    <h3>{dashProperties.className}</h3><br/>
                                    <span style={{"font-size": '17px'}}>Cố vấn học tập</span>
                                    <h3>{dashProperties.teacherName}</h3><br/>
                                </Card>
                            </div>
                        </Col>
                        {/* For Class student number renderer */}
                        <Col>
                            <div className="p-4">
                                <Card style={{width: 300, height: 220}} hoverable>
                                    <span style={{"font-size": '17px'}}>Sĩ số lớp</span><br/>
                                    <span style={{"font-size": '48px', "line-height": 'normal' }}>{dashProperties.studentCount}</span><br/>
                                    <span style={{"font-size": '27px', "line-height": 'normal' }}> sinh viên</span><br/> <br/>
                                    <Link to={`/${dashProperties.classID}/studentinfo`}>
                                        <Button icon={<InfoCircleOutlined />}>Xem danh sách</Button>
                                    </Link>
                                    
                                </Card>
                            </div>
                        </Col>
                    </Row>
                    <Row justify = 'center'>
                        <Col>
                            <GPADash score = {score}>
                            </GPADash>
                        </Col>
                        <Col>
                            <div className="p-4">
                                {/* For Class warning  status renderer */}
                                <Row>  
                                    <Card style={{ width: 300, height: 220}} hoverable>
                                        <span style={{"font-size": '17px'}}>Sinh viên thiếu tín chỉ</span><br/>
                                        <span style={{"font-size": '48px', "line-height": 'normal' }}>{dashProperties.studentThieuTinChi}</span><br/>
                                        <span style={{"font-size": '27px', "line-height": 'normal' }}> sinh viên</span><br/> <br/>
                                        <Link to={`/${dashProperties.classID}/studentscore`}>
                                        <Button icon={<InfoCircleOutlined />}>Xem tình trạng</Button>
                                        </Link>
                                    </Card>
                                </Row>
                                {/* For tuition fee status */}
                                <Row>  
                                    <Card style={{ width: 300, height: 220}} hoverable>
                                        <span style={{"font-size": '17px'}}>Sinh viên thiếu học phí</span><br/>
                                        <span style={{"font-size": '48px', "line-height": 'normal' }}>{dashProperties.studentThieuHocPhi}</span><br/>
                                        <span style={{"font-size": '27px', "line-height": 'normal' }}> sinh viên</span><br/> <br/>
                                        <Link to={`/${dashProperties.classID}/studentscore`}>
                                        <Button icon={<InfoCircleOutlined />}>Xem tình trạng</Button>
                                        </Link>
                                    </Card>
                                </Row>

                            </div>
                        </Col>
                    </Row>
                    <StatisticBoard score = {score}>
                    </StatisticBoard>
                </Card>
            </center>
        </div>
    )
}

const data = [
    {
        "_id": "618954e38d701d9ce220efd6",
        "user_ref": {
            "_id": "61890aee03ab0fa21bc50227",
            "name": "Nguyễn Việt Anh",
            "role": "teacher",
            "location": "ABC",
            "date_of_birth": 1636466043,
            "email": "bach2@gmail.com",
            "vnu_id": "19021212",
            "__v": 0
        },
        "scores": [
            {
                "_id": "618954e38d701d9ce220efd8",
                "score": 9,
                "subject": {
                    "_id": "6189109103ab0fa21bc50255",
                    "subject_name": "Mon 1",
                    "subject_code": "INT1100",
                    "credits_number": 3,
                    "__v": 0
                },
                "__v": 0
            },
            {
                "_id": "618954e38d701d9ce220effc",
                "score": 8,
                "subject": {
                    "_id": "6189109103ab0fa21bc50257",
                    "subject_name": "Mon 2",
                    "subject_code": "INT1111",
                    "credits_number": 4,
                    "__v": 0
                },
                "__v": 0
            }
        ],
        "__v": 2
    },
    {
        "_id": "618954e38d701d9ce220efdf",
        "user_ref": {
            "_id": "61890b1703ab0fa21bc5023f",
            "name": "Trần Xuân Bách",
            "role": "student",
            "location": "ABC",
            "date_of_birth": 1037197791,
            "email": "bach2@gmail.com",
            "vnu_id": "19021222",
            "__v": 0
        },
        "scores": [
            {
                "_id": "618954e38d701d9ce220efe1",
                "score": 7,
                "subject": {
                    "_id": "6189109103ab0fa21bc50255",
                    "subject_name": "Mon 1",
                    "subject_code": "INT1100",
                    "credits_number": 3,
                    "__v": 0
                },
                "__v": 0
            },
            {
                "_id": "618954e38d701d9ce220f005",
                "score": 8,
                "subject": {
                    "_id": "6189109103ab0fa21bc50257",
                    "subject_name": "Mon 2",
                    "subject_code": "INT1111",
                    "credits_number": 4,
                    "__v": 0
                },
                "__v": 0
            }
        ],
        "__v": 2
    },
    {
        "_id": "618954e38d701d9ce220efe8",
        "user_ref": {
            "_id": "61890aee03ab0fa21bc5022d",
            "name": "Đặng Thế Hoàng Anh",
            "role": "teacher",
            "location": "XYZ",
            "date_of_birth": 1636986616,
            "email": "doanxem3@gmail.com",
            "vnu_id": "19021215",
            "__v": 0
        },
        "scores": [
            {
                "_id": "618954e38d701d9ce220efea",
                "score": 5,
                "subject": {
                    "_id": "6189109103ab0fa21bc50255",
                    "subject_name": "Mon 1",
                    "subject_code": "INT1100",
                    "credits_number": 3,
                    "__v": 0
                },
                "__v": 0
            },
            {
                "_id": "618954e38d701d9ce220f00e",
                "score": 8,
                "subject": {
                    "_id": "6189109103ab0fa21bc50257",
                    "subject_name": "Mon 2",
                    "subject_code": "INT1111",
                    "credits_number": 4,
                    "__v": 0
                },
                "__v": 0
            }
        ],
        "__v": 2
    },{
        "_id": "618954e38d701d9ce220eff1",
        "user_ref": {
            "_id": "61890aee03ab0fa21bc50233",
            "name": "Hoàng Hữu Bách",
            "role": "teacher",
            "location": "IJK",
            "date_of_birth": 1636383440,
            "email": "doanxem4@gmail.com",
            "vnu_id": "19022222",
            "__v": 0
        },
        "scores": [
            {
                "_id": "618954e38d701d9ce220eff3",
                "score": 3,
                "subject": {
                    "_id": "6189109103ab0fa21bc50255",
                    "subject_name": "Mon 1",
                    "subject_code": "INT1100",
                    "credits_number": 3,
                    "__v": 0
                },
                "__v": 0
            },
            {
                "_id": "618954e38d701d9ce220f017",
                "score": 8,
                "subject": {
                    "_id": "6189109103ab0fa21bc50257",
                    "subject_name": "Mon 2",
                    "subject_code": "INT1111",
                    "credits_number": 4,
                    "__v": 0
                },
                "__v": 0
            }
        ],
        "__v": 2
    },

]
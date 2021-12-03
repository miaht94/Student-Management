import { useRecoilState, atom, useResetRecoilState } from 'recoil';
import React ,{useEffect } from 'react';
import { dashboardGPAAtom, dashboardLevelGPAAtom, dashboardFilterGPAAtom, dashboardGPAStatusAtom, dashboardLevelStatusAtom } from '_state';
import { Card} from 'antd';
import {BarChart, Legend, XAxis, YAxis, CartesianGrid, Tooltip, Bar, ResponsiveContainer} from 'recharts'
import { Button, Row, List, Select } from 'antd';
import { object } from 'yup/lib/locale';


export { StatisticBoard };


function StatisticBoard() {
  const [GPAstate, setGPAState] = useRecoilState(dashboardGPAAtom);
  const [levelGPAstate, setlevelGPAState] = useRecoilState(dashboardLevelGPAAtom);
  const [filterState, setFilterState] = useRecoilState(dashboardFilterGPAAtom);
  const resetLevelGPAState = useResetRecoilState(dashboardLevelGPAAtom);
    // Data for GPA state setting
    var refinedData = [];

    useEffect(() => {
      // Normal: Bình thường
      // Warning: Canh cáo
      // Expelling: Đuổi học
      var tempLevel = {Normal: 0, Warning: 0, Expelling: 0}
      
      data.forEach(object => {
        var vnu_id = object.user_ref.vnu_id;
        var name = object.user_ref.name;
        var email = object.user_ref.email;
        var scoreObj = object.scores;  
        var GPA = 0;
        var totalCredit = 0;
        var totalScore = 0;
        console.log(vnu_id);
        scoreObj.forEach(scoreElement => { 
            totalCredit += scoreElement.subject.credits_number;
            totalScore += scoreElement.subject.credits_number*scoreElement.score;            
        });
        GPA = totalScore/totalCredit;
        GPA = (GPA/10*4).toFixed(2);
        
        refinedData.push({
            vnu_id: vnu_id,
            name: name,
            email: email,
            gpa: GPA
        })

        console.log(GPA);
        tempLevel.Normal = (GPA<=4.0 && GPA> 2.51) ? tempLevel.Normal+1 : tempLevel.Normal;
        tempLevel.Warning = (GPA<=2.5 && GPA> 1) ? tempLevel.Warning+1 : tempLevel.Warning;
        tempLevel.Expelling = (GPA<=1 && GPA!= 0 ) ? tempLevel.Expelling+1 : tempLevel.Expelling;
        });
      var levelVisualized = [];
      levelVisualized.push({name: 'Bình thường', value: tempLevel.Normal});
      levelVisualized.push({name: 'Cảnh cáo', value: tempLevel.Warning});
      levelVisualized.push({name: 'Đuổi học', value: tempLevel.Expelling});

      var levelPush = {
        data: levelVisualized
      }
      //setlevelGPAState(levelPush);
      //setGPAState(refinedData);
      console.log();
    });
    return (
        <div className="p-4">
            <Card title = "Thống kê tình hình học tập" style={{width: 960, height: 400,}}>
                <Row justify="center">
                    <BarChart   width={640} height={300} 
                                data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        {/* Phần này t chưa thử điều chỉnh param của bar,
                        m cứ load data bằng cái atom vào cho t đã rồi t làm tiếp */}
                        <Bar dataKey="pv" fill="#8884d8" />
                        <Bar dataKey="uv" fill="#82ca9d" />
                    </BarChart>
                </Row>
            </Card>
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
    },
    {
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
    }
]
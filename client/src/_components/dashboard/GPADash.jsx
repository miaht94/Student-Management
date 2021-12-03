import { useRecoilState, atom, useResetRecoilState } from 'recoil';
import React ,{useEffect, useState } from 'react';
import { dashboardGPAAtom, dashboardLevelGPAAtom, dashboardFilterGPAAtom, scoreAtom} from '_state';
import { PieChart, Pie, Sector, Cell,Tooltip, ResponsiveContainer } from 'recharts';
import {useStudentScoreAction} from '_actions';

import { Card} from 'antd';

import { Button, Row, List, Select } from 'antd';

const { Option } = Select;

export { GPADash };

const COLORS = ['#2f77eb', '#2f93eb', '#2fbceb', '#2febcc', '#2feb8d', '#b9eb2f', '#e8eb2f', '#eb932f', '#eb2f2f'];

function GPADash(props) {
    const [GPAstate, setGPAState] = useRecoilState(dashboardGPAAtom);
    const [levelGPAstate, setlevelGPAState] = useRecoilState(dashboardLevelGPAAtom);
    const [filterState, setFilterState] = useState("nofilter");
    var refinedData = [];
    
    useEffect(() =>{
        console.log("Reconstruct GPADash")
        async function initGPADash() {
            // console.log("Score props");
            // console.log(props.score);

            var tempLevel = {
                Aplus: 0, A:0, Bplus: 0, B: 0, Cplus: 0, C: 0, Dplus:0, D:0, F:0 
            }
            if (props.score!=null) {
                props.score.forEach(object => {
                    var vnu_id = object.user_ref.vnu_id;
                    var name = object.user_ref.name;
                    var email = object.user_ref.email;
                    var scoreObj = object.scores;  
                    var GPA = 0;
                    var totalCredit = 0;
                    var totalScore = 0;
                    scoreObj.forEach(scoreElement => { 
                        totalCredit += scoreElement.subject.credits_number;
                        totalScore += scoreElement.subject.credits_number*scoreElement.score;            
                    });
                    GPA = totalScore/totalCredit;
                    GPA = (GPA/10*4).toFixed(2);
                    
                    if (filterState == "nofilter" ||  (filterState == "cchv" && GPA < 2.5) || (filterState == "duoihoc" && GPA < 1)) {
                        refinedData.push({
                            vnu_id: vnu_id,
                            name: name,
                            email: email,
                            gpa: GPA
                        })

                        tempLevel.Aplus = (GPA<=4.0 && GPA>=3.7) ? tempLevel.Aplus + 1 : tempLevel.Aplus;
                        tempLevel.A = (GPA<3.7 && GPA>3.5) ? tempLevel.A + 1 : tempLevel.A;
                        tempLevel.Bplus = (GPA<=3.5 && GPA>3.0) ? tempLevel.Bplus + 1 : tempLevel.Bplus;
                        tempLevel.B = (GPA<=3 && GPA>2.5) ? tempLevel.B + 1 : tempLevel.B;
                        tempLevel.Cplus = (GPA<=2.5 && GPA>2) ? tempLevel.Cplus + 1 : tempLevel.Cplus;
                        tempLevel.C = (GPA<=2 && GPA>1.5) ? tempLevel.C + 1 : tempLevel.C;
                        tempLevel.Dplus =  (GPA<=2 && GPA>1.5) ? tempLevel.Dplus + 1 : tempLevel.Dplus;
                        tempLevel.D =  (GPA<=1.5 && GPA>=1) ? tempLevel.D + 1 : tempLevel.D;
                        tempLevel.F = (GPA<1 && GPA>0) ? tempLevel.F + 1 : tempLevel.F;

                    }
                    
        
                    
                });
            }
            
           var levelVisualized = [];
           levelVisualized.push({name: 'A+', value: tempLevel.Aplus},{name: 'A', value: tempLevel.A});
           levelVisualized.push({name: 'B+', value: tempLevel.Bplus},{name: 'B', value: tempLevel.B});
           levelVisualized.push({name: 'C+', value: tempLevel.Cplus}, {name: 'C', value: tempLevel.C});
           levelVisualized.push({name: 'D+', value: tempLevel.Dplus}, {name: 'D', value: tempLevel.D});
           levelVisualized.push({name: 'F', value: tempLevel.F});
           var levelPush = {
               data: levelVisualized
           }
           refinedData.sort(function(a, b) {
            var keyA = a.gpa,
              keyB = b.gpa;
            if (keyA < keyB) return 1;
            if (keyA > keyB) return -1;
            return 0;
            });
           setlevelGPAState(levelPush);
           setGPAState(refinedData);
        };
        initGPADash();
        // console.log("LevelGPAState");
        // console.log(levelGPAstate);
    },[props.score, filterState]);
    
    
    function handleFilterChange(value) {
        setFilterState(value);
        console.log(filterState);
    }

    return (
            <div className="p-4">
                <Row wrap = 'true'>
                    <Card title="Trạng thái GPA" style={{ width: 300, height: 400 }}>
                    <PieChart width={800} height={200} margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
                        <Pie
                          data={levelGPAstate.data}
                          cx={120}
                          cy={100}
                          outerRadius={90}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {levelGPAstate.data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                    </PieChart>                                         
                    </Card>
                    <Card title="Lọc theo GPA" 
                    extra={<div> 
                        <Select defaultValue={filterState} style={{ width: 120 }} onChange={handleFilterChange} >
                            <Option value="nofilter">Không</Option>
                            <Option value="cchv">{"GPA<2.5"}</Option>
                            <Option value="duoihoc">{"GPA<1"}</Option>
                        </Select>                        
                    </div>} 
                    style={{ width: 300, height: 400 }}>
                    <div
                          id="scrollableDiv"
                          style={{
                            height: 300,
                            overflow: 'auto',
                            padding: '0 0px',
                          }}
                    >    
                        <List
                        dataSource={GPAstate}
                        renderItem={item => (
                            <List.Item key={item.vnu_id}>
                            <List.Item.Meta
                                title={item.name}
                                description={item.gpa}
                            />
                            <div>{item.GPA}</div>
                            </List.Item>
                        )}
                        />
                    </div>                    
                                                                    
                    </Card>
                </Row>
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
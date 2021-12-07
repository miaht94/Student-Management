import { useRecoilState, atom, useResetRecoilState } from 'recoil';
import React ,{useEffect, useState } from 'react';
import { dashboardGPAAtom, dashboardLevelGPAAtom, dashboardFilterGPAAtom, scoreAtom} from '_state';
import { PieChart, Pie, Sector, Cell,Tooltip, ResponsiveContainer } from 'recharts';
import {useStudentScoreAction} from '_actions';

import { Card} from 'antd';

import { Button, Row, List, Select } from 'antd';
import { useFetchWrapper } from '_helpers';

const { Option } = Select;

export { GPADash };

const COLORS = ['#2f77eb', '#2f93eb', '#2fbceb', '#2febcc', '#2feb8d', '#b9eb2f', '#e8eb2f', '#eb932f', '#eb2f2f'];

function GPADash(props) {
    const [GPAstate, setGPAState] = useRecoilState(dashboardGPAAtom);
    const [levelGPAstate, setlevelGPAState] = useRecoilState(dashboardLevelGPAAtom);
    const [filterState, setFilterState] = useState("nofilter");
    const [semFilterState, setSemFilterState] = useState("nofilter");
    const [semesterData, setSemesterData] = useState([]);
    var refinedData = [];
    const fetchWrapper = useFetchWrapper();
    
    useEffect(() =>{
        console.log("Reconstruct GPADash")

        async function getSemesterData(){
            var tempSem = [];
            let response = await fetchWrapper.get("http://localhost:3000/api/semesters/all", null, null);
            response = await response.json();
            console.log(response);
            if (response?.status === "Success"){
                for (const object of response.message ) {
                    tempSem.push({
                        label: object.semester_name,
                        value: object._id
                    })
                }
                setSemesterData(tempSem);
            }
        }

        async function initGPADash() {

            await getSemesterData();
            var tempLevel = {
                Aplus: 0, A:0, Bplus: 0, B: 0, Cplus: 0, C: 0, Dplus:0, D:0, F:0 
            }
            
            if (props?.score!=null) {
                if (props.score.length !== 0) {
                    console.log("Score for dashboard here");
                    console.log(props.score);
                    if (props.score!= "You are not teacher in this class")  {
                        for (const object of props.score ) {
                            var vnu_id = object.user_ref.vnu_id;
                            var name = object.user_ref.name;
                            var email = object.user_ref.email;
                            var scoreObj = object.scores;  
                            var GPA = 0;
                            var totalCredit = 0;
                            var totalScore = 0;
                            scoreObj.forEach(scoreElement => { 
                                if (semFilterState == "nofilter" ) {
                                    totalCredit += scoreElement.subject.credits_number;
                                    totalScore += scoreElement.subject.credits_number*scoreElement.score;
                                }
                                else {
                                    if (scoreElement.semester_id == semFilterState) {
                                        totalCredit += scoreElement.subject.credits_number;
                                        totalScore += scoreElement.subject.credits_number*scoreElement.score;
                                    }
                                }  
                            });
                            GPA = totalScore/totalCredit;
                            GPA = (GPA/10*4).toFixed(2);
                            
                            
                            if (GPA != "NaN" && (filterState == "nofilter" ||  (filterState == "cchv" && GPA < 2.5) || (filterState == "duoihoc" && GPA < 1))) {
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
                            console.log(refinedData);
                            
                        };
                    }
                    
                }
                
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
    },[props.score, filterState, semFilterState]);
    
    
    function handleFilterChange(value) {
        setFilterState(value);
        console.log(filterState);
    }
    function handleSemFilterChange(value) {
        setSemFilterState(value);
        console.log(semFilterState);
    }

    return (
            <div className="p-4">
                <Row wrap = 'true'>
                    <Card title="Trạng thái GPA" style={{ width: 300, height: 440 }}>
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
                    <b>Lọc theo GPA</b>
                    <br/>
                    <Select defaultValue={filterState} style={{ width: 180 }} onChange={handleFilterChange} >
                            <Option value="nofilter">Tất cả GPA</Option>
                            <Option value="cchv">{"GPA<2.5"}</Option>
                            <Option value="duoihoc">{"GPA<1"}</Option>
                    </Select> <br/><br/>
                    <b>Lọc theo kì</b>
                    <br/>
                    <Select defaultValue={semFilterState} style={{ width: 180 }} onChange={handleSemFilterChange} >
                        <Option value="nofilter">Tất cả các kì</Option>
                            {semesterData.map(({ label, value }) => (
                                <option key={value} value={value}>
                                    { label}
                                </option>
                            ))}
                    </Select>   
                    {/* <Select defaultValue={filterState} style={{ width: 120 }} data = {[{id}]}onChange={handleFilterChange} >
                            <Option value="nofilter">Không</Option>
                            <Option value="cchv">{"GPA<2.5"}</Option>
                            <Option value="duoihoc">{"GPA<1"}</Option>
                    </Select>                                       */}
                    </Card>
                    <Card title="Danh sách sinh viên" 
                    style={{ width: 300, height: 440 }}>
                    <div
                          id="scrollableDiv"
                          style={{
                            height: 340,
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
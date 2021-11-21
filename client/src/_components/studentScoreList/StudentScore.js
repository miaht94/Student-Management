import { useRecoilState, useRecoilValue } from 'recoil';
import React ,{useEffect, useState} from 'react';
import { useStudentScoreAction } from '_actions';
import { pscoreAtom } from '_state';
import 'antd/dist/antd.css';
import { Table, Button, Space, Input, Tag, Modal} from 'antd';

export { StudentScore };

function StudentScore(props) {
    const [personalScore, setPersonalScore] = useRecoilState(pscoreAtom);
    const studentScoreAction = useStudentScoreAction();

    var scoreboard = [];

    useEffect(() => {
        console.log(props.vnu_id);
        studentScoreAction.getScoreByID(props.vnu_id).then(newData =>{
            // console.log("newData");
            // console.log(personalScore);
            var fetchedScore = personalScore;
            fetchedScore.forEach(element => {
                scoreboard.push({
                    subject_name : element.subject.subject_name,
                    subject_code : element.subject.subject_code,
                    credit_number : element.subject.credits_number,
                    score : element.score
                })
            });
            console.log(scoreboard);
        }
    )
    }, [props.vnu_id]);


    const columns = [
        {
            title: 'Tên học phần',
            width: 120,
            dataIndex: 'subject_name',
            key: 'subject_name',
        },
        {
            title: 'Mã học phần',
            width: 80,
            dataIndex: 'subject_code',
            key: 'subject_code',
        },
        
        {
          title: 'Số tín chỉ',
          width: 50,
          dataIndex: 'credits_number',
          key: 'credits_number',
        },
        {
            title: 'Điểm hệ 10',
            width: 50,
            dataIndex: 'score',
            key: 'score',
        },
    ]

    return (
        <div>
           Nothing
            <Table
            columns={columns}
            dataSource={scoreboard}
            bordered
            scroll={{ x: "calc(700px + 50%)", y: 500 }}
            />
        </div>
    );
}
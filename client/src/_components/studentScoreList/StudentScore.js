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
    let data = personalScore;

    if (data == null) {
        studentScoreAction.getScoreByID(props.vnu_id).then( newData =>{
                console.log("NewData");
                data = newData;
                console.log(data);
            }
        )
    }


    // useEffect (() => {

    // },[data])

    const [state, setState] = useState({
        currentRow: {
          _id: '',
          key: 1,
          subject_name: 'Giải tích 1' + 1,
          subject_code: 'INT1001' + 1,
          credit_number: 0,
          score: 10,
        },
      });
    
    // useEffect(() =>{
       
    // },[state.currentRow,data])

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
          dataIndex: 'credit_number',
          key: 'credit_number',
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
            {data.scores[0].score}
{/*         
            <Table
            columns={columns}
            dataSource={data}
            bordered
            scroll={{ x: "calc(700px + 50%)", y: 500 }}
            /> */}
        </div>
    );
}
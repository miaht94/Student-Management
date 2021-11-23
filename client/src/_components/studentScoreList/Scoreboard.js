import React ,{useEffect, useState} from 'react';
import 'antd/dist/antd.css';
import { Table} from 'antd';

export { Scoreboard };

function Scoreboard(props) {
    
    const columns = [
        {
            title: 'Tên học phần',
            dataIndex: 'subject_name',
            key: 'subject_name',
        },
        {
            title: 'Mã học phần',
            dataIndex: 'subject_code',
            key: 'subject_code',
        },
        
        {
          title: 'Số tín chỉ',
          dataIndex: 'credits_number',
          key: 'credits_number',
        },
        {
            title: 'Điểm hệ 10',
            dataIndex: 'score',
            key: 'score',
        },
    ]

    return (
        <div>
            <div>
                Họ tên: {props.scoreTotal.name}
                <br/>
                VNU ID: {props.scoreTotal.vnu_id}
                <br/>
                CPA: {props.scoreTotal.cpa}
                <br/>
                Số tín chỉ: {props.scoreTotal.total_credits}
                <br/>
                Xếp loại: {props.scoreTotal.stt}
                <br/>
            </div>
            <Table
            columns={columns}
            dataSource={props.scoreboard}
            bordered
            scroll={{ x: "calc(700px + 50%)", y: 500 }}
            />
        </div>
    );
}
import React ,{useEffect, useState} from 'react';
import 'antd/dist/antd.css';
import { Table, Typography, Row, Col, Switch, Button} from 'antd';
import { Link } from 'react-router-dom';
import { WechatOutlined, UserOutlined } from '@ant-design/icons';

const { Title } = Typography;

export { Scoreboard };

function Scoreboard(props) {

    console.log(props);
    const [scoreType, setScoreType] = useState({
        decimal: true
    });

    function onChange(checked) {
        setScoreType({
            decimal: !scoreType.decimal
        })
    }

    const columns = [
        {
            title: 'Tên học phần',
            dataIndex: 'subject_name',
            key: 'subject_name',
            width: 180,
        },
        {
            title: 'Mã học phần',
            dataIndex: 'subject_code',
            key: 'subject_code',
            width: 110,
        },
        
        {
          title: 'Tín chỉ',
          dataIndex: 'credits_number',
          key: 'credits_number',
          width: 80,
        },
        {
            title: 'Điểm hệ 10',
            dataIndex: 'score',
            key: 'score',
            width: 110,
        },
        {
            title: 'Điểm hệ 4',
            dataIndex: 'scoref',
            key: 'scoref',
            width: 100,
        },
        {
            title: 'Kì học',
            dataIndex: 'semester_name',
            key: 'semester_name',
            width: 180,
        },
    ]

    return (
        <div>
            <Row>
            <Col flex="250px">
                <Title level={4}>{props.scoreTotal.name}</Title>
                <div>
                    <b>VNU ID:</b> {props.scoreTotal.vnu_id}
                    <br/>
                    <br/>
                    <b>CPA:</b> {props.scoreTotal.cpa}
                    <br/>
                    <b>Số tín chỉ:</b> {props.scoreTotal.total_credits}
                    <br/>
                    <b>Xếp loại:</b> {props.scoreTotal.stt}
                    <br/>
                    {/* <Switch defaultChecked={scoreType.decimal} onChange={onChange} /> */}
                    <br/>
                    <Link to={`/chat/${props.scoreTotal.vnu_id}`}>
                    <Button type="primary" shape="round" icon={<WechatOutlined />} size="small" style={{marginBottom: "8px"}}> Nhắn tin </Button>
                    </Link>
                    <br/>
                    <Button type="primary" shape="round" size="small" onClick={onChange} > {scoreType.decimal === true? "Xem điểm hệ 4" : "Xem điểm hệ 10"} </Button>
                </div>
            </Col>
            <Col flex="auto">
                <Table
                columns={scoreType.decimal === true ? columns.filter(col => col.dataIndex !== 'scoref') : columns.filter(col => col.dataIndex !== 'score')}
                dataSource={props.scoreboard}
                bordered
                />
            </Col>
            </Row>
        </div>
    );
}
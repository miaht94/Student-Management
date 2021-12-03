import React ,{useEffect, useState} from 'react';
import 'antd/dist/antd.css';
import { Table, Typography, Row, Col, Switch, Button} from 'antd';
import { Link } from 'react-router-dom';
import { WechatOutlined, UserOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

export { Scoreboard };

function Scoreboard(props) {

    // console.log(props);
    const [scoreType, setScoreType] = useState({
        decimal: true
    });

    const [scoreFilter, setScoreTotal] = useState(null)

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
            filters: props.semesterList,
            onFilter: (value, record) => {
                console.log(value);
                return record.semester_name.includes(value);
            },
            filterSearch: true,
        },
    ]

    function configChatButton(){
        return (<Link to={`/chat/${props.scoreTotal.vnu_id}`}>
                    <Button type="primary" shape="round" icon={<WechatOutlined />} size="small" style={{marginBottom: "8px"}}> Nhắn tin </Button>
                    </Link>);
    }
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
                    <b>Trạng thái:</b> {props.scoreTotal.stt}
                    <br/>
                    <br/>
                    <i>Nhấn nút lọc ở cột <b>Kì học</b> để</i> 
                    <br/>
                    <i>xem chi tiết từng kì</i>
                    <br/>
                    {/* <Switch defaultChecked={scoreType.decimal} onChange={onChange} /> */}
                    <br/>
                    {props.isPersonal === false ? configChatButton() : ""}
                    <br/>
                    <Button type="primary" shape="round" size="small" onClick={onChange} > {scoreType.decimal === true? "Xem điểm hệ 4" : "Xem điểm hệ 10"} </Button>
                </div>
            </Col>
            <Col flex="auto">
                <Table
                columns={scoreType.decimal === true ? columns.filter(col => col.dataIndex !== 'scoref') : columns.filter(col => col.dataIndex !== 'score')}
                dataSource={props.scoreboard}
                summary={pageData => {
                    let summCredit = 0;
                    let summScore = 0;
            
                    pageData.forEach(({ credits_number, score, scoref }) => {
                        summCredit += credits_number;
                        summScore += score*credits_number;
                    });
            
                    return (
                      <>
                        <Table.Summary.Row>
                          <Table.Summary.Cell colSpan={2}><b>Tổng kết</b></Table.Summary.Cell>
                          <Table.Summary.Cell>
                            <Text ><b>{summCredit}</b></Text>
                          </Table.Summary.Cell>
                          <Table.Summary.Cell>
                            <Text><b>{scoreType.decimal === true ? (summScore/summCredit).toFixed(2) : ((summScore/summCredit)/10*4).toFixed(2)}</b></Text>
                          </Table.Summary.Cell>
                          <Table.Summary.Cell/>
                          {/* <Table.Summary.Cell>
                            <Text>{totalRepayment}</Text>
                          </Table.Summary.Cell> */}
                        </Table.Summary.Row>
                        {/* <Table.Summary.Row>
                          <Table.Summary.Cell>Balance</Table.Summary.Cell>
                          <Table.Summary.Cell colSpan={2}>
                            <Text type="danger">{totalBorrow - totalRepayment}</Text>
                          </Table.Summary.Cell>
                        </Table.Summary.Row> */}
                      </>
                    );
                  }}
                bordered
                
                />
            </Col>
            </Row>
        </div>
    );
}
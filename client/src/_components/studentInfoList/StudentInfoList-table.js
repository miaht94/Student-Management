import React ,{useEffect, useState} from 'react';
import 'antd/dist/antd.css';
import { Table, Button, Space , Modal, Input, Row, Col} from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined, EditTwoTone, DeleteFilled, WechatOutlined} from '@ant-design/icons';
import moment from 'moment';
import { Link } from 'react-router-dom';

import {StudentProfile, AddStudentForm} from '_components/studentInfoList';
import {useStudentInfoAction} from '_actions';


export { StudentInfoTable };
function StudentInfoTable(props){
    var data =  JSON.parse(JSON.stringify(props.data));
    data.forEach( object => { Object.entries(object).map(([key, val]) => {
      if (key == 'gender') {
        if (val == 'male') object.gender = 'Nam';
        if (val == 'female') object.gender = 'Nữ';
      }
      if (key == 'date_of_birth') {
          object.date_of_birth = moment.utc(val).format("DD/MM/YYYY");
      }
    })});

    // console.log(data);

    const studentInfoAction = useStudentInfoAction();

    const [state, setState] = useState({
        searchText: '',
        searchedColumn: '',
        visible : false,
        visibleAdding: false,
        visiblePopup: false
        ,
        currentRow: {
          _id: '',
          key: 1,
          name: 'Nguyễn văn A ' + 1,
          tags: (1 % 2) ? ['Bình thường'] : ['Cảnh cáo'],
          date_of_birth: 1%30 + 1 + '/1/2001',
          email: 1 + 19021000 + '@vnu.edu.vn',
          vnu_id: 19020000 + 1,
          phone_number: 100000000,
          location: 'no location' + 1,
          gender: 'male'
        },
      });

    useEffect(() =>{
       
     },[state.currentRow,data])
    
    let handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setState({
          ...state,
          searchText: selectedKeys[0],
          searchedColumn: dataIndex,
        });
      };
    
    let handleReset = clearFilters => {
        clearFilters();
        setState({ ...state, searchText: '' });
      };

    let handleEditProfile = (record) =>{
        setState({
          ...state,
          currentRow : record,
          visible : true});
    }

    let handleDelete = () => {
        setState({
          ...state,
          visiblePopup : false,
        })
        studentInfoAction.deleteStudent(state.currentRow.vnu_id);
    }

    let handleCloseModal = () => {
        setState({
          ...state,
          visible : false,
      })
    }

    let handleCloseModalAdding = () => {
      setState({
        ...state,
        visibleAdding : false,
    })
  }
    let handleAddStudent = () => {
      setState({
        ...state,
        visibleAdding : true,
    })
    }

    let handlePopUpCancel = () => {
      setState({
        ...state,
        visiblePopup : false,
    })
  }

    let showPopconfirm = (record) => {
      setState({
        ...state,
        currentRow : record,
        visiblePopup : true,
    })
  }

    let handleMessage = (record) => {
        alert('gửi tin nhắn tới id ' + record.vnu_id);
      }

    let searchInput;
    let getColumnSearchProps = dataIndex => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
          <div style={{ padding: 8 }}>
            <Input
              ref={node => {
                  searchInput = node;
              }}
              placeholder={`Search ${dataIndex}`}
              value={selectedKeys[0]}
              onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
              onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
              style={{ marginBottom: 8, display: 'block' }}
            />
            <Space>
              <Button
                type="primary"
                onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                icon={<SearchOutlined />}
                size="small"
                style={{ width: 90 }}
              >
                Search
              </Button>
              <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
                Reset
              </Button>
              <Button
                type="link"
                size="small"
                onClick={() => {
                  confirm({ closeDropdown: false });
                  setState({
                    ...state,
                    searchText: selectedKeys[0],
                    searchedColumn: dataIndex,
                  });
                }}
              >
                Filter
              </Button>
            </Space>
          </div>
        ),
        filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
        onFilter: (value, record) =>
          record[dataIndex]
            ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
            : '',
        onFilterDropdownVisibleChange: visible => {
          if (visible) {
            setTimeout(() => searchInput.select(), 100);
          }
        },
        render: text =>
          state.searchedColumn === dataIndex ? (
            <Highlighter
              highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
              searchWords={[state.searchText]}
              autoEscape
              textToHighlight={text ? text.toString() : ''}
            />
          ) : (
            text
          ),
      });

      
        const columns = [
        {
            title: 'Họ và tên',
            dataIndex: 'name',
            key: 'name',
            width: 100,
            ...getColumnSearchProps('name'),
            render: text => <a>{text}</a>,
        },
        {
            title: 'Mã sinh viên',
            width: 70,
            dataIndex: 'vnu_id',
            key: 'vnu_id',
            sorter: {
                compare: (a, b) => a.vnu_id - b.vnu_id,
                multiple: 5,
              },
            defaultSortOrder: 'ascend',
        },
        
        {
            title: 'Giới tính',
            width: 50,
            dataIndex: 'gender',
            key: 'gender',
        },
        {
          title: 'Ngày sinh',
          width: 80,
          dataIndex: 'date_of_birth',
          key: 'date_of_birth',
        },
        {
            title: 'Email',
            width: 100,
            dataIndex: 'email',
            key: 'email',
        },
        {
          title: 'Số điện thoại',
          width: 80,
          dataIndex: 'phone_number',
          key: 'phone_number',
        },
        {
          title: 'Số điện thoại phụ huyinh',
          width: 80,
          dataIndex: 'parent_number',
          key: 'parent_number',
        },
        {
          title: 'Địa chỉ',
          width: 140,
          dataIndex: 'location',
          key: 'location',
        },
        {
            title: 'Thao tác',
            key: 'action',
            fixed: "right",
            width: 110,
            render: (text, record) => (
              <Space size="middle">
                
                <Button
                title="Chỉnh sửa thông tin cá nhân"
                onClick={() => handleEditProfile(record)}
                icon={<EditTwoTone />}
                size="small"
                style={{ width: 50 }}
                />

                <Button
                  danger
                  type="primary"
                  title="Xóa thành viên"
                  onClick={() =>showPopconfirm(record)}
                  icon={<DeleteFilled />}
                  size="small"
                  style={{ width: 50 }}
                  />

                              
                <Link to={`/chat/${record.vnu_id}`} className="btn btn-link">
                  <Button
                  type="primary"
                  title="Gửi tin nhắn cho thành viên này"
                  icon={<WechatOutlined />}
                  size="small"
                  style={{ width: 50 }}
                  />
                </Link>

              </Space>
            )
        }
    ]
    return (
        <div>
            <Row>
            <Col flex="auto">
              <h2>Thông tin liên hệ sinh viên</h2>
            </Col>
            <Col flex="250px">
            <p align="right">
              <Button type="primary"
                onClick = {() => handleAddStudent()}
              >Thêm sinh viên</Button>
            </p> 
            </Col>
            </Row>
            <Table
            columns={columns}
            dataSource={data}
            bordered
            scroll={{ x: "calc(700px + 50%)", y: 500 }}
            />
            <Modal
              title="Thông tin cá nhân"
              visible={state.visible}
              onCancel= {handleCloseModal}
              footer={[]}
              width="800px"
            >
              <StudentProfile Id = {state.currentRow._id}/>
            </Modal>
            <Modal
              title="Thêm sinh viên"
              visible={state.visibleAdding}
              onCancel= {handleCloseModalAdding}
              footer={[]}
            >
              <AddStudentForm/>
            </Modal>
            <Modal
              title="Bạn có chắc là xóa thành viên này?"
              visible={state.visiblePopup}
              onOk={() => handleDelete()}
              onCancel={handlePopUpCancel}
              okText="Xác nhận"
              okType= 'danger'
              cancelText="Hủy bỏ"
            >
              Xác nhận sẽ xóa thành viên {state.currentRow.name} ra khỏi lớp!
            </Modal>
        </div>
    )
  } 
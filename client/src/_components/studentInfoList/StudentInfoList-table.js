import React ,{useEffect, useState} from 'react';
import 'antd/dist/antd.css';
import { Table, Button, Space ,Tag, Modal, Input, Avatar} from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined,EditTwoTone,DeleteFilled} from '@ant-design/icons';
import moment from 'moment';

import {StudentProfile} from '_components/studentInfoList';
import { useAlertActions , useStudentInfoAction} from '_actions';


export { StudentInfoTable };
function StudentInfoTable(props){
    var data =  JSON.parse(JSON.stringify(props.data));
    data.forEach( object => { Object.entries(object).map(([key, val]) => {
      if (key == 'date_of_birth') {
          object.date_of_birth = moment(val, 'X').format("DD/MM/YYYY");
      }
    })});

    const studentInfoAction = useStudentInfoAction();

    const [state, setState] = useState({
        searchText: '',
        searchedColumn: '',
        visible : false,
        currentRow: {
          _id: '',
          key: 1,
          name: 'Nguyễn văn A ' + 1,
          tags: (1 % 2) ? ['Bình thường'] : ['Cảnh cáo'],
          date_of_birth: 1%30 + 1 + '/1/2001',
          email: 1 + 19021000 + '@vnu.edu.vn',
          vnu_id: 19020000 + 1,
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

    let handleDelete = (record) => {
        setState({
          ...state,
          currentRow : record,});
        studentInfoAction.deleteStudent(record.vnu_id);
    }

    let handleCloseModal = () => {
        setState({
          ...state,
          visible : false,
      })
    }

    let handleSubmitModal = () => {
        setState({
          ...state,
         visible : false,
      })
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
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            width: 100,
            ...getColumnSearchProps('name'),
            render: text => <a>{text}</a>,
        },
        {
            title: 'vnu_id',
            width: 100,
            dataIndex: 'vnu_id',
            key: 'vnu_id',
            sorter: {
                compare: (a, b) => a.vnu_id - b.vnu_id,
                multiple: 5,
              },
        },
        // {
        //     title: 'State',
        //     key: 'tags',
        //     width: 100,
        //     dataIndex: 'tags',
        //     filters: [
        //         {
        //           text: 'Cảnh cáo',
        //           value: 'Cảnh cáo',
        //         },
        //         {
        //           text: 'Bình thường',
        //           value: 'Bình thường',
        //         },
        //       ],
        //       onFilter: (value, record) => record.tags.indexOf(value) === 0,
        //     render: tags => (
        //         <span>
        //         {tags.map(tag => {
        //             let color = 'red';
        //             if (tag === 'Bình thường') {
        //                 color = 'green';
        //             }
        //             return (
        //                 <Tag color= {color} key = {tag}>
        //                     {tag.toUpperCase()}
        //                 </Tag>
        //             );
        //         })}
        //         </span>
        //     )
        // },
        {
            title: 'Date of Birth',
            width: 100,
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
            title: 'Action',
            key: 'action',
            fixed: "right",
            width: 100,
            render: (text, record) => (
              <Space size="middle">
                
                <Button
                title="Edit"
                onClick={() => handleEditProfile(record)}
                icon={<EditTwoTone />}
                size="small"
                style={{ width: 50 }}
                />

                <Button
                danger
                type="primary"
                title="Delete"
                onClick={() => handleDelete(record)}
                icon={<DeleteFilled />}
                size="small"
                style={{ width: 50 }}
                />
              </Space>
            )
        }
    ]
    return (
        <div>
            <Table
            columns={columns}
            dataSource={data}
            bordered
            scroll={{ x: "calc(700px + 50%)", y: 500 }}
            />
            <Modal
              title="Detailed personal information"
              visible={state.visible}
              onCancel= {handleCloseModal}
              footer={[]}
            >
              <StudentProfile Id = {state.currentRow._id}/>
        </Modal>
        </div>
    )
  } 
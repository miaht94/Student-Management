import React ,{useEffect, useState} from 'react';
import 'antd/dist/antd.css';
import { Table, Button, Space, Input, Tag, Modal} from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined, InfoCircleTwoTone} from '@ant-design/icons';
import { StudentScore } from '_components/studentScoreList'
import {useStudentScoreAction} from '_actions';


export { StudentScoreTable };

function StudentScoreTable(props){
    var data =  JSON.parse(JSON.stringify(props.data));
    const studentScoreAction = useStudentScoreAction();

    data = studentScoreAction.handleData(data);

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
    
    let handleShowScoreboard = (record) =>{
      console.log(record)
        setState({
          ...state,
          currentRow : record,
          visible : true});
        // setCurrentStudent(state.currentRow.vnu_id);
        // studentScoreAction.getScoreByID(state.currentRow.vnu_id);
        // console.log("getScoreByID triggered");

    }

    let handleCloseModal = () => {
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
            title: 'Họ và tên',
            dataIndex: 'name',
            key: 'name',
            width: 100,
            ...getColumnSearchProps('name'),
            render: text => <a>{text}</a>,
        },
        {
            title: 'Mã sinh viên',
            width: 100,
            dataIndex: 'vnu_id',
            key: 'vnu_id',
            sorter: {
                compare: (a, b) => a.vnu_id - b.vnu_id,
                multiple: 5,
              },
        },
        {
            title: 'Trạng thái',
            key: 'tags',
            width: 100,
            dataIndex: 'tags',
            filters: [
                {
                  text: 'Cảnh cáo',
                  value: 'Cảnh cáo',
                },
                {
                  text: 'Bình thường',
                  value: 'Bình thường',
                },
                {
                  text: 'Đuổi học',
                  value: 'Đuổi học',
                },
              ],
              onFilter: (value, record) => record.tags.indexOf(value) === 0,
            render: tags => (
                <span>
                {tags.map(tag => {
                    let color = 'red';
                    if (tag === 'Bình thường') {
                        color = 'green';
                    }else {
                      if (tag ==='Cảnh cáo') {
                        color = 'yellow';
                      }
                    }
                    return (
                        <Tag color= {color} key = {tag}>
                            {tag.toUpperCase()}
                        </Tag>
                    );
                })}
                </span>
            )
        },
        {
            title: 'Ngày sinh',
            width: 100,
            dataIndex: 'date_of_birth',
            key: 'date_of_birth',
        },
        {
          title: 'TBCTL',
          width: 100,
          dataIndex: 'cpa',
          key: 'cpa',
          sorter: {
            compare: (a, b) => a.cpa - b.cpa,
            multiple: 5,
          },
      },
        {
          title: 'Số học phần điểm C+',
          width: 100,
          dataIndex: 'Cplus',
          key: 'Cplus',
      },
       {
          title: 'Số học phần điểm C',
          width: 100,
          dataIndex: 'C',
          key: 'C',
      },
      {
          title: 'Số học phần điểm D+',
          width: 100,
          dataIndex: 'Dplus',
          key: 'Dplus',
      },
       {
          title: 'Số học phần điểm D',
          width: 100,
          dataIndex: 'D',
          key: 'D',
      },
        {
          title: 'Số học phần điểm F',
          width: 100,
          dataIndex: 'F',
          key: 'F',
      },
      {
        title: 'Chi tiết',
        key: 'action',
        fixed: "right",
        width: 100,
        render: (text, record) => (
          <Space size="middle">
            
            <Button
            title={"Xem bảng điểm " + record.name}
            onClick={() => handleShowScoreboard(record)} 
            icon={<InfoCircleTwoTone />}
            size="small"
            style={{ width: 50 }}
            />

          </Space>
        )
      }
    ]
    return (
        <div>
            <h2>Bảng điểm sinh viên</h2>
            <Table
            columns={columns}
            dataSource={data}
            bordered
            scroll={{ x: "calc(700px + 50%)", y: 500 }}
            />
            <Modal
              title="Bảng điểm sinh viên"
              visible={state.visible}
              onCancel= {handleCloseModal}
              footer={[]}
              width={1100}
            >
              <StudentScore vnu_id = {state.currentRow.vnu_id} isPersonal={false}/>
            </Modal>
        </div>
    )
  } 

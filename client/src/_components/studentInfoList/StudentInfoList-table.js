import React ,{useEffect, useState} from 'react';
import 'antd/dist/antd.css';
import { Table, Button, Space ,Tag, Modal, Form, Input, Avatar} from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined,EditTwoTone,DeleteFilled, UserOutlined} from '@ant-design/icons';



export { StudentInfoTable };

// const data = [];
// for (let i = 0; i< 100; i++) {
//     data.push({
//         key: i,
//         name: 'Nguyễn văn A ' + i,
//         tags: (i % 2) ? ['Bình thường'] : ['Cảnh cáo'],
//         date_of_birth: i%30 + 1 + '/1/2001',
//         email: i + 19021000 + '@vnu.edu.vn',
//         vnu_id: 19020000 + i,
//       });
// }

function StudentInfoTable(props){
    var data = props.data;
    console.log(data);
    const [state, setState] = useState({
        searchText: '',
        searchedColumn: '',
        visible : false,
        currentRow: {
          key: 1,
          name: 'Nguyễn văn A ' + 1,
          tags: (1 % 2) ? ['Bình thường'] : ['Cảnh cáo'],
          date_of_birth: 1%30 + 1 + '/1/2001',
          email: 1 + 19021000 + '@vnu.edu.vn',
          vnu_id: 19020000 + 1,
        },
      });

    const [form] = Form.useForm();
    
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

    useEffect(() =>{
      resetDefaultInfo(); 
     },[state.currentRow])


    let resetDefaultInfo = () => {
      console.log(state.currentRow)
      if(form != null) {
        form.setFieldsValue({
            name: state.currentRow.name,
            vnu_id: state.currentRow.vnu_id,
            email: state.currentRow.email,
            date_of_birth: state.currentRow.date_of_birth,
        })
      }
    }

    let handleDelete = () => {
        alert('Delete');
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
                onClick={() => handleDelete()}
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
              onOk={handleSubmitModal}
              onCancel={handleCloseModal}
              footer={[
                <Button key="submit" type="primary" onClick={handleSubmitModal}>
                  Submit
                </Button>,
                <Button key="back" onClick={handleCloseModal}>
                  Return
                </Button>,
                ]}
            >
              <Form
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 14 }}
                layout="horizontal"
                form={form}
              >
                <Avatar
                    style={{
                      backgroundColor: '#87d068',
                      position: 'relative',
                      top: '32%',
                      left: '50%',
                      transform: "translate(-50%, -50%)",
                    }}
                    icon={<UserOutlined />}
                  />
                  <br/>
                  <Form.Item label="Name" name = "name">
                    <Input defaultValue = {state.currentRow.name} />
                  </Form.Item>
                  <Form.Item label="Vnu_id" name = "vnu_id">
                    <Input defaultValue = {state.currentRow.vnu_id} />
                  </Form.Item>
                  <Form.Item label="Date of Birth " name = "date_of_birth">
                    <Input defaultValue = {state.currentRow.date_of_birth} />
                  </Form.Item>
                  <Form.Item label="Email" name = "email">
                    <Input defaultValue = {state.currentRow.email} />
                  </Form.Item>
              </Form>
        </Modal>
        </div>
    )
  } 

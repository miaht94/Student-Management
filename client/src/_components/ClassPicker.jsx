import React, {useState} from 'react'
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { Card , Row, Col, Modal, Form, Input, Space, Button, Drawer} from 'antd';
import { useRecoilState } from 'recoil';
import { classesAtom } from '_state';
import { useClassWrapper } from '_helpers';
import { Link } from 'react-router-dom';
// import { useClassActions } from '_actions';

export { ClassPicker };

const cardStyle = {
    textAlign: 'center',
    marginTop : '30px',
    marginLeft : '30px',
    width: 240 
  };

const cardHeadStyle = {
   backgroundColor : '#1E90FF',
   border : 0,
   padding : 0,
}

function ClassPicker(props) {
    const classWrapper = useClassWrapper();
    const [classes, setClasses] = useRecoilState(classesAtom);
    const [visible, setVisible] = React.useState(false);
    const [confirmLoading, setConfirmLoading] = React.useState(false);
  
    const showModal = () => {
      setVisible(true);
    };
  
    const handleOk = (values) => {
      // console.log("Sending.");
      setConfirmLoading(true);
      classWrapper.createClass(values.class_name);
      setVisible(false);
      setConfirmLoading(false);
      // console.log(classes);
    };

    var drawerVisible = props.drawerVisible;
    var setDrawerVisible = props.setDrawerVisible;
    var onDrawerClose = props.onDrawerClose;
    var input = classWrapper.classes;
  
    // console.log(input);

    let Cards = [];
    for(let i = 0; i < input.length; i++) {
        Cards.push(
            <div key = {input[i].class_id} onClick = {() => {
                        classWrapper.chooseClass(input[i]);
                    }}>
                <Col>
                    <Link to={"/" + input[i].class_id + "/"} onClick={onDrawerClose}>
                        <Card title = {input[i].class_name} 
                        style = {cardStyle} headStyle = {cardHeadStyle}
                        cover={<img alt="example" src={'https://maisienoble.github.io/jig/images/backgrounds/blueish.jpg'} />}
                        hoverable = 'true'>
                            <p>Lớp đại học</p>
                        </Card>
                    </Link>
                </Col>
            </div>)
    }
    
    Cards.push(
        <div key = 'abcdef' onClick = {() => {
                    showModal();
                }}>
            <Col>
                <Card title = "Thêm lớp học" 
                style = {cardStyle}
                // cover={<img alt="example" src={'https://maisienoble.github.io/jig/images/backgrounds/blueish.jpg'} />}
                hoverable = 'true'>
                    <p>
                        Nhấn vào để thêm lớp mới
                    </p>
                </Card>
            </Col>
        </div>)

    return (
        <Drawer title="Chọn một lớp..." placement="right" onClose={onDrawerClose} visible={drawerVisible} width="640">
            <Row wrap = 'true'> 
            <CollectionCreateForm
                visible={visible}
                onCreate={handleOk}
                onCancel={() => {
                    setVisible(false);
                }}
            />     
            {Cards}       
        </Row>
        </Drawer>
    )
}

const CollectionCreateForm = ({ visible, onCreate, onCancel }) => {
    const [form] = Form.useForm();
    return (
      <Modal
        animation={false}
        visible={visible}
        title="Tạo lớp học mới"
        okText="Tạo"
        cancelText="Hủy"
        onCancel={onCancel}
        onOk={() => {
          form
            .validateFields()
            .then((values) => {
              form.resetFields();
              onCreate(values);
            })
            .catch((info) => {
              console.log('Validate Failed:', info);
            });
        }}
      >
        <Form
          animation={false}
          form={form}
          layout="vertical"
          name="form_in_modal"
          initialValues={{
            modifier: 'public',
          }}
        >
          <Form.Item
            name="class_name"
            label="Tên lớp:"
            rules={[
              {
                required: true,
                message: 'Please input the title of collection!',
              },
            ]}
            >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    );
};

// const input = [{
//         "id" : "1",
//         "className" : "K64CACLC1",
//         "background" : "https://maisienoble.github.io/jig/images/backgrounds/blueish.jpg"},
//     {
//         "id" : "2",
//         "className" : "K64CACLC2",
//         "background" : "https://maisienoble.github.io/jig/images/backgrounds/brilliant-shapes.jpg"},
//     {
//         "id" : "3",
//         "className" : "K64CACLC3",
//         "background" : "https://maisienoble.github.io/jig/images/backgrounds/dark-light-blue.jpg"},
//     {
//         "id" : "4",
//         "className" : "K64CACLC4",
//         "background" : "https://maisienoble.github.io/jig/images/backgrounds/blueish.jpg"},
//     {
//         "id" : "5",
//         "className" : "K64CLC1",
//         "background" : "https://maisienoble.github.io/jig/images/backgrounds/blueish.jpg"},
//     {
//         "id" : "2",
//         "className" : "K64CACLC2",
//         "background" : "https://maisienoble.github.io/jig/images/backgrounds/blueish.jpg"},
//     {
//         "id" : "3",
//         "className" : "K64CACLC3",
//         "background" : "https://maisienoble.github.io/jig/images/backgrounds/blueish.jpg"},
//     {
//         "id" : "4",
//         "className" : "K64CACLC4",
//         "background" : "https://maisienoble.github.io/jig/images/backgrounds/blueish.jpg"},
//     {
//         "id" : "5",
//         "className" : "K64CLC1",
//         "background" : "https://maisienoble.github.io/jig/images/backgrounds/blueish.jpg"}, 
//     {
//         "id" : "2",
//         "className" : "K64CACLC2",
//         "background" : "https://maisienoble.github.io/jig/images/backgrounds/blueish.jpg"},
//     {
//         "id" : "3",
//         "className" : "K64CACLC3",
//         "background" : "https://maisienoble.github.io/jig/images/backgrounds/blueish.jpg"},
//     {
//         "id" : "4",
//         "className" : "K64CACLC4",
//         "background" : "https://maisienoble.github.io/jig/images/backgrounds/blueish.jpg"},
//     {
//         "id" : "5",
//         "className" : "K64CLC1",
//         "background" : "https://maisienoble.github.io/jig/images/backgrounds/blueish.jpg"}
// ];

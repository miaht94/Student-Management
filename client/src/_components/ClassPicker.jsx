import React, {useState} from 'react'
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { Card , Row, Col, Drawer} from 'antd';
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
    var drawerVisible = props.drawerVisible;
    var setDrawerVisible = props.setDrawerVisible;
    var onDrawerClose = props.onDrawerClose;
    var input = classWrapper.classes;

    console.log(input);

    let Cards = [];
    for(let i = 0; i < input.length; i++) {
        Cards.push(
            <div key = {input[i].class_id} onClick = {() => {
                        classWrapper.chooseClass(input[i]);
                    }}>
                <Col>
                    <Link to={"/" + input[i].class_id} onClick={onDrawerClose}>
                        <Card title = {input[i].class_name} 
                        style = {cardStyle} headStyle = {cardHeadStyle}
                        cover={<img alt="example" src={'https://maisienoble.github.io/jig/images/backgrounds/blueish.jpg'} />}
                        hoverable = 'true'>
                            <p>Sample Card Content 1</p>
                        </Card>
                    </Link>
                </Col>
            </div>)
    }
    
    return (
        <Drawer title="Chọn một lớp..." placement="right" onClose={onDrawerClose} visible={drawerVisible} width="640">
            <Row wrap = 'true'>
            {Cards}
            </Row>
        </Drawer>
    )
}



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

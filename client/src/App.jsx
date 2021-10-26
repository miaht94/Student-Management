import { BrowserRouter as Router,
    Switch,
    Route, 
    Redirect,
    Link,
    useParams, useLocation} from 'react-router-dom';
import { useRecoilValue, useRecoilState } from 'recoil';

import { Nav, Alert, PrivateRoute, ClassPicker } from '_components';
import { history } from '_helpers';
import { Home } from 'home';
import { Users } from 'users';
import { Account } from '_components/account';
import { Dashboard } from '_components/dashboard';
import { Feed } from '_components/feed';
import { Chat } from '_components/chat';
import { Profile } from '_components/profile';
import { StudentInfoList } from '_components/studentInfoList';
import { StudentScoreList } from '_components/studentScoreList';

import { useAuthWrapper, useClassWrapper } from '_helpers';
import { authAtom } from '_state';
import { Layout, Menu, Button, Row, Col, Drawer } from 'antd';

import React, { useState } from 'react';

import Title from 'antd/lib/typography/Title';
import SubMenu from 'antd/lib/menu/SubMenu';

const style = { };

const { Header, Footer, Content } = Layout;

export { App };

function App() {
    const authWrapper = useAuthWrapper();
    const classWrapper = useClassWrapper();

    const [drawerVisible, setDrawerVisible] = useState(false);

    const showDrawer = () => {
        classWrapper.getClassList();
        setDrawerVisible(true);
    };

    const onDrawerClose = () => {
        setDrawerVisible(false);
    };

    return (
        <div className={'app-container' + (authWrapper.tokenValue ? ' bg-light' : '')}>
            {/* <div>{JSON.stringify(authWrapper.tokenValue)}</div> */}
            <Router history={history}>
            <Layout>
                <Header>
                    <Row gutter={0}>
                        <Col className="gutter-row" span={18}>
                            <div style={style}>
                                <Title style={{ padding: '15px 0px 0px 0px', color: 'white' }} level={3}> Student Advisor Web App </Title>
                            </div>
                        </Col>
                        <Col className="gutter-row" span={5}>
                        <div>
                            <div style={{color: 'white' }}> 
                                {ClassNameDisplay()}
                            </div>
                        </div>
                        </Col>
                        <Col className="gutter-row" span={1}>
                        <div style={{'marginLeft': 'auto','marginRight': 'auto' }}>
                            <Button type="primary" style={{'marginLeft': 'auto','marginRight': 'auto' }} onClick={showDrawer}>
                                Đổi lớp
                            </Button>
                        </div>
                        </Col>
                    </Row>         
                </Header>       
            </Layout>
            <Layout>
                <Drawer title="Chọn một lớp..." placement="right" onClose={onDrawerClose} visible={drawerVisible} width="640">
                    <ClassPicker />
                </Drawer>
                <Nav />
                <Layout>
                    <Content style={{ margin: '20px 16px' }}>
                        <Switch>
                          <PrivateRoute exact path="/" component={Home} />
                          {/* <PrivateRoute exact path="/:classID" children={<Child classID="123"/>} component={Child}/>  */}
                          <Route path="/account" component={Account} />
                          <PrivateRoute path="/:classID" classID="123" component={Child} />
                          <Redirect from="*" to="/" />
                        </Switch>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>
                        Phần mềm quản lý CVHT & SV
                        <br/>
                        Thực hiện bởi @vakoyomi, @miaht94, @anhbomx13, @h2b, @tuna
                    </Footer>
               </Layout>
             </Layout>
            </Router>
        </div>        
    );
}

function Child(props) {
    let { classID } = useParams();
    console.log('hello');
    const location  = useLocation()
    // let { path } = match;
    // console.log(path);
  
    return (
        <div>
            <div className="p-4">
                <div className="container">
                    <h1>Hi Dashboard {classID}</h1>
                </div>
            </div>
            <Switch>
                <PrivateRoute exact path="/:classID/dashboard" component={Dashboard} />
                <PrivateRoute exact path="/:classID/studentinfo" component={StudentInfoList} />
                <PrivateRoute exact path="/:classID/studentscore" component={StudentScoreList} />
                <PrivateRoute exact path="/:classID/feed" component={Feed} />
            </Switch>
        </div>
    );
  }

function ClassNameDisplay(){
    const auth = useRecoilValue(authAtom);
    if (auth){
        if (localStorage.getItem('currentClass')) {
            return "Lớp hiện tại: " + JSON.parse(localStorage.getItem('currentClass')).class_name;
        }
        return "Chưa chọn lớp";
    }    
    localStorage.removeItem('currentClass');
    return "";
}


// function App() {
//     const authWrapper = useAuthWrapper();
//     return (
//         <div className={'app-container' + (authWrapper.tokenValue ? ' bg-light' : '')}>
//             {/* <div>{JSON.stringify(authWrapper.tokenValue)}</div> */}
//             <Router history={history}>
//             <Layout>
//                 <Header style={{ padding: '20px 0px 2px 20px', height: '70px' }}>
//                     <Title style={{ padding: 0, color: 'white' }} level={3}>Student Advisor Web App</Title>
//                 </Header>
//             </Layout>
//             <Layout>
//                 <Nav />
//                 <Layout>
//                     <Content style={{ margin: '20px 16px' }}>
//                         <Switch>
//                           <PrivateRoute exact path="/" component={Home} />
//                           <PrivateRoute exact path="/dashboard" component={Dashboard} />
//                           <PrivateRoute exact path="/studentinfo" component={StudentInfoList} />
//                           <PrivateRoute exact path="/studentscore" component={StudentScoreList} />
//                           <PrivateRoute exact path="/feed" component={Feed} />
//                           <PrivateRoute exact path="/chat" component={Chat} />
//                           <PrivateRoute exact path="/profile" component={Profile} />
//                           {/* <PrivateRoute path="/users" component={Users} /> */}
//                           <Route path="/account" component={Account} />
//                           <Redirect from="*" to="/" />
//                         </Switch>
//                     </Content>
//                     <Footer style={{ textAlign: 'center' }}>
//                         Phần mềm quản lý CVHT & SV
//                         <br/>
//                         Thực hiện bởi @vakoyomi, @miaht94, @anhbomx13, @h2b, @tuna
//                     </Footer>
//                </Layout>
//              </Layout>
//             </Router>
//         </div>        
//     );
// }
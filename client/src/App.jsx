import { Router, Route, Switch, Redirect} from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import { authAtom } from '_state';
import { Nav, Alert, PrivateRoute } from '_components';
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

import { useAuthWrapper } from '_helpers';

import { Layout, Avatar, Menu, Icon, Breadcrumb, Button } from 'antd';

import {
    HomeOutlined,
    DashboardOutlined,
    TeamOutlined,
} from '@ant-design/icons';

import Title from 'antd/lib/typography/Title';
import SubMenu from 'antd/lib/menu/SubMenu';

const { Header, Footer, Content } = Layout;

export { App };

function App() {
    const authWrapper = useAuthWrapper();
    return (
        <div className={'app-container' + (authWrapper.tokenValue ? ' bg-light' : '')}>
            {/* <div>{JSON.stringify(authWrapper.tokenValue)}</div> */}
            <Router history={history}>
            <Layout>
                <Header style={{ padding: '20px 0px 2px 20px', height: '70px' }}>
                    <Title style={{ padding: 0, color: 'white' }} level={3}>Student Advisor Web App</Title>
                </Header>
            </Layout>
            <Layout>
                <Nav />
                <Layout>
                    <Content style={{ margin: '20px 16px' }}>
                        <Switch>
                          <PrivateRoute exact path="/" component={Home} />
                          <PrivateRoute exact path="/dashboard" component={Dashboard} />
                          <PrivateRoute exact path="/studentinfo" component={StudentInfoList} />
                          <PrivateRoute exact path="/studentscore" component={StudentScoreList} />
                          <PrivateRoute exact path="/feed" component={Feed} />
                          <PrivateRoute exact path="/chat" component={Chat} />
                          <PrivateRoute exact path="/profile" component={Profile} />
                          {/* <PrivateRoute path="/users" component={Users} /> */}
                          <Route path="/account" component={Account} />
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

// function App() {
//     const authWrapper = useAuthWrapper();
//     return (
//         <div className={'app-container' + (authWrapper.tokenValue ? ' bg-light' : '')}>
//             <div>{JSON.stringify(authWrapper.tokenValue)}</div>
//             <Router history={history}>
//                 <div className='navbar'>
//                 <Nav />
//                 </div>
//                 <Alert />
//                 <div className='content'>
//                     <Switch>
//                         <PrivateRoute exact path="/" component={Home} />
//                         <PrivateRoute exact path="/dashboard" component={Dashboard} />
//                         <PrivateRoute exact path="/studentinfo" component={StudentInfoList} />
//                         <PrivateRoute exact path="/studentscore" component={StudentScoreList} />
//                         <PrivateRoute exact path="/feed" component={Feed} />
//                         <PrivateRoute exact path="/chat" component={Chat} />
//                         <PrivateRoute exact path="/profile" component={Profile} />
//                         {/* <PrivateRoute path="/users" component={Users} /> */}
//                         <Route path="/account" component={Account} />
//                         <Redirect from="*" to="/" />
//                     </Switch>
//                 </div>
//             </Router>
//         </div>

//     );
// }

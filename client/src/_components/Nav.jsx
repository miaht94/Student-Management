import React, { useEffect, useState } from 'react';

import { Link, useLocation, useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { authAtom } from '_state';
import {useClassWrapper} from '../_helpers/class-wrapper'
import { useUserActions } from '_actions';
import 'antd/dist/antd.css';


import { Layout, Menu } from 'antd';
import {
  HomeOutlined,
  MessageOutlined,
  BellOutlined,
  InfoCircleOutlined,
  UserOutlined,
  DashboardOutlined,
  TableOutlined,
  LoginOutlined,
  UploadOutlined
} from '@ant-design/icons';

const { Sider } = Layout;

export { Nav };

function Nav(props) {
    var classID = props.classID ? props.classID : "";
    const location = useLocation();

	// const [pathname, setPathname] = useState(location.pathname);
    const [collapsed, setCollapsed] = useState(false);
    const onCollapse = (collapsed) => setCollapsed(collapsed);
    const userActions = useUserActions();
    const classWrapper = useClassWrapper();
    const auth = props.auth;
    const onLogout = props.onLogout;
    var userData = JSON.parse(localStorage.getItem("userData"));
    // only show nav when logged in

    useEffect(()=> {
		console.log(location.pathname)
      console.log("NAV constructing ", classID);
      userData = JSON.parse(localStorage.getItem("userData"));
    }, [])

	

    if (!auth) return null;
    // const currentClassID = JSON.parse(localStorage.getItem('currentClass')).class_id;

    return (
        <Sider style={{
          overflow: 'auto',
          height: '90vh',
          left: 0,
          top: 64,
          position: "sticky"
        }}
        collapsible collapsed={collapsed} 
        onCollapse={onCollapse}
        >
          <div className="logo" />
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={[location.pathname]}
			      selectedKeys={[location.pathname]}
          >
            {!classWrapper.curClass && 
              <Menu.Item key="/">
                <HomeOutlined />
                <span>Trang ch???</span>
                <Link to="/"></Link>
              </Menu.Item>
              
            }

            {(classWrapper.curClass) &&
              <>
              {(userData.role == "teacher") &&
              
                <Menu.Item key={`/${classWrapper.curClass.class_id}/`}>
                  <HomeOutlined />
                  <span>Trang ch???</span>
                  <Link to={`/${classWrapper.curClass.class_id}/`}></Link>
                </Menu.Item>
              }
              {(userData.role == "student") &&
              <Menu.Item key={`/stuhome`}>
                <HomeOutlined />
                <span>Trang ch???</span>
                <Link to={`/stuhome`}></Link>
              </Menu.Item>
              }
              
              {(userData.role == "teacher") &&
              <>
                <Menu.Item key={`/${classWrapper.curClass.class_id}/dashboard`}>
                  <DashboardOutlined />
                  <span>Dashboard</span>
                  <Link to={`/${classWrapper.curClass.class_id}/dashboard`}></Link>
                </Menu.Item>
                <Menu.Item key="/chat">
                <MessageOutlined />
                <span>Tin nh???n</span>
                <Link to="/chat"></Link>
              </Menu.Item>
              </>
              }
               <Menu.Item key={`/${classWrapper.curClass.class_id}/feed`}>
                  <BellOutlined />
                  <span>Di???n ????n</span>
                  <Link to={`/${classWrapper.curClass.class_id}/feed`}></Link>
                </Menu.Item>
              {(userData.role == "teacher") &&
                <Menu.Item key={`/${classWrapper.curClass.class_id}/studentinfo`}>
                  <InfoCircleOutlined />
                  <span>Th??ng tin SV</span>
                  <Link to={`/${classWrapper.curClass.class_id}/studentinfo`}></Link>
                </Menu.Item>
              }
               
              {(userData.role == "teacher") &&
                <Menu.Item key={`/${classWrapper.curClass.class_id}/studentscore`}>
                  <TableOutlined />
                  <span>B???ng ??i???m SV</span>
                  <Link to={`/${classWrapper.curClass.class_id}/studentscore`}></Link>
                </Menu.Item>
              }

              {(userData.role == "student") &&
                <Menu.Item key={`/personalscore`}>
                  <UserOutlined />
                  <span>B???ng ??i???m c?? nh??n</span>
                  <Link to={`/personalscore`}></Link>
                </Menu.Item>
              }
              </>
            }
            <>
              {(userData?.role === "teacher") &&
                <Menu.Item key={`/dbportal`}>
                  <UploadOutlined />
                  <span>Qu???n l?? CSDL</span>
                  <Link to={`/dbportal`}></Link>
                </Menu.Item>}
            </>
            
            
            <Menu.Item key="/profile">
              <UserOutlined />
              <span>H??? s?? c?? nh??n</span>
              <Link to="/profile"></Link>
            </Menu.Item>
            <Menu.Item key="nothing">
            </Menu.Item>
            <Menu.Item key="logout" onClick={userActions.logout}>
              <LoginOutlined />
              <span>????ng xu???t</span>
            </Menu.Item>
          </Menu>

        </Sider>
    );
}

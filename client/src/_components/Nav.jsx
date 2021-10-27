import React, { useEffect, useState } from 'react';

import { Link, useLocation, useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import { authAtom } from '_state';
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
  LoginOutlined
} from '@ant-design/icons';

const { Sider } = Layout;

export { Nav };

function Nav(props) {
    var classID = props.classID ? props.classID : "";
    const location = useLocation();
    const [collapsed, setCollapsed] = useState(false);
    const onCollapse = (collapsed) => setCollapsed(collapsed);

    const auth = props.auth;
    const onLogout = props.onLogout;
    // only show nav when logged in
    useEffect(()=> {
		console.log(location.pathname)
      console.log("NAV constructing ", classID);
    }, [])
    if (!auth) return null;
    
    return (
        <Sider 
        style={{
          overflow: 'auto',
          height: '100vh',
          left: 0,
        }}
        collapsible collapsed={collapsed} 
        onCollapse={onCollapse}
        >
          <div className="logo" />
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={[location.pathname]}
          >
            <Menu.Item key="/">
              <HomeOutlined />
              <span>Trang chủ</span>
              <Link to="/"></Link>
            </Menu.Item>
            {classID != false &&
            <>
        <Menu.Item key={`/${classID}/dashboard`}>
          <DashboardOutlined />
          <span>Dashboard</span>
          <Link to={`/${classID}/dashboard`}></Link>
        </Menu.Item>
        <Menu.Item key={`/${classID}/studentinfo`}>
              <InfoCircleOutlined />
              <span>Thông tin SV</span>
              <Link to={`/${classID}/studentinfo`}></Link>
            </Menu.Item>
            <Menu.Item key={`/${classID}/studentscore`}>
              <TableOutlined />
              <span>Bảng điểm SV</span>
              <Link to={`/${classID}/studentscore`}></Link>
            </Menu.Item>
        </>
      }
            
            
            <Menu.Item key="/chat">
              <MessageOutlined />
              <span>Tin nhắn</span>
              <Link to="/chat"></Link>
            </Menu.Item>
            
            <Menu.Item key="/profile">
              <UserOutlined />
              <span>Cá nhân</span>
              <Link to="/profile"></Link>
            </Menu.Item>
            <Menu.Item key="abc">
            </Menu.Item>
            <Menu.Item onClick={onLogout}>
              <LoginOutlined />
              <span>Đăng xuất</span>
            </Menu.Item>
          </Menu>

        </Sider>
    );
}

import React, { useState } from 'react';

import { Link, useLocation } from 'react-router-dom';
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

function Nav() {
    const auth = useRecoilValue(authAtom);
    const userActions = useUserActions();
    const location = useLocation();
    const [collapsed, setCollapsed] = useState(false);
    const onCollapse = (collapsed) => setCollapsed(collapsed);
    // only show nav when logged in
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
            <Menu.Item key="/dashboard">
              <DashboardOutlined />
              <span>Dashboard</span>
              <Link to="/dashboard"></Link>
            </Menu.Item>
            <Menu.Item key="/feed">
              <BellOutlined />
              <span>Bảng thông báo</span>
              <Link to="/feed"></Link>
            </Menu.Item>
            <Menu.Item key="/chat">
              <MessageOutlined />
              <span>Tin nhắn</span>
              <Link to="/chat"></Link>
            </Menu.Item>
            <Menu.Item key="/studentinfo">
              <InfoCircleOutlined />
              <span>Thông tin SV</span>
              <Link to="/studentinfo"></Link>
            </Menu.Item>
            <Menu.Item key="/studentscore">
              <TableOutlined />
              <span>Bảng điểm SV</span>
              <Link to="/studentscore"></Link>
            </Menu.Item>
            <Menu.Item key="/profile">
              <UserOutlined />
              <span>Cá nhân</span>
              <Link to="/profile"></Link>
            </Menu.Item>
            <Menu.Item >
            </Menu.Item>
            <Menu.Item onClick={userActions.logout}>
              <LoginOutlined />
              <span>Đăng xuất</span>
            </Menu.Item>
          </Menu>

        </Sider>
    );
}

{/* <NavLink exact to="/" className="nav-item">Trang chủ</NavLink>
            <NavLink exact to="/dashboard" className="nav-item">Dashboard</NavLink>
            <NavLink exact to="/feed" className="nav-item">Bảng tin</NavLink>
            <NavLink exact to="/chat" className="nav-item">Nhắn tin</NavLink>
            <NavLink exact to="/studentinfo" className="nav-item">Thông tin SV</NavLink>
            <NavLink exact to="/studentscore" className="nav-item">Bảng điểm SV</NavLink>
            <NavLink exact to="/profile" className="nav-item">Hồ sơ cá nhân</NavLink>
            <NavLink to="/users" className="nav-item">QL Tài khoản</NavLink> */}

// return (
//     <nav className="navbar">
//         <div>
//             <NavLink exact to="/" className="nav-item">Trang chủ</NavLink>
//             <NavLink exact to="/dashboard" className="nav-item">Dashboard</NavLink>
//             <NavLink exact to="/feed" className="nav-item">Bảng tin</NavLink>
//             <NavLink exact to="/chat" className="nav-item">Nhắn tin</NavLink>
//             <NavLink exact to="/studentinfo" className="nav-item">Thông tin SV</NavLink>
//             <NavLink exact to="/studentscore" className="nav-item">Bảng điểm SV</NavLink>
//             <NavLink exact to="/profile" className="nav-item">Hồ sơ cá nhân</NavLink>
//             <NavLink to="/users" className="nav-item">QL Tài khoản</NavLink>

//             <a onClick={userActions.logout} className="nav-item">Đăng xuất</a>
//         </div>
//     </nav>
// );

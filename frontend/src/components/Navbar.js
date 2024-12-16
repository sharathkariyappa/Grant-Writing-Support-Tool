import React from 'react';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';
import { HomeOutlined, FileTextOutlined, TeamOutlined } from '@ant-design/icons';


const Navbar = () => {
  return (
    <Menu mode="horizontal" theme="dark">
      <Menu.Item key="home" icon={<HomeOutlined />}>
        <Link to="/">Home</Link>
      </Menu.Item>
      <Menu.Item key="assistant" icon={<FileTextOutlined />}>
        <Link to="/grantAssistant">Grant Assistant</Link>
      </Menu.Item>
      <Menu.Item key="profile" icon={<TeamOutlined />}>
        <Link to="/OrganizationProfile">Organization Profile</Link>
      </Menu.Item>
    </Menu>
  );
};

export default Navbar;

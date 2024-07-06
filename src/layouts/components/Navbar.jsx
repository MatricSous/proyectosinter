import React from 'react';
import { Menu } from 'antd';
import {
  HomeOutlined,
  UserOutlined,
  MenuOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';

const items = [
  {
    key: '1',
    icon: <HomeOutlined style={{ fontSize: '16pt' }} />,
    title: 'Home',
    label: (
      <Link to={'/inicio'} style={{ color: '#FFFFFF' }}>
        Inicio
      </Link>
    ),
  },
  {
    key: '2',
    icon: <MenuOutlined style={{ fontSize: '16pt' }} />,
    title: 'Mis proyectos',
    label: (
      <Link to={'/Proyectos'} style={{ color: '#FFFFFF' }}>
        Mis proyectos
      </Link>
    ),
  },
  {
    key: '3',
    icon: <UserOutlined style={{ fontSize: '16pt' }} />,
    title: 'Perfil',
    label: (
      <Link to={'/Perfil'} style={{ color: '#FFFFFF' }}>
        Perfil
      </Link>
    ),
  },
];

const Navbar = () => {
  return (
    <div style={{ width: '100%' }} className="mt-0 md:mt-2">
      <Menu
        mode="horizontal"
        theme="dark"
        style={{
          display: 'flex',
          justifyContent: 'space-around',
          width: '100%',
          backgroundColor: '#c23633',
          fontSize: '16pt',
        }}
      >
        {items.map(item => (
          <Menu.Item key={item.key} icon={item.icon} style={{ width: '33%', textAlign: 'center' }}>
            {item.label}
          </Menu.Item>
        ))}
      </Menu>
    </div>
  );
};

export default Navbar;

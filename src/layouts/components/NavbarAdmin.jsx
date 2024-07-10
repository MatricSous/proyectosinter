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
    icon: <MenuOutlined style={{ fontSize: '16pt' }} />,
    title: 'Proyectos',
    label: (
      <Link to={'/Admin'} style={{ color: '#FFFFFF' }}>
        Proyectos
      </Link>
    ),
  },
  {
    key: '2',
    icon: <UserOutlined style={{ fontSize: '16pt' }} />,
    title: 'Perfil',
    label: (
      <Link to={'/PerfilAdmin'} style={{ color: '#FFFFFF' }}>
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
       
        style={{
          display: 'flex',
          justifyContent: 'space-around',
          width: '100%',
          backgroundColor: '#3F3B3A',
          fontSize: '16pt',
        }}
      >
        {items.map(item => (
          <Menu.Item key={item.key} icon={item.icon} style={{ width: '50%', textAlign: 'center' }}>
            {item.label}
          </Menu.Item>
        ))}
      </Menu>
    </div>
  );
};

export default Navbar;

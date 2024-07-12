import React, { useState } from 'react';
import { Avatar, Row, Col, Modal, Input, Button } from 'antd';
import { UserAddOutlined, LogoutOutlined } from '@ant-design/icons';
import { LogOut } from '../services/authentication';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const UserCard = ({ firstName, lastName, isInvite, onInviteClick, onLogoutClick }) => {
  const initials = `${firstName.charAt(0)}${lastName.charAt(0)}`;

  return (
    <Col
      style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
    >
      <div
        style={{ textAlign: 'center', margin: '15px' }}
        onClick={isInvite ? onInviteClick : null}
      >
        {isInvite ? (
          <Avatar
            className="w-full h-full p-10"
            icon={<UserAddOutlined style={{ fontSize: '100px', color: '#b22222' }} />}
            style={{ backgroundColor: '#f0f0f0', cursor: 'pointer' }}
          />
        ) : (
          <Avatar
            className="w-full h-full p-10"
            style={{ backgroundColor: '#d9d9d9', fontSize: '150px' }}
          >
            {initials}
          </Avatar>
        )}
        <div style={{ marginTop: '10px', fontWeight: 'bold', fontSize: '40px' }}>
          {`${firstName} ${lastName}`}
        </div>
        <Button
          shape="round"
          type="primary"
          icon={<LogoutOutlined />}
          style={{ width: '400px', height: '70px', fontSize: '20px', marginBottom: '20px', marginTop: '10px' }}
          onClick={onLogoutClick}
        >
          Cerrar Sesión
        </Button>
      </div>
    </Col>
  );
};

const Perfil = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [firstName, setFirstName] = useState('Saji'); // cambiar nombre y apellido
  const [lastName, setLastName] = useState('Za');  // cambiar nombre y apellido

  const logoutUser = async () => {
    try {
      await LogOut(dispatch);
    

    } catch (error) {
      console.error('Login failed:', error);
      setError('Correo o contraseña incorrectos. Intente nuevamente.'); // Set error message
    }
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleOk = () => {
    // Logica de la invitacion // agregar la wea de los mails
    setIsModalVisible(false);
  };

  return (
    <div style={{ padding: '50px 20px', backgroundColor: '#fafafa' }}>
      <Row justify="space-around" align="middle">
        <UserCard 
          firstName={firstName} 
          lastName={lastName} 
          isInvite={false} 
          onLogoutClick={logoutUser}
        />
      </Row>
    </div>
  );
};

export default Perfil;

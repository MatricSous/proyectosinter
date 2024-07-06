import React, { useState } from 'react';
import { Avatar, Row, Col, Modal, Input, Button } from 'antd';
import { UserAddOutlined, UserOutlined, LogoutOutlined } from '@ant-design/icons';

const UserCard = ({ name, isInvite, onInviteClick }) => (
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
          // size={400}
          icon={
            <UserAddOutlined style={{ fontSize: '100px', color: '#b22222' }} />
          }
          style={{ backgroundColor: '#f0f0f0', cursor: 'pointer' }}
        />
      ) : (
        <Avatar
          className="w-full h-full p-10"
          style={{ backgroundColor: '#d9d9d9' }}
        >
          <UserOutlined style={{ fontSize: '300px' }} />
        </Avatar>
      )}
      <div style={{ marginTop: '10px', fontWeight: 'bold', fontSize: '40px' }}>
        {name}
      </div>
      <Button
            shape="round"
            type="primary"
            icon={<LogoutOutlined />}
            
            style={{ width: '400px', height: '70px', fontSize: '20px', marginBottom: '20px', marginTop:'10px' }}
          >
            Cerrar Sesión
          </Button>
    </div>
  </Col>
);

const Perfil = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

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
        
        <UserCard name="Nombre usuario" isInvite={false} />
        
        
      </Row>
      
    </div>
  );
};

export default Perfil;

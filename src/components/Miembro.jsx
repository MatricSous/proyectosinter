import React, { useState } from 'react';
import { Avatar, Row, Col, Modal, Input, Button, Space } from 'antd';
import { UserAddOutlined, UserOutlined, CloseOutlined } from '@ant-design/icons';

const UserCard = ({ member, onInviteClick, onRemoveClick }) => (
  <Col style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
    <div style={{ textAlign: 'center', margin: '15px', position: 'relative' }}>
      {member.isInvite ? (
        <Avatar
          className="w-full h-full p-10"
          icon={<UserAddOutlined style={{ fontSize: '100px', color: '#b22222' }} />}
          style={{ backgroundColor: '#f0f0f0', cursor: 'pointer' }}
          onClick={onInviteClick}
        />
      ) : (
        <Avatar
          className="w-full h-full p-10"
          style={{ backgroundColor: '#d9d9d9' }}
          icon={<UserOutlined style={{ fontSize: '100px' }} />}
        />
      )}
      <div style={{ marginTop: '10px', fontWeight: 'bold', fontSize: '18px' }}>
        {member.name}
        {!member.isInvite && (
          <Space style={{ position: 'absolute', top: 0, right: 0 }}>
            <CloseOutlined
              style={{ fontSize: '18px', color: 'red', cursor: 'pointer' }}
              onClick={() => onRemoveClick(member.id)}
            />
          </Space>
        )}
      </div>
    </div>
  </Col>
);

const Miembros = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [members, setMembers] = useState([
    { id: 1, name: 'Nombre usuario 1', isInvite: false },
    { id: 2, name: 'Nombre usuario 2', isInvite: false },
    
  ]); // Ejemplo de lista de miembros inicial

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleOk = () => {
    // Lógica para agregar un nuevo miembro
    setIsModalVisible(false);
  };

  const addMember = (name) => {
    const newMember = { id: members.length + 1, name, isInvite: false };
    setMembers([...members, newMember]);
  };

  const removeMember = (id) => {
    const updatedMembers = members.filter(member => member.id !== id);
    setMembers(updatedMembers);
  };

  return (
    <div style={{ padding: '50px 20px', backgroundColor: '#fafafa' }}>
      <Row justify="space-around" align="middle">
        {members.map(member => (
          <UserCard
            key={member.id}
            member={member}
            onRemoveClick={removeMember}
            onInviteClick={showModal}
          />
        ))}
        <UserCard
          member={{ id: 'invite', name: 'Invitar Usuario', isInvite: true }}
          onInviteClick={showModal}
        />
      </Row>
      <Modal
        title="Invitar Usuario"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <Input
          placeholder="Correo de invitación"
          style={{ marginBottom: '10px' }}
        />
        <Button
          type="primary"
          block
          style={{ marginBottom: '10px' }}
          onClick={handleOk}
        >
          Enviar Invitación
        </Button>
        <Button block>Copiar Link de Invitación</Button>
      </Modal>
    </div>
  );
};

export default Miembros;

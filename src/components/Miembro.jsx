import React, { useState } from 'react';
import { Avatar, Row, Col, Modal, Input, Button, Space } from 'antd';
import { UserAddOutlined, CloseOutlined } from '@ant-design/icons';

const UserCard = ({ member, onInviteClick, onRemoveClick }) => {
  const initials = `${member.nombre.charAt(0)}${member.apellido.charAt(0)}`;

  return (
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
            style={{ backgroundColor: '#d9d9d9', fontSize: '100px' }}
          >
            {initials}
          </Avatar>
        )}
        <div style={{ marginTop: '10px', fontWeight: 'bold', fontSize: '18px' }}>
          {member.nombre} {member.apellido}
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
};

const Miembros = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [members, setMembers] = useState([
    { id: 1, nombre: 'Nombre', apellido: 'Usuario1', isInvite: false },
    { id: 2, nombre: 'Nombre', apellido: 'Usuario2', isInvite: false },
  ]); // Ejemplo de lista de miembros inicial
  const [email, setEmail] = useState('');

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleOk = () => {
    addMember(email);
    setIsModalVisible(false);
  };

  const addMember = (email) => {
    const newMember = { id: members.length + 1, nombre: 'Invitado', apellido: '', email, isInvite: false };
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
          member={{ id: 'invite', nombre: 'Invitar', apellido: 'Usuario', isInvite: true }}
          onInviteClick={showModal}
        />
      </Row>
      <Modal
        title="Invitar Usuario"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        width={800} // Ajusta el ancho del modal aquí
      >
        <Input
          placeholder="Correo Electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ marginBottom: '10px' }}
        />
        <Button
          type="primary"
          block
          style={{ marginBottom: '10px' }}
          onClick={handleOk}
        >
          Agregar Miembro
        </Button>
      </Modal>
    </div>
  );
};

export default Miembros;

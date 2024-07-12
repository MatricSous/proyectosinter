import React, { useState, useEffect } from 'react';
import { UserAddOutlined, CloseOutlined } from '@ant-design/icons';
import { Avatar, Modal, Input, Button, Col, Row } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { GetDetallesProyecto } from '../services/proyectos';
import ScrollableContainer from '../components/ScrollableList';

const UserCard = ({ member, onInviteClick, onRemoveClick }) => {
  const initials = `${member.nombre ? member.nombre.charAt(0) : ''}${member.apellido ? member.apellido.charAt(0) : ''}`;

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
            style={{ backgroundColor: '#d9d9d9', fontSize: '100px', width: '200px', height: '200px' }}
          >
            {initials}
          </Avatar>
        )}
        <div style={{ marginTop: '10px', fontWeight: 'bold', fontSize: '18px' }}>
          {member.nombre} {member.apellido}
          {!member.isInvite && (
            <CloseOutlined
              style={{ fontSize: '18px', color: 'red', cursor: 'pointer' }}
              onClick={() => onRemoveClick(member.id)}
            />
          )}
        </div>
      </div>
    </Col>
  );
};

const Miembros = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [miembrosT, setMiembrosT] = useState([]);

  const dispatch = useDispatch();
  const detallesProyecto = useSelector(state => state.expensesSlice.detallesProyecto);
  const { id } = useParams();

  useEffect(() => {
    const fetchProyectoDetails = async () => {
      const idData = { id: id };
      await GetDetallesProyecto(dispatch, idData);
    };
    fetchProyectoDetails();
  }, [dispatch, id]);

  useEffect(() => {
    if (detallesProyecto) {
      setMiembrosT(detallesProyecto.colaboradores || []);
    }
  }, [detallesProyecto]);

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
    const username = email.split('@')[0];
    const newMember = { id: miembrosT.length + 1, nombre: username, apellido: '', email, isInvite: false };
    setMiembrosT([...miembrosT, newMember]);
  };

  const removeMember = (id) => {
    const updatedMembers = miembrosT.filter(member => member.id !== id);
    setMiembrosT(updatedMembers);
  };

  return (
    <div style={{ padding: '50px 20px', backgroundColor: '#fafafa' }}>
      <Row justify="space-around" align="middle">
        <ScrollableContainer items={miembrosT} renderItem={(miembro, index) => (
          <UserCard
            key={index}
            member={miembro}
            onInviteClick={showModal}
            onRemoveClick={removeMember}
          />
        )} maxVisibleItems={5} isHorizontal={true} />
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
        width={800}
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

import React, { useState, useEffect } from 'react';
import { UserAddOutlined, CloseOutlined } from '@ant-design/icons';
import { Avatar, Modal, Input, Button, Col, Row } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { GetDetallesProyecto, añadirColaborador, eliminarColaborador } from '../services/proyectos';
import ScrollableContainer from '../components/ScrollableList';


const UserCard = ({ member, onInviteClick, onRemoveClick, autoridad }) => {
  const initials = `${member.nombre ? member.nombre.charAt(0) : ''}${member.apellido ? member.apellido.charAt(0) : ''}`;

  const confirmRemove = (member) => {
    Modal.confirm({
      title: '¿Estás seguro de que deseas eliminar este miembro?',
      content: member.nombre + ' ' + member.apellido,
      okText: 'Sí',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        onRemoveClick(member);
      },
    });
  };

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
          {!member.isInvite && autoridad <= 3 && (
            <CloseOutlined
              style={{ fontSize: '18px', color: 'red', cursor: 'pointer' }}
              onClick={(e) => {
                e.stopPropagation(); // Prevent triggering the onClick of the parent div
                confirmRemove(member);
              }}
            />
          )}
        </div>
      </div>
    </Col>
  );
};

const Miembros = (idProyectoIn) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [miembrosT, setMiembrosT] = useState([]);
  const dispatch = useDispatch();
  const detallesProyecto = useSelector(state => state.expensesSlice.detallesProyecto);
  const { id } = useParams();
  const autoridad = 2; // This should be retrieved from the context or state

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

  const addMember = async (email) => {
    if (!email) {
      return;
    }

    console.log("id",idProyectoIn);

    const newMember = { correo: email, idProyecto: idProyectoIn.idProyectoIn};
    await añadirColaborador(dispatch, newMember);
    window.location.reload();
  };

  const removeMember = async (miembro) => {
    console.log(`Removing member: ${miembro.nombre} ${miembro.apellidoPat} with email ${miembro.mail}`);
    console.log(idProyectoIn.idProyectoIn)
    const removingMember = {correo: miembro.mail, idProyecto: idProyectoIn.idProyectoIn}
    const updatedMembers = miembrosT.filter(member => member.mail !== miembro.mail);
    setMiembrosT(updatedMembers);
    await eliminarColaborador(dispatch, removingMember)
    window.location.reload()
  };

  return (
    <div style={{ padding: '50px 20px', backgroundColor: '#fafafa' }}>
      <Row justify="space-around" align="middle">
        <ScrollableContainer
          items={miembrosT}
          renderItem={(miembro, index) => (
            <UserCard
              key={index}
              member={miembro}
              onInviteClick={showModal}
              onRemoveClick={removeMember}
              autoridad={autoridad}
            />
          )}
          maxVisibleItems={5}
          isHorizontal={true}
        />
        <UserCard
          member={{ id: 'invite', nombre: 'Invitar', apellido: 'Usuario', isInvite: true }}
          onInviteClick={showModal}
          autoridad={autoridad}
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

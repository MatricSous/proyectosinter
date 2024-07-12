import React, { useState, useEffect } from 'react';
import { UserAddOutlined, CloseOutlined } from '@ant-design/icons';
import { useNavigate, Link, useParams } from 'react-router-dom';
import { Avatar, Card, Modal, Tag, Typography, Input, Button, Col, Popconfirm, message, Space, Row } from 'antd';
import ScrollableContainer from '../components/ScrollableList';
import { PlusCircleOutlined, EditOutlined, FileImageOutlined, LikeOutlined, MessageOutlined, DeleteOutlined } from '@ant-design/icons';
import UploadFile from '../components/UploadFile';
import Miembro from '../components/Miembro';
import Foro from '../components/Foro';
import Referencia from '../components/Referencia';
import image from '../images/test2.jpg'; // Asegúrate de que la ruta de la imagen sea correcta
import { useDispatch, useSelector } from 'react-redux';
import { GetDetallesProyecto } from '../services/proyectos';

const UserCard = ({ member, onInviteClick, onRemoveClick }) => {
  const detallesProyecto = useSelector(state => state.expensesSlice.detallesProyecto);
  const dispatch = useDispatch();
  const initials = `${member.nombre.charAt(0)}${member.apellido.charAt(0)}`;
  const [miembrosT, setMiembrosT] = useState([]);
  const [colaboradores, setColaboradores] = useState([]);
  let { id } = useParams();


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
  const detallesProyecto = useSelector(state => state.expensesSlice.detallesProyecto);
  const dispatch = useDispatch();
  const [autoridad, setAutoridad] = useState('');
  const [email, setEmail] = useState('');
  const [miembrosT, setMiembrosT] = useState([]);
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

  
  const [colaboradores, setColaboradores] = useState([]);
  let { id } = useParams();

  useEffect(() => {
    // Function to fetch proyecto details
    const fetchProyectoDetails = async () => {
      const idData = { id: id };
      await GetDetallesProyecto(dispatch, idData);
    };
    fetchProyectoDetails(); // Execute the fetch on component mount or when 'dispatch' changes
  }, [dispatch, id]);

  useEffect(() => {
    // Update state when detallesProyecto changes
    if (detallesProyecto) {
      setAutoridad(detallesProyecto.autoridad || '');
      setColaboradores(detallesProyecto.colaboradores || []);
    }
  }, [detallesProyecto]);

  const transformedMiembros = colaboradores.map(archivo => ({
    nombre: archivo.nombre,
    apellido: archivo.apellidoPat + " " + archivo.apellidoMat,
    mail: archivo.mail
  }));

  const renderMiembro = (miembro, index) => {
    const initials = `${miembro.nombre.charAt(0)}${miembro.apellido.charAt(0)}`;
    return (
      <div key={index} className="flex flex-col items-center">
        <Avatar size={64} className="bg-gray-300">
          {initials}
        </Avatar>
        <p style={{ marginTop: '10px', fontWeight: 'bold', fontSize: '18px' }}>
          {miembro.nombre} {miembro.apellido}
        </p>
      </div>
    );
  };
  const [isModalVisibleMiembro, setIsModalVisibleMiembro] = useState(false);
  const handleModalMiembro = () => {
    setIsModalVisibleMiembro(!isModalVisibleMiembro);
  };


  return (
    <div style={{ padding: '50px 20px', backgroundColor: '#fafafa' }}>
      <Row justify="space-around" align="middle">
        {autoridad <= 3 && (
            <PlusCircleOutlined className="ml-2" size={20} onClick={handleModalMiembro} />
          )}
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

import React, { useState, useEffect, useRef } from 'react';
import { Avatar, Row, Col, Modal, Input, Button, Space } from 'antd';
import { UserAddOutlined, CloseOutlined, PlusCircleOutlined, FileImageOutlined, FileAddOutlined } from '@ant-design/icons';
import image from '../images/test2.jpg';
import { useNavigate } from 'react-router-dom'; // Importa el hook useNavigate

const UserCard = ({ member, onInviteClick, onRemoveClick }) => {
  const navigate = useNavigate(); // Utiliza el hook useNavigate

  return (
    <Col style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ textAlign: 'center', margin: '15px', position: 'relative' }}>
        {member.isInvite ? (
          <Avatar
            className="w-full h-full p-10"
            icon={<PlusCircleOutlined style={{ fontSize: '100px', color: '#b22222' }} />}
            style={{ backgroundColor: '#f0f0f0', cursor: 'pointer' }}
            onClick={onInviteClick}
          />
        ) : (
          <Avatar
            className="w-full h-full p-10"
            src={member.image}
            style={{ backgroundColor: '#fff', cursor: 'pointer' }}
            onClick={() => navigate(`/Proyectos/${member.id}/Referencia`)} // Utiliza navigate para redirigir
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
};

const Miembros = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [members, setMembers] = useState([
    { id: 1, name: 'Referencia 1', isInvite: false, image: image },
    { id: 2, name: 'Referencia 2', isInvite: false, image: image },
  ]); // Ejemplo de lista de miembros inicial
  const [references, setReferences] = useState([]);
  const [position, setPosition] = useState('end');
  const [isModalVisible2, setIsModalVisible2] = useState(false);
  const fileInputRef = useRef(null);
  const [nombreReferencia, setNombreReferencia] = useState('');
  const [descripcionReferencia, setDescripcionReferencia] = useState('');

  useEffect(() => {
    // Aquí puedes realizar la llamada a la base de datos para obtener las referencias
    const fetchReferences = async () => {
      const fetchedReferences = [
        { id: 1, name: 'Referencia 1', image: image },
        { id: 2, name: 'Referencia 2', image: 'url-de-la-imagen-2' },
      ];
      setReferences(fetchedReferences);
    };

    fetchReferences();
  }, []);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleCreateReference = () => {
    // Aquí puedes manejar la creación de la referencia
    console.log('Nombre de la referencia:', nombreReferencia);
    console.log('Descripción de la referencia:', descripcionReferencia);
    setNombreReferencia('');
    setDescripcionReferencia('');
    setIsModalVisible(false);
  };

  const addMember = (reference) => {
    const newMember = { ...reference, isInvite: false };
    setMembers([...members, newMember]);
    setIsModalVisible(false);
  };

  const removeMember = (id) => {
    const updatedMembers = members.filter(member => member.id !== id);
    setMembers(updatedMembers);
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Aquí puedes manejar la imagen cargada como necesites
      console.log('Imagen cargada:', file);
    }
  };

  const showModalv2 = () => {
    setIsModalVisible(true);
    window.location.href = '/proyecto#/Referencia';
  };

  const handleCancel2 = () => {
    setIsModalVisible2(false);
  };

  const Buscador = () => {
    setIsModalVisible2(true);
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
          member={{ id: 'invite', name: 'Agregar Referencia', isInvite: true }}
          onInviteClick={showModal}
        />
      </Row>
      <Modal
        title="Agregar Referencia"
        visible={isModalVisible}
        onOk={handleCreateReference}
        onCancel={handleCancel}
        footer={null}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
          }}
        >
          <Input
            shape="round"
            placeholder="Nombre de la Referencia"
            value={nombreReferencia}
            onChange={(e) => setNombreReferencia(e.target.value)}
            style={{
              marginBottom: '10px',
              width: '300px',
              borderRadius: '25px',
              height: '40px',
            }}
          />
          <Input.TextArea
            placeholder="Descripción de la Referencia"
            value={descripcionReferencia}
            onChange={(e) => setDescripcionReferencia(e.target.value)}
            style={{
              marginBottom: '10px',
              width: '300px',
              borderRadius: '25px',
              height: '120px', // Tres veces la altura del nombre
            }}
          />
          <Button
            shape="round"
            type="primary"
            icon={<FileImageOutlined />}
            iconPosition={position}
            onClick={handleButtonClick}
            style={{ width: '300px', height: '40px', fontSize: '18px' }}
          >
            Imagen de previsualización
          </Button>
          <Button
            shape="round"
            type="primary"
            icon={<FileAddOutlined />}
            iconPosition={position}
            onClick={handleCreateReference}
            style={{
              width: '250px',
              height: '40px',
              fontSize: '18px',
              marginTop: '20px',
            }}
          >
            Crear Referencia
          </Button>
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: 'none' }}
            accept="image/*"
            onChange={handleImageUpload}
          />
        </div>
      </Modal>
    </div>
  );
};

export default Miembros;

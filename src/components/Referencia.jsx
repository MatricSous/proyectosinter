import React, { useState, useEffect, useRef } from 'react';
import { Avatar, Row, Col, Modal, Input, Button, Space, notification } from 'antd';
import { UserAddOutlined, CloseOutlined, PlusCircleOutlined, PictureOutlined, FileImageOutlined, FileAddOutlined } from '@ant-design/icons';
import image from '../images/test2.jpg';
import { useNavigate } from 'react-router-dom'; // Importa el hook useNavigate
import { useDispatch } from 'react-redux';
import { jwtDecode } from 'jwt-decode';
import { ImageDB } from '../Config';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { crearReferencia, eliminarReferencia } from '../services/proyectos';

const UserCard = ({ member, onInviteClick, onRemoveClick }) => {
  const navigate = useNavigate(); // Utiliza el hook useNavigate

  return (
    <Col style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ textAlign: 'center', margin: '15px', position: 'relative' }}>
        {member.isInvite ? (
          <Avatar
            className="w-full h-full p-10"
            icon={<PlusCircleOutlined style={{ fontSize: '100px', color: '#b22222' }} />}
            style={{ backgroundColor: '#f0f0f0', cursor: 'pointer', width: '200px', height: '200px', borderRadius: '0' }}
            onClick={onInviteClick}
          />
        ) : (
          <Avatar
            className="w-full h-full p-10"
            src={member.foto || image} // Fallback to a default image if member.image is undefined
            style={{ backgroundColor: '#fff', cursor: 'pointer', width: '150px', height: '150px', borderRadius: '0' }}
            onClick={() => navigate(`/Proyecto/Referencia/${member.id}`)} // Utiliza navigate para redirigir
          />
        )}
        <div style={{ marginTop: '10px', fontWeight: 'bold', fontSize: '18px' }}>
          {member.titulo}
          {!member.isInvite && (
            <Space style={{ position: 'absolute', top: 0, right: 0 }}>
              <CloseOutlined
                style={{ fontSize: '18px', color: 'red', cursor: 'pointer' }}
                onClick={() => onRemoveClick(member.id)}
              />
            </Space>
          )}
        </div>
        <div style={{ marginTop: '5px', fontSize: '14px', color: '#888' }}>
          {member.title}
        </div>
      </div>
    </Col>
  );
};

const Miembros = ({ membersIn , idProyectoIn}) => {
  const dispatch = useDispatch();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [members, setMembers] = useState(membersIn || []); // Initialize members from membersIn object
  const [isModalVisible2, setIsModalVisible2] = useState(false);
  const fileInputRef = useRef(null);
  const [nombreReferencia, setNombreReferencia] = useState('');
  const [descripcionReferencia, setDescripcionReferencia] = useState('');
  const [imagensubida, setImagenSubida] = useState(null);
  const [imagensubidaName, setImagenSubidaName] = useState('');

  useEffect(() => {
    setMembers(membersIn || []); // Update members if membersIn changes
  }, []);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const postReferencia = async(newReference) => {
  
    try {
      await crearReferencia(dispatch, newReference);
      //navigate('/inicio'); // Redirect upon successful login
    } catch (error) {
      console.error('No se pudo crear proyecto:', error);
  }
  }

  const handleCreateReference = async () => {
    if (!nombreReferencia){

      return;
    }

    if (!imagensubida) {

      return;
    }

    const token = localStorage.getItem('ACCESS_TOKEN');
    const tokenDec = jwtDecode(token);
    const mail = tokenDec.unique_name;
    const timestamp = new Date().getTime(); // Add timestamp to ensure uniqueness
    const fileName1 = `${mail}-${nombreReferencia}-${timestamp}-${imagensubidaName}`; // Assuming projectTitle and fileName are defined somewhere
  
    const imgRef = ref(ImageDB, `files/${fileName1}`);
    console.log(imgRef);
  
    try {
      // Check if the file with the same name exists
  
      await uploadBytes(imgRef, imagensubida);
      console.log('Uploaded a blob or file!');
  
      const downloadURL = await getDownloadURL(imgRef);
      console.log(downloadURL);

      const newReference = {
          id_proyecto: idProyectoIn,
          titulo: nombreReferencia, // Adjust based on user input
          descripcion: descripcionReferencia, // You may need to implement the logic for project description
          foto: downloadURL, // Assuming imgRef is the URL or reference to the uploaded photo
        }

      postReferencia(newReference)

    } catch (error) {
      console.error('Upload failed:', error);

    }


    console.log('Nombre de la referencia:', nombreReferencia);
    console.log('Descripción de la referencia:', descripcionReferencia);



    setNombreReferencia('');
    setDescripcionReferencia('');
    setIsModalVisible(false);

    // Add the new reference to the members list
    window.location.reload()
  };



  const removeMember = (id) => {
    // Mostrar confirmación antes de borrar
    Modal.confirm({
      title: 'Confirmación',
      content: '¿Estás seguro de que quieres eliminar esta referencia?',
      okText: 'Eliminar',
      cancelText: 'Cancelar',

      
      onOk: () => {
        console.log(id)
        const idData = { id: id.toString() };
        eliminarReferencia(dispatch, idData)
        const updatedMembers = members.filter(member => member.id !== id);        
        setMembers(updatedMembers);
      },
      onCancel: () => {
        console.log('Cancelado');
      },
    });
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImagenSubida(file);
      setImagenSubidaName(file.name);
    }
  };

  const handlePopupClose = () => {
    setIsModalVisible2(false);
  };

  return (
    <div style={{ padding: '50px 20px', backgroundColor: '#fafafa' }}>
      <Row justify="space-around" align="middle">
        {members.length === 0 ? (
          <Col style={{ textAlign: 'center', margin: '15px' }}>
            <div style={{ textAlign: 'center', margin: '15px', position: 'relative' }}>
              <Avatar
                className="w-full h-full p-10"
                icon={<PictureOutlined style={{ fontSize: '100px', color: '#b22222' }} />}
                style={{ backgroundColor: '#f0f0f0', cursor: 'pointer' }}
                onClick={showModal}
              />
              <div style={{ marginTop: '10px', fontWeight: 'bold', fontSize: '18px' }}>
                Agregar Referencia
              </div>
            </div>
          </Col>
        ) : (
          members.map(member => (
            <UserCard
              key={member.id}
              member={member}
              onRemoveClick={removeMember}
              onInviteClick={showModal}
            />
          ))
        )}
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
        width={800} // Ajusta el ancho del modal aquí
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
              width: '100%', // Ajusta el ancho del input
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
              width: '100%', // Ajusta el ancho del textarea
              borderRadius: '25px',
              height: '120px', // Tres veces la altura del nombre
            }}
          />
          <Button
            shape="round"
            type="primary"
            icon={<FileImageOutlined />}
            iconPosition="start"
            onClick={handleButtonClick}
            style={{ width: '100%', height: '40px', fontSize: '18px' }} // Ajusta el ancho del botón
          >
            Imagen de previsualización
          </Button>
                    {/* Preview the uploaded image */}
          {imagensubida && (
            <div style={{ marginBottom: '10px' }}>
              <img
                src={URL.createObjectURL(imagensubida)}
                alt="Preview"
                style={{ width: '300px', height: '200px', objectFit: 'cover' }}
              />
            </div>
          )}
          <Button
            shape="round"
            type="primary"
            icon={<FileAddOutlined />}
            iconPosition="start"
            onClick={handleCreateReference}
            style={{
              width: '100%', // Ajusta el ancho del botón
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


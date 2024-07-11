import React, { useState, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Avatar, Card, Modal, Tag, Typography, Input, Button, Col, Popconfirm, message } from 'antd';
import ScrollableContainer from '../components/ScrollableList';
import { PlusCircleOutlined, EditOutlined, FileImageOutlined, LikeOutlined, MessageOutlined, DeleteOutlined } from '@ant-design/icons';
import UploadFile from '../components/UploadFile';
import Miembro from '../components/Miembro';
import Foro from '../components/Foro';
import Referencia from '../components/Referencia';
import image from '../images/test2.jpg'; // Asegúrate de que la ruta de la imagen sea correcta

const { Title } = Typography;

const placeholderFileImage = 'https://www.iconpacks.net/icons/2/free-file-icon-1453-thumb.png';
const placeholderProyectImage = 'https://static.dezeen.com/uploads/2022/07/sq-university-of-oregon-schoolshows_dezeen_2364_col_0.jpg';

const Proyecto = () => {
  const archivos = [
    { name: 'Archivo 1', fileSize: '2 MB' },
    { name: 'Archivo 2', fileSize: '1.5 MB' },
    { name: 'Archivo 3', fileSize: '3.2 MB' },
    { name: 'Archivo 4', fileSize: '700 KB' },
    { name: 'Archivo 5', fileSize: '1.2 MB' },
    { name: 'Archivo 6', fileSize: '2.4 MB' },
    { name: 'Archivo 7', fileSize: '3.1 MB' },
  ];

  const [members, setMembers] = useState([
    { id: 1, nombre: 'Nombre', apellido: 'Usuario1', isInvite: false },
    { id: 2, nombre: 'Nombre', apellido: 'Usuario2', isInvite: false },
    { id: 3, nombre: 'Nombre', apellido: 'Usuario3', isInvite: false },
    { id: 3, nombre: 'Nombre', apellido: 'Usuario3', isInvite: false },
    { id: 4, nombre: 'Nombre', apellido: 'Usuario4', isInvite: false },
    { id: 4, nombre: 'Nombre', apellido: 'Usuario4', isInvite: false },
  ]);

  const [referentes, setReferentes] = useState([
    { id: 1, name: 'Referencia 1', isInvite: false, image: image },
    { id: 2, name: 'Referencia 2', isInvite: false, image: image },
    { id: 1, name: 'Referencia 1', isInvite: false, image: image },
    { id: 2, name: 'Referencia 2', isInvite: false, image: image },
    { id: 1, name: 'Referencia 1', isInvite: false, image: image },
    { id: 2, name: 'Referencia 2', isInvite: false, image: image },
  ]);

  const tags = ['Tag 1', 'Tag 2', 'Tag 3', 'Tag 4', 'Tag 5', 'Tag 2'];

  const [description, setDescription] = useState('Descripción: Hola');
  const [newDescription, setNewDescription] = useState('');
  const [isDescriptionModalVisible, setIsDescriptionModalVisible] = useState(false);

  const showDescriptionModal = () => {
    setNewDescription(description);
    setIsDescriptionModalVisible(true);
  };

  const handleDescriptionOk = () => {
    setIsDescriptionModalVisible(false);
    Modal.confirm({
      title: 'Confirmar cambio',
      content: '¿Estás seguro de cambiar la descripción?',
      onOk: () => {
        setDescription(newDescription);
        message.success('Descripción actualizada');
      },
    });
  };

  const handleDescriptionCancel = () => {
    setIsDescriptionModalVisible(false);
  };

  const renderArchivo = (archivo, index) => (
    <div
      key={index}
      className="flex items-center bg-gray-200 p-2 mb-2 rounded-lg cursor-pointer"
      onClick={() => alert(`Downloading ${archivo.name}`)}
    >
      <img
        src={placeholderFileImage}
        alt="Archivo adjunto"
        draggable="false"
        style={{
          width: '40px',
          height: '40px',
          objectFit: 'cover',
          borderRadius: '8px',
          userSelect: 'none',
          pointerEvents: 'none',
          marginRight: '10px',
        }}
      />
      <div>
        <p style={{ fontSize: '14px', margin: 0 }}>{archivo.name}</p>
        <p style={{ fontSize: '12px', color: 'gray', margin: 0 }}>{archivo.fileSize}</p>
      </div>
    </div>
  );

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

  const renderReferente = (referente, index) => (
    <Link to="/referencia" key={index}>
      <Card
        key={index}
        className="min-w-[120px] min-h-[120px] flex-shrink-0 bg-gray-300"
      >
        <img src="/images/test2.jpg" alt="descripcion" />
      </Card>
    </Link>
  );

  const [isModalVisible, setIsModalVisible] = useState(false);
  const handleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const [isModalVisible2, setIsModalVisible2] = useState(false);
  const handleModal2 = () => {
    setIsModalVisible2(!isModalVisible2);
  };

  const [isModalVisible3, setIsModalVisible3] = useState(false);
  const handleModal3 = () => {
    setIsModalVisible3(!isModalVisible3);
  };

  const [isModalVisibleMiembro, setIsModalVisibleMiembro] = useState(false);
  const handleModalMiembro = () => {
    setIsModalVisibleMiembro(!isModalVisibleMiembro);
  };

  const [projectImage, setProjectImage] = useState(placeholderProyectImage);
  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const [showButton, setShowButton] = useState(false);
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProjectImage(reader.result);
      };
      reader.readAsDataURL(file);
      setShowButton(true);
    }
  };

  const renderTag = (tag, index) => (
    <Tag key={index} color="blue">
      {tag}
    </Tag>
  );

  const [isModalVisible4, setIsModalVisible4] = useState(false);
  const handleModal4 = () => {
    setIsModalVisible4(!isModalVisible4);
  };

  const [isModalVisibleReferencia, setIsModalReferencia] = useState(false);
  const handleModalReferencia = () => {
    setIsModalReferencia(!isModalVisibleReferencia);
  };

  const navigate = useNavigate();

  const renderReferente2 = (referente) => (
    <Card
      key={referente.id}
      hoverable
      style={{ minWidth: '120px', minHeight: '120px', marginRight: '10px' }}
      onClick={() => navigate(`/Proyectos/${referente.id}/Referencia`)}
      cover={
        <div style={{ width: '100%', height: '100px', overflow: 'hidden' }}>
          <img
            alt={referente.name}
            src={referente.image}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>
      }
    >
      <Card.Meta title={referente.name} />
    </Card>
  );

  const confirmDeleteProject = () => {
    message.success('Proyecto eliminado correctamente');
    // Aquí deberías añadir la lógica para eliminar el proyecto
  };

  const autoridad = 1; // 1 es admin, 2 dueno, 3 colaborador, 4 publico

  return (
    <>
      <Modal open={isModalVisible} onCancel={handleModal} width={'80%'}>
        <UploadFile />
      </Modal>
      <Modal open={isModalVisibleReferencia} onCancel={handleModalReferencia} width={'80%'}>
        <Referencia />
      </Modal>
      <Modal open={isModalVisibleMiembro} onCancel={handleModalMiembro} width={'80%'}>
        <Miembro />
      </Modal>

      <Modal open={isModalVisible4} onCancel={handleModal4} width={'80%'}>
        <Foro />
      </Modal>

      <Modal visible={isModalVisible3} onCancel={handleModal3} width={'40%'} footer={null}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%' }}>
          <Button
            shape="round"
            type="primary"
            icon={<FileImageOutlined />}
            onClick={handleButtonClick}
            style={{ width: '400px', height: '70px', fontSize: '20px', marginBottom: '20px' }}
          >
            Cambiar Imagen de previsualización
          </Button>
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: 'none' }}
            accept="image/*"
            onChange={handleImageUpload}
          />
          {showButton && (
            <Button
              type="primary"
              shape="round"
              style={{ width: '200px', height: '50px', fontSize: '18px' }}
              onClick={handleModal3}
            >
              Aceptar<LikeOutlined />
            </Button>
          )}
        </div>
      </Modal>

      <Modal
        visible={isModalVisible2}
        onCancel={handleModal2}
        width={'25%'}
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
            placeholder="Nombre del Proyecto"
            style={{
              marginBottom: '5px',
              width: '300px',
              borderRadius: '25px',
              height: '40px',
            }}
          />
          <Button
            type="primary"
            shape="round"
            style={{
              width: '200px',
              height: '40px',
              fontSize: '18px',
              marginTop: '20px',
            }}
            onClick={handleModal2}
          >
            Aceptar<LikeOutlined />
          </Button>
        </div>
      </Modal>

      <Modal
        visible={isDescriptionModalVisible}
        onCancel={handleDescriptionCancel}
        onOk={handleDescriptionOk}
        width={'50%'}
      >
        <Title level={4}>Descripción</Title>
        <Input.TextArea
          value={newDescription}
          onChange={(e) => setNewDescription(e.target.value)}
          rows={4}
          placeholder="Edita la descripción del proyecto..."
        />
      </Modal>

      <div className="p-8">
        <div className="flex flex-col lg:flex-row justify-around mb-8">
          <div className="flex flex-col items-center lg:items-start mb-8 lg:mb-0 w-full lg:w-auto">
            <Title level={3} className="text-center lg:text-left">
              Nombre Proyecto
              {autoridad <= 3 && (
                <EditOutlined className="ml-2" size={20} onClick={handleModal2} />
              )}
            </Title>
            <p className="text-center lg:text-left">16/06/2024</p>
            <div className="w-full lg:w-[500px] h-[500px]" style={{ position: 'relative' }}>
              <img src={projectImage} alt="Imagen del proyecto" className="w-full h-full bg-gray-300 rounded-lg" />
              {autoridad <= 3 && (
                <EditOutlined
                  className="absolute top-0 right-0 m-2 text-white bg-black rounded-full p-1"
                  size={20}
                  onClick={handleModal3}
                />
              )}
            </div>
            <ScrollableContainer items={tags} renderItem={renderTag} maxVisibleItems={5} />
            <div style={{ marginTop: '20px', marginBottom: '20px', width: '100%', position: 'relative' }}>
              <Title level={3} className="mb-2 text-center lg:text-left">
                Descripción
                {autoridad <= 3 && (
                  <EditOutlined
                    className="ml-2 cursor-pointer"
                    onClick={showDescriptionModal}
                    style={{ color: 'rgba(0, 0, 0, 0.45)' }}
                  />
                )}
              </Title>
              <p style={{ marginBottom: '10px' }}>{description}</p>
            </div>
            <div>
              <Title level={4} className="mb-2 text-center lg:text-left">
                Comentarios
                <MessageOutlined className="ml-2" size={20} onClick={handleModal4} />
              </Title>
            </div>
          </div>
          <div className="flex flex-col items-start w-full lg:w-auto">
            <div className="flex flex-row justify-start text-center mb-2">
              <Title level={4} className="text-center lg:text-left mt-3">
                Archivos
                {autoridad <= 3 && (
                  <PlusCircleOutlined className="ml-2" size={20} onClick={handleModal} />
                )}
              </Title>
            </div>
            <div className="w-full h-64 overflow-y-auto">
              {archivos.map((archivo, index) => renderArchivo(archivo, index))}
              {[...Array(Math.max(0, 6 - archivos.length)).keys()].map((_, index) => (
                <div
                  key={`placeholder-${index}`}
                  className="flex items-center bg-transparent p-2 mb-2 rounded-lg"
                  style={{ height: '50px' }}
                />
              ))}
            </div>
            <div>
              <Title level={4} className="mt-8 text-center lg:text-left">
                Miembros
                {autoridad <= 3 && (
                  <PlusCircleOutlined className="ml-2" size={20} onClick={handleModalMiembro} />
                )}
              </Title>
              <ScrollableContainer items={members} renderItem={renderMiembro} maxVisibleItems={3} isHorizontal={true} />
            </div>
            <Title level={4} className="mt-8 text-center lg:text-left">
              Referentes
              {autoridad <= 3 && (
                <PlusCircleOutlined className="ml-2" size={20} onClick={handleModalReferencia} />
              )}
            </Title>
            <ScrollableContainer items={referentes} renderItem={renderReferente2} maxVisibleItems={3} isHorizontal={true} />
            {(autoridad === 1 || autoridad === 2) && (
              <Title level={4} className="mt-8 text-center lg:text-left">
                Eliminar Proyecto
                <Popconfirm
                  title="¿Estás seguro de eliminar este proyecto?"
                  onConfirm={confirmDeleteProject}
                  okText="Sí"
                  cancelText="No"
                  placement="bottom"
                >
                  <Button type="danger" shape="circle" icon={<DeleteOutlined />} style={{ marginLeft: '10px' }} />
                </Popconfirm>
              </Title>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Proyecto;

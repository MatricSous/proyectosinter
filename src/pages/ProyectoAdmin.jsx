import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Avatar, Card, Modal, Tag, Typography, Input, Button, Popconfirm, message, Col } from 'antd';
import ScrollableContainer from '../components/ScrollableList';
import { PlusCircleOutlined, EditOutlined, FileImageOutlined, LikeOutlined, WindowsOutlined, MessageOutlined, DeleteOutlined } from '@ant-design/icons';
import UploadFile from '../components/UploadFile';
import Miembro from '../components/Miembro';
import { Link } from 'react-router-dom';
import image from '../images/test2.jpg';
import Foro from '../components/Foro';
import Referencia from '../components/Referencia';
import { Content } from 'antd/es/layout/layout';

const { Title } = Typography;

const placeholderUserImage =
  'https://cdn-icons-png.flaticon.com/512/149/149071.png';
const placeholderFileImage =
  'https://www.iconpacks.net/icons/2/free-file-icon-1453-thumb.png';
const placeholderProyectImage =
  'https://static.dezeen.com/uploads/2022/07/sq-university-of-oregon-schoolshows_dezeen_2364_col_0.jpg';

const ProyectoAdmin = () => {
  const archivos = [
    { name: 'Archivo 1', fileSize: '2 MB' },
    { name: 'Archivo 2', fileSize: '1.5 MB' },
    { name: 'Archivo 3', fileSize: '3.2 MB' },
    { name: 'Archivo 4', fileSize: '700 KB' },
  ];

  const [members, setMembers] = useState([
    { id: 1, name: 'Nombre usuario 1', isInvite: false },
    { id: 2, name: 'Nombre usuario 2', isInvite: false },
  ]);

  const miembros = members.map(member => member.name);

  const handleModalMiembro1 = () => {
    console.log('Mostrar modal para agregar miembro');
  };

  const renderMiembro1 = (miembro, index) => (
    <div key={index} className="flex flex-col items-center">
      <Avatar size={64} className="bg-gray-300" src={placeholderUserImage} />
      <p style={{ marginTop: '10px', fontWeight: 'bold', fontSize: '18px' }}>{miembro}</p>
    </div>
  );

  const [referentes, setreferentes] = useState([
    { id: 1, name: 'Referencia 1', isInvite: false, image: image },
    { id: 2, name: 'Referencia 2', isInvite: false, image: image },
  ]); // Ejemplo de lista de miembros inicial

  const tags = ['Tag 1', 'Tag 2', 'Tag 3', 'Tag 4', 'Tag 5', 'Tag 2'];

  const renderArchivo = (archivo, index) => (
    <div
      key={index}
      className="flex items-center bg-gray-200 p-2 mb-2 rounded-lg cursor-pointer"
      onClick={() => alert(`Downloading ${archivo.name}`)} // Add your download logic here
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
        <p style={{ fontSize: '12px', color: 'gray', margin: 0 }}>
          {archivo.fileSize}
        </p>
      </div>
    </div>
  );

  const renderMiembro = (miembro, index) => (
    <div key={index} className="flex flex-col items-center ">
      <Avatar size={64} className="bg-gray-300" src={placeholderUserImage} />
      <p>{miembro}</p>
    </div>
  );

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

  
  const navigate = useNavigate();

  const renderReferente2 = (referente) => (
    <Col xs={24} sm={12} md={8} lg={6} key={referente.id}>
    <Card
      onClick={() => navigate(`/Admin/${referente.id}/Referencia`)}
      hoverable
      style={{ marginBottom: '30px' , height: '100px'}}
      cover={
        <div
          style={{
            width: '100%',
            height: '100px', // Ajusta la altura según sea necesario
            overflow: 'hidden',
          }}
        >
          <img 
            alt={referente.title}
            src={referente.image}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              borderBottomLeftRadius: '20px', // Asegúrate de que coincida con el contenedor
              borderBottomRightRadius: '20px',
            }}
          />
        </div>
      }
    >
      <Card.Meta title={referente.title} />
    </Card>
  </Col>
);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const handleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const [isModalVisibleReferencia, setIsModalReferencia] = useState(false);
  const handleModalReferencia = () => {
    setIsModalReferencia(!isModalVisibleReferencia);
  };

  const [isModalVisibleMiembro, setIsModalVisibleMiembro] = useState(false);
  const handleModalMiembro = () => {
    setIsModalVisibleMiembro(!isModalVisibleMiembro);
  };

  const [isModalVisible4, setIsModalVisible4] = useState(false);
  const handleModal4 = () => {
    setIsModalVisible4(!isModalVisible4);
  };

  const [isModalVisible3, setIsModalVisible3] = useState(false);
  const handleModal3 = () => {
    setIsModalVisible3(!isModalVisible3);
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

  const [isModalVisible2, setIsModalVisible2] = useState(false);

  const handleModal2 = () => {
    setIsModalVisible2(!isModalVisible2);
  };

  const confirmDeleteProject = () => {
    message.success('Proyecto eliminado correctamente');
    // Aquí deberías añadir la lógica para eliminar el proyecto
    // Por ahora, solo mostramos un mensaje de éxito
  };

  
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

      <Modal
        visible={isModalVisible3}
        onCancel={handleModal3}
        width={'40%'}
        footer={null}
      >
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

      <div className="p-8">
        <div className="flex flex-col lg:flex-row justify-around mb-8">
          <div className="flex flex-col items-center lg:items-start mb-8 lg:mb-0 w-full lg:w-auto">
            <Title level={3} className="text-center lg:text-left">
              Nombre Proyecto
              <EditOutlined
                className="ml-2"
                size={20}
                onClick={handleModal2}
              />
            </Title>

            <p className="text-center lg:text-left">16/06/2024</p>
            <Title level={4} className="mb-2 text-center lg:text-left">
              Imagen Opcional
              <EditOutlined
                className="ml-2"
                size={20}
                onClick={handleModal3}
              />
            </Title>
            <div className="w-full lg:w-[500px] h-[500px]">
              <img
                src={projectImage}
                alt="Imagen del proyecto"
                className="w-full h-full bg-gray-300 rounded-lg"
              />
              <ScrollableContainer
                items={tags}
                renderItem={renderTag}
                maxVisibleItems={5}
              />
              
              <div  >
                
              <Title level={4} className="mb-2 text-center lg:text-left">
              Comentarios
              <MessageOutlined
                className="ml-2"
                size={20}
                onClick={handleModal4}
              />
              </Title>
                
              
              </div>
            </div>
          </div>
          <div className="flex flex-col items-start w-full lg:w-auto">
            <div className="flex flex-row justify-start text-center mb-2">
              <Title level={4} className="text-center lg:text-left mt-3">
                Archivos
                <PlusCircleOutlined
                className="ml-2"
                size={20}
                onClick={handleModal}
                />
              </Title>
              
            </div>
          
            <div className="w-full">
              {archivos.map((archivo, index) => renderArchivo(archivo, index))}
            </div>
            <div>
              <Title level={4} className="mt-8 text-center lg:text-left">
                Miembros
                <PlusCircleOutlined
                  className="ml-2"
                  size={20}
                  onClick={handleModalMiembro}
                />
              </Title>
              <ScrollableContainer
                items={miembros}
                renderItem={renderMiembro1}
                maxVisibleItems={5}
              />
            </div>
            <Title level={4} className="mt-8 text-center lg:text-left">
              Referentes
              <PlusCircleOutlined
                  className="ml-2"
                  size={20}
                  onClick={handleModalReferencia}
                />
            </Title>
            
            <ScrollableContainer
              items={referentes}
              renderItem={renderReferente2}
              maxVisibleItems={3}
            />
            <Title level={4} className="mt-8 text-center lg:text-left">
                Eliminar Proyecto
                
                <Popconfirm
                title="¿Estás seguro de eliminar este proyecto?"
                onConfirm={confirmDeleteProject}
                okText="Sí"
                cancelText="No"
                placement="bottom"
              >
                <Button
                  type="danger"
                  shape="circle"
                  icon={<DeleteOutlined />}
                  style={{ marginLeft: '10px' }}
                />
              </Popconfirm>
              </Title>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProyectoAdmin;

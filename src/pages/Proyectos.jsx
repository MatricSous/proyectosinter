import { Card, Button, Row, Col, Pagination, Modal, Input } from 'antd';
import {
  SearchOutlined,
  FileAddOutlined,
  FileImageOutlined,
} from '@ant-design/icons';
import React, { useState, useRef, useEffect } from 'react';
import project1Image from '../images/image.png';
import { useNavigate } from 'react-router-dom';

const projects = [
  { id: 1, title: 'Universidad', image: project1Image },
  { id: 2, title: 'Shun Jie', image: project1Image },
  { id: 3, title: 'Shun Jia', image: project1Image },
  { id: 4, title: 'Proyecto Shun', image: project1Image },
  { id: 5, title: 'Proyecto 5', image: project1Image },
  { id: 6, title: 'Proyecto 6', image: project1Image },
  { id: 7, title: 'Proyecto 7', image: project1Image },
  { id: 8, title: 'Proyecto 8', image: project1Image },
  { id: 9, title: 'Proyecto 9', image: project1Image },
  { id: 10, title: 'Proyecto 10', image: project1Image },
  { id: 11, title: 'Proyecto 11', image: project1Image },
  { id: 12, title: 'Proyecto 12', image: project1Image },
  { id: 13, title: 'Proyecto 13', image: project1Image },
  { id: 14, title: 'Proyecto 14', image: project1Image },
  { id: 15, title: 'Proyecto 15', image: project1Image },
  { id: 16, title: 'Proyecto 16', image: project1Image },
  { id: 17, title: 'Proyecto 17', image: project1Image },
  { id: 18, title: 'Proyecto 18', image: project1Image },
  { id: 19, title: 'Proyecto 19', image: project1Image },
  { id: 20, title: 'Proyecto 20', image: project1Image },
  { id: 21, title: 'Proyecto 21', image: project1Image },
  { id: 22, title: 'Proyecto 22', image: project1Image },
  { id: 23, title: 'Proyecto 23', image: project1Image },
  { id: 24, title: 'Proyecto 24', image: project1Image },
  { id: 25, title: 'Proyecto 25', image: project1Image },
  { id: 26, title: 'Proyecto 26', image: project1Image },
  { id: 27, title: 'Proyecto 27', image: project1Image },
];

const PAGE_SIZE = 8; // Number of cards per page

const Proyectos = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [transitioning, setTransitioning] = useState(false);
  const [position, setPosition] = useState('end');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalVisible2, setIsModalVisible2] = useState(false);
  const fileInputRef = useRef(null);
  const [searchTerm, setSearchTerm] = useState(''); // Estado para el término de búsqueda

  useEffect(() => {
    if (transitioning) {
      const timer = setTimeout(() => setTransitioning(false), 300);
      return () => clearTimeout(timer);
    }
  }, [transitioning]);

  const navigate = useNavigate(); // Initialize useNavigate

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredProjects = projects.filter((project) =>
    project.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

  const showModal = () => {
    setIsModalVisible(true);
  };

  const showModalv2 = () => {
    setIsModalVisible(true);
    window.location.href = '/proyecto#/Proyectos/1/Proyecto';
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const handleCancel2 = () => {
    setIsModalVisible2(false);
  };
  const Buscador = () => {
    setIsModalVisible2(true);
  };

  const handlePageChange = (page) => {
    setTransitioning(true);
    setTimeout(() => {
      setCurrentPage(page);
    }, 300); // Duration of the transition animation
  };

  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const currentProjects = filteredProjects.slice(startIndex, startIndex + PAGE_SIZE);

  return (
    <div>
      <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
        <Row justify="center" gutter={[16, 16]}>
          <Col xs={24} sm={12} md={8} lg={6} style={{ textAlign: 'center' }}>
            <Button
              type="primary"
              style={{ width: '80px', height: '40px' }}
              icon={<SearchOutlined style={{ fontSize: '30px' }} />}
              iconPosition={position}
              shape="round"
              onClick={Buscador}
            ></Button>
          </Col>
          <Col xs={24} sm={12} md={8} lg={6} style={{ textAlign: 'center' }}>
            <Button
              disabled
              style={{
                border: '1px solid #d9d9d9',
                backgroundColor: '#f5f5f5',
                color: '#999',
                cursor: 'not-allowed',
                height: '40px',
                fontSize: '18px',
              }}
              shape="round"
            >
              #Arquitectura
            </Button>
          </Col>
          <Col xs={24} sm={12} md={8} lg={6} style={{ textAlign: 'center' }}>
            <Button
              disabled
              style={{
                border: '1px solid #d9d9d9',
                backgroundColor: '#f5f5f5',
                color: '#999',
                cursor: 'not-allowed',
                height: '40px',
                fontSize: '18px',
              }}
              shape="round"
            >
              #Infraestructura
            </Button>
          </Col>
        </Row>
      </div>
      <Row justify="center" style={{ marginTop: '20px' }}>
        <Col span={24} style={{ textAlign: 'center' }}>
          <Button
            shape="round"
            type="primary"
            icon={<FileAddOutlined />}
            iconPosition={position}
            onClick={showModal}
            style={{ width: '300px', height: '40px', fontSize: '18px' }}
          >
            Crear un Nuevo Proyecto
          </Button>
        </Col>
      </Row>
      <Modal
        style={{ marginTop: '200px' }}
        visible={isModalVisible}
        footer={null}
        onCancel={handleCancel}
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
            onClick={showModalv2}
            style={{
              width: '250px',
              height: '40px',
              fontSize: '18px',
              marginTop: '20px',
            }}
          >
            Crear Proyecto
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
      <Modal
        style={{ marginTop: '200px' }}
        visible={isModalVisible2}
        footer={null}
        onCancel={handleCancel2}
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
            placeholder="Buscar por nombre del proyecto"
            style={{ marginBottom: '10px', width: '80%' }}
            onChange={handleSearchChange}
          />
          <Button
            shape="round"
            type="primary"
            icon={<SearchOutlined />}
            iconPosition={position}
            onClick={handleCancel2}
            style={{ width: '300px', height: '40px', fontSize: '18px' }}
          >
            Buscar
          </Button>
        </div>
      </Modal>
      <Row
        justify="center"
        gutter={[16, 16]}
        style={{ marginTop: '20px', marginBottom: '20px' }}
      >
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            opacity: transitioning ? 0 : 1,
            transition: 'opacity 0.3s ease-in-out',
            width: '100%',
            justifyContent: 'center',
          }}
        >
          {currentProjects.map((project) => (
            <Col xs={24} sm={12} md={8} lg={6} key={project.id}>
              <Card
                onClick={() => navigate(`/Proyectos/${project.id}/Proyecto`)}
                hoverable
                style={{ marginBottom: '30px' }} // Add margin bottom to increase vertical spacing
                cover={
                  <img
                    alt={project.title}
                    src={project.image}
                    style={{
                      backgroundColor: '#f5f5f5',
                      height: '200px',
                      objectFit: 'cover',
                      width: '100%',
                    }}
                  />
                }
              >
                <Button disabled shape="round" style={{ marginBottom: '10px' }}>
                  #Arquitectura
                </Button>
                <Button disabled shape="round" style={{ marginLeft: '10px' }}>
                  #Infraestructura
                </Button>
                <Card.Meta
                  title={
                    <div style={{ fontSize: '120%', marginTop: '10px' }}>
                      {project.title}
                    </div>
                  }
                />
              </Card>
            </Col>
          ))}
        </div>
      </Row>
      <Row justify="center" style={{ marginTop: '20px' }}>
        <Pagination
          current={currentPage}
          pageSize={PAGE_SIZE}
          total={projects.length}
          onChange={handlePageChange}
        />
      </Row>
    </div>
  );
};

export default Proyectos;

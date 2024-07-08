import { Card, Button, Row, Col, Pagination, Modal, Input } from 'antd';
import { SearchOutlined, FileAddOutlined, FileImageOutlined } from '@ant-design/icons';
import React, { useState, useEffect, useRef } from 'react';
import project1Image from '../images/test.jpg';
import project1Image2 from '../images/image-1@2x.png';
import { useSelector } from 'react-redux';
import { useNavigate, Navigate } from 'react-router-dom'; // Import Navigate


const getRandomTags = () => {
  const tags = ['Arquitectura', 'Infraestructura', 'Educación', 'Tecnología', 'Salud'];
  const randomTags = [];
  const numberOfTags = Math.floor(Math.random() * 3) + 1; // Número aleatorio de tags entre 1 y 3

  for (let i = 0; i < numberOfTags; i++) {
    const randomIndex = Math.floor(Math.random() * tags.length);
    randomTags.push(`#${tags[randomIndex]}`);
  }

  return [...new Set(randomTags)]; // Eliminar tags duplicados
};

const projects = [
  { id: 1, title: 'Universidad', image: project1Image, tags: getRandomTags() },
  { id: 2, title: 'Shun Jie', image: project1Image, tags: getRandomTags() },
  { id: 3, title: 'Shun Jia', image: project1Image, tags: getRandomTags() },
  { id: 4, title: 'Proyecto Shun', image: project1Image, tags: getRandomTags() },
  { id: 5, title: 'Proyecto 5', image: project1Image , tags: getRandomTags()},
  { id: 6, title: 'Proyecto 6', image: project1Image , tags: getRandomTags()},
  { id: 7, title: 'Proyecto 7', image: project1Image , tags: getRandomTags()},
  { id: 8, title: 'Proyecto 8', image: project1Image , tags: getRandomTags()},
  { id: 9, title: 'Proyecto 9', image: project1Image , tags: getRandomTags()},
  { id: 10, title: 'Proyecto 10', image: project1Image , tags: getRandomTags()},
  { id: 11, title: 'Proyecto 11', image: project1Image , tags: getRandomTags()},
  { id: 12, title: 'Proyecto 12', image: project1Image , tags: getRandomTags()},
  { id: 13, title: 'Proyecto 13', image: project1Image , tags: getRandomTags()},
  { id: 14, title: 'Proyecto 14', image: project1Image , tags: getRandomTags()},
  { id: 15, title: 'Proyecto 15', image: project1Image , tags: getRandomTags()},
  { id: 16, title: 'Proyecto 16', image: project1Image , tags: getRandomTags()},
  { id: 17, title: 'Proyecto 17', image: project1Image , tags: getRandomTags()},
  { id: 18, title: 'Proyecto 18', image: project1Image , tags: getRandomTags()},
  { id: 19, title: 'Proyecto 19', image: project1Image , tags: getRandomTags()},
  { id: 20, title: 'Proyecto 20', image: project1Image , tags: getRandomTags()},
  { id: 21, title: 'Proyecto 21', image: project1Image , tags: getRandomTags()},
  { id: 22, title: 'Proyecto 22', image: project1Image , tags: getRandomTags()},
  { id: 23, title: 'Proyecto 23', image: project1Image , tags: getRandomTags()},
  { id: 24, title: 'Proyecto 24', image: project1Image , tags: getRandomTags()},
  { id: 25, title: 'Proyecto 25', image: project1Image , tags: getRandomTags()},
  { id: 26, title: 'Proyecto 26', image: project1Image , tags: getRandomTags()},
  { id: 27, title: 'Proyecto 27', image: project1Image , tags: getRandomTags()},
];

const PAGE_SIZE = 8; // Number of cards per page

const Proyectos = () => {
  
  const {isLoggedIn} = useSelector(state => state.authenticationSlice);
  const [currentPage, setCurrentPage] = useState(1);
  const [transitioning, setTransitioning] = useState(false);
  const [position, setPosition] = useState('end');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalVisible2, setIsModalVisible2] = useState(false);
  const fileInputRef = useRef(null);
  const [searchTerm, setSearchTerm] = useState(''); // Estado para el término de búsqueda
  const [tagSearchTerm, setTagSearchTerm] = useState(''); // Estado para la búsqueda por tag

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

  const renderTags = (tags) => {
    if (!tags || tags.length === 0) {
      return null; // Si no hay tags, no renderizamos nada
    }

    return tags.map((tag, index) => (
      <Button key={index} disabled shape="round" style={{ margin: '5px' }}>
        {tag}
      </Button>
    ));
  };

  const handleTagSearchChange = (event) => {
    setTagSearchTerm(event.target.value);
  };

  const filteredProjects = projects.filter((project) =>
    project.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
    project.tags.some(tag => tag.toLowerCase().includes(tagSearchTerm.toLowerCase()))
  );

  

  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const currentProjects = filteredProjects.slice(startIndex, startIndex + PAGE_SIZE);
  // Redirect to login if the user is not logged in
  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

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
        </Row>
      </div>
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
          <Input
            placeholder="Buscar por categoría del proyecto"
            style={{ marginBottom: '10px', width: '80%' }}
            onChange={handleTagSearchChange}
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
                onClick={() => navigate(`/Proyectos/${project.id}/Proyectopublico`)}
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
                <div style={{ marginTop: '10px' }}>
                  {renderTags(project.tags)}
                </div>
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

import { Card, Button, Row, Col, Pagination, Modal, Input } from 'antd';
import { SearchOutlined, FileAddOutlined, FileImageOutlined } from '@ant-design/icons';
import React, { useState, useEffect, useRef } from 'react';
import { useSelector , useDispatch} from 'react-redux';
import { useNavigate, Navigate } from 'react-router-dom'; // Import Navigate
import { GetProyectos } from '../services/proyectos';




const PAGE_SIZE = 8; // Number of cards per page

const Proyectos = () => {
  const [transformed, setTransformed] = useState([]);
  const dispatch = useDispatch();
  const proyectos = useSelector(state => state.expensesSlice.proyectosArray); // Corrected state path

  const { isLoggedIn } = useSelector(state => state.authenticationSlice);
  const [currentPage, setCurrentPage] = useState(1);
  const [transitioning, setTransitioning] = useState(false);
  const [position, setPosition] = useState('end');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalVisible2, setIsModalVisible2] = useState(false);
  const fileInputRef = useRef(null);
  const [searchTerm, setSearchTerm] = useState(''); // Estado para el término de búsqueda
  const [tagSearchTerm, setTagSearchTerm] = useState(''); // Estado para la búsqueda por tag

  useEffect(() => {
    const fetchProyectos = async () => {
      await GetProyectos(dispatch);
    };
    fetchProyectos();
  }, [dispatch]);

  useEffect(() => {
    if (proyectos.length > 0) {
      const transformedData = proyectos.map(project => ({
        id: project.proyecto.id,
        title: project.proyecto.titulo,
        image: project.proyecto.foto,
        tags: project.tagsProyecto.map(tag => tag.texto)
      }));
      setTransformed(transformedData);
      console.log("transformed", transformedData);
    }
  }, [proyectos]);

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

  const filteredProjects = transformed.filter((project) =>
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
                onClick={() => navigate(`/Proyecto/${project.id}`)}
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
          total={transformed.length}
          onChange={handlePageChange}
        />
      </Row>
    </div>
  );
};

export default Proyectos;
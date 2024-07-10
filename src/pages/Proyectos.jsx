import { Card, Button, Row, Col, Pagination, Modal, Input } from 'antd';
import {
  SearchOutlined,
  FileAddOutlined,
  FileImageOutlined,
} from '@ant-design/icons';
import React, { useState, useRef, useEffect } from 'react';
import project1Image from '../images/image.png';
import { useNavigate } from 'react-router-dom';
import { crearProyecto, GetProyectosUsuario } from '../services/proyectos';
import { useDispatch, useSelector } from 'react-redux';
import {jwtDecode} from 'jwt-decode';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { ImageDB } from '../Config';

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
  const [transformed, setTransformed] = useState([]);
  const dispatch = useDispatch();
  const proyectos = useSelector(state => state.expensesSlice.proyectosArray); // Corrected state path

  useEffect(() => {
    const fetchProyectos = async () => {
      await GetProyectosUsuario(dispatch);
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
    console.log("proyectos", proyectos); // This will log the updated proyectos after the state change
  }, [proyectos]);

  const [currentPage, setCurrentPage] = useState(1);
  const [transitioning, setTransitioning] = useState(false);
  const [position, setPosition] = useState('end');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalVisible2, setIsModalVisible2] = useState(false);
  const fileInputRef = useRef(null);
  const [searchTerm, setSearchTerm] = useState(''); // Estado para el término de búsqueda
  const [file, setFile] = useState(null); // State to store uploaded file
  const [fileName, setFileName] = useState(''); // State to store uploaded file name
  const [projectTitle, setProjectTitle] = useState(''); // State to store project title
  const [tagSearchTerm, setTagSearchTerm] = useState(''); // Estado para la búsqueda por tag
  const [errorMessage, setErrorMessage] = useState(''); // State to store error message

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
      // Set the file and file name to state
      setFile(file);
      setFileName(file.name);
    }
  };

  const handleTitleChange = (event) => {
    setProjectTitle(event.target.value);
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const showModalv2 = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setErrorMessage(''); // Clear error message when modal is closed
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
    console.log(proyectos)
  };

  const postProject = async (imgRef) => {
    const newProject = {
      titulo: projectTitle, // You can adjust this based on user input
      foto: imgRef, // You need to implement the logic to get the actual link of the uploaded photo
    };

    try {
      await crearProyecto(dispatch, newProject);
      //navigate('/inicio'); // Redirect upon successful login
    } catch (error) {
      console.error('No se pudo crear proyecto:', error);
    }
    // Prepare data for POST request

    // Simulate POST request (replace with actual API call)
    console.log('Sending POST request with data:', newProject);

    // After sending the request, close the modal
    setIsModalVisible(false);
  };

  const handleCreateProject = async () => {
    if (!file) {
      setErrorMessage('Por favor, sube una imagen antes de crear el proyecto.');
      return;
    }
  
    const token = localStorage.getItem('ACCESS_TOKEN');
    console.log(token);
    const tokenDec = jwtDecode(token);
    console.log(tokenDec);
    const mail = tokenDec.unique_name;
    console.log(mail);
    const imgRef = ref(ImageDB, `files/${mail}-${projectTitle}-${fileName}`);
    console.log(imgRef);
  
    try {
      await uploadBytes(imgRef, file);
      console.log('Uploaded a blob or file!');
      
      const downloadURL = await getDownloadURL(imgRef);
      console.log('File available at', downloadURL);
      
      postProject(downloadURL);
    } catch (error) {
      console.error('Upload failed:', error);
    }
  };

  const startIndex = (currentPage - 1) * PAGE_SIZE;

  const filteredProjects = transformed.filter(
    (project) =>
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      project.tags.some((tag) => tag.toLowerCase().includes(tagSearchTerm.toLowerCase()))
  );

  const paginatedProjects = filteredProjects.slice(startIndex, startIndex + PAGE_SIZE);

  return (
    <>
      <div>
        <Row gutter={16} justify="space-between">
          <Col span={8}>
            <Input
              placeholder="Buscar por título"
              value={searchTerm}
              onChange={handleSearchChange}
              prefix={<SearchOutlined />}
            />
          </Col>
          <Col span={8}>
            <Input
              placeholder="Buscar por tag"
              value={tagSearchTerm}
              onChange={(e) => setTagSearchTerm(e.target.value)}
              prefix={<SearchOutlined />}
            />
          </Col>
          <Col span={8} style={{ textAlign: 'right' }}>
            <Button type="primary" onClick={showModal}>
              <FileAddOutlined /> Crear Proyecto
            </Button>
          </Col>
        </Row>
        <Row gutter={[16, 16]} style={{ marginTop: '20px' }}>
          {paginatedProjects.map((project) => (
            <Col key={project.id} span={6}>
              <Card
                hoverable
                cover={<img alt={project.title} src={project.image} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />}
                onClick={() => navigate(`/detallesproyectos/${project.id}`)} // Add onClick handler to navigate to project details
              >
                <Card.Meta title={project.title} />
                <div style={{ marginTop: '10px' }}>
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      style={{
                        display: 'inline-block',
                        marginRight: '5px',
                        padding: '2px 8px',
                        borderRadius: '12px',
                        backgroundColor: '#f0f0f0',
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </Card>
            </Col>
          ))}
        </Row>
        <Row justify="center" style={{ marginTop: '20px' }}>
          <Pagination
            current={currentPage}
            pageSize={PAGE_SIZE}
            total={filteredProjects.length}
            onChange={handlePageChange}
          />
        </Row>
      </div>

      <Modal
        title="Crear Proyecto"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            Cancelar
          </Button>,
          <Button key="create" type="primary" onClick={handleCreateProject}>
            Crear
          </Button>,
        ]}
      >
        <Input
          placeholder="Título del proyecto"
          value={projectTitle}
          onChange={handleTitleChange}
        />
        <Button
          onClick={handleButtonClick}
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            marginTop: '20px',
          }}
        >
          <FileImageOutlined /> Subir Imagen
        </Button>
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: 'none' }}
          onChange={handleImageUpload}
        />
        {fileName && (
          <p style={{ marginTop: '10px' }}>Archivo seleccionado: {fileName}</p>
        )}
        {errorMessage && (
          <p style={{ marginTop: '10px', color: 'red' }}>{errorMessage}</p>
        )}
      </Modal>
    </>
  );
};

export default Proyectos;

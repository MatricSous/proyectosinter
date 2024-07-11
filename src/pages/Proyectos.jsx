import { Card, Button, Row, Col, Pagination, Modal, Input } from 'antd';
import {
  SearchOutlined,
  FileAddOutlined,
  FileImageOutlined,
} from '@ant-design/icons';
import React, { useState, useRef, useEffect } from 'react';
import project1Image from '../images/image.png';
import { useHref, useNavigate } from 'react-router-dom';
import { crearProyecto, GetProyectosUsuario } from '../services/proyectos';
import { useDispatch, useSelector } from 'react-redux';
import {jwtDecode} from 'jwt-decode';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { ImageDB } from '../Config';

const PAGE_SIZE = 8; // Number of cards per page

const Proyectos = () => {
  
  const [transformed, setTransformed] = useState([]);
  const dispatch = useDispatch();
  const proyectos = useSelector(state => state.expensesSlice.proyectosArray); // Corrected state path
  const [currentPage, setCurrentPage] = useState(1);
  const [transitioning, setTransitioning] = useState(false);
  const [position, setPosition] = useState('end');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalVisible2, setIsModalVisible2] = useState(false);
  const fileInputRef = useRef(null);
  const [tags, setTags] = useState([]); // State for tags
  const [tagInput, setTagInput] = useState(''); // State for tag input
  const [searchTerm, setSearchTerm] = useState(''); // Estado para el término de búsqueda
  const [file, setFile] = useState(null); // State to store uploaded file
  const [fileName, setFileName] = useState(''); // State to store uploaded file name
  const [projectTitle, setProjectTitle] = useState(''); // State to store project title
  const [tagSearchTerm, setTagSearchTerm] = useState(''); // Estado para la búsqueda por tag
  const [errorMessage, setErrorMessage] = useState(''); // State to store error message

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
      proyecto: {
        id: 0, // You may need to generate or handle this dynamically
        titulo: projectTitle, // Adjust based on user input
        descripcion: "string", // You may need to implement the logic for project description
        creacion: new Date().toISOString(), // Current timestamp
        foto: imgRef, // Assuming imgRef is the URL or reference to the uploaded photo
        activo: true
      },
      tagsProyecto: tags // Assuming tags is an array of strings for project tags
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

    setProjectTitle('');
    setTags([]);
    setIsModalVisible(false);
    window.location.reload();
    //window.location.href = '/proyecto#/Proyectos/1/Proyecto';
  };

  const handleCreateProject = async () => {
    if (!projectTitle){
      setErrorMessage('Por favor, ingrese un titulo para el proyecto.');
      return;
    }

    if (!file) {
      setErrorMessage('Por favor, sube una imagen antes de crear el proyecto.');
      return;
    }

  
    const token = localStorage.getItem('ACCESS_TOKEN');
    const tokenDec = jwtDecode(token);
    const mail = tokenDec.unique_name;
    const timestamp = new Date().getTime(); // Add timestamp to ensure uniqueness
    const fileName1 = `${mail}-${projectTitle}-${timestamp}-${fileName}`; // Assuming projectTitle and fileName are defined somewhere
  
    const imgRef = ref(ImageDB, `files/${fileName1}`);
    console.log(imgRef);
  
    try {
      // Check if the file with the same name exists
  
      await uploadBytes(imgRef, file);
      console.log('Uploaded a blob or file!');
  
      const downloadURL = await getDownloadURL(imgRef);
      console.log(downloadURL);
  
      postProject(downloadURL);
    } catch (error) {
      console.error('Upload failed:', error);
      setErrorMessage('Hubo un error al subir la imagen, intenta nuevamente');
    }


  };
  

  const startIndex = (currentPage - 1) * PAGE_SIZE;

  const filteredProjects = transformed.filter(
    (project) =>
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      project.tags.some((tag) => tag.toLowerCase().includes(tagSearchTerm.toLowerCase()))
  );
  

  const currentProjects = filteredProjects.slice(startIndex, startIndex + PAGE_SIZE);


  
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

  const handleTagInputChange = (event) => {
    setTagInput(event.target.value);
    console.log(tagInput)
  };

  const handleAddTag = () => {
    if (tagInput && tags.length < 5) {
      setTags([...tags, tagInput]);
      
      setTagInput('');
      
    }
    console.log(tags)
  };


  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };


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
            value={projectTitle}
            onChange={handleTitleChange}
            style={{
              marginBottom: '10px',
              width: '300px',
              borderRadius: '25px',
              height: '40px',
            }}
          />
          <Input
            placeholder="Agregar etiqueta"
            value={tagInput}
            onChange={handleTagInputChange}
            onPressEnter={handleAddTag}
            style={{
              marginBottom: '10px',
              width: '300px',
              borderRadius: '25px',
              height: '40px',
            }}
          />
          <Button
            type="primary"
            onClick={handleAddTag}
            disabled={tags.length >= 5}
            style={{ marginBottom: '10px' }}
          >
            Agregar Etiqueta
          </Button>
          <div style={{ marginBottom: '10px' }}>
            {tags.map((tag, index) => (
              <Button
                key={index}
                shape="round"
                style={{ margin: '5px' }}
                onClick={() => handleRemoveTag(tag)}
              >
                {tag}
              </Button>
            ))}
          </div>
          {/* Preview the uploaded image */}
          {file && (
            <div style={{ marginBottom: '10px' }}>
              <img
                src={URL.createObjectURL(file)}
                alt="Preview"
                style={{ width: '300px', height: '200px', objectFit: 'cover' }}
              />
            </div>
          )}
          {/* Error message if no image or title */}
          {errorMessage && (
            <div style={{ marginBottom: '10px', color: 'red' }}>
              {errorMessage}
            </div>
          )}
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
            onClick={handleCreateProject}
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

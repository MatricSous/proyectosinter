import React, { useState, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Avatar, Card, Modal, Tag, Typography, Input, Button, Col, Popconfirm, message } from 'antd';
import ScrollableContainer from '../components/ScrollableList';
import {CloseOutlined, PlusCircleOutlined, EditOutlined, FileImageOutlined, LikeOutlined, MessageOutlined, DeleteOutlined } from '@ant-design/icons';
import UploadFile from '../components/UploadFile';
import Miembro from '../components/Miembro';
import Foro from '../components/Foro';
import Referencia from '../components/Referencia';
import image from '../images/test2.jpg'; // Asegúrate de que la ruta de la imagen sea correcta
import { useDispatch , useSelector} from 'react-redux';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { GetDetallesProyecto, eliminarArchivo, eliminarProyecto} from '../services/proyectos';
import { editarProyecto } from '../services/proyectos';
import { ImageDB } from '../Config';
import { uploadBytes, ref, getDownloadURL} from 'firebase/storage';
import { jwtDecode } from 'jwt-decode';
const { Title } = Typography;

const placeholderFileImage = 'https://www.iconpacks.net/icons/2/free-file-icon-1453-thumb.png';
const placeholderProyectImage = 'https://static.dezeen.com/uploads/2022/07/sq-university-of-oregon-schoolshows_dezeen_2364_col_0.jpg';

const Proyecto = () => {

  const dispatch = useDispatch();
  const detallesProyecto = useSelector(state => state.expensesSlice.detallesProyecto);
  let { id } = useParams();
  const [autoridad, setAutoridad] = useState('');
  const [proyectoTags, setProyectoTags] = useState({});
  const [proyecto, setProyecto] = useState({});

  const [comentarios, setComentarios] = useState([]);
  const [referencias, setReferencias] = useState([]);
  const [colaboradores, setColaboradores] = useState([]);
  const [archivos, setArchivos] = useState([]);
  const [tags, setTags] = useState([]);
  const [archivosT, setArchivosT] = useState([]);
  const [miembrosT,setMiembrosT] = useState([]);
  const [description, setDescription] = useState('Descripción: Hola');
  const [projectTitle, setProjectTitle] = useState("Titulo del Proy.")
  const [creacion, setCreacion] = useState("22-22-2222");
  const [referenciasT, setReferenciasT] = useState([]);
  const[comentariosT,setComentariosT] = useState([]);
  const [nombreUsuario, setNombreUsuario] = useState("");
  const [tituloNuevo, setTituloNuevo] = useState('');
  const[errorMessage, setErrorMessage] = useState('');
  const [projectImage, setProjectImage] = useState(placeholderProyectImage);


  useEffect(() => {
    // Function to fetch proyecto details
    const fetchProyectoDetails = async () => {
        const idData = { id: id };
        await GetDetallesProyecto(dispatch,idData);
    }; 
    fetchProyectoDetails();// Execute the fetch on component mount or when 'dispatch' changes
  }, [dispatch, id]);

  useEffect(() => {
    // Update state when detallesProyecto changes
    if (detallesProyecto) {
      setProyectoTags(detallesProyecto.proyectoTags || {});
      setAutoridad(parseInt(detallesProyecto.autoridad) || '');
      setComentarios(detallesProyecto.comentarios || []);
      setReferencias(detallesProyecto.referencias || []);
      setColaboradores(detallesProyecto.colaboradores || []);
      setArchivos(detallesProyecto.archivos || []);

    }
  }, [detallesProyecto]);

  useEffect(() => {
    // Log variables and set proyecto and tags
    console.log("Proyecto Tags:", proyectoTags);
    console.log("Autoridad:", autoridad);
    console.log("Comentarios:", comentarios);
    console.log("Referencias:", referencias);
    console.log("Colaboradores:", colaboradores);
    console.log("Archivos", archivos);

    // Ensure proyectoTags.tagsProyecto and proyectoTags.proyecto exist and are arrays before setting state
    if (proyectoTags && proyectoTags.tagsProyecto) {
      setTags(proyectoTags.tagsProyecto);
    }
    if (proyectoTags && proyectoTags.proyecto) {
      setProyecto(proyectoTags.proyecto);
    }

    const transformedArchivos = archivos.map(archivo => ({
      name: archivo.nombre,
      fileSize: archivo.contenido.replace('.', ''), // Removing the dot from file extension
      link: archivo.ruta,
      id: archivo.id
    }));
    const transformedMiembros = colaboradores.map(archivo => ({
      nombre: archivo.nombre,
      apellido: archivo.apellidoPat + " "+ archivo.apellidoMat,
      mail: archivo.mail
    }));
    const transformedReferentes = referencias.map(archivo => ({
      id: archivo.id,
      nombre: "Referencia " + id,
      image: archivo.foto,
      titulo: archivo.titulo
    }));
    const transformedComentarios = comentarios.map(archivo => ({
      user: archivo.nombreCompleto,
      text: archivo.contenido
    }));

    setArchivosT(transformedArchivos)
    setMiembrosT(transformedMiembros)
    setReferenciasT(transformedReferentes)
    setComentariosT(transformedComentarios)



  }, [proyectoTags, autoridad, comentarios, referencias, colaboradores, archivos]);

  useEffect(() => {
    // Log variables when detallesProyecto changes
    setProjectTitle(proyecto.titulo)
    setProjectImage(proyecto.foto)
    setDescription(proyecto.descripcion)
    setCreacion(proyecto.creacion)

    

    console.log("Proyecto Tags:", proyectoTags);
    console.log("Autoridad:", autoridad);
    console.log("Comentarios:", comentarios);
    console.log("Referencias:", referencias);
    console.log("Colaboradores:", colaboradores);
    console.log("Archivos", archivos);
    console.log(proyecto)
    console.log(tags)
    console.log("AY", comentariosT)
  
    
  }, [proyecto]);

  useEffect(() => {
    // Log variables when detallesProyecto changes
    setCreacion(creacion.substring(0,10))

    console.log("AY2",description)
  
    
  }, [description]);




  //   { name: 'Archivo 1', fileSize: 'JPG' },
   // { name: 'Archivo 2', fileSize: '1.5 MB' },
    //{ name: 'Archivo 3', fileSize: '3.2 MB' },
    //{ name: 'Archivo 4', fileSize: '700 KB' },
    //{ name: 'Archivo 5', fileSize: '1.2 MB' },
    //{ name: 'Archivo 6', fileSize: '2.4 MB' },
    //{ name: 'Archivo 7', fileSize: '3.1 MB' },
  //];

  //const [members, setMembers] = useState([
    //{ id: 1, nombre: 'Nombre', apellido: 'Usuario1', isInvite: false },
   // { id: 2, nombre: 'Nombre', apellido: 'Usuario2', isInvite: false },
   // { id: 3, nombre: 'Nombre', apellido: 'Usuario3', isInvite: false },
    //{ id: 3, nombre: 'Nombre', apellido: 'Usuario3', isInvite: false },
   // { id: 4, nombre: 'Nombre', apellido: 'Usuario4', isInvite: false },
   // { id: 4, nombre: 'Nombre', apellido: 'Usuario4', isInvite: false },
//  ]);

 // const [referentes, setReferentes] = useState([
 //   { id: 1, name: 'Referencia 1', isInvite: false, image: image },
  //  { id: 2, name: 'Referencia 2', isInvite: false, image: image },
  //  { id: 1, name: 'Referencia 1', isInvite: false, image: image },
   // { id: 2, name: 'Referencia 2', isInvite: false, image: image },
   // { id: 1, name: 'Referencia 1', isInvite: false, image: image },
   // { id: 2, name: 'Referencia 2', isInvite: false, image: image },
 // ]);

  //const tags = ['Tag 1', 'Tag 2', 'Tag 3', 'Tag 4', 'Tag 5', 'Tag 2'];


  const [newDescription, setNewDescription] = useState('');
  const [isDescriptionModalVisible, setIsDescriptionModalVisible] = useState(false);

  const handleTituloNuevo = (e) => {
    setTituloNuevo(e.target.value);
  };

  const showDescriptionModal = () => {
    setNewDescription(description);
    setIsDescriptionModalVisible(true);
  };

  const handleDescriptionOk = () => {
    setIsDescriptionModalVisible(false);
    
    const newProject = {
      id: proyecto.id, // You may need to generate or handle this dynamically
      titulo: projectTitle, // Adjust based on user input
      descripcion: newDescription, // You may need to implement the logic for project description // Current timestamp
      foto: projectImage, // Assuming imgRef is the URL or reference to the uploaded photo
      activo: true
    };

    handleEditarProyecto(newProject)

    message.success("desc")

  };

  const handleDescriptionCancel = () => {
    setIsDescriptionModalVisible(false);
  };

  const handleDownload = (url, filename) => {
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const renderArchivo = (archivo, index, autoridad) => {
    const confirmRemove = (archivo) => {
      Modal.confirm({
        title: '¿Estás seguro de que deseas eliminar este archivo?',
        content: archivo.name,
        okText: 'Sí',
        okType: 'danger',
        cancelText: 'No',
        onOk() {
          handleRemoveArchivo(archivo);
        },
      });
    };
  
    return (
      <div
        key={index}
        className="flex items-center bg-gray-200 p-2 mb-2 rounded-lg cursor-pointer relative"
        onClick={() => handleDownload(archivo.link, archivo.name)}
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
        {autoridad <= 3 && (
          <CloseOutlined
            style={{
              position: 'absolute',
              top: '8px',
              right: '8px',
              color: '#b22222',
              cursor: 'pointer',
            }}
            onClick={(e) => {
              e.stopPropagation(); // Prevent triggering the onClick of the parent div
              confirmRemove(archivo);
            }}
          />
        )}
      </div>
    );
  };
  // Example function to handle the removal of the archivo
  const handleRemoveArchivo = async (index) => {
    // Remove the archivo from the list

    console.log(index)

    const deleteFile = {
      "id_proyecto": proyecto.id,
      "id_archivo": index.id
    };

    console.log(deleteFile)

    await eliminarArchivo(dispatch, deleteFile);
    window.location.reload();

  };
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

  const handleEditarProyecto = async (proyecto) => {
  
    try {
      await editarProyecto(dispatch, proyecto);
      //navigate('/inicio'); // Redirect upon successful login
    } catch (error) {
      console.error('No se pudo editar el proyecto:', error);
    }

    setIsModalVisible(false);
    window.location.reload();
    //window.location.href = '/proyecto#/Proyectos/1/Proyecto';

  };

  const [isModalVisible2, setIsModalVisible2] = useState(false);
  const handleModal2 = () => {
    setIsModalVisible2(!isModalVisible2);
  };
  const handleModal2Submit = () => {
    if (!tituloNuevo || tituloNuevo == ""){
      setErrorMessage('Por favor, ingrese un titulo para el proyecto.');
      return;
    }

    const newProject = {
        id: proyecto.id, // You may need to generate or handle this dynamically
        titulo: tituloNuevo, // Adjust based on user input
        descripcion: proyecto.descripcion, // You may need to implement the logic for project description // Current timestamp
        foto: projectImage, // Assuming imgRef is the URL or reference to the uploaded photo
        activo: true
      };
    handleEditarProyecto(newProject);
    setIsModalVisible2(!isModalVisible2);
  };

  const [isModalVisible3, setIsModalVisible3] = useState(false);

  const handleModal3Change = () => {
    setIsModalVisible3(!isModalVisible3);
  };
  const handleModal3 = async () => {
  
    if (!newProjectImage) {
      return;
    }
    const token = localStorage.getItem('ACCESS_TOKEN');
    const tokenDec = jwtDecode(token);
    const mail = tokenDec.unique_name;
    const timestamp = new Date().getTime(); // Add timestamp to ensure uniqueness
    const fileName1 = `${mail}-${projectTitle}-${timestamp}-${newProjectImageName}`; // Assuming projectTitle and fileName are defined somewhere
  
    const imgRef = ref(ImageDB, `files/${fileName1}`);
    console.log(imgRef);
    try {
      // Check if the file with the same name exists
  
      await uploadBytes(imgRef, newProjectImage);
      console.log('Uploaded a blob or file!');
  
      const downloadURL = await getDownloadURL(imgRef);
      console.log(downloadURL);


      const newProject = {
        id: proyecto.id, // You may need to generate or handle this dynamically
        titulo: projectTitle, // Adjust based on user input
        descripcion: proyecto.descripcion, // You may need to implement the logic for project description // Current timestamp
        foto: downloadURL, // Assuming imgRef is the URL or reference to the uploaded photo
        activo: true
      };
      handleEditarProyecto(newProject);
    } catch (error) {
      console.error('Upload failed:', error);
      setErrorMessage('Hubo un error al subir la imagen, intenta nuevamente');
    }


    setIsModalVisible3(!isModalVisible3);
  };



  const [isModalVisibleMiembro, setIsModalVisibleMiembro] = useState(false);
  const handleModalMiembro = () => {
    setIsModalVisibleMiembro(!isModalVisibleMiembro);
  };

  const [newProjectImage, setNewProjectImage] = useState(null);
  const [newProjectImageName, setNewProjectImageName] = useState('');

  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const [showButton, setShowButton] = useState(false);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setNewProjectImage(file);
      setNewProjectImageName(file.name)
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
      onClick={() => navigate(`/Proyecto/Referencia/${referente.id}`)}
      cover={
        <div style={{ width: '100%', height: '100px', overflow: 'hidden' }}>
          <img
            alt={referente.titulo}
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

    const data = {
      id: proyecto.id
    }
    eliminarProyecto(dispatch, data)
    message.success('Proyecto eliminado correctamente');
    navigate('/Proyectos')
    // Aquí deberías añadir la lógica para eliminar el proyecto
  };

  //const autoridad = 1; // 1 es admin, 2 dueno, 3 colaborador, 4 publico

  return (
    <>
      <Modal open={isModalVisible} onCancel={handleModal} width={'80%'}>
        <UploadFile idProyecto = {proyecto.id} />
      </Modal>
      <Modal open={isModalVisibleReferencia} onCancel={handleModalReferencia} width={'80%'}>
        <Referencia membersIn = {referencias} idProyectoIn={proyecto.id} />
      </Modal>
      <Modal open={isModalVisibleMiembro} onCancel={handleModalMiembro} width={'80%'}>
        <Miembro idProyectoIn={proyecto.id} />
      </Modal>

      <Modal open={isModalVisible4} onCancel={handleModal4} width={'80%'}>
        <Foro commentsIn = {comentariosT} proyectIdIn={proyecto.id} />
      </Modal>

      <Modal visible={isModalVisible3} onCancel={handleModal3Change} width={'40%'} footer={null}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%' }}>
          <Button
            shape="round"
            type="primary"
            icon={<FileImageOutlined />}
            onClick={handleButtonClick}
            style={{ width: '400px', height: '70px', fontSize: '20px', marginBottom: '20px' }}
          >
            Cambiar Imagen
          </Button>
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: 'none' }}
            accept="image/*"
            onChange={handleImageUpload}
          />
    
          {/* Preview the uploaded image */}
          {newProjectImage && (
            <div style={{ marginBottom: '10px' }}>
              <img
                src={URL.createObjectURL(newProjectImage)}
                alt="Preview"
                style={{ width: '300px', height: '200px', objectFit: 'cover' }}
              />
            </div>
          )}
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
          value={tituloNuevo}
          onChange={handleTituloNuevo}
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
          onClick={handleModal2Submit}
        >
          Aceptar <LikeOutlined />
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
              {projectTitle}
              {autoridad <= 3 && (
                <EditOutlined className="ml-2" size={20} onClick={handleModal2} />
              )}
            </Title>
            <p className="text-center lg:text-left">{creacion}</p>
            <div className="w-full lg:w-[500px] h-[500px]" style={{ position: 'relative' }}>
              <img src={projectImage} alt="Imagen del proyecto" className="w-full h-full bg-gray-300 rounded-lg" />
              {autoridad <= 3 && (
                <EditOutlined
                  className="absolute top-0 right-0 m-2 text-white bg-black rounded-full p-1"
                  size={20}
                  onClick={handleModal3Change}
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
              {archivosT.map((archivo, index) => renderArchivo(archivo, index, autoridad))}
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
              <ScrollableContainer items={miembrosT} renderItem={renderMiembro} maxVisibleItems={3} isHorizontal={true} />
            </div>
            <Title level={4} className="mt-8 text-center lg:text-left">
              Referencias
              {autoridad <= 3 && (
                <PlusCircleOutlined className="ml-2" size={20} onClick={handleModalReferencia} />
              )}
            </Title>
            <ScrollableContainer items={referenciasT} renderItem={renderReferente2} maxVisibleItems={3} isHorizontal={true} />
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
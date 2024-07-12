import React, { useState } from 'react';
import { Modal, Input, Button, notification } from 'antd';
import { UpOutlined } from '@ant-design/icons';
import axios from 'axios';
import { crearProyecto } from '../services/proyectos';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import {jwtDecode} from 'jwt-decode';
import { ImageDB } from '../Config';
import { crearArchivo } from '../services/proyectos';
import { useDispatch } from 'react-redux';

const UploadFile = ( idProyectoIn ) => {
  const dispatch = useDispatch();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false); // Estado para controlar la visibilidad del popup de subida exitosa
  const [uploadError, setUploadError] = useState(false); // Estado para controlar la visibilidad del popup de error de subida

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault(); // Evita el comportamiento por defecto del navegador
  };

  const handleDrop = async (e) => {
    e.preventDefault(); // Evita el comportamiento por defecto del navegador
    console.log(idProyectoIn)

    const files = e.dataTransfer.files;
    const file = files[0];
    const fileName = file.name;
    const fileExtension = fileName.split('.').pop(); 
    console.log('Archivos arrastrados:', files);

    if (files.length > 0) {
      const formData = new FormData();
      formData.append('file', files[0]);
      const token = localStorage.getItem('ACCESS_TOKEN');
      const tokenDec = jwtDecode(token);
      const mail = tokenDec.unique_name;
      const timestamp = new Date().getTime(); // Add timestamp to ensure uniqueness
      const fileName1 = `${mail}-${idProyectoIn.idProyecto}-${timestamp}-${fileName}`; // Assuming projectTitle and fileName are defined somewhere
      const imgRef = ref(ImageDB, `files/${fileName1}`);
      console.log(imgRef);

      try {
        await uploadBytes(imgRef, file);
        console.log('Uploaded a blob or file!');
    
        const downloadURL = await getDownloadURL(imgRef);
        console.log(downloadURL);

        const newFile = { 
            id_proyecto: idProyectoIn.idProyecto, // You may need to generate or handle this dynamically
            nombre: fileName, // Adjust based on user input
            ruta: downloadURL, // You may need to implement the logic for project description
            contenido: fileExtension,   // Assuming imgRef is the URL or reference to the uploaded photo
          };
    
        await crearArchivo(dispatch, newFile);

        notification.success({
          message: 'Archivo Subido Correctamente',
          description: 'El archivo ha sido subido correctamente.',
        });

        setTimeout(() => {
          window.location.reload(); // Refresh the page after a short delay
        }, 2000);

      } catch (error) {
        console.error('Error al subir el archivo:', error);
        setUploadError(true);
        notification.error({
          message: 'Error al Subir el Archivo',
          description: 'Hubo un error al subir el archivo.',
        });
      }
    }
  };

  const handlePopupClose = () => {
    setUploadSuccess(false);
    setUploadError(false);
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      className="m-10"
    >
      <div
        style={{
          backgroundColor: '#f2f0e6',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        className="w-full h-full"
      >
        <UpOutlined style={{ fontSize: '200px', marginBottom: '20px' }} />
        <h1 style={{ fontSize: '48px', textAlign: 'center', margin: 0 }}>
          Arrastrar Archivo
        </h1>
      </div>

      <Modal
        visible={uploadSuccess}
        title="Archivo Subido Exitosamente"
        onCancel={handlePopupClose}
        footer={[
          <Button key="ok" type="primary" onClick={handlePopupClose}>
            Ok
          </Button>,
        ]}
      >
        <p>El archivo ha sido subido exitosamente.</p>
      </Modal>

      <Modal
        visible={uploadError}
        title="Error al Subir el Archivo"
        onCancel={handlePopupClose}
        footer={[
          <Button key="ok" type="primary" onClick={handlePopupClose}>
            Ok
          </Button>,
        ]}
      >
        <p>Hubo un error al subir el archivo.</p>
      </Modal>
    </div>
  );
};

export default UploadFile;

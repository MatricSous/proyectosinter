import React, { useState } from 'react';
import { Row, Col, Typography } from 'antd';
import image from '../images/test2.jpg';

const { Title, Paragraph } = Typography;

const Referencia = () => {
  // Define el objeto JSON con los valores deseados
  const referenciaData = {
    tituloReferencia: 'Título',
    autorReferencia: 'Autor',
    tituloApuntes: 'Apuntes',
    contenidoApuntes:
      '"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."',
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Row gutter={[50, 20]} style={{ height: '100%', width: '100%' }}>
        <Col xs={24} md={9}>
          <div>
            <img className="w-full h-full" src={image} alt="Big Square" />
          </div>
          <Title level={3}>{referenciaData.tituloReferencia}</Title>
          <Title level={4}>{referenciaData.autorReferencia}</Title>
        </Col>
        <Col xs={24} md={15}>
          <div>
            <Title level={3}>{referenciaData.tituloApuntes}</Title>
            <Paragraph>{referenciaData.contenidoApuntes}</Paragraph>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Referencia;

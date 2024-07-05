import React, { useState } from 'react';
import { Row, Col, Typography, Input } from 'antd';
import image from '../images/test2.jpg';

const { Title, Paragraph } = Typography;

const Referencia = () => {
  const [tituloReferencia, setTituloReferencia] = useState('Titulo de la Referencia');
  const [autorReferencia, setAutorReferencia] = useState('Autor de la Referencia');
  const [tituloApuntes, setTituloApuntes] = useState('Apuntes');
  const [contenidoApuntes, setContenidoApuntes] = useState(
    '"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."'
  );

  const handleTituloReferenciaChange = (e) => {
    setTituloReferencia(e.target.value);
  };

  const handleAutorReferenciaChange = (e) => {
    setAutorReferencia(e.target.value);
  };

  const handleTituloApuntesChange = (e) => {
    setTituloApuntes(e.target.value);
  };

  const handleContenidoApuntesChange = (text) => {
    setContenidoApuntes(text);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Row gutter={[50, 20]} style={{ height: '100%', width: '100%' }}>
        <Col xs={24} md={9}>
          <div>
            <img className="w-full h-full" src={image} alt="Big Square" />
          </div>
          <Input
            value={tituloReferencia}
            onChange={handleTituloReferenciaChange}
            style={{ marginBottom: '10px' }}
          />
          <Input
            value={autorReferencia}
            onChange={handleAutorReferenciaChange}
            style={{ marginBottom: '10px' }}
          />
        </Col>
        <Col xs={24} md={15}>
          <div>
            <Input
              value={tituloApuntes}
              onChange={handleTituloApuntesChange}
              style={{ marginBottom: '10px' }}
            />
            <Paragraph
              editable={{
                onChange: handleContenidoApuntesChange,
              }}
            >
              {contenidoApuntes}
            </Paragraph>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Referencia;

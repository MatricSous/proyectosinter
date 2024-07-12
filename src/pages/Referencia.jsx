import React, { useState, useEffect } from 'react';
import { Row, Col, Typography } from 'antd';
import image from '../images/test2.jpg';
import { GetDetallesReferencia } from '../services/proyectos';
import { useSelector , useDispatch} from 'react-redux';
import { useParams } from 'react-router-dom';


const { Title, Paragraph } = Typography;

const Referencia = () => {
  
  const dispatch = useDispatch();
  const detallesReferencia = useSelector(state => state.expensesSlice.referencia);
  let { id } = useParams();
  const [referenciaData, setReferenciaData] = useState([]);

  useEffect(() => {
    // Function to fetch proyecto details
    const fetchReferenciaDetails = async () => {
        const idData = { id: id };
        console.log("id", idData)
        await GetDetallesReferencia(dispatch,idData);
    }; 
    fetchReferenciaDetails();// Execute the fetch on component mount or when 'dispatch' changes
  }, [dispatch, id]);

  useEffect(() => {
    // Update state when detallesProyecto changes
  console.log(detallesReferencia);
  const referenciaData1 = {
    tituloReferencia: detallesReferencia.titulo,
    tituloApuntes: 'Descripción',
    contenidoApuntes: detallesReferencia.descripcion,
    foto: detallesReferencia.foto
  };

  setReferenciaData(referenciaData1)


  }, [detallesReferencia]);

  // Define el objeto JSON con los valores deseados


  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Row gutter={[50, 20]} style={{ height: '100%', width: '100%' }}>
        <Col xs={24} md={9}>
          <div>
            <img className="w-full h-full" src={referenciaData.foto} alt="Big Square" />
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
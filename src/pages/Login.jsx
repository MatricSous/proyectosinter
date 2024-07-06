import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Form, Input, Button, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import backgroundImage from '../images/image-1@2x.png';

const { Title } = Typography;

export const Login = ({ className, buttonText = 'Iniciar Sesión' }) => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Estado local para simular si el usuario está logueado

  const onFinish = (values) => {
    // Simulación de inicio de sesión exitoso
    console.log('Success:', values);
    setIsLoggedIn(true); // Simular que el usuario ha iniciado sesión correctamente
    navigate('/inicio'); // Redirigir a la página de inicio después del inicio de sesión
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  // Si el usuario ya está logueado, redirigir directamente a la página de inicio
  if (isLoggedIn) {
    navigate('/inicio');
    return null; // Opcional: puedes renderizar algo aquí mientras se redirige
  }

  return (
    <div
      className="login-container h-screen"
      style={{
        ...styles.container,
        backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(${backgroundImage})`,
      }}
    >
      <div className={`login-form ${className}`} style={styles.form}>
        <Title level={2} className="login-title" style={styles.title}>
          ArquiUDP
        </Title>
        <Form
          name="login"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          layout="vertical"
        >
          <Form.Item
            label="Mail UDP"
            name="username"
            rules={[{ required: true, message: 'Por favor ingrese su correo' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Contraseña"
            name="password"
            rules={[{ required: true, message: 'Por favor ingrese su contraseña' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-button"
              style={{
                ...styles.button,
                backgroundColor: 'white',
                borderColor: '#c23633',
                color: '#c23633',
                borderWidth: '2px',
                fontWeight: 'bold',
              }}
            >
              {buttonText}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

Login.propTypes = {
  className: PropTypes.string,
  buttonText: PropTypes.string,
};

Login.defaultProps = {
  className: '',
  buttonText: 'Iniciar Sesión',
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  form: {
    position: 'relative',
    zIndex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: '2rem',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    width: '300px',
    textAlign: 'center',
    borderColor: '#c23633',
  },
  title: {
    marginBottom: '1rem',
    color: '#c23633',
  },
  button: {
    width: '100%',
  },
};

export default Login;

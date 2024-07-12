import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Form, Input, Button, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import backgroundImage from '../images/image-1@2x.png';
import { useDispatch } from 'react-redux';
import { SignIn } from '../services/authentication';
import { useAuth } from '../providers/AuthProvider';

const { Title } = Typography;

export const Login = ({ className, buttonText = 'Iniciar Sesión' }) => {
  const navigate = useNavigate();
  const [Mail, setMail] = useState('');
  const [Clave, setClave] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();


  const {user} =  useAuth();
  console.log(user)


  const handleLogin = async (values) => {
    try {
      await SignIn(dispatch, values);
      navigate('/inicio'); // Redirect upon successful login
    } catch (error) {
      console.error('Login failed:', error);
      setError('Correo o contraseña incorrectos. Intente nuevamente.'); // Set error message
    }
  };

  const clearError = () => {
    setError(''); // Clear error message
  };

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
        {error && <div style={styles.error}>{error}</div>} {/* Display error message if exists */}
        <Form
          name="login"
          initialValues={{ Mail: '', Clave: '' }}
          layout="vertical"
          onFinish={handleLogin} // Use onFinish to handle form submission
        >
          <Form.Item
            label="Mail UDP"
            name="Mail"
            rules={[{ required: true, message: 'Por favor ingrese su correo' }]}
          >
            <Input value={Mail} onChange={(e) => setMail(e.target.value)} />
          </Form.Item>

          <Form.Item
            label="Contraseña"
            name="Clave"
            rules={[{ required: true, message: 'Por favor ingrese su contraseña' }]}
          >
            <Input.Password value={Clave} onChange={(e) => setClave(e.target.value)} />
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
              onClick={clearError} // Clear error message on button click
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
  error: {
    color: 'red',
    marginBottom: '1rem',
    textAlign: 'center',
  },
};

export default Login;

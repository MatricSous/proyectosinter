import React, { useState, useEffect } from 'react';
import { Card, Typography, Input, Button } from 'antd';
import { LikeOutlined, MessageOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { comentar } from '../services/proyectos';
import { jwtDecode } from 'jwt-decode';

const { Title } = Typography;

const Comentario = ({ comment}) => {
  return (
    <Card style={{ marginBottom: '10px' }}>
      <p><strong>{comment.user}</strong></p>
      <p>{comment.text}</p>
    </Card>
  );
};

const Foro = ({ commentsIn,  proyectIdIn}) => {
  const [comments, setComments] = useState([]);
  const [proyectId, setUserId] = useState('');
  const [user, setUser] = useState('');
  const [newComment, setNewComment] = useState('');

  const dispatch = useDispatch();

  // Simular la obtención de datos del backend
  const fetchComments = async () => {
    // Aquí harías una llamada a tu backend para obtener los comentarios
    // Por ahora, vamos a simularlo con datos de ejemplo
    console.log(commentsIn);
    console.log(proyectIdIn);

    const token = localStorage.getItem('ACCESS_TOKEN');
    const tokenDec = jwtDecode(token);
    const name1 = tokenDec.given_name;
    setComments(commentsIn);
    setUserId(proyectIdIn);
    setUser(name1);

  };

  useEffect(() => {
    fetchComments(); // Fetch comments when component mounts
  }, []);

  const addComment = (user, text) => {
    const newComment = { id: comments.length + 1, user, text }; // Generate new comment object
    setComments([...comments, newComment]); // Add new comment to state
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (newComment) {
      const newComment1 = {
          "idProyecto": proyectId,
          "contenido": newComment
         
      };

      try {
        await comentar(dispatch, newComment1);
        //navigate('/inicio'); // Redirect upon successful login
      } catch (error) {
        console.error('No se pudo crear proyecto:', error);
      }
      addComment(user, newComment)

      setNewComment('');
    }
  };

  return (
    <div>
      <Title level={4} className="mb-2 text-center lg:text-left">
        Comentarios
        <MessageOutlined className="ml-2" size={20} />
      </Title>
      
      <form onSubmit={handleCommentSubmit}>
        <Input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Escribe un comentario..."
          style={{ marginBottom: '10px', width: 'calc(100% - 130px)' }}
        />
        
        <Button
          type="primary"
          shape="round"
          style={{ width: '100px', height: '40px', fontSize: '18px', marginLeft: '20px' }}
          htmlType="submit" // Use htmlType="submit" to trigger form submission
        >
          Enviar <LikeOutlined />
        </Button>
      </form>
      
      <div>
        {comments.map(comment => (
          <Comentario key={comment.id} comment={comment} />
        ))}
      </div>
    </div>
  );
};

export default Foro;

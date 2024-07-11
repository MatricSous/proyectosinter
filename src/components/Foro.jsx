import React, { useState, useEffect } from 'react';
import { Card, Typography, Input, Button } from 'antd';
import { LikeOutlined, MessageOutlined } from '@ant-design/icons';

const { Title } = Typography;

const Comentario = ({ comment }) => {
  return (
    <Card style={{ marginBottom: '10px' }}>
      <p><strong>{comment.user}</strong></p>
      <p>{comment.text}</p>
    </Card>
  );
};

const Foro = () => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const userName = 'UsuarioPredefinido'; // Nombre de usuario predefinido

  // Simular la obtención de datos del backend
  const fetchComments = async () => {
    // Aquí harías una llamada a tu backend para obtener los comentarios
    // Por ahora, vamos a simularlo con datos de ejemplo
    const exampleComments = [
      { id: 1, user: 'Usuario1', text: 'Este es el primer comentario.' },
      { id: 2, user: 'Usuario2', text: 'Este es el segundo comentario.' },
      { id: 3, user: 'Usuario3', text: 'Este es el tercer comentario.' },
    ];
    setComments(exampleComments);
  };

  useEffect(() => {
    fetchComments();
  }, []);

  const addComment = (user, text) => {
    setComments([...comments, { id: comments.length + 1, user, text }]);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (userName && newComment) {
      addComment(userName, newComment);
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
          onClick={() => document.querySelector('button[type="submit"]').click()}
        >
          Enviar <LikeOutlined />
        </Button>
        
        <button type="submit" style={{ display: 'none' }}></button>
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

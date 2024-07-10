import Comentario from './Comentario';
import React, { useState } from 'react';
import { Typography, Input, Button } from 'antd';
import { LikeOutlined, MessageOutlined } from '@ant-design/icons';

const { Title } = Typography;

const Foro = () => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const userName = 'UsuarioPredefinido'; // Nombre de usuario predefinido

  const addComment = (user, text) => {
    setComments([...comments, { id: comments.length + 1, user, text, replies: [], level: 0 }]);
  };

  const addReply = (id, text) => {
    const addReplyToComment = (comments, id, text, level) => {
      return comments.map(comment => {
        if (comment.id === id) {
          const newReply = { id: comments.length + 1, user: userName, text, replies: [], level: level + 1 };
          return { ...comment, replies: [...comment.replies, newReply] };
        } else if (comment.replies.length > 0) {
          return { ...comment, replies: addReplyToComment(comment.replies, id, text, level) };
        }
        return comment;
      });
    };
    setComments(addReplyToComment(comments, id, text, 0));
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
          <Comentario key={comment.id} comment={comment} addReply={addReply} />
        ))}
      </div>
    </div>
  );
};

export default Foro;

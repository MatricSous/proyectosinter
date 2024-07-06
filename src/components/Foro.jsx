
import Comentario from './Comentario';
import React, { useState, useRef } from 'react';
import { Avatar, Card, Modal, Tag, Typography, Input, Button, } from 'antd';
import ScrollableContainer from '../components/ScrollableList';
import { PlusCircleOutlined, EditOutlined, FileImageOutlined, LikeOutlined, WindowsOutlined, MessageOutlined } from '@ant-design/icons';
import UploadFile from '../components/UploadFile';
import Miembro from '../components/Miembro';
import { Link } from 'react-router-dom';
import image from '../images/test2.jpg';

const { Title } = Typography;

const Foro = () => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [userName, setUserName] = useState('');

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
      setUserName(''); // aca remplazar por id
    }
  };

  return (
    <div>
        <Title level={4} className="mb-2 text-center lg:text-left">
              Comentarios
              <MessageOutlined
                className="ml-2"
                size={20}
              />

        </Title>
      
      <form onSubmit={handleCommentSubmit}>
        
        <input
          
          value={userName}
          onChange={(e) => setUserName(e.target.value)} // remplazar por id
          placeholder="Tu nombre..."
          
        />
        <input
          style={{marginLeft:'10px'}}
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Escribe un comentario..."
        />
        
        <button type="submit" style={{ display: 'none' }}></button>
        <Button
              type="primary"
              shape="round"
              style={{ width: '100px', height: '40px', fontSize: '18px', marginLeft: '20px'}}
              onClick={() => document.querySelector('button[type="submit"]').click()}
            >
              Enviar<LikeOutlined />
            </Button>

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

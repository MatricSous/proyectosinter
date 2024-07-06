
import React, { useState, useRef } from 'react';
import { Avatar, Card, Modal, Tag, Typography, Input, Button} from 'antd';
import ScrollableContainer from '../components/ScrollableList';
import { PlusCircleOutlined, EditOutlined, FileImageOutlined, LikeOutlined, WindowsOutlined, MessageOutlined } from '@ant-design/icons';
import UploadFile from '../components/UploadFile';
import Miembro from '../components/Miembro';
import { Link } from 'react-router-dom';
import image from '../images/test2.jpg';
import Foro from '../components/Foro';

const { Title } = Typography;
const Comentario = ({ comment, addReply }) => {
  const [reply, setReply] = useState('');
  const [showReplyBox, setShowReplyBox] = useState(false);

  const handleReplySubmit = (e) => {
    e.preventDefault();
    addReply(comment.id, reply);
    setReply('');
    setShowReplyBox(false);
  };

  return (
    <div style={{ marginLeft: `${comment.level * 20}px` }}>
      <p><strong>{comment.user}</strong>: {comment.text}</p>
      <Button
              type="primary"
              shape="round"
              style={{ width: '100px', height: '20px', fontSize: '18px', marginLeft: '20px',marginBottom:'10px'}}
              onClick={() => setShowReplyBox(!showReplyBox)}>
              Responder
      </Button>
      {showReplyBox && (
        <form onSubmit={handleReplySubmit}>
          <input 
            type="text"
            value={reply}
            onChange={(e) => setReply(e.target.value)}
            placeholder="Escribe tu respuesta..."
          />

          
          
        <Button
              type="primary"
              shape="round"
              style={{ width: '100px', height: '20px', fontSize: '18px', marginLeft: '20px'}}
              htmlType="submit"
            >
              Enviar<LikeOutlined />
            </Button>
        </form>
      )}
      {comment.replies && comment.replies.map(reply => (
        <Comentario key={reply.id} comment={reply} addReply={addReply} />
      ))}
    </div>
  );
};

export default Comentario;

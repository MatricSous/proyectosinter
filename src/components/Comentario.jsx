import React from 'react';
import { Card } from 'antd';

const Comentario = ({ comment }) => {
  return (
    <Card style={{ marginBottom: '10px' }}>
      <p><strong>{comment.user}</strong></p>
      <p>{comment.text}</p>
    </Card>
  );
};

export default Comentario;

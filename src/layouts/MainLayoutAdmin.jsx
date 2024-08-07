import React from 'react';
import { Card, Layout } from 'antd'; // Assuming you use Ant Design layout components
import Navbar from './components/NavbarAdmin'; // Assuming Navbar.jsx is in the same directory

const { Header, Content } = Layout;

const MainLayoutAdmin = ({ children }) => {
  return (
    <Layout className="min-h-screen">
      <Header className="mx-0 md:mx-12">
        <Navbar /> {/* Render your Navbar component in the Header section */}
      </Header>
      <Content className="mt-10 mx-1 md:mx-12">
        <Card style={{ minHeight: 380, marginBottom: 24 , backgroundColor: '#3F3B3A'}}>{children}</Card>
      </Content>
    </Layout>
  );
};

export default MainLayoutAdmin;

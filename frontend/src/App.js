import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from 'antd';
import Navbar from './components/Navbar';
import Home from './pages/Home';

const { Content } = Layout;

function App() {
  return (
    <Router>
      <Layout>
        <Navbar />
        <Content style={{ padding: '20px' }}>
          <Routes>
          <Route path="/" element={<Home />} />
          </Routes>
        </Content>
      </Layout>
    </Router>
  );
}

export default App;

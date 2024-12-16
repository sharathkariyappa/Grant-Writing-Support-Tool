import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from 'antd';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import GrantAssistant from './pages/GrantAssistant';
import OrganizationProfile from './pages/OrganizatioProfile';

const { Content } = Layout;

function App() {
  return (
    <Router>
      <Layout>
        <Navbar />
        <Content style={{ padding: '20px' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/GrantAssistant" element={<GrantAssistant />} />
            <Route path="/OrganizationProfile" element={<OrganizationProfile />} />
          </Routes>
        </Content>
      </Layout>
    </Router>
  );
}

export default App;

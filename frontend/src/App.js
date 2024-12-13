import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from 'antd';
import Navbar from './components/Navbar';

const { Content } = Layout;

function App() {
  return (
    <Router>
      <Layout>
        <Navbar />
      </Layout>
    </Router>
  );
}

export default App;

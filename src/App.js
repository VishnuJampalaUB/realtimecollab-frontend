// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';
import Login from './components/Login';
import Register from './components/Register';
import DocumentList from './components/DocumentList';
import EditDocument from './components/EditDocument';
import CreateDocument from './components/CreateDocument';
import DocumentDetail from './components/DocumentDetail';
import Header from './components/Header';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [username, setUsername] = useState(localStorage.getItem('username') || '');

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }

    if (username) {
      localStorage.setItem('username', username);
    } else {
      localStorage.removeItem('username');
    }
  }, [token, username]);

  const handleLogin = async (credentials) => {
    try {
      const response = await axios.post('http://localhost:8000/api/login/', credentials);
      setToken(response.data.token);
      setUsername(response.data.username);
    } catch (error) {
      console.error('Login error', error);
      throw error;
    }
  };

  const handleRegister = async (credentials) => {
    try {
      await axios.post('http://localhost:8000/api/register/', credentials);
      await handleLogin(credentials);
    } catch (error) {
      console.error('Register error', error);
    }
  };

  const handleLogout = () => {
    setToken('');
    setUsername('');
    localStorage.removeItem('token');
    localStorage.removeItem('username');
  };

  return (
    <Router>
      {token && <Header handleLogout={handleLogout} username={username} />}
      <Routes>
        <Route path="/" element={!token ? <Login handleLogin={handleLogin} /> : <Navigate to="/documents" />} />
        {!token ? (
          <>
            <Route path="/register" element={<Register handleRegister={handleRegister} />} />
            <Route path="*" element={<Navigate to="/" />} />
          </>
        ) : (
          <>
            <Route path="/documents" element={<DocumentList token={token} />} />
            <Route path="/documents/create" element={<CreateDocument token={token} />} />
            <Route path="/documents/:id" element={<DocumentDetail token={token} />} />
            <Route path="/documents/:id/edit" element={<EditDocument token={token} />} />
            <Route path="*" element={<Navigate to="/documents" />} />
          </>
        )}
      </Routes>
      <ToastContainer />
    </Router>
  );
};

export default App;

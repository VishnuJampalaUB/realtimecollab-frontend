import React, { useState } from 'react';
import Login from './Login';
import Register from './Register';
import { useNavigate } from 'react-router-dom';

const Home = ({ setToken }) => {
  const [showRegister, setShowRegister] = useState(false);
  const navigate = useNavigate();

  const handleToken = (token) => {
    setToken(token);
    navigate('/documents'); // Navigate to the documents page after successful login
  };

  return (
    <div>
      {showRegister ? (
        <>
          <Register />
          <p>
            Already have an account? <button onClick={() => setShowRegister(false)}>Login</button>
          </p>
        </>
      ) : (
        <>
          <Login setToken={handleToken} />
          <p>
            Don't have an account? <button onClick={() => setShowRegister(true)}>Register</button>
          </p>
        </>
      )}
    </div>
  );
};

export default Home;

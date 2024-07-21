import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const DocumentDetail = ({ token }) => {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDocument = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/documents/${id}/`, {
          headers: {
            Authorization: `Token ${token}`
          }
        });
        setTitle(response.data.title);
        setContent(response.data.content);
      } catch (error) {
        console.error('Error fetching document', error);
      }
    };

    fetchDocument();
  }, [id, token]);

  const handleEditClick = () => {
    navigate(`/documents/${id}/edit`);
  };

  return (
    <div>
      <h2>{title}</h2>
      <p>{content}</p>
      <button onClick={handleEditClick}>Edit Document</button>
    </div>
  );
};

export default DocumentDetail;

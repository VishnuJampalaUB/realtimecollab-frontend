import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ShareButton from './ShareButton';

const DocumentList = ({ token }) => {
  const [documents, setDocuments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/documents/', {
          headers: { Authorization: `Token ${token}` }
        });
        setDocuments(response.data);
      } catch (error) {
        console.error('Error fetching documents', error);
      }
    };

    fetchDocuments();
  }, [token]);

  const handleCreateDocumentClick = () => {
    navigate('/documents/create');
  };

  const handleDocumentClick = (id) => {
    navigate(`/documents/${id}`);
  };

  return (
    <div>
      <h2>Documents</h2>
      <button onClick={handleCreateDocumentClick}>Create New Document</button>
      <h3>Owned Documents</h3>
      <ul>
        {documents.filter(doc => doc.is_owner).map(doc => (
          <li key={doc.id}>
            <span onClick={() => handleDocumentClick(doc.id)}>{doc.title}</span>
            <ShareButton documentId={doc.id} token={token} />
          </li>
        ))}
      </ul>
      <h3>Collaborated Documents</h3>
      <ul>
        {documents.filter(doc => !doc.is_owner).map(doc => (
          <li key={doc.id}>
            <span onClick={() => handleDocumentClick(doc.id)}>{doc.title}</span>
            {/* ShareButton is not rendered for collaborated documents */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DocumentList;

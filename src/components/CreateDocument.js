import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreateDocument = ({ token }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  const handleCreateDocument = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/documents/', { title, content }, {
        headers: { Authorization: `Token ${token}` }
      });
      toast.success('Document created successfully!');
      navigate(`/documents/${response.data.id}`);
    } catch (error) {
      console.error('Error creating document', error);
      toast.error('Error creating document. Please try again.');
    }
  };

  return (
    <div>
      <h2>Create Document</h2>
      <form onSubmit={handleCreateDocument}>
        <div>
          <label>Title</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div>
          <label>Content</label>
          <textarea value={content} onChange={(e) => setContent(e.target.value)} required />
        </div>
        <button type="submit">Create Document</button>
      </form>
    </div>
  );
};

export default CreateDocument;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditDocument = ({ token }) => {
  const { id } = useParams();
  const [document, setDocument] = useState(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const fetchDocument = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/documents/${id}/`, {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        setDocument(response.data);
        setTitle(response.data.title);
        setContent(response.data.content);
      } catch (error) {
        console.error('Fetch document error', error);
        toast.error('Failed to fetch document');
      }
    };

    fetchDocument();
  }, [id, token]);

  useEffect(() => {
    const ws = new WebSocket(`ws://localhost:8000/ws/collaborate/${id}/`);
    setSocket(ws);

    ws.onopen = () => {
      console.log('WebSocket connection established');
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setContent(data.content);
    };

    ws.onclose = () => {
      console.log('WebSocket connection closed');
    };

    return () => {
      ws.close();
    };
  }, [id]);

  const handleContentChange = (e) => {
    const newContent = e.target.value;
    setContent(newContent);
    if (socket) {
      socket.send(JSON.stringify({ content: newContent }));
    }
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleSave = async () => {
    try {
      await axios.put(`http://localhost:8000/api/documents/${id}/`, { title, content }, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      toast.success('Document saved successfully');
    } catch (error) {
      console.error('Save document error', error);
      toast.error('Failed to save document');
    }
  };

  return document ? (
    <div>
      <h2>Edit Document</h2>
      <input type="text" value={title} onChange={handleTitleChange} placeholder="Title" />
      <textarea value={content} onChange={handleContentChange} rows="20" cols="100" />
      <button onClick={handleSave}>Save</button>
    </div>
  ) : (
    <div>Loading...</div>
  );
};

export default EditDocument;

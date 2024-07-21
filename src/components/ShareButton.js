import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const ShareButton = ({ documentId, token }) => {
  const [username, setUsername] = useState('');

  const handleShare = async () => {
    try {
      const response = await axios.post(`http://localhost:8000/api/documents/${documentId}/share/`, { username }, {
        headers: { Authorization: `Token ${token}` }
      });
      toast.success(response.data.message || 'Document shared successfully');
      setUsername('');
    } catch (error) {
      console.error('Error sharing document:', error);
      if (error.response && error.response.data && error.response.data.error) {
        toast.error(error.response.data.error);
      } else {
        toast.error('Failed to share document');
      }
    }
  };

  return (
    <div>
      <input 
        type="text" 
        value={username} 
        onChange={(e) => setUsername(e.target.value)} 
        placeholder="Username" 
      />
      <button onClick={handleShare}>Share</button>
    </div>
  );
};

export default ShareButton;

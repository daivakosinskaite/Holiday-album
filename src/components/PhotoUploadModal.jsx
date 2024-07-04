
import React, { useState } from 'react';
import './PhotoUploadModal.scss';

const PhotoUploadModal = ({ show, handleClose, uploadPhoto }) => {
  const [url, setUrl] = useState('');
  const [error, setError] = useState('');

  const handleUpload = () => {
    try {
      new URL(url); 
      uploadPhoto(url);
      setUrl('');
      setError('');
      handleClose();
    } catch (_) {
      setError('Please enter a valid URL.');
    }
  };

  if (!show) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={handleClose}>&times;</span>
        <h2>Upload Photo</h2>
        <input
          type="text"
          placeholder="Photo URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        {error && <p className="error">{error}</p>}
        <button onClick={handleUpload}>Add</button>
      </div>
    </div>
  );
};

export default PhotoUploadModal;

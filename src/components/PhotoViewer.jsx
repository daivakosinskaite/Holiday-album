// src/components/PhotoViewer.jsx
import React from 'react';
import './PhotoViewer.scss';

const PhotoViewer = ({ show, photoUrl, handleClose }) => {
  if (!show) return null;

  return (
    <div className="photo-viewer">
      <div className="photo-viewer-content">
        <span className="close" onClick={handleClose}>&times;</span>
        <img src={photoUrl} alt="Full View" />
      </div>
    </div>
  );
};

export default PhotoViewer;

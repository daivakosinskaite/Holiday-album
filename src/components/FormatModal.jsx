// src/components/FormatModal.jsx
import React from 'react';
import './FormatModal.scss';

const formats = [
  { name: 'Circle', value: 'circle' },
  { name: 'Two Column', value: 'two-column' },
  { name: 'Four Square', value: 'four-square' },
  { name: 'Single Large', value: 'single-large' },
  { name: 'Two Horizontal', value: 'two-horizontal' },
  { name: 'Mixed 1', value: 'mixed1' },
  { name: 'Two Vertical', value: 'two-vertical' },
  { name: 'Mixed 2', value: 'mixed2' },
  { name: 'Mixed 3', value: 'mixed3' }
];

const FormatModal = ({ show, handleClose, changeFormat }) => {
  if (!show) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={handleClose}>&times;</span>
        <h2>Change Photo Format</h2>
        <div className="formats">
          {formats.map(format => (
            <div key={format.value} className="format-container" onClick={() => changeFormat(format.value)}>
              <div className="format-name">{format.name}</div>
              <div className={`format ${format.value}`}></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FormatModal;


import React from 'react';
import { Link } from 'react-router-dom';
import './Welcome.scss';

const Welcome = () => {
  return (
    <div className="welcome">
      <h1 className="welcome__title">Welcome to Holiday Photo Collection</h1>
      <p className="welcome__text">Please login or register to start creating and viewing your albums.</p>
      <div className="welcome__buttons">
        <Link to="/login" className="welcome__buttons__btn">Login</Link>
        <Link to="/register" className="welcome__buttons__btn">Register</Link>
      </div>
    </div>
  );
};

export default Welcome;

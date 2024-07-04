// src/components/Header.jsx
import React from 'react';
import { useHistory } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import './Header.scss';

const Header = ({ user }) => {
  const auth = getAuth();
  const history = useHistory();

  const handleLogout = () => {
    auth.signOut();
    history.push('/');
  };

  return (
    <header className="header">
      <h1 className="header__title">Holiday Photos</h1>
      {user && (
        <div className="header__user-info">
          <span className="header__user-info__email">{user.email}</span>
          <button className="header__user-info__logout-button" onClick={handleLogout}>Logout</button>
        </div>
      )}
    </header>
  );
};

export default Header;

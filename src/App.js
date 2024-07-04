
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import AlbumList from './components/AlbumList';
import Welcome from './components/Welcome';  
import './App.scss';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, [auth]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          {user ? <Redirect to="/albums" /> : <Welcome />}
        </Route>
        <Route path="/login">
          {user ? <Redirect to="/albums" /> : <Login />}
        </Route>
        <Route path="/register">
          {user ? <Redirect to="/albums" /> : <Register />}
        </Route>
        <Route path="/albums">
          {user ? <AlbumList /> : <Redirect to="/" />}
        </Route>
        <Route path="/dashboard/:albumId">
          {user ? <Dashboard /> : <Redirect to="/" />}
        </Route>
      </Switch>
    </Router>
  );
}

export default App;

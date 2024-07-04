// src/components/AlbumList.jsx
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import { db } from '../firebase';
import Header from './Header'; // Import the Header component
import './AlbumList.scss';

const AlbumList = () => {
  const [albums, setAlbums] = useState([]);
  const [newAlbumName, setNewAlbumName] = useState('');
  const auth = getAuth();
  const user = auth.currentUser;
  const history = useHistory();

  useEffect(() => {
    const fetchAlbums = async () => {
      const albumCollection = collection(db, `users/${user.uid}/albums`);
      const albumSnapshot = await getDocs(albumCollection);
      const albumList = albumSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setAlbums(albumList);
    };

    if (user) {
      fetchAlbums();
    }
  }, [user]);

  const createAlbum = async () => {
    if (newAlbumName) {
      await addDoc(collection(db, `users/${user.uid}/albums`), { name: newAlbumName });
      setNewAlbumName('');
      window.location.reload(); // Reload to show new album
    }
  };

  const viewAlbum = (albumId) => {
    history.push(`/dashboard/${albumId}`);
  };

  return (
    <div className="album-list">
      <Header user={user} />
      <h2 className="album-list__title">Your Albums</h2>
      <div className="album-list__albums">
        {albums.map(album => (
          <div key={album.id} className="album-list__albums__album" onClick={() => viewAlbum(album.id)}>
            {album.name}
          </div>
        ))}
      </div>
      <input
        type="text"
        className="album-list__input"
        value={newAlbumName}
        onChange={(e) => setNewAlbumName(e.target.value)}
        placeholder="New Album Name"
      />
      <button className="album-list__button" onClick={createAlbum}>Create Album</button>
    </div>
  );
};

export default AlbumList;

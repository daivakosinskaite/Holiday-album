// src/components/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { collection, getDocs, query, orderBy, doc, deleteDoc, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import PhotoUploadModal from './PhotoUploadModal';
import FormatModal from './FormatModal';
import PhotoViewer from './PhotoViewer';
import Header from './Header';
import './Dashboard.scss';

const Dashboard = () => {
  const { albumId } = useParams();
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showFormatModal, setShowFormatModal] = useState(false);
  const [showPhotoViewer, setShowPhotoViewer] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [user, setUser] = useState(null);
  const [currentPhotoUrl, setCurrentPhotoUrl] = useState('');
  const [format, setFormat] = useState('grid');
  const auth = getAuth();
  const history = useHistory();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        fetchPhotos(currentUser.uid, albumId);
      } else {
        history.push('/');
      }
    });
    return () => unsubscribe();
  }, [auth, albumId, history]);

  const handleLogout = () => {
    auth.signOut();
    history.push('/');
  };

  const fetchPhotos = async (userId, albumId) => {
    const q = query(collection(db, `users/${userId}/albums/${albumId}/photos`), orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    const photosList = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    setPhotos(photosList);
  };

  const handleDeletePhoto = async (id) => {
    await deleteDoc(doc(db, `users/${user.uid}/albums/${albumId}/photos`, id));
    if (user) {
      fetchPhotos(user.uid, albumId); // Atnaujinkime nuotraukas po ištrynimo
    }
  };

  const handleUploadPhoto = async (url) => {
    await addDoc(collection(db, `users/${user.uid}/albums/${albumId}/photos`), {
      url,
      createdAt: serverTimestamp(),
      userId: user.uid,
    });
    fetchPhotos(user.uid, albumId); // Atnaujinkime nuotraukas po įkėlimo
  };

  const changeFormat = (format) => {
    setFormat(format);
    setShowFormatModal(false);
  };

  const viewPhoto = (photoUrl) => {
    setCurrentPhotoUrl(photoUrl);
    setShowPhotoViewer(true);
  };

  return (
    <div className="dashboard">
      <Header user={user} />
      <main className="dashboard__main">
        <button className="dashboard__main__add-photo-btn" onClick={() => setShowUploadModal(true)}>+</button>
        <button className="dashboard__main__change-format-btn" onClick={() => setShowFormatModal(true)}>Change Format</button>
        <div className={`dashboard__main__photos-container dashboard__main__photos-container--${format}`}>
          {photos.map(photo => (
            <div key={photo.id} className="dashboard__main__photos-container__photo">
              <img src={photo.url} alt="Holiday" onClick={() => viewPhoto(photo.url)} />
              <button className="dashboard__main__photos-container__photo__trash-btn" onClick={() => handleDeletePhoto(photo.id)}>🗑️</button>
            </div>
          ))}
        </div>
      </main>
      <PhotoUploadModal show={showUploadModal} handleClose={() => setShowUploadModal(false)} albumId={albumId} uploadPhoto={handleUploadPhoto} />
      <FormatModal show={showFormatModal} handleClose={() => setShowFormatModal(false)} changeFormat={changeFormat} />
      <PhotoViewer show={showPhotoViewer} photoUrl={currentPhotoUrl} handleClose={() => setShowPhotoViewer(false)} />
    </div>
  );
};

export default Dashboard;

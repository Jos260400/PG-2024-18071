import React, { useEffect, useState } from 'react';
import { useAuth } from 'tu/contexto/de/auth'; 
import { useHistory } from 'react-router-dom';

const TheProfile = () => {
  const { currentUser } = useAuth(); 
  const history = useHistory();
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    if (currentUser) {

      setUserInfo({
        email: currentUser.email,
        displayName: currentUser.displayName,

      });
    } else {

      history.push('/login');
    }
  }, [currentUser, history]);

  if (!userInfo) {
    return <div>Loading...</div>; 
  }

  /* Información de cada perfil */
  return (
    <div>
      <h1>Perfil de Usuario</h1>
      <p><strong>Email:</strong> {userInfo.email}</p>
      {userInfo.displayName && (
        <p><strong>Nombre:</strong> {userInfo.displayName}</p>
      )}
      {}
    </div>
  );
};

export default TheProfile;

import React from 'react';

function Profile() {
  const user = {
    name: auth.currentUser?.displayName || 'Usuario',
    email: auth.currentUser?.email,
    profilePicture: auth.currentUser?.photoURL || 'url-de-imagen-por-defecto',
    bio: 'Aquí puedes escribir una breve descripción o biografía del usuario.',
  };

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1 style={{ color: 'white' }}>Perfil de Usuario</h1>
      
      <div style={{ margin: '20px 0' }}>
        <img
          src={user.profilePicture}
          alt="Foto de perfil"
          style={{ width: '150px', height: '150px', borderRadius: '50%', objectFit: 'cover' }}
        />
      </div>
      
      <h2 style={{ color: 'white' }}>{user.name}</h2>
      <p style={{ color: 'white' }}>{user.email}</p>
      <p style={{ color: 'lightgray', fontStyle: 'italic' }}>{user.bio}</p>

      <div style={{ marginTop: '20px' }}>
        <button style={{ marginRight: '10px' }}>Editar Perfil</button>
        <button>Cerrar Sesión</button>
      </div>
    </div>
  );
}

export default Profile;

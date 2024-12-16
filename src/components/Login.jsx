/* Importamos lo necesario para los datos de firebase */
import React, { useState } from 'react';
import { getFirestore, setDoc, doc } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import {auth  } from '../firebase';
import Footer from "./Footer";

/* Botones importantes dentro de login */
const Login = ({ onGoBack, onRegister, onLoginSuccessfully }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [messageStyle, setMessageStyle] = useState('');

  /* Verificamos si las credencials hacen match o no con la cuenta creada */
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      const user = response.user;

      console.log('Logged in:', user);
      setMessage('Login Exitoso');
      setMessageStyle('success');
      onLoginSuccessfully();
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      setMessage('Login Fallido');
      setMessageStyle('error');
    }
  };

  /* Estructura del login */
  return (
    <div>
      <header className="header">
        <div className="header-left">
        <ul className="header-nav">
        <li><button onClick={onGoBack}>EcoHuella</button></li>
        </ul>
        </div>
        <div className="header-right">
          <ul className="header-nav">
            <li><button onClick={onGoBack}></button></li>

            
          </ul>
        </div>
      </header>



      <div className="content">
        
        <h2>Iniciar Sesión</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn">Iniciar Sesión</button>
          <button type="button" className="btn" onClick={onGoBack}>Volver</button>
          <button type="button" className="btn" onClick={onRegister}>¿No tienes cuenta? Crear una nueva</button>
        </form>
        {message && <p className={`message ${messageStyle}`}>{message}</p>}
      </div>


      <Footer />

       
    </div>
  );
};

export default Login;

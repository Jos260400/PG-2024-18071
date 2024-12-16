import React, { useState } from 'react';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase';
import Footer from "./Footer";
import { useNavigate } from 'react-router-dom';

const NewLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [messageStyle, setMessageStyle] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      const user = response.user;

      console.log('Logged in:', user);
      setMessage('Login Exitoso');
      setMessageStyle('success');
      navigate('/home'); 
      
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      setMessage('Login Fallido');
      setMessageStyle('error');
    }
  };

  const handleGoBack = () => {
    console.log('Navigating to /home');
    navigate('/home');
  };

  const handleRegister = () => {
    console.log('Navigating to /register');
    navigate('/register'); 
  };

  return (
    <div>
      <header className="header">
        <div className="header-left">
          <ul className="header-nav">
            <li><button onClick={handleGoBack}>EcoHuella</button></li>
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
          <button type="button" className="btn" onClick={handleGoBack}>Volver</button>
          <button type="button" className="btn" onClick={handleRegister}>¿No tienes cuenta? Crear una nueva</button>
        </form>
        {message && <p className={`message ${messageStyle}`}>{message}</p>}
      </div>

      <Footer />
    </div>
  );
};

export default NewLogin;
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';
import './Navbar.css';

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, [auth]);

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/home');
  };

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="navbar">
      <div className="navbar-toggle" onClick={toggleMenu}>
        ☰
      </div>

      <div className="navbar-left">
        <Link to="/home" className="navbar-link">EcoHuella</Link>
        {user && (
          <span className="navbar-welcome">Bienvenido: {auth.currentUser?.email}</span>
        )}
      </div>

      <div className={`navbar-right ${isOpen ? 'open' : ''}`}>
        {user ? (
          <>
            <Link to="/new-questionnaire" className="navbar-link">Nueva Evaluación</Link>
            <Link to="/questionnaires" className="navbar-link">Cuestionarios Realizados</Link>
            <Link to="/badges" className="navbar-link">Insignias</Link>
            <Link to="/recommendation" className="navbar-link">Recomendación</Link>
            <Link to="/profile" className="navbar-link">Perfil</Link>
            <button onClick={handleLogout} className="navbar-button">Cerrar Sesión</button>
          </>
        ) : (
          <>
            <Link to="/information" className="navbar-link">Información</Link>
            <Link to="/faq" className="navbar-link">FAQ</Link>
            <Link to="/login" className="navbar-link">Iniciar Sesión</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
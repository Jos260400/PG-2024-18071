import React from 'react';
import './Header.css'; 

/* Opciones para regresar a Home al usar el header */
const Header = ({ onGoBack, onRegister }) => {
  return (
    <header className="header" >
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
  );
};

export default Header;

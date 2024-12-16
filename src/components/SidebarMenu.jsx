import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SidebarMenu = ({ onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="sidebar-menu">
      <button onClick={toggleMenu}>Menu</button>
      {isOpen && (
        <ul>
          <li>
            <button onClick={() => onSelect('Cuestionarios Realizados')}>Cuestionarios Realizados</button>
          </li>
          <li>
            <button onClick={() => onSelect('Insignias')}>Insignias</button>
          </li>
        </ul>
      )}
    </div>
  );
};

export default SidebarMenu;

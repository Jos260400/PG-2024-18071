/* Importamos cada componente */
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import  { app } from './firebase.js';
import NewApp from './NewApp.jsx';

/* Renderizamos el componente */
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <App /> */}
    <NewApp />
  </React.StrictMode>
);
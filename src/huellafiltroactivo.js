/* Importamos lo necesario para los datos de firebase */
import React, { useState, useEffect } from 'react';
import { obtenerHuellaPorFiltros } from './huellatotalManagement'; 


/* Tomamos la ubicacion de cada cuenta */
const HuellaFiltroActivo = ({ department, municipality, zone }) => {
  const [huellaTotal, setHuellaTotal] = useState(0);

  useEffect(() => {
    const fetchFilteredHuella = async () => {
      try {
        const filteredHuella = await obtenerHuellaPorFiltros(department, municipality, zone);
        setHuellaTotal(filteredHuella);
      } catch (error) {
        console.error('Error al obtener la huella filtrada:', error);
      }
    };

    fetchFilteredHuella();
  }, [department, municipality, zone]);

  return (
    <div>
      <label>Huella de Carbono Activa: {huellaTotal}</label>
    </div>
  );
};

export default HuellaFiltroActivo;

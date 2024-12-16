/* Importamos lo necesario para los datos de firebase */
import React, { useState, useEffect } from 'react';
import { db } from './firebase';
import { collection, getDocs } from 'firebase/firestore';


/* Analizamos la coleccion totales  y tomamos el ultimo valor de huella ingresado por email */
const ActivoTotalSuma = ({ onHuellaTotal }) => {
  useEffect(() => {
    const calculateTotalHuella = async () => {
      try {
        const totalesSnapshot = await getDocs(collection(db, 'totales'));
        const latestHuellaMap = new Map();

        totalesSnapshot.forEach((doc) => {
          const data = doc.data();
          const email = data.email;
          const huella = data.huella;
          const fechaHora = data.fechaHora;

          console.log('Documento:', data); 

          if (huella && !isNaN(huella)) {
            if (!latestHuellaMap.has(email) || latestHuellaMap.get(email).fechaHora < fechaHora) {
              latestHuellaMap.set(email, {
                huella: Number(huella),
                fechaHora: fechaHora,
              });
            }
          }
        });

/* Sumatoria total de la huella */        
        console.log('Mapa de huella más reciente:', Array.from(latestHuellaMap.values())); 

        const sumaHuella = Array.from(latestHuellaMap.values()).reduce((sum, entry) => sum + entry.huella, 0);

        console.log('Suma total de huella:', sumaHuella); 

        if (onHuellaTotal) {
          onHuellaTotal(sumaHuella);
        }
      } catch (error) {
        console.error('Error al calcular la suma del campo huella:', error);
      }
    };

    calculateTotalHuella();
  }, [onHuellaTotal]);

  return null; 
};

export default ActivoTotalSuma;

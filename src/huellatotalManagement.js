/* Importamos lo necesario para los datos de firebase */
import { db } from './firebase';
import { collection, getDocs } from 'firebase/firestore';

/* Obtenemos el total de la sumatoria del campo huella */
export const obtenerHuellaTotal = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'totales'));
    let totalHuella = 0;
    const latestEntries = {};

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const huella = parseFloat(data.huella);
      const email = data.email;
      const timestamp = data.timestamp; 

      if (!isNaN(huella) && email && timestamp) {
   
        if (!latestEntries[email] || latestEntries[email].timestamp < timestamp) {
          latestEntries[email] = { huella, timestamp };
        }
      }
    });


    for (const entry of Object.values(latestEntries)) {
      totalHuella += entry.huella;
    }

    console.log('Total Huella Calculada:', totalHuella);
    return totalHuella;
  } catch (error) {
    console.error('Error al obtener huella total:', error);
    return 0;
  }
};

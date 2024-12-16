/* Importamos lo necesario para los datos de firebase */
import { db } from './firebase';
import { collection, getDocs } from 'firebase/firestore';

/* Debemos obtener cada uno de los cuestionarios que se realizaron de la coleccion totales */
export const obtenerCuestionarios = async () => {
  try {
    const totalesSnapshot = await getDocs(collection(db, 'totales'));
    return totalesSnapshot.size;
  } catch (error) {
    console.error('Error al obtener cuestionarios:', error);
    throw error;
  }
};
/* Importamos lo necesario para los datos de firebase */
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { app } from './firebase.js';

const db = getFirestore(app);

/* Debemos obtener cada usuario desde la coleccion users */
export const obtenerUsuarios = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'users'));
    return querySnapshot.size;  
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    return 0;
  }
};

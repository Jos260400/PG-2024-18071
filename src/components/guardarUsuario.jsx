/* Importamos lo necesario para los datos de firebase, y componentes */
import { db } from '../firebase'; 
import { addDoc, collection } from 'firebase/firestore';

/* Guardamos cada usuario */
const guardarUsuario = async (usuarioData) => {
  try {
    
    await addDoc(collection(db, 'usuarios'), usuarioData);
    console.log('Usuario agregado correctamente a Firestore');
  } catch (error) {
    console.error('Error al guardar usuario en Firestore:', error);
    throw new Error('No se pudo guardar el usuario en Firestore');
  }
};

export { guardarUsuario };

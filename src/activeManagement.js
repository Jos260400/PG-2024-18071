/* Importamos lo necesario para los datos de firebase */
import { db } from './firebase';
import { collection, getDocs } from 'firebase/firestore';

/* Conseguimos los datos de la coleccion de users y totales */
const getActiveUsersCount = async () => {
  try {
    const usersSnapshot = await getDocs(collection(db, 'users'));
    const totalesSnapshot = await getDocs(collection(db, 'totales'));

    const usersWithQuestionnaire = new Set();
    

    totalesSnapshot.forEach((doc) => {
      const data = doc.data();
      const email = data.email;
      if (email) {
        usersWithQuestionnaire.add(email);
      }
    });

    let activeUsersCount = 0;


    usersSnapshot.forEach((doc) => {
      const data = doc.data();
      const email = data.email;
      if (email && usersWithQuestionnaire.has(email)) {
        activeUsersCount++;
      }
    });

    return activeUsersCount;
  } catch (error) {
    console.error('Error al obtener el recuento de usuarios activos:', error);
    return 0;
  }
};

export default getActiveUsersCount;

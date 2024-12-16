/* Importamos lo necesario para los datos de firebase */
import { db } from './firebase';
import { collection, getDocs } from 'firebase/firestore';

/* Departamento con huella mas alta */
const getDepartmentWithMaxHuella = async (collectionName) => {
  try {
    const querySnapshot = await getDocs(collection(db, collectionName));
    const departmentHuellaMap = {};

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const department = data.department;
      const huella = parseFloat(data.huella);
      
      if (department && !isNaN(huella)) {
        if (!departmentHuellaMap[department]) {
          departmentHuellaMap[department] = 0;
        }
        departmentHuellaMap[department] += huella;
      }
    });

    let maxHuellaDepartment = null;
    let maxHuella = 0;

    for (const [department, huella] of Object.entries(departmentHuellaMap)) {
      if (huella > maxHuella) {
        maxHuella = huella;
        maxHuellaDepartment = department;
      }
    }

    return { department: maxHuellaDepartment, huella: maxHuella };
  } catch (error) {
    console.error(`Error al obtener datos de la colección ${collectionName}:`, error);
    return { department: null, huella: 0 };
  }
};

export const getMaxHuellaByDepartment = async () => {
  const maxHuellaUsers = await getDepartmentWithMaxHuella('users');
  const maxHuellaTotales = await getDepartmentWithMaxHuella('totales');

  return {
    users: maxHuellaUsers,
    totales: maxHuellaTotales,
  };
};

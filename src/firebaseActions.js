/* Importamos lo necesario para los datos de firebase */
import { db } from './firebase';
import { collection, addDoc, query, where, getDocs, doc, updateDoc, getFirestore,setDoc, writeBatch, Timestamp, orderBy   } from 'firebase/firestore';


/* Llevaremos el control de cada cuestionario hecho */
export const obtenerCuestionariosRealizados = async (email) => {
  try {
    const totalesCollectionRef = collection(db, 'totales');
    const q = query(totalesCollectionRef, where('email', '==', email));
    const querySnapshot = await getDocs(q);
    
    const cuestionarios = [];
    querySnapshot.forEach((doc, index) => {
      cuestionarios.push({ id: doc.id, ...doc.data(), index: index + 1 });
    });

    return cuestionarios;
  } catch (error) {
    console.error('Error al obtener los cuestionarios realizados:', error);
    return [];
  }
};

export const actualizarCuestionario = async (id, data) => {
  try {
    const cuestionariosRef = collection(db, 'cuestionarios');
    const q = query(cuestionariosRef, where('email', '==', data.email));
    const querySnapshot = await getDocs(q);

    const batch = writeBatch(db);

    querySnapshot.forEach((doc) => {
      batch.update(doc.ref, { esReciente: false });
    });

    const cuestionarioRef = doc(db, 'cuestionarios', id);
    batch.update(cuestionarioRef, { ...data, esReciente: true });

    await batch.commit();

    console.log('Cuestionario actualizado exitosamente');
  } catch (error) {
    console.error('Error al actualizar el cuestionario: ', error);
  }
};

/* Guardamos cada respuesta, desde email, fechaHora, huella y de la respuesta 1 a la 33 */
export const guardarRespuestas = async (data) => {
  try {
    console.log('data', data);
    
    await addDoc(collection(db, 'respuestas'), {
      email: data.email,
      fechaHora: data.fechaHora,
      huella: data.huella,
      respuesta1: data.respuesta1,
      respuesta2: data.respuesta2,
      respuesta3: data.respuesta3,
      respuesta4: data.respuesta4,
      respuesta5: data.respuesta5,
      respuesta6: data.respuesta6,
      respuesta7: data.respuesta7,
      respuesta8: data.respuesta8,
      respuesta9: data.respuesta9,
      respuesta10: data.respuesta10,
      respuesta11: data.respuesta11,
      respuesta12: data.respuesta12,
      respuesta13: data.respuesta13,
      respuesta14: data.respuesta14,
      respuesta15: data.respuesta15,
      respuesta16: data.respuesta16,
      respuesta17: data.respuesta17,
      respuesta18: data.respuesta18,
      respuesta19: data.respuesta19,
      respuesta20: data.respuesta20,
      respuesta21: data.respuesta21,
      respuesta22: data.respuesta22,
      respuesta23: data.respuesta23,
      respuesta24: data.respuesta24,
      respuesta25: data.respuesta25,
      respuesta26: data.respuesta26,
      respuesta27: data.respuesta27,
      respuesta28: data.respuesta28,
      respuesta29: data.respuesta29,
      respuesta30: data.respuesta30,
      respuesta31: data.respuesta31,
      respuesta32: data.respuesta32,
      respuesta33: data.respuesta33,
      totalDocId: data.totalDocId
    });
    
    console.log('Datos guardados en la colección "respuestas"');
  } catch (error) {
    console.error('Error al guardar los datos en la colección "respuestas":', error);
  }
};

/* Guardamos cada respuesta */
export const saveQuestionnaireResponses = async (responses) => {
  try {
    console.log('Guardando en Firestore:', responses);
    await addDoc(collection(db, 'respuestas'), responses);
  } catch (error) {
    console.error('Error al guardar las respuestas:', error);
  }
};

/* Guardamos los datos en la coleccion totales */
export const guardarTotales = async (totalData) => {
  try {
    const totalesCollectionRef = collection(db, 'totales');
    const docRef = await addDoc(totalesCollectionRef, totalData);
    console.log('Datos de huella de carbono guardados exitosamente');
    return docRef.id;
  } catch (error) {
    console.error('Error al guardar los datos de huella de carbono:', error);
    return null;
  }
};



export const getSortedQuestionnaires = async () => {
  const q = query(collection(db, 'totales'), orderBy('fechaHora', 'asc'));
  const querySnapshot = await getDocs(q);
  const questionnaires = [];
  querySnapshot.forEach((doc) => {
    questionnaires.push({ id: doc.id, ...doc.data() });getSortedQuestionnaires 
  });
  return questionnaires;
};





export const obtenerRespuestas = async (email) => {
  const respuestasRef = db.collection('respuestas');
  const snapshot = await respuestasRef.where('email', '==', email).get();
  if (snapshot.empty) {
    console.log('No matching documents.');
    return [];
  } 

  const respuestas = [];
  snapshot.forEach(doc => {
    respuestas.push(doc.data());
  });

  return respuestas;
};

/* Obtenemos los cuestionarios en base al ID que tenga cada uno */
export const obtenerRespuestaPorId = async (email, id) => {
  try {
    console.log(email, id)
    const respuestasRef = collection(db, 'respuestas');

    const q = query(
      respuestasRef,
      where('email', '==', email),
      where('totalDocId', '==', id)
    );

    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      console.log('No matching documents.');
      return [];
    }

    const respuestas = [];
    snapshot.forEach(doc => {
      respuestas.push({ id: doc.id, ...doc.data() });
    });

    return respuestas;
  } catch (error) {
    console.error("Error fetching respuestas:", error);
    return [];
  }
};
export const obtenerRespuestaPorIdSinEmail = async (id) => {
  try {
    console.log(id)
    const respuestasRef = collection(db, 'respuestas');

    const q = query(
      respuestasRef,
      where('totalDocId', '==', id)
    );

    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      console.log('No matching documents.');
      return [];
    }

    const respuestas = [];
    snapshot.forEach(doc => {
      respuestas.push({ id: doc.id, ...doc.data() });
    });

    return respuestas;
  } catch (error) {
    console.error("Error fetching respuestas:", error);
    return [];
  }
};

export const calculateTotalHuella = async (department, municipality, zone) => {
  try {

    const usersRef = collection(db, 'users');
    const totalesRef = collection(db, 'totales');
    
    let usersQuery = usersRef;

    // Con departamento
    if (department && department !== "Todos") {
      usersQuery = query(usersQuery, where('department', '==', department));
    }

    // Con municipio
    if (municipality && municipality.length > 0 && municipality[0] !== '') {
      const chunkSize = 10;
      const municipalityChunks = [];

      for (let i = 0; i < municipality.length; i += chunkSize) {
        municipalityChunks.push(municipality.slice(i, i + chunkSize));
      }

      let userDocs = [];
      
      for (const chunk of municipalityChunks) {
        let chunkQuery = query(usersQuery, where('municipality', 'in', chunk));
        
        // Con zona
        if (zone && zone.length > 0 && zone[0] !== '') {
          chunkQuery = query(chunkQuery, where('zone', 'in', zone));
        }

        const chunkDocs = await getDocs(chunkQuery);
        userDocs = userDocs.concat(chunkDocs.docs);
      }

      if (userDocs.length === 0) {
        console.error('No se encontraron datos para calcular la huella de carbono');
      }

      const emails = userDocs.map(doc => doc.data().email);

      let totalHuella = 0;

      
      if (emails.length > 0) {
        const queryTotales = query(totalesRef, where('email', 'in', emails));
        const huellaQuery = await getDocs(queryTotales);
        const latestHuellaMap = new Map();

        huellaQuery.forEach(doc => {
          const data = doc.data();
          const email = data.email;
          const huella = data.huella;
          const fechaHora = data.fechaHora;

          if (huella && !isNaN(huella)) {
            if (!latestHuellaMap.has(email) || latestHuellaMap.get(email).fechaHora < fechaHora) {
              latestHuellaMap.set(email, {
                huella: Number(huella),
                fechaHora: fechaHora,
              });
            }
          }
        });

        
        totalHuella = Array.from(latestHuellaMap.values()).reduce((sum, entry) => sum + entry.huella, 0);
      }

      return totalHuella;

    } else {
      // Sin municipio y sin zona
      const userDocs = await getDocs(usersQuery);
      if (userDocs.empty) {
        console.log('No se encontraron datos para calcular la huella de carbono');
        return 0;
      }

      const emails = userDocs.docs.map(doc => doc.data().email);
      let totalHuella = 0;

      if (emails.length > 0) {
        const queryTotales = query(totalesRef, where('email', 'in', emails));
        const huellaQuery = await getDocs(queryTotales);
        const latestHuellaMap = new Map();

        huellaQuery.forEach(doc => {
          const data = doc.data();
          const email = data.email;
          const huella = data.huella;
          const fechaHora = data.fechaHora;

          if (huella && !isNaN(huella)) {
            if (!latestHuellaMap.has(email) || latestHuellaMap.get(email).fechaHora < fechaHora) {
              latestHuellaMap.set(email, {
                huella: Number(huella),
                fechaHora: fechaHora,
              });
            }
          }
        });

        totalHuella = Array.from(latestHuellaMap.values()).reduce((sum, entry) => sum + entry.huella, 0);
      }

      return totalHuella;
    }

  } catch (error) {
    console.error('Error al calcular la huella:', error);
    throw error;
  }
};



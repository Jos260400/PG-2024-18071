/* Importamos lo necesario para los datos de firebase */
import { db } from './firebaseConfig'; 
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

/* Agregaremos cada dato importante */
export const addResponse = async (data) => {
  const responsesCollection = collection(db, "respuestas");
  await addDoc(responsesCollection, {
    ...data,
    createdAt: serverTimestamp() 
  });
};

export const addTotal = async (data) => {
  const totalsCollection = collection(db, "totales");
  await addDoc(totalsCollection, {
    ...data,
    createdAt: serverTimestamp() 
  });
};

/* Importamos lo necesario para los datos de firebase */
import { db } from './firebaseConfig'; 
import { collection, query, orderBy, getDocs } from "firebase/firestore";

/* Respuestas para cada coleccion , totales y respuestas */
export const getResponses = async () => {
  const responsesCollection = collection(db, "respuestas");
  const q = query(responsesCollection, orderBy("createdAt", "desc"));
  const querySnapshot = await getDocs(q);
  const responses = querySnapshot.docs.map(doc => doc.data());
  return responses;
};

export const getTotals = async () => {
  const totalsCollection = collection(db, "totales");
  const q = query(totalsCollection, orderBy("createdAt", "desc"));
  const querySnapshot = await getDocs(q);
  const totals = querySnapshot.docs.map(doc => doc.data());
  return totals;
};

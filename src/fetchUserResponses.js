/* Importamos lo necesario para los datos de firebase */
import { db, getUserEmail } from './firebase'; 
import { collection, getDocs, query, where } from "firebase/firestore";

const fetchUserResponses = async () => {
  try {
  
    const email = await getUserEmail();

    const responsesRef = collection(db, 'respuestas');

    const q = query(responsesRef, where("email", "==", email));

    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
    });
  } catch (error) {
    console.error("Error fetching user responses: ", error);
  }
};

fetchUserResponses();

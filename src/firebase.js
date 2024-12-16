/* Importamos lo necesario para los datos de firebase */
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged  } from "firebase/auth";
import { getFirestore, collection, getDocs, query, where  } from "firebase/firestore";


/* Información de la base de datos */
const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
  measurementId: ""
};



const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db, getUserEmail  };


const fetchData = async () => {
  try {
    const myCollection = collection(db, 'myCollectionName');
    const querySnapshot = await getDocs(myCollection);
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
    });
  } catch (error) {
    console.error("Error fetching documents: ", error);
  }
};

fetchData();


/* Vemos si el email esta logueado */
const getUserEmail = () => {
  return new Promise((resolve, reject) => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        resolve(user.email);
      } else {
        reject('No user logged in');
      }
    });
  });
};
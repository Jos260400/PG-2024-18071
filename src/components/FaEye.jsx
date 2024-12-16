/* Importamos lo necesario para los datos de firebase */
import React, { useEffect, useState } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase'; 
import { getAuth } from 'firebase/auth';

const ShowData = () => {
  const [data, setData] = useState([]);
  const auth = getAuth();

  useEffect(() => {
    const fetchData = async () => {
      const user = auth.currentUser;

      if (user) {
        const q = query(collection(db, 'respuestas'), where('email', '==', user.email));
        const querySnapshot = await getDocs(q);
        const dataList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setData(dataList);
      } else {
        console.log('No user is signed in');
      }
    };

    fetchData();
  }, [auth]);

  /* Mostramos lo que se marco en cada respuesta */
  return (
    <div>
      <h1>Respuestas Guardadas</h1>
      <ul>
        {data.map(item => (
          <li key={item.id} style={{ marginBottom: '20px', border: '1px solid #ccc', padding: '10px' }}>
            <p><strong>Email:</strong> {item.email}</p>
            <p><strong>Fecha y Hora:</strong> {item.fechaHora}</p>
            <p><strong>Huella de Carbono:</strong> {item.huella}</p>
            <p><strong>Respuesta 1:</strong> {item.respuesta1}</p>
            <p><strong>Respuesta 2:</strong> {item.respuesta2}</p>
            <p><strong>Respuesta 3:</strong> {item.respuesta3}</p>
            <p><strong>Respuesta 4:</strong> {item.respuesta4}</p>
            <p><strong>Respuesta 5:</strong> {item.respuesta5}</p>
            <p><strong>Respuesta 6:</strong> {item.respuesta6}</p>
            <p><strong>Respuesta 7:</strong> {item.respuesta7}</p>
            <p><strong>Respuesta 8:</strong> {item.respuesta8}</p>
            <p><strong>Respuesta 9:</strong> {item.respuesta9}</p>
            <p><strong>Respuesta 10:</strong> {item.respuesta10}</p>
            <p><strong>Respuesta 11:</strong> {item.respuesta11}</p>
            <p><strong>Respuesta 12:</strong> {item.respuesta12}</p>
            <p><strong>Respuesta 13:</strong> {item.respuesta13}</p>
            <p><strong>Respuesta 14:</strong> {item.respuesta14}</p>
            <p><strong>Respuesta 15:</strong> {item.respuesta15}</p>
            <p><strong>Respuesta 16:</strong> {item.respuesta16}</p>
            <p><strong>Respuesta 17:</strong> {item.respuesta17}</p>
            <p><strong>Respuesta 18:</strong> {item.respuesta18}</p>
            <p><strong>Respuesta 19:</strong> {item.respuesta19}</p>
            <p><strong>Respuesta 20:</strong> {item.respuesta20}</p>
            <p><strong>Respuesta 21:</strong> {item.respuesta21}</p>
            <p><strong>Respuesta 22:</strong> {item.respuesta22}</p>
            <p><strong>Respuesta 23:</strong> {item.respuesta23}</p>
            <p><strong>Respuesta 24:</strong> {item.respuesta24}</p>
            <p><strong>Respuesta 25:</strong> {item.respuesta25}</p>
            <p><strong>Respuesta 26:</strong> {item.respuesta26}</p>
            <p><strong>Respuesta 27:</strong> {item.respuesta27}</p>
            <p><strong>Respuesta 28:</strong> {item.respuesta28}</p>
            <p><strong>Respuesta 29:</strong> {item.respuesta29}</p>
            <p><strong>Respuesta 30:</strong> {item.respuesta30}</p>
            <p><strong>Respuesta 31:</strong> {item.respuesta31}</p>
            <p><strong>Respuesta 32:</strong> {item.respuesta32}</p>
            <p><strong>Respuesta 33:</strong> {item.respuesta33}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ShowData;

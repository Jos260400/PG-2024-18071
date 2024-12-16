import React, { useEffect, useState } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase'; 
import { getAuth } from 'firebase/auth';

/* Mostramos los datos guardados tanto pregunta como respuesta*/
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

       
        dataList.sort((a, b) => {
          
          const dateA = new Date(a.fechaHora);
          const dateB = new Date(b.fechaHora);

          
          return dateA - dateB;
        });

        setData(dataList);
      } else {
        console.log('No user is signed in');
      }
    };

    fetchData();
  }, [auth]);

  return (
    <div>
      
      <h1>Respuestas Guardadas</h1>
      <ul>
        {data.map(item => (
          <li key={item.id} style={{ marginBottom: '20px', border: '1px solid #ccc', padding: '10px' }}>
            <p style={{ margin: '10px 0' }} ><strong>Email:</strong> {item.email}</p>
            <p style={{ margin: '10px 0' }} ><strong>Fecha y Hora:</strong> {item.fechaHora}</p>
            <p style={{ margin: '10px 0' }} ><strong>Huella de Carbono:</strong> {item.huella}</p>
            <p style={{ margin: '10px 0' }} ><strong>¿Utilizas algún vehículo para movilizarte? (Sí/No) Respuesta 1:</strong> {item.respuesta1}</p>
            <p style={{ margin: '10px 0' }} ><strong>¿Qué distancia recorriste durante el mes con el vehículo? (Indíquelo en kilómetros) Respuesta 2:</strong> {item.respuesta2}</p>
            <p style={{ margin: '10px 0' }} ><strong>¿Cuál es el tipo de combustible que utiliza el vehículo? (Gasolina/Diesel) Respuesta 3:</strong> {item.respuesta3}</p>
            <p style={{ margin: '10px 0' }} ><strong>¿Utilizas alguna motocicleta para movilizarte? (Sí/No) Respuesta 4:</strong> {item.respuesta4}</p>
            <p style={{ margin: '10px 0' }} ><strong>¿Qué distancia recorriste durante el mes con la motocicleta? (Indíquelo en kilómetros) Respuesta 5:</strong> {item.respuesta5}</p>
            <p style={{ margin: '10px 0' }} ><strong>¿Cuál es el tipo de combustible que utiliza la motocicleta? (Gasolina/Diesel) Respuesta 6:</strong> {item.respuesta6}</p>
            <p style={{ margin: '10px 0' }} ><strong>¿Utilizaste algún otro transporte como el Transmetro, Transurbano, Uber, InDrive, etc, para movilizarte? (Sí/No) Respuesta 7:</strong> {item.respuesta7}</p>
            <p style={{ margin: '10px 0' }} ><strong>¿Qué distancia recorriste con el transporte durante el mes? (Indíquelo en kilómetros) Respuesta 8:</strong> {item.respuesta8}</p>
            <p style={{ margin: '10px 0' }} ><strong>¿Realizaste algún viaje aéreo durante el mes? (Sí/No) Respuesta 9:</strong> {item.respuesta9}</p>
            <p style={{ margin: '10px 0' }} ><strong>¿Qué distancia recorriste durante el mes? (Indíquelo en kilómetros) Respuesta 10:</strong> {item.respuesta10}</p>
            <p style={{ margin: '10px 0' }} ><strong>¿Cuánto pesa tu equipaje de mano en promedio? (Indíquelo en libras)Respuesta 11:</strong> {item.respuesta11}</p>
            <p style={{ margin: '10px 0' }} ><strong>¿Cuánto pesa tu equipaje facturado en promedio? (Indíquelo en libras) Respuesta 12:</strong> {item.respuesta12}</p>
            <p style={{ margin: '10px 0' }} ><strong>¿En qué clase viajaste más durante el mes? (Económica/Primera Clase/Clase Ejecutiva) Respuesta 13:</strong> {item.respuesta13}</p>
            <p style={{ margin: '10px 0' }} ><strong>¿Cuántas escalas hiciste en total al tomar los vuelos durante el mes? (Indique el valor en números) Respuesta 14:</strong> {item.respuesta14}</p>
            <p style={{ margin: '10px 0' }} ><strong>¿Utilizas algún dispositivo o equipo que use energía? (Sí/No) Respuesta 15:</strong> {item.respuesta15}</p>
            <p style={{ margin: '10px 0' }} ><strong>¿Cuántas kWh utilizaste durante el mes (Puedes verlo en una factura). (Indique el valor en números) Respuesta 16:</strong> {item.respuesta16}</p>
            <p style={{ margin: '10px 0' }} ><strong>¿Utilizas leña como fuente de energía en tu hogar? (Sí/No)Respuesta 17:</strong> {item.respuesta17}</p>
            <p style={{ margin: '10px 0' }} ><strong>¿Cuántos m3 de leña consumiste durante el mes? (Indique el valor en numeros) (Sí/No) Respuesta 18:</strong> {item.respuesta18}</p>
            <p style={{ margin: '10px 0' }} ><strong>¿Utilizas gas para cocinar o calentar tu hogar? (Sí/No) Respuesta 19:</strong> {item.respuesta19}</p>
            <p style={{ margin: '10px 0' }} ><strong>¿Cuántas libras de gas consumiste durante el mes? (25lb, 30 lb y 100lb) Respuesta 20:</strong> {item.respuesta20}</p>
            <p style={{ margin: '10px 0' }} ><strong>¿Cuántas libras de carne consumiste durante el mes? (Indique el valor en números) Respuesta 21:</strong> {item.respuesta21}</p>
            <p style={{ margin: '10px 0' }} ><strong>¿Cuántas veces al mes consumiste alimentos procesados (como comida rápida, snacks, etc.) ? (Indique el valor en números) Respuesta 22:</strong> {item.respuesta22}</p>
            <p style={{ margin: '10px 0' }} ><strong>¿Cuántas libras de verduras frescas consumiste durante el mes? (Indique el valor en números) Respuesta 23:</strong> {item.respuesta23}</p>
            <p style={{ margin: '10px 0' }} ><strong>¿Cuántas libras de frutas frescas consumiste durante el mes? (Indique el valor en números)Respuesta 24:</strong> {item.respuesta24}</p>
            <p style={{ margin: '10px 0' }} ><strong>¿Cuántas libras de granos y cereales (como arroz, pasta, pan) consumiste durante el mes? (Indique el valor en números) Respuesta 25:</strong> {item.respuesta25}</p>
            <p style={{ margin: '10px 0' }} ><strong>¿Cuántas libras de comida desperdiciaste durante el mes? (Indique el valor en libras). Respuesta 26:</strong> {item.respuesta26}</p>
            <p style={{ margin: '10px 0' }} ><strong>¿Cuántas veces en el último mes compraste prendas típicas guatemaltecas, como huipiles, cortes o chalecos bordados? Respuesta 27:</strong> {item.respuesta27}</p>
            <p style={{ margin: '10px 0' }} ><strong>Este mes, al adquirir ropa típica guatemalteca, ¿qué tipo de materiales preferiste? (Algodon, Lana, Manta, Brocado, Seda o Cuero) Respuesta 28:</strong> {item.respuesta28}</p>
            <p style={{ margin: '10px 0' }} ><strong>¿Cuántas veces en el último mes compraste ropa de marcas comerciales (nacionales o internacionales)? Respuesta 29:</strong> {item.respuesta29}</p>
            <p style={{ margin: '10px 0' }} ><strong>En el último mes,  ¿Te deshiciste de alguna prenda tanto típica guatemalteca como de marcas comerciales? (Sí/No) Respuesta 30:</strong> {item.respuesta30}</p>
            <p style={{ margin: '10px 0' }} ><strong>¿Utilizas algún sistema de reciclaje en tu hogar? (Sí/No) Respuesta 31:</strong> {item.respuesta31}</p>
            <p style={{ margin: '10px 0' }} ><strong>¿Cuánta basura sólida generaste durante el mes? (Indíquelo en libras) Respuesta 32:</strong> {item.respuesta32}</p>
            <p style={{ margin: '10px 0' }} ><strong>¿Cómo gestionas los desechos líquidos en tu hogar (Sistema séptico, Drenaje público)? Respuesta 33:</strong> {item.respuesta33}</p>


          </li>
        ))}
      </ul>
    </div>
  );
};

export default ShowData;

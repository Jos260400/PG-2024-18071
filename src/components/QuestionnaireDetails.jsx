import React, { useState, useEffect } from 'react';
import { obtenerRespuestaPorId } from '../firebaseActions';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { Link, useNavigate, useParams } from 'react-router-dom';
import './QuestionnaireDetails.css';

const QuestionnaireDetails = () => {
  const { questionnaireId } = useParams();
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [respuestas, setRespuestas] = useState([]);
  const [loading, setLoading] = useState(true);
  const auth = getAuth();
  const email = auth.currentUser?.email;

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
        try {
          const fetchRespuestas = async () => {
            try {
              if (email) {
                const fetchedRespuestas = await obtenerRespuestaPorId(email, questionnaireId);
                setRespuestas(fetchedRespuestas);
              }
            } catch (error) {
              console.error("Error al obtener respuestas:", error);
            } finally {
              setLoading(false);
            }
          };
      
          fetchRespuestas();
          
        } catch (error) {
          console.error('Error al obtener cuestionarios:', error);
        }
      } else {
        setUser(null);
        navigate('/login');
      }
    });

    return () => unsubscribe();
  }, [auth, navigate, questionnaireId]);

  if (loading) return <p>Loading...</p>;
  if (respuestas.length === 0) return <p>No hay respuestas disponibles.</p>;

  return (
    <div className="container">
      <nav className="breadcrumb">
        <Link to="/questionnaires" className="breadcrumb-link">
        
        <br />
      <br />      
      <br /><span className="back-arrow">←</span> Volver a Cuestionarios
        </Link>
      </nav>

      <h1 className="main-title">Detalles del Cuestionario</h1>
      {respuestas.map((respuesta, index) => (
        <div key={index} className="section">
          <h2 className="section-title">Información General</h2>
          <p><strong>Fecha:</strong> {respuesta.fechaHora}</p>
          <p><strong>Huella de Carbono:</strong> {respuesta.huella}</p>

          <h3 className="subsection-title">Transporte</h3>
          <p><strong>Pregunta 1:</strong> ¿Utilizas algún vehículo para movilizarte? (Sí/No)</p>
          <p><strong>Respuesta:</strong> {respuesta.respuesta1 || 'No disponible'}</p>
          <p><strong>Pregunta 2:</strong> ¿Qué distancia recorriste durante el mes con el vehículo? (km)</p>
          <p><strong>Respuesta:</strong> {respuesta.respuesta2 || 'No disponible'}</p>
          <p><strong>Pregunta 3:</strong> Tipo de combustible del vehículo (Gasolina/Diesel)</p>
          <p><strong>Respuesta:</strong> {respuesta.respuesta3 || 'No disponible'}</p>
          <p><strong>Pregunta 4:</strong> ¿Utilizas motocicleta para movilizarte? (Sí/No)</p>
          <p><strong>Respuesta:</strong> {respuesta.respuesta4 || 'No disponible'}</p>
          <p><strong>Pregunta 5:</strong> Distancia recorrida con la motocicleta (km)</p>
          <p><strong>Respuesta:</strong> {respuesta.respuesta5 || 'No disponible'}</p>
          <p><strong>Pregunta 6:</strong> Tipo de combustible de la motocicleta (Gasolina/Diesel)</p>
          <p><strong>Respuesta:</strong> {respuesta.respuesta6 || 'No disponible'}</p>
          <p><strong>Pregunta 7:</strong> ¿Usaste otro transporte (Uber, etc.)? (Sí/No)</p>
          <p><strong>Respuesta:</strong> {respuesta.respuesta7 || 'No disponible'}</p>
          <p><strong>Pregunta 8:</strong> Distancia recorrida en transporte público (km)</p>
          <p><strong>Respuesta:</strong> {respuesta.respuesta8 || 'No disponible'}</p>

          <h3 className="subsection-title">Viajes Aéreos</h3>
          <p><strong>Pregunta 9:</strong> ¿Realizaste algún viaje aéreo? (Sí/No)</p>
          <p><strong>Respuesta:</strong> {respuesta.respuesta9 || 'No disponible'}</p>
          <p><strong>Pregunta 10:</strong> Distancia recorrida en avión (km)</p>
          <p><strong>Respuesta:</strong> {respuesta.respuesta10 || 'No disponible'}</p>
          <p><strong>Pregunta 11:</strong> ¿Cuánto pesa tu equipaje de mano en promedio? (Indíquelo en libras)</p>
          <p><strong>Respuesta:</strong> {respuesta.respuesta11 || 'No disponible'}</p>
          <p><strong>Pregunta 12:</strong> ¿Cuánto pesa tu equipaje facturado en promedio? (Indíquelo en libras)</p>
          <p><strong>Respuesta:</strong> {respuesta.respuesta12 || 'No disponible'}</p>
          <p><strong>Pregunta 13:</strong> ¿En qué clase viajaste más durante el mes? (Económica/Primera Clase/Clase Ejecutiva)</p>
          <p><strong>Respuesta:</strong> {respuesta.respuesta13 || 'No disponible'}</p>
          <p><strong>Pregunta 14:</strong> ¿Cuántas escalas hiciste en total al tomar los vuelos durante el mes? (Indique el valor en números)</p>
          <p><strong>Respuesta:</strong> {respuesta.respuesta14 || 'No disponible'}</p>
          

          <h3 className="subsection-title">Energía</h3>
          <p><strong>Pregunta 15:</strong> ¿Usas dispositivos eléctricos en casa? (Sí/No)</p>
          <p><strong>Respuesta:</strong> {respuesta.respuesta15 || 'No disponible'}</p>
          <p><strong>Pregunta 16:</strong> Consumo de energía (kWh)</p>
          <p><strong>Respuesta:</strong> {respuesta.respuesta16 || 'No disponible'}</p>
          <p><strong>Pregunta 17:</strong> ¿Utilizas leña como fuente de energía? (Sí/No)</p>
          <p><strong>Respuesta:</strong> {respuesta.respuesta17 || 'No disponible'}</p>
          <p><strong>Pregunta 18:</strong> Consumo de leña (m3)</p>
          <p><strong>Respuesta:</strong> {respuesta.respuesta18 || 'No disponible'}</p>
          <p><strong>Pregunta 19:</strong> ¿Utilizas gas para cocinar o calentar tu hogar? (Sí/No)</p>
          <p><strong>Respuesta:</strong> {respuesta.respuesta19 || 'No disponible'}</p>
          <p><strong>Pregunta 20:</strong> Consumo de gas (libras)</p>
          <p><strong>Respuesta:</strong> {respuesta.respuesta20 || 'No disponible'}</p>

          <h3 className="subsection-title">Alimentación</h3>
          <p><strong>Pregunta 21:</strong> Consumo de carne (libras)</p>
          <p><strong>Respuesta:</strong> {respuesta.respuesta21 || 'No disponible'}</p>
          <p><strong>Pregunta 22:</strong> Frecuencia de consumo de alimentos procesados (número de veces)</p>
          <p><strong>Respuesta:</strong> {respuesta.respuesta22 || 'No disponible'}</p>
          <p><strong>Pregunta 23:</strong> Consumo de verduras frescas (libras)</p>
          <p><strong>Respuesta:</strong> {respuesta.respuesta23 || 'No disponible'}</p>
          <p><strong>Pregunta 24:</strong> Consumo de frutas frescas (libras)</p>
          <p><strong>Respuesta:</strong> {respuesta.respuesta24 || 'No disponible'}</p>
          <p><strong>Pregunta 25:</strong> Consumo de granos y cereales (libras)</p>
          <p><strong>Respuesta:</strong> {respuesta.respuesta25 || 'No disponible'}</p>
          <p><strong>Pregunta 26:</strong> Desperdicio de comida (libras)</p>
          <p><strong>Respuesta:</strong> {respuesta.respuesta26 || 'No disponible'}</p>

          <h3 className="subsection-title">Vestimenta</h3>
          <p><strong>Pregunta 27:</strong> Compras de prendas típicas guatemaltecas (número de veces)</p>
          <p><strong>Respuesta:</strong> {respuesta.respuesta27 || 'No disponible'}</p>
          <p><strong>Pregunta 28:</strong> Materiales preferidos en ropa típica (Algodón, Lana, etc.)</p>
          <p><strong>Respuesta:</strong> {respuesta.respuesta28 || 'No disponible'}</p>
          <p><strong>Pregunta 29:</strong> ¿Cuántas veces en el último mes compraste ropa de marcas comerciales (nacionales o internacionales)?</p>
          <p><strong>Respuesta:</strong> {respuesta.respuesta29 || 'No disponible'}</p>
          <p><strong>Pregunta 30:</strong> En el último mes,  ¿Te deshiciste de alguna prenda tanto típica guatemalteca como de marcas comerciales? (Sí/No) Respuesta 30:</p>
          <p><strong>Respuesta:</strong> {respuesta.respuesta30 || 'No disponible'}</p>

          <h3 className="subsection-title">Residuos y Desechos</h3>
          <p><strong>Pregunta 31:</strong> ¿Utilizas algún sistema de reciclaje en tu hogar? (Sí/No)</p>
          <p><strong>Respuesta:</strong> {respuesta.respuesta31 || 'No disponible'}</p>
          <p><strong>Pregunta 32:</strong> ¿Cuánta basura sólida generaste durante el mes? (Indíquelo en libras)</p>
          <p><strong>Respuesta:</strong> {respuesta.respuesta32 || 'No disponible'}</p>
          <p><strong>Pregunta 33:</strong> ¿Cómo gestionas los desechos líquidos en tu hogar (Sistema séptico, Drenaje público)?</p>
          <p><strong>Respuesta:</strong> {respuesta.respuesta33 || 'No disponible'}</p>


          {}
        </div>
      ))}
    </div>
  );
};

export default QuestionnaireDetails;

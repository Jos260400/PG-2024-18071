import React, { useEffect, useState } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { db } from '../firebase'; 
import { obtenerRespuestaPorId } from '../firebaseActions';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useNavigate, useParams } from 'react-router-dom';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const ShowDocument = () => {
  const { questionnaireId } = useParams();
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const auth = getAuth();
  const email = auth.currentUser?.email;

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
        try {
          const email = user.email;
          const fetchData = async () => {
            try {
              if (email) {
                const response = await obtenerRespuestaPorId(email, questionnaireId);
                generateChartData(response);
              } else {
                console.log('No user is signed in');
              }
            } catch (error) {
              console.error("Error fetching respuestas:", error);
            } finally {
              setLoading(false);
            }
          };
          fetchData();
        } catch (error) {
          console.error('Error al obtener questionarios:', error);
        }
      } else {
        setUser(null);
        navigate('/login');
      }
    });

    return () => unsubscribe();
  }, [auth, navigate, questionnaireId]);

  const generateChartData = (data) => {
    const chartList = data.map((docData, index) => {
      const consumoGasLibras = docData.respuesta20 ? parseInt(docData.respuesta20.replace(' lb', '')) : 0;
      console.log('docData', docData); 
      
      const barData = {
        labels: [
          'Distancia en Vehículo (kms)', 
          'Distancia en Motocicleta (kms)', 
          'Distancia en Transporte Público (kms)', 
          'Distancia en Vuelos (kms)', 
          'Equipaje de Mano (libras)', 
          'Equipaje Facturado (libras)', 
          'Escalas realizadas', 
          'Consumo de Electricidad (kWh)', 
          'Consumo de leña', 
          'Consumo de Gas (libras)', 
          'Consumo de Carne (libras)', 
          'Consumo de alimentos procesados', 
          'Consumo de verduras (lbs)', 
          'Consumo de frutas (lbs)', 
          'Consumo de granos y cereales (lbs)', 
          'Comida Desperdiciada (libras)', 
          'Cantidad de ropa típica comprada', 
          'Cantidad de ropa de marca', 
          'Basura sólida generada (lbs)'
        ],
        datasets: [
          {
            label: `Respuestas ${index + 1}`,
            data: [
              docData.respuesta2 || 0,
              docData.respuesta5 || 0,
              docData.respuesta8 || 0,
              docData.respuesta10 || 0,
              docData.respuesta11 || 0,
              docData.respuesta12 || 0,
              docData.respuesta14 || 0,
              docData.respuesta16 || 0,
              docData.respuesta18 || 0,
              consumoGasLibras,  
              docData.respuesta21 || 0,
              docData.respuesta22 || 0,
              docData.respuesta23 || 0,
              docData.respuesta24 || 0,
              docData.respuesta25 || 0,
              docData.respuesta26 || 0,
              docData.respuesta27 || 0,
              docData.respuesta29 || 0,  
              docData.respuesta32 || 0
            ],
            backgroundColor: [
              "rgba(255, 99, 132, 0.8)",
              "rgba(54, 162, 235, 0.8)",
              "rgba(255, 206, 86, 0.8)",
              "rgba(75, 192, 192, 0.8)",
              "rgba(153, 102, 255, 0.8)",
              "rgba(255, 159, 64, 0.8)",
              "rgba(99, 255, 132, 0.8)",
              "rgba(235, 162, 54, 0.8)",
              "rgba(206, 255, 86, 0.8)",
              "rgba(192, 192, 75, 0.8)",
              "rgba(200, 200, 200, 0.8)",
              "rgba(150, 150, 150, 0.8)",
              "rgba(150, 150, 13, 0.8)",
              "rgba(255, 0, 255, 0.8)",
              "rgba(0, 255, 255, 0.8)",
              "rgba(128, 0, 128, 0.8)",
              "rgba(128, 128, 0, 0.8)",
              "rgba(0, 128, 128, 0.8)",
              "rgba(128, 128, 128, 0.8)"
            ],
            borderColor: "#000000",
            borderWidth: 2,
            hoverBorderWidth: 3 
          }
        ]
      };
  
      const pieData = {
        labels: [
          'Distancia en Vehículo (kms)', 
          'Distancia en Motocicleta (kms)', 
          'Distancia en Transporte Público (kms)', 
          'Distancia en Vuelos (kms)', 
          'Equipaje de Mano (libras)', 
          'Equipaje Facturado (libras)', 
          'Escalas realizadas', 
          'Consumo de Electricidad (kWh)', 
          'Consumo de leña', 
          'Consumo de Gas (libras)', 
          'Consumo de Carne (libras)', 
          'Consumo de alimentos procesados', 
          'Consumo de verduras (lbs)', 
          'Consumo de frutas (lbs)', 
          'Consumo de granos y cereales (lbs)', 
          'Comida Desperdiciada (libras)', 
          'Cantidad de ropa típica comprada', 
          'Cantidad de ropa de marca', 
          'Basura sólida generada (lbs)'
        ],
        datasets: [
          {
            label: `Distribución de Respuestas del Documento ${index + 1}`,
            data: [
              docData.respuesta2 || 0,
              docData.respuesta5 || 0,
              docData.respuesta8 || 0,
              docData.respuesta10 || 0,
              docData.respuesta11 || 0,
              docData.respuesta12 || 0,
              docData.respuesta14 || 0,
              docData.respuesta16 || 0,
              docData.respuesta18 || 0,
              consumoGasLibras,  
              docData.respuesta21 || 0,
              docData.respuesta22 || 0,
              docData.respuesta23 || 0,
              docData.respuesta24 || 0,
              docData.respuesta25 || 0,
              docData.respuesta26 || 0,
              docData.respuesta27 || 0,
              docData.respuesta29 || 0,  
              docData.respuesta32 || 0
            ],
            backgroundColor: [
              "rgba(255, 99, 132, 0.8)",
              "rgba(54, 162, 235, 0.8)",
              "rgba(255, 206, 86, 0.8)",
              "rgba(75, 192, 192, 0.8)",
              "rgba(153, 102, 255, 0.8)",
              "rgba(255, 159, 64, 0.8)",
              "rgba(99, 255, 132, 0.8)",
              "rgba(235, 162, 54, 0.8)",
              "rgba(206, 255, 86, 0.8)",
              "rgba(192, 192, 75, 0.8)",
              "rgba(200, 200, 200, 0.8)",
              "rgba(150, 150, 150, 0.8)",
              "rgba(150, 150, 13, 0.8)",
              "rgba(255, 0, 255, 0.8)",
              "rgba(0, 255, 255, 0.8)",
              "rgba(128, 0, 128, 0.8)",
              "rgba(128, 128, 0, 0.8)",
              "rgba(0, 128, 128, 0.8)",
              "rgba(128, 128, 128, 0.8)"
            ],
            borderColor: "#000000",
            borderWidth: 2
          }
        ]
      };
  
      return { barData, pieData };
    });
  
    setChartData(chartList);
  };
  

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
<div className="charts-container" style={{ padding: '20px', backgroundColor: '#fff', borderRadius: '10px', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)', width: '100%', overflowX: 'auto' }}>
<br />
      <br />      
      <br />
      <div className="bar-chart" style={{ width: '100%', height: '700px', marginBottom: '30px' }}>
    
    
    <Bar data={chartData[0]?.barData} options={{
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top',
        }
      },
      scales: {
        x: {
          ticks: { maxRotation: 90, minRotation: 45 },
        }
      }
    }} />
  </div>
  <div className="pie-chart" style={{ width: '100%', height: '700px' }}>
    <Pie data={chartData[0]?.pieData} />
  </div>
</div>

  );
};

export default ShowDocument;

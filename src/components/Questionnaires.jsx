 /* Importamos los componentes y bibliotecas necesarias */
import React, { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import Footer from './Footer.jsx';
import { obtenerCuestionariosRealizados } from '../firebaseActions';
import { Line } from 'react-chartjs-2';
import { FaEye, FaFileAlt, FaShareAlt } from 'react-icons/fa';
import 'chart.js/auto';
import { useNavigate } from 'react-router-dom';
import QuestionnaireDetails from './QuestionnaireDetails';
import ShowDocument from './ShowDocument';

const Questionnaires = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const [completedQuestionnaires, setCompletedQuestionnaires] = useState([]);
    const [lineChartData, setLineChartData] = useState({
        data: {
          labels: [],
          datasets: [],
        },
        options: {
          scales: {
            x: { title: { display: true, text: 'Fecha' } },
            y: { title: { display: true, text: 'Huella' } },
          },
        },
      });

      /* Mostramos los datos guardados al dar click en cada boton */
    const [showData, setShowData] = useState(false);
    const [showDocument, setShowDocument] = useState(false);
    const [selectedQuestionnaire, setSelectedQuestionnaire] = useState(null);
    const auth = getAuth();

    const parseCustomDate = (dateString) => {
      const [datePart, timePart] = dateString.split(' ');
      const [day, month, year] = datePart.split('/');
      const [hours, minutes, seconds] = timePart.split(':');
  
      return new Date(year, month - 1, day, hours, minutes, seconds);
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
          console.log('user', user)
          if (user) {
            setUser(user);
            try {
              const email = user.email;
              const questionnaires = await obtenerCuestionariosRealizados(email);
              console.log(questionnaires)
              setCompletedQuestionnaires(questionnaires);
              generateLineChartData(questionnaires);
              
            } catch (error) {
              console.error('Error al obtener questionarios:', error);
              generateLineChartData([]);
            }
          } else {
            setUser(null);
            navigate('/login')
          }
        });
    
        return () => unsubscribe();
      }, [auth, navigate]);


    const generateLineChartData = (questionnaires = []) => {
        if (questionnaires.length === 0) {
          setLineChartData({
            data: {
              labels: [], 
              datasets: [],
            },
            options: {
              scales: {
                x: { title: { display: true, text: 'Fecha' } },
                y: { title: { display: true, text: 'Huella' } },
              },
            },
          });
          return;
        }
      
        const labels = questionnaires.map(q => q.fechaHora).sort((a, b) => parseCustomDate(b) - parseCustomDate(a));
        const data = questionnaires.sort((a, b) => parseCustomDate(b.fechaHora) - parseCustomDate(a.fechaHora)).map(q => q.huella); 
      
        const chartData = {
          labels,
          datasets: [
            {
              label: 'Huella',
              data,
              fill: false,
              borderColor: 'rgba(75,192,192,1)',
              tension: 0.1,
            },
          ],
        };
      
        const chartOptions = {
          scales: {
            x: { title: { display: true, text: 'Fecha' } },
            y: { title: { display: true, text: 'Huella' } },
          },
        };
      
        setLineChartData({ data: chartData, options: chartOptions });
      };

    const toggleShowData = (questionnaire) => {
        if (selectedQuestionnaire?.id === questionnaire.id) {
          setShowData(prevShowData => !prevShowData);
        } else {
          setSelectedQuestionnaire(questionnaire);
          setShowData(true);
        }
    };
    const toggleShowDocument = (questionnaire) => {      
      if (selectedQuestionnaire?.id === questionnaire.id) {
        setShowDocument(prevShowDocument => !prevShowDocument);
      } else {
        setSelectedQuestionnaire(questionnaire);
        setShowDocument(true);
     }
    }
    const handleShareClick = (questionnaire) => { 
      const questionnaireId = questionnaire.id;
      navigate(`/share?questionnaireId=${questionnaireId}`);
     /*  const shareUrl = `./src/Share.html?questionnaireId=${encodeURIComponent(questionnaireId)}`;
      const newWindow = window.open(
        shareUrl,  
        "_blank",
        "noopener,noreferrer"
      );
      if (newWindow) newWindow.opener = null; */
    };
    
    const handleQuestionnaireClick = (questionnaireId) => {
      navigate(`/questionnaire/${questionnaireId}`);
    };
  
    const handleDocumentClick = (questionnaireId) => {
      navigate(`/questionnaire/document/${questionnaireId}`);
    };


    return (
      <div>
        { completedQuestionnaires.length > 0 ? (
          <div className="completed-questionnaires">
      <br />
      <br />      
      <br />
            <h2>Linea de Tiempo</h2>
            <div className="chart-container">
              <Line data={lineChartData.data} options={lineChartData.options} />
            </div>
      
            <h2 className="text-center mb-4">Cuestionarios Realizados</h2>
            <table className="w-full bg-white shadow-md rounded-lg">
              <thead className="bg-gray-200">
                <tr>
                  <th className="p-2 border text-center">#</th>
                  <th className="p-2 border text-center">Fecha</th>
                  <th className="p-2 border text-center">Huella</th>
                  <th className="p-2 border text-center">Activo</th>
                  <th className="p-2 border text-center">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {completedQuestionnaires
                  .sort((a, b) => parseCustomDate(b.fechaHora) - parseCustomDate(a.fechaHora))
                  .map((questionnaire, index) => {
                    const isFirst = index === 0;
                    return (
                      <tr
                        key={index}
                        style={isFirst ? { backgroundColor: 'yellow', fontWeight: 'bold', color: 'black' } : {}}
                      >
                        <td className={`p-2 border text-center ${isFirst ? 'last-row-cell' : ''}`}>
                          {index + 1}
                        </td>
                        <td className={`p-2 border text-center ${isFirst ? 'last-row-cell' : ''}`}>
                          {questionnaire.fechaHora}
                        </td>
                        <td className={`p-2 border text-center ${isFirst ? 'last-row-cell' : ''}`}>
                          {questionnaire.huella}
                        </td>
                        <td className={`p-2 border text-center ${isFirst ? 'last-row-cell' : ''}`}>
                          {isFirst ? 'Sí' : questionnaire.activo ? 'Sí' : 'No'}
                        </td>
                        <td className={`p-2 border text-center ${isFirst ? 'last-row-cell' : ''}`}>
                          <div className="App">
                            <div className="button-container flex justify-center space-x-4">
                              <button className="text-blue-500 hover:text-blue-700" onClick={() => handleQuestionnaireClick(questionnaire.id)}>
                                <FaEye />
                              </button>
                              <button onClick={() => handleDocumentClick(questionnaire.id)}>
                                <FaFileAlt />
                              </button>
                              <button onClick={() => handleShareClick(questionnaire)}>
                                <FaShareAlt />
                              </button>
                            </div>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
          </table>
          <Footer />
      </div>
        ) : (<div> <h1 className=''>No haz realizado cuestionarios...</h1></div>)}
      </div>
        
    );
};

export default Questionnaires;
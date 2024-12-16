/* Importamos cada componente */
import React, { useState, useEffect } from "react";
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';
import Section from "./Section.jsx";
import { auth } from "../firebase";
import Footer from './Footer.jsx';

import { collection, query, where, getDocs } from "firebase/firestore";



import {
  guardarTotales,
  obtenerCuestionariosRealizados,
  actualizarCuestionario,
  guardarRespuestas,
  saveQuestionnaireResponses,
  obtenerRespuestas 
  
} from "../firebaseActions";
import { Bar, Pie, Line } from "react-chartjs-2";
import ChartDataLabels from 'chartjs-plugin-datalabels';

import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale, 
  LinearScale,
  ArcElement,
  LineElement,
  PointElement,
} from "chart.js";
import Badges from "./Badges.jsx";
import QuestionnaireDetails from "./QuestionnaireDetails.jsx";
import { FaEye, FaFileAlt, FaShareAlt } from "react-icons/fa";
import ResponseDisplay from './ResponseDisplay';
import NatureIcons from "./Badges.jsx";
import ShowData from "./ShowData.jsx";
import File from "./File.jsx";
import ShowDocument from './ShowDocument.jsx';

/* Bibliotecas para las graficas */
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement,
  LineElement,
  PointElement,
  ChartDataLabels
);

/* Fecha Actual al momento de usar el cuestionario */
const getCurrentDateTime = () => {
  const today = new Date();
  const day = String(today.getDate()).padStart(2, "0");
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const year = today.getFullYear();
  const hours = String(today.getHours()).padStart(2, "0");
  const minutes = String(today.getMinutes()).padStart(2, "0");
  const seconds = String(today.getSeconds()).padStart(2, "0");

  return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
};

/* Secciones del cuestionario */
const sections = [
  {
    id: "date-time",
    title: "Fecha y Hora",
    questions: [`Fecha y hora actual: ${getCurrentDateTime()}`],
  },
  {
    title: "Transporte",
    questions: [
      "¿Utilizas algún vehículo para movilizarte? (Sí/No)",
      "¿Qué distancia recorriste durante el mes con el vehículo? (Indíquelo en kilómetros)",
      "¿Cuál es el tipo de combustible que utiliza el vehículo? (Gasolina/Diesel)",
      "¿Utilizas alguna motocicleta para movilizarte? (Sí/No)",
      "¿Qué distancia recorriste durante el mes con la motocicleta? (Indíquelo en kilómetros)",
      "¿Cuál es el tipo de combustible que utiliza la motocicleta? (Gasolina/Diesel)",
      "¿Utilizaste algún otro transporte como el Transmetro, Transurbano, Uber, InDrive, etc, para movilizarte? (Sí/No)",
      "¿Qué distancia recorriste con el transporte durante el mes? (Indíquelo en kilómetros)",
    ],
  },
  {
    title: "Viajes aéreos",
    questions: [
      "¿Realizaste algún viaje aéreo durante el mes? (Sí/No)",
      "¿Qué distancia recorriste durante el mes? (Indíquelo en kilómetros)",
      "¿Cuánto pesa tu equipaje de mano en promedio? (Indíquelo en libras)",
      "¿Cuánto pesa tu equipaje facturado en promedio? (Indíquelo en libras)",
      "¿En qué clase viajaste más durante el mes? (Económica/Primera Clase/Clase Ejecutiva)",
      "¿Cuántas escalas hiciste en total al tomar los vuelos durante el mes?(Indique el valor en números)",
    ],
  },
  {
    title: "Energía",
    questions: [
      "¿Utilizas algún dispositivo o equipo que use energía? (Sí/No)",
      "¿Cuántas kWh utilizaste durante el mes (Puedes verlo en una factura)? (Indique el valor en números)",
      "¿Utilizas leña como fuente de energía en tu hogar? (Sí/No)",
      "¿Cuántos m3 de leña consumiste durante el mes? (Indique el valor en números)",
      "¿Utilizas gas para cocinar o calentar tu hogar? (Sí/No)",
      "¿Cuántas libras de gas consumiste durante el mes? (25lb, 30 lb y 100lb)",
    ],
  },
  {
    title: "Alimentación",
    questions: [
      "¿Cuántas libras de carne consumiste durante el mes? (Indique el valor en números)",
      "¿Cuántas veces al mes consumiste alimentos procesados (como comida rápida, snacks, etc.) ? (Indique el valor en números)",
      "¿Cuántas libras de verduras frescas consumiste durante el mes? (Indique el valor en números)",
      "¿Cuántas libras de frutas frescas consumiste durante el mes? (Indique el valor en números)",
      "¿Cuántas libras de granos y cereales (como arroz, pasta, pan) consumiste durante el mes? (Indique el valor en números)",
      "¿Cuántas libras de comida desperdiciaste durante el mes? (Indique el valor en números).",
    ],
  },





  {
    title: "Vestimenta",
    questions: [
      "¿Cuántas veces en el último mes compraste prendas típicas guatemaltecas, como huipiles, cortes o chalecos bordados?", 
      "Este mes, al adquirir ropa típica guatemalteca, ¿qué tipo de materiales preferiste? (Algodon, Lana, Manta, Brocado, Seda o Cuero)", 
      "¿Cuántas veces en el último mes compraste ropa de marcas comerciales (nacionales o internacionales)?", 
      "En el último mes,  ¿Te deshiciste de alguna prenda tanto típica guatemalteca como de marcas comerciales? (Sí/No)", 

    ],
  },
  

  {
    title: "Residuos y Desechos",
    questions: [
      "¿Utilizas algún sistema de reciclaje en tu hogar? (Sí/No)", 
      "¿Cuánta basura sólida generaste durante el mes? (Indíquelo en libras)", 
      "¿Cómo gestionas los desechos líquidos en tu hogar (Sistema séptico, Drenaje público)?", 

    ],
  },

  
];

const Questionnaire = ({ setView }) => {
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [values, setValues] = useState(
    sections.map((section) => section.questions.map(() => ""))
  );
  const [carbonFootprint, setCarbonFootprint] = useState(0);
  const [chartData, setChartData] = useState(null);
  const [showChart, setShowChart] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showCompletedQuestionnaires, setShowCompletedQuestionnaires] =
    useState(false);
  const [completedQuestionnaires, setCompletedQuestionnaires] = useState([]);
  const [lineChartData, setLineChartData] = useState(null);
  const [showTimeline, setShowTimeline] = useState(false);
  const [showBadgeDropdown, setShowBadgeDropdown] = useState(false);
  const [showBadges, setShowBadges] = useState(false);
  const [selectedQuestionnaire, setSelectedQuestionnaire] = useState(null);
  const [showResponses, setShowResponses] = useState(false);
  const [showCompletion, setShowCompletion] = useState(false);
  const { width, height } = useWindowSize();
  const [showConfetti, setShowConfetti] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [selectedQuestionnaireDetails, setSelectedQuestionnaireDetails] = useState(null);
  const [completedQuizzes, setCompletedQuizzes] = useState(3);
  const [showCharts, setShowCharts] = useState(false);
  const [showData, setShowData] = useState(false);
  const [showDocument, setShowDocument] = useState(false);
  const [showDateTime, setShowDateTime] = useState(true);
  const [showRecommendation, setShowRecommendation] = useState(false);
  


  const [responses, setResponses] = useState({
    respuesta1: '',
    respuesta2: '',
    respuesta3: '',
    respuesta4: '',
    respuesta5: '',
    respuesta6: '',
    respuesta7: '',
    respuesta8: '',
    respuesta9: '',
    respuesta10: '',
    respuesta11: '',
    respuesta12: '',
    respuesta13: '',
    respuesta14: '',
    respuesta15: '',
    respuesta16: '',
    respuesta17: '',
    respuesta18: '',
    respuesta19: '',
    respuesta20: '',
    respuesta21: '',
    respuesta22: '',
    respuesta23: '',
    respuesta24: '',
    respuesta25: '',
    respuesta26: '',
    respuesta27: '',
    respuesta28: '',
    respuesta29: '',
    respuesta30: '',
    respuesta31: '',
    respuesta32: '',
    respuesta33: '',

  
  });


  const handleProfileClick = () => {
    window.location.href = '/theprofile'; 
  };
  
  /* Boton de Siguiente */
  const handleNext = () => {
    if (currentSectionIndex < sections.length - 1) {
      setCurrentSectionIndex(currentSectionIndex + 1);
    }
  };

  /* Mostrar datos de FaEye */
  const toggleShowData = () => {
    setShowData(!showData);
  };

  /* Mostrar gráficas de FaFile */
  const toggleShowDocument = () => {
    setShowDocument(!showDocument);
  };
  
  const handleShowDocument = () => {
    setShowDocument(true);
  };

  /* Animación de Confeti y Cuestionario finalizado */
  const handleButtonClick = () => {
    setShowConfetti(true);
    setShowMessage(true);
    handleSaveQuestionnaire(); 


    setTimeout(() => {
        setShowConfetti(false);
        setShowMessage(false);
    }, 5000);
};


const handleCompletedQuestionnairesClick = () => {
  setShowDateTime(false);
};

  /* Mostrar Badges */
const handleBadgesClick = () => {
  setShowDateTime(false);
};



const getLastRowStyle = (index, length) => {
  return index === length - 1 ? { backgroundColor: 'yellow' } : {};
};


const handleShowCharts = (questionnaire) => {
  setSelectedQuestionnaire(questionnaire);
  setShowCharts(true);
};

/* Desplegar página de compartir */
const handleShareClick = (huellaValue) => {
  localStorage.setItem('huellaSeleccionada', huellaValue);
  const newWindow = window.open(
    "./src/Share.html",  
    "_blank",
    "noopener,noreferrer"
  );
  if (newWindow) newWindow.opener = null;
};

  /* Mostrar datos de FaEye */
  const handleNewEvaluation = () => {
    const dateTimeSectionIndex = sections.findIndex(
      (section) => section.id === "date-time"
    );
    if (dateTimeSectionIndex !== -1) {
      setCurrentSectionIndex(dateTimeSectionIndex);
    }
  };

  
  const handleViewResponses = async () => {
    const email = auth.currentUser?.email;
    if (email) {
      try {
        const savedResponses = await obtenerRespuestas(email); 
        setResponses(savedResponses); 
        setShowResponses(true); 
      } catch (error) {
        console.error("Error al obtener respuestas:", error);
        alert("Ocurrió un error al intentar obtener las respuestas.");
      }
    } else {
      alert("Por favor, inicia sesión para ver tus respuestas.");
    }
  };
  

  const toggleResponses = () => {
    setShowResponses(!showResponses);
  };
  

  useEffect(() => {
    const fetchCompletedQuestionnaires = async () => {
      const email = auth.currentUser?.email;
      if (email) {
        const questionnaires = await obtenerCuestionariosRealizados(email);
        setCompletedQuestionnaires(questionnaires);
      }
    };

    fetchCompletedQuestionnaires();
  }, []);


    /* Boton de anterior */
  const handlePrevious = () => {
    if (currentSectionIndex > 0) {
      setCurrentSectionIndex(currentSectionIndex - 1);
    }
  };

  const handleChange = (e) => {
    setResponses({
      ...responses,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Respuestas antes de guardar:", responses);
    await saveQuestionnaireResponses(responses);
  };

  const handleViewDetails = (questionnaire) => {
    setSelectedQuestionnaireDetails(questionnaire);
  };
  

  const handleCloseDetails = () => {
    setSelectedQuestionnaire(null);
  };

  useEffect(() => {
    calculateCarbonFootprint();
    if (currentSectionIndex === sections.length - 1) {
      generateChartData();
    }
  }, [values, currentSectionIndex]);

  const calculateCarbonFootprint = () => {
    let totalCarbonFootprint = 0;

    // Sección: Transporte
    const vehicleDistance = parseFloat(values[1][1]);
    const vehicleFuel = values[1][2];
    const motoDistance = parseFloat(values[1][4]);
    const motoFuel = values[1][5];
    const publicTransportDistance = parseFloat(values[1][6]);

    // Huella de carbono del vehículo
    if (!isNaN(vehicleDistance) && (vehicleFuel === "Gasolina" || vehicleFuel === "Diesel")) {
        const vehicleEmissionFactor = vehicleFuel === "Gasolina" ? 0.0023 : 0.0027;
        totalCarbonFootprint += vehicleDistance * vehicleEmissionFactor;
    }

    // Huella de carbono de la motocicleta
    if (!isNaN(motoDistance) && (motoFuel === "Gasolina" || motoFuel === "Diesel")) {
        const motoEmissionFactor = motoFuel === "Gasolina" ? 0.0023 : 0.0027;
        totalCarbonFootprint += motoDistance * motoEmissionFactor;
    }

    // Huella de carbono del transporte público
    if (!isNaN(publicTransportDistance)) {
        totalCarbonFootprint += publicTransportDistance * 0.0001;
    }

    // Sección: Viajes Aéreos
    const airTravelDistance = parseFloat(values[2][1]);
    const travelClass = values[2][2];
    const handLuggageWeight = parseFloat(values[2][3]);
    const checkedLuggageWeight = parseFloat(values[2][4]);
    const totalStops = parseFloat(values[2][5]);

    // Huella de carbono de los viajes aéreos
    if (!isNaN(airTravelDistance)) {
        let airEmissionFactor = 0;
        switch (travelClass) {
            case "Económica":
                airEmissionFactor = 0.15;
                break;
            case "Clase Ejecutiva":
                airEmissionFactor = 0.3;
                break;
            case "Primera Clase":
                airEmissionFactor = 0.4;
                break;
            default:
                airEmissionFactor = 0.15;
        }
        totalCarbonFootprint += airTravelDistance * airEmissionFactor;
    }

    // Huella de carbono del equipaje
    if (!isNaN(handLuggageWeight)) {
        totalCarbonFootprint += handLuggageWeight * 0.01;
    }
    if (!isNaN(checkedLuggageWeight)) {
        totalCarbonFootprint += checkedLuggageWeight * 0.01;
    }

    // Sección: Energía
    const energyUsageKWh = parseFloat(values[3][1]);
    const woodUsageKg = parseFloat(values[3][2]);
    const gasUsageLbs = parseFloat(values[3][3]);

    // Huella de carbono por consumo de energía
    if (!isNaN(energyUsageKWh)) {
        totalCarbonFootprint += energyUsageKWh * 0.2;
    }

    if (!isNaN(woodUsageKg)) {
        totalCarbonFootprint += woodUsageKg * 0.015;
    }

    if (!isNaN(gasUsageLbs)) {
        totalCarbonFootprint += gasUsageLbs * 0.5;
    }

    // Sección: Alimentación
    const meatLbs = parseFloat(values[4][1]);
    const processedFoodLbs = parseFloat(values[4][2]);
    const veggiesLbs = parseFloat(values[4][3]);
    const fruitsLbs = parseFloat(values[4][4]);
    const grainsLbs = parseFloat(values[4][5]);
    const wastedFoodLbs = parseFloat(values[4][6]);

    // Huella de carbono por consumo de alimentos
    if (!isNaN(meatLbs)) {
        totalCarbonFootprint += meatLbs * 0.027;
    }

    if (!isNaN(processedFoodLbs)) {
        totalCarbonFootprint += processedFoodLbs * 0.015;
    }

    if (!isNaN(veggiesLbs)) {
        totalCarbonFootprint += veggiesLbs * 0.005;
    }

    if (!isNaN(fruitsLbs)) {
        totalCarbonFootprint += fruitsLbs * 0.005;
    }

    if (!isNaN(grainsLbs)) {
        totalCarbonFootprint += grainsLbs * 0.005;
    }

    if (!isNaN(wastedFoodLbs)) {
        totalCarbonFootprint += wastedFoodLbs * 0.01;
    }

    // Sección: Vestimenta
    const clothingMaterial = values[5][1];
    const clothingWeightKg = parseFloat(values[5][2]);

    // Huella de carbono por uso de vestimenta
    if (!isNaN(clothingWeightKg)) {
        let clothingEmissionFactor = 0;
        switch (clothingMaterial) {
          case "Ninguna":
            clothingEmissionFactor = 0.0;
            break;
            case "Algodón":
                clothingEmissionFactor = 0.4;
                break;
            case "Sintético":
                clothingEmissionFactor = 2.1;
                break;
            case "Lana":
                clothingEmissionFactor = 0.5;
                break;
            case "Manta":
                clothingEmissionFactor = 0.4;
                break;
            case "Brocado":
                clothingEmissionFactor = 0.6;
                break;
            case "Seda":
                clothingEmissionFactor = 0.7;
                break;
            case "Cuero":
                clothingEmissionFactor = 1.5;
                break;
            default:
                clothingEmissionFactor = 0.4;
        }
        totalCarbonFootprint += clothingWeightKg * clothingEmissionFactor;
    }

    // Sección: Residuos y Desechos
    const wasteWeightKg = parseFloat(values[6][1]);
    const wasteType = values[6][2];

    // Huella de carbono por generación de residuos
    if (!isNaN(wasteWeightKg)) {
        let wasteEmissionFactor = 0;
        switch (wasteType) {
            case "Orgánico":
                wasteEmissionFactor = 0.01;
                break;
            case "Plástico":
                wasteEmissionFactor = 2.0;
                break;
            case "Papel":
                wasteEmissionFactor = 1.5;
                break;
            case "Vidrio":
                wasteEmissionFactor = 0.5;
                break;
            case "Metal":
                wasteEmissionFactor = 1.0;
                break;
            default:
                wasteEmissionFactor = 0.01;
        }
        totalCarbonFootprint += wasteWeightKg * wasteEmissionFactor;
    }

    // Actualizar el estado de huella de carbono
    setCarbonFootprint(totalCarbonFootprint);
};



  /* Mostrar Badges */

const handleBadgeClick = () => {
  setShowBadges(!showBadges);
};

  /* Gráficas de barras y circular */
const generateChartData = () => {
  const energyUsage = {
    Transporte:
      parseFloat(values[1][1]) *
      (values[1][2] === "Gasolina" ? 0.0023 : 0.0027),
    "Viajes Aéreos": parseFloat(values[2][1]) * 0.12,
    Energía: parseFloat(values[3][1]) * 0.2,
    Alimentos: parseFloat(values[4][1]) * 0.4,
    Vestimenta: parseFloat(values[5][1]) * 0.3,
    "Residuos y Desechos": parseFloat(values[6][1]) * 0.05, 
  };

  const total = Object.values(energyUsage).reduce((acc, value) => acc + value, 0);

  const data = {
    labels: Object.keys(energyUsage),
    datasets: [
      {
        label: "Emisiones de CO₂ (kg)",
        data: Object.values(energyUsage),
        backgroundColor: [
          "rgba(255, 99, 132, 0.8)",
          "rgba(54, 162, 235, 0.8)",
          "rgba(255, 206, 86, 0.8)",
          "rgba(75, 192, 192, 0.8)",
          "rgba(153, 102, 255, 0.8)",
          "rgba(255, 159, 64, 0.8)", 
        ],
        borderColor: ["#000000", "#000000", "#000000", "#000000", "#000000", "#000000"],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        labels: {
          color: "#000000",
        },
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => {
            const percentage = ((tooltipItem.raw / total) * 100).toFixed(2);
            return `${tooltipItem.label}: ${tooltipItem.raw} kg (${percentage}%)`;
          },
        },
        bodyColor: "#000000",
      },
    },
    datalabels: {
      color: '#000000',
      formatter: (value, context) => {
        const total = context.chart._metasets[0].total;
        const percentage = ((value / total) * 100).toFixed(2);
        return `${percentage}%`;
      },
    },
    elements: {
      arc: {
        borderColor: "#000000",
        borderWidth: 2,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Fecha",
          color: "#000000",
          font: {
            size: 16,
            weight: "bold",
          },
        },
        ticks: {
          color: "#000000",
        },
        grid: {
          borderColor: "#000000",
          borderWidth: 2,
        },
      },
      y: {
        title: {
          display: true,
          text: "Huella",
          color: "#000000",
          font: {
            size: 16,
            weight: "bold",
          },
        },
        ticks: {
          color: "#000000",
        },
        grid: {
          borderColor: "#000000",
          borderWidth: 2,
        },
      },
    },
  };

  setChartData({ ...data, options });
};


  const generateLineChartData = (questionnaires) => {
    const sortedQuestionnaires = questionnaires.sort(
      (a, b) => parseCustomDate(a.fechaHora) - parseCustomDate(b.fechaHora)
    );
  
    const dates = sortedQuestionnaires.map((q) => q.fechaHora.split(" ")[0]);
    const footprints = sortedQuestionnaires.map((q) => parseFloat(q.huella));
  
    const data = {
      labels: dates,
      datasets: [
        {
          label: "Huella de Carbono (kg CO2)",
          data: footprints,
          fill: false,
          borderColor: "rgba(75, 192, 192, 1)",
          tension: 0.1,
          pointBackgroundColor: "rgba(75, 192, 192, 1)",
          pointBorderColor: "#000000",
          pointBorderWidth: 1,
          pointRadius: 5,
        },
      ],
    };
  
    const options = {
      plugins: {
        legend: {
          labels: {
            color: "#000000",
          },
        },
      },
      scales: {
        x: {
          title: {
            display: true,
            text: "Fecha",
            color: "#000000",
            font: {
              size: 16,
              weight: "bold",
            },
          },
          ticks: {
            color: "#000000",
          },
          grid: {
            borderColor: "#000000",
            borderWidth: 2,
          },
        },
        y: {
          title: {
            display: true,
            text: "Huella",
            color: "#000000",
            font: {
              size: 16,
              weight: "bold",
            },
          },
          ticks: {
            color: "#000000",
          },
          grid: {
            borderColor: "#000000",
            borderWidth: 2,
          },
        },
      },
    };
  
    setLineChartData({ data, options });
  };
  
  

  const obtenerHuellaPorFechaHora = async (fechaHora) => {
    const email = auth.currentUser?.email;
    if (email && fechaHora) {
      const q = query(
        collection(db, "questionnaires"),
        where("email", "==", email),
        where("dateTime", "==", fechaHora)
      );
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const data = querySnapshot.docs[0].data();
        return data.carbonFootprint; 
      }
    }
    return null;
  };
  
    /* Botones Anterior y Siguiente */

  const handleNextSection = () => {
    if (currentSectionIndex === sections.length - 1) {
      generateChartData();
    }

    if (currentSectionIndex < sections.length - 1) {
      setCurrentSectionIndex(currentSectionIndex + 1);
    }
  };

  const handlePreviousSection = () => {
    if (currentSectionIndex > 0) {
      setCurrentSectionIndex(currentSectionIndex - 1);
    }
  };

    /* Guardamos datos como email, fechaHora, huella y las 33 respuestas */
  const handleSaveQuestionnaire = async () => {
    const email = auth.currentUser?.email;
    const fechaHora = getCurrentDateTime();
    const huella = carbonFootprint.toFixed(2);
    const respuestas = values.flat();

    const totalData = {
      email,
      fechaHora,
      huella,
    };

    await guardarTotales(totalData);

    const respuestaData = {
      email,
      fechaHora,
      huella,
      respuesta1: respuestas[1],
      respuesta2: respuestas[2],
      respuesta3: respuestas[3],
      respuesta4: respuestas[4],
      respuesta5: respuestas[5],
      respuesta6: respuestas[6],
      respuesta7: respuestas[7],
      respuesta8: respuestas[8],
      respuesta9: respuestas[9],
      respuesta10: respuestas[10],
      respuesta11: respuestas[11],
      respuesta12: respuestas[12],
      respuesta13: respuestas[13],
      respuesta14: respuestas[14],
      respuesta15: respuestas[15],
      respuesta16: respuestas[16],
      respuesta17: respuestas[17],
      respuesta18: respuestas[18],
      respuesta19: respuestas[19],
      respuesta20: respuestas[20],
      respuesta21: respuestas[21],
      respuesta22: respuestas[22],
      respuesta23: respuestas[23],
      respuesta24: respuestas[24],
      respuesta25: respuestas[25],
      respuesta26: respuestas[26],
      respuesta27: respuestas[27],
      respuesta28: respuestas[28],
      respuesta29: respuestas[29],
      respuesta30: respuestas[30],
      respuesta31: respuestas[31],
      respuesta32: respuestas[32],
      respuesta33: respuestas[33],

    };

    await guardarRespuestas(respuestaData);

    alert("Cuestionario guardado. Final del cuestionario.");
    setView("home");
    setShowCompletion(true);
  };

  const handleRecommendationClick = () => {
    setShowRecommendation(true);
  };

  const handleCompletion = () => {
    setShowCompletion(false);
    setView("home");
  };

  const handleValueChange = (sectionIndex, questionIndex, newValue) => {
    const updatedValues = [...values];
    updatedValues[sectionIndex][questionIndex] = newValue;
    setValues(updatedValues);

    if (
      sectionIndex === 1 &&
      questionIndex === 2 &&
      newValue.toLowerCase() === "no"
    ) {
      handleNextSection();
    }

    if (
      sectionIndex === 4 &&
      questionIndex === 0 &&
      newValue.toLowerCase() === "no"
    ) {
      handleNextSection();
    }
  };

  const toggleChart = () => {
    setShowChart((prevShowChart) => !prevShowChart);
  };

  const handleMouseEnter = () => {
    setShowDropdown(true);
  };

  const handleMouseLeave = () => {
    setShowDropdown(false);
  };

  useEffect(() => {
    const exampleId = "some-document-id";
    fetchQuestionnaire(exampleId).then((data) => {
      console.log("Fetched questionnaire:", data);
    });
  }, []);

  useEffect(() => {
    if (showCompletedQuestionnaires) {
      fetchCompletedQuestionnaires();
    }
  }, [showCompletedQuestionnaires]);

  const fetchCompletedQuestionnaires = async () => {
    try {
      const email = auth.currentUser?.email;
      let questionnaires = await obtenerCuestionariosRealizados(email);
      console.log("COMPLETE QUESTIONNAIRES: ", questionnaires);
      questionnaires = questionnaires.sort(
        (a, b) => new Date(a.fechaHora) - new Date(b.fechaHora)
      );
      setCompletedQuestionnaires(questionnaires);
      return questionnaires;
    } catch (error) {
      console.error("Error al obtener cuestionarios:", error);
      return [];
    }
  };


  const scrollToSection = () => {
    const section = document.getElementById('date-time');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleNewEvaluationClick = () => {
    document.getElementById('date-time').scrollIntoView({ behavior: 'smooth' });
  };



  useEffect(() => {
    if (showTimeline) {
      const fetchAndGenerateLineData = async () => {
        const email = auth.currentUser?.email;
        const questionnaires = await obtenerCuestionariosRealizados(email);
        generateLineChartData(questionnaires);
      };
  
      fetchAndGenerateLineData();
    }
  }, [showTimeline]);
  

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        window.location.href = "/login";
      }
    });

    return () => unsubscribe();
  }, []);

  const handleDropdownClick = async (item) => {
    if (item === "Realizados") {
      setShowCompletedQuestionnaires((prevState) => !prevState);
      if (!showCompletedQuestionnaires) {
        const email = auth.currentUser?.email;
        const questionnaires = await obtenerCuestionariosRealizados(email);

        setCompletedQuestionnaires(questionnaires);
        generateLineChartData(questionnaires);
      }
    } else if (item === "Linea de Tiempo") {
      setShowTimeline((prevState) => !prevState);
      if (!showTimeline) {
        const email = auth.currentUser?.email;
        const questionnaires = await obtenerCuestionariosRealizados(email);
        generateLineChartData(questionnaires);
      }
    } else {
      alert(`${item} seleccionado`);
    }
  };

  const handleLogout = async () => {
    try {
      await auth.signOut();
      window.location.href = "/login";
    } catch (error) {
      console.error("Error al cerrar sesión: ", error);
    }
  };

  const handleMouseEnterBadges = () => {
    setShowBadgeDropdown(true);
  };

  const handleMouseLeaveBadges = () => {
    setShowBadgeDropdown(false);
  };

  useEffect(() => {
    if (completedQuestionnaires.length > 0) {
      activarCuestionarioMasReciente();
    }
  }, [completedQuestionnaires]);

  useEffect(() => {
    activarCuestionarioMasReciente();
  }, [completedQuestionnaires]);

  useEffect(() => {
    if (currentSectionIndex === sections.length - 1) {
      generateChartData();
    }
  }, [currentSectionIndex, values]);

  useEffect(() => {
    if (showTimeline) {
      fetchCompletedQuestionnaires().then((questionnaires) => {
        generateLineChartData(questionnaires);
      });
    }
  }, [showTimeline]);

  const activarCuestionarioMasReciente = async () => {
    try {
      if (completedQuestionnaires.length === 0) return;

      const mostRecentQuestionnaire = completedQuestionnaires.reduce(
        (latest, current) => {
          const latestDateTime = new Date(`${latest.fecha}T${latest.hora}`);
          const currentDateTime = new Date(`${current.fecha}T${current.hora}`);
          return latestDateTime > currentDateTime ? latest : current;
        }
      );

      await Promise.all(
        completedQuestionnaires.map(async (questionnaire) => {
          const isActive = questionnaire.id === mostRecentQuestionnaire.id;
          await actualizarCuestionario(questionnaire.id, {
            Activo: isActive ? "Sí" : "No",
          });
        })
      );

      console.log(
        "El cuestionario más reciente ha sido activado y los demás desactivados."
      );
    } catch (error) {
      console.error("Error al activar el cuestionario más reciente:", error);
    }
  };

  const fetchQuestionnaire = async (id) => {
    try {
      const doc = await firebase
        .firestore()
        .collection("respuestas")
        .doc(id)
        .get();

      if (doc.exists) {
        console.log("Document data:", doc.data());
        return doc.data();
      } else {
        console.log("No such document!");
        return null;
      }
    } catch (error) {
      console.error("Error getting document:", error);
      return null;
    }
  };

  function parseCustomDate(dateString) {
    const [datePart, timePart] = dateString.split(' ');
    const [day, month, year] = datePart.split('/');
    const [hours, minutes, seconds] = timePart.split(':');

    return new Date(year, month - 1, day, hours, minutes, seconds);
  }

  const goToProfile = () => {
    navigate("/perfil");
  };

  const convertToISODate = (fecha) => {
    const [day, month, year] = fecha.split(" ")[0].split("/");
    const [hour, minute, second] = fecha.split(" ")[1].split(":");
    return new Date(
      `${year}-${month}-${day}T${hour}:${minute}:${second}`
    ).toISOString();
  };




  return (
    <div>
      <header className="header">
        <div className="header-left">
        <ul className="header-nav">
          <li style={{ color: '#ffffff' }}>EcoHuella            
          <br />
          <br />
          Bienvenido: {auth.currentUser?.email}</li>
          </ul>
        </div>

        

        
        <div className="header-right">
          <ul className="header-nav">
          <li>
                <button onClick={handleNewEvaluation}>
                  Nueva Evaluación
                </button>

              </li>
            <li
              className="dropdown"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <li>
                <button onClick={() => handleDropdownClick("Realizados")}>
                  Cuestionarios Realizados
                </button>
              </li>
            </li>
            <li
              className="dropdown"
              onMouseEnter={handleMouseEnterBadges}
              onMouseLeave={handleMouseLeaveBadges}
            >
              <button onClick={handleBadgeClick}>Insignias</button>
            </li>
            <li>
              <button onClick={handleRecommendationClick} >Recomendación</button>
            </li>

            <li>
              <button onClick={handleLogout}>Cerrar Sesión</button>
            </li>
          </ul>
        </div>
      </header>



      <p className="carbon-footprint">
  <span className="highlighted-text">{carbonFootprint.toFixed(2)} Kg de CO₂</span> <br />
  Huella de carbono estimada:
</p>

      <div className="navigation-buttons">
        <button onClick={handlePrevious} disabled={currentSectionIndex === 0}>
          Anterior
        </button>
        { }
        {currentSectionIndex < sections.length - 1 && (
          <button onClick={handleNext}>Siguiente</button>
        )}
      </div>
      <div className="container long-container">
        {currentSectionIndex < sections.length ? (
          <>
            <br />
            <br />
            <br />
            <Section
              section={sections[currentSectionIndex]}
              values={values[currentSectionIndex]}
              setValues={(newValues) => {
                const updatedValues = [...values];
                updatedValues[currentSectionIndex] = newValues;
                setValues(updatedValues);
              }}
              handleValueChange={(questionIndex, newValue) =>
                handleValueChange(currentSectionIndex, questionIndex, newValue)
              }
              handleNextSection={handleNextSection}
            />

{currentSectionIndex === sections.length - 1 && (
  <>
    <button className="green-button"onClick ={toggleChart}>Mostrar/Ocultar Gráfico</button>
    {showChart && chartData && (
      <>
        <div className="bar-chart-container">
          <div className="bar-chart">
            <Bar data={chartData} />
          </div>
        </div>
        <div className="small-chart-container">
          <Pie data={chartData} options={chartData.options}/>
        </div>
      </>
    )}
        <div className="celebration-container">
            {showConfetti && (
                <Confetti
                    width={width}
                    height={height}
                    numberOfPieces={1500} 
                    gravity={0.5} 
                    wind={0} 
                    recycle={false}
                    colors={['#ff6347', '#ffa07a', '#ffd700', '#90ee90', '#87ceeb']} 
                />
            )}
            {showMessage && <h1 className="celebration-message">¡Has terminado el Cuestionario!</h1>}
            <button className="green-button"onClick={handleButtonClick}>Guardar Cuestionario</button>
        </div>
    {showCompletion && <ConfettiCompletion onComplete={handleCompletion} />}
  </>
)}

          </>
        ) : (
          <div className="results-section">
            <h2>Resultados del Cuestionario</h2>
            <p className="carbon-footprint">
              Huella de carbono total: {carbonFootprint.toFixed(2)} kg de CO₂
            </p>
            <button onClick={handleSaveQuestionnaire}>
              Guardar Cuestionario
            </button>
            {showTimeline  && lineChartData && (
              <div className="chart-container">
                <Line data={lineChartData} />
              </div>
            )}
          </div>
        )}


<div style={{
  textAlign: 'center',
  marginTop: '40px'
}}>


  <div style={{
    margin: '0 auto',
    width: 'fit-content',
    textAlign: 'left',
    backgroundColor: 'white', /* Fondo blanco para la tarjeta */
    padding: '20px',          /* Espaciado interno */
    borderRadius: '8px',      /* Bordes redondeados */
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', /* Sombra para efecto de tarjeta */
  }}>
      <h1 style={{ fontSize: '2.5em', marginBottom: '20px', color: 'black' }}>Huella recomendada por mes por persona</h1>
    <p style={{ color: 'black' }}><strong>Buena:</strong> Menos de 500 Kg CO₂.</p>
    <p style={{ color: 'black' }}><strong>Media:</strong> Entre 500 y 1,300 Kg CO₂.</p>
    <p style={{ color: 'black' }}><strong>Alta:</strong> Más de 1,300 Kg CO₂.</p>
  </div>
</div>


        { }
        {showCompletedQuestionnaires && (
          <div className="completed-questionnaires">
            { }
            <br />
            <br />
            <br />
            
            <h2>Linea de Tiempo</h2>
            {showCompletedQuestionnaires && lineChartData && (
              <div className="chart-container">
                <Line data={lineChartData.data} options={lineChartData.options} />
              </div>
            )}

            <br />
            <br />
            <br />

            { }
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
      .sort((a, b) => parseCustomDate(a.fechaHora) - parseCustomDate(b.fechaHora))
      .map((questionnaire, index) => {
        const isLast = index === completedQuestionnaires.length - 1;
        console.log("Is last:", isLast);
        
        return (
<tr
  key={index}
  style={isLast ? { backgroundColor: 'yellow', fontWeight: 'bold', color: 'black' } : {}}
>
  <td className={`p-2 border text-center ${isLast ? "last-row-cell" : ""}`}>{index + 1}</td>
  <td className={`p-2 border text-center ${isLast ? "last-row-cell" : ""}`}>{questionnaire.fechaHora}</td>
  <td className={`p-2 border text-center ${isLast ? "last-row-cell" : ""}`}>{questionnaire.huella}</td>
  <td className={`p-2 border text-center ${isLast ? "last-row-cell" : ""}`}>
    {isLast ? "Sí" : questionnaire.activo ? "Sí" : "No"}
  </td>
  <td className={`p-2 border text-center ${isLast ? "last-row-cell" : ""}`}>
  <div className="App">
      <div className="button-container flex justify-center space-x-4">
        <button className="text-blue-500 hover:text-blue-700" onClick={toggleShowData}>
          <FaEye />
        </button>
        <button onClick={toggleShowDocument}>
          <FaFileAlt />
        </button>
        <button onClick={handleShareClick}>
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

{showData && (
        <div>
          <ShowData />
        </div>
      )}


{showDocument && (
        <div>
          <ShowDocument />
        </div>
      )}
     
  


      {}
      {showResponses && (
    <div>
    <h2>Respuestas del Cuestionario</h2>
    <ul>
      {Object.entries(responses).map(([key, value]) => (
        <li key={key}>
          <strong>{key}:</strong> {value}
        </li>
      ))}
    </ul>
  </div>
      )}



            {selectedQuestionnaire && (
              <QuestionnaireDetails
                questionnaire={selectedQuestionnaire}
                onClose={handleCloseDetails}
              />
            )}


            
{}
{showRecommendation && (
  <div style={{
    marginTop: '20px',
    padding: '20px',
    border: '1px solid #4CAF50',
    borderRadius: '8px',
    backgroundColor: '#e8f5e9',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    maxWidth: '600px',
    marginLeft: 'auto',
    marginRight: 'auto',
    fontFamily: 'Arial, sans-serif'
  }}>
    <h2 style={{
      color: '#2e7d32',
      textAlign: 'center'
    }}>Recomendaciones</h2>
    
    <p style={{
      color: '#555',
      textAlign: 'center'
    }}>Para reducir tu huella de carbono, considera las siguientes acciones:</p>
                <br />
                <br />
    <ul style={{
      listStyleType: 'disc',
      paddingLeft: '20px'
    }}>
      <li style={{ marginBottom: '10px' }}>Utiliza transporte público o bicicleta.</li>
      <li style={{ marginBottom: '10px' }}>Apaga los aparatos electrónicos cuando no los uses.</li>
      <li style={{ marginBottom: '10px' }}>Reduce viajes en avión o compensa tu huella.</li>
      <li style={{ marginBottom: '10px' }}>Optimiza el uso del agua y reduce desechos.</li>
      <li style={{ marginBottom: '10px' }}>Usa fuentes de energía renovable si es posible.</li>
      <li style={{ marginBottom: '10px' }}>Compra alimentos locales y de temporada para reducir la huella de carbono.</li>
      <li style={{ marginBottom: '10px' }}>Reduce el consumo de carne y opta por dietas basadas en plantas.</li>
      <li style={{ marginBottom: '10px' }}>Elige ropa de segunda mano o de marcas sostenibles.</li>
      <li style={{ marginBottom: '10px' }}>Lava la ropa con agua fría y seca al aire para ahorrar energía.</li>
      <li style={{ marginBottom: '10px' }}>Evita productos de un solo uso y opta por envases reutilizables.</li>
    </ul>
  </div>
)}


            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
          </div>
        )}

        <div className="badges-section">
          <br />
  

          { }
          {showBadges && (
    <div>
    <h1>Mis Insignias</h1>
    <NatureIcons completedQuizzes={completedQuizzes} />
  </div>
          )}
        </div>


        
      </div>
      <Footer />
    </div>
  );
};

export default Questionnaire;
/* Importamos cada componente */
import React, { useState, useEffect  } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login.jsx';
import Register from './components/Register.jsx';
import Questionnaire from './components/Questionnaire.jsx';
import Map from './components/Map.jsx';
import './index.css';
import UserProfile from './components/UserProfile';
import { auth } from './firebase';
import  { app } from './firebase.js';
import Footer from './components/Footer'; 
import { db } from './firebase';
import { collection, getDocs, query, orderBy, where } from 'firebase/firestore';
import { doc, setDoc } from 'firebase/firestore';
import Informacion from './components/Informacion.jsx';
import HuellaDeCarbono from './components/HuellaDeCarbono.jsx';
import { obtenerUsuarios } from './userManagement';
import { obtenerCuestionarios } from './totalManagement';
import { obtenerHuellaTotal } from './huellatotalManagement';
import { getMaxHuellaByDepartment } from './departmentManagement'; 
import getActiveUsersCount from './activeManagement.js';
import guatemalaMap from './assets/502.svg';
import FAQ from './components/FAQ.jsx';
import ActivoTotalSuma from './ActivoTotalSuma';
import ActivoTotalSumaFiltro from './ActivoTotalSumaFiltro';


/* Colocamos los distintos departamentos, municipios y zonas */
const departments = [
  'Alta Verapaz',
  'Baja Verapaz',
  'Chimaltenango',
  'Chiquimula',
  'El Progreso',
  'Escuintla',
  'Guatemala',
  'Huehuetenango',
  'Izabal',
  'Jalapa',
  'Jutiapa',
  'Petén',
  'Quetzaltenango',
  'Quiché',
  'Retalhuleu',
  'Sacatepéquez',
  'San Marcos',
  'Santa Rosa',
  'Sololá',
  'Suchitepéquez',
  'Totonicapán',
  'Zacapa'
];

const municipalities = {
 
  'Alta Verapaz': [
    'Cobán',
    'Santa Cruz Verapaz',
    'San Cristóbal Verapaz',
    'Tactic',
    'Tamahú',
    'San Miguel Tucurú',
    'Panzós',
    'Senahú',
    'San Pedro Carchá',
    'San Juan Chamelco',
    'San Agustín Lanquín',
    'Santa María Cahabón',
    'Chisec',
    'Chahal',
    'Fray Bartolomé de las Casas',
    'Santa Catalina La Tinta',
    'Raxruhá'
  ],
  'Baja Verapaz': [
    'Salamá',
    'San Miguel Chicaj',
    'Rabinal',
    'Cubulco',
    'Granados',
    'Santa Cruz el Chol',
    'San Jerónimo',
    'Purulhá'
  ],
  'Chimaltenango': [
    'Chimaltenango',
    'San José Poaquil',
    'San Martín Jilotepeque',
    'San Juan Comalapa',
    'Santa Apolonia',
    'Tecpán',
    'Patzún',
    'San Miguel Pochuta',
    'Patzicía',
    'Santa Cruz Balanyá',
    'Acatenango',
    'San Pedro Yepocapa',
    'San Andrés Itzapa',
    'Parramos',
    'Zaragoza',
    'El Tejar'
  ],
  'Chiquimula': [
    'Chiquimula',
    'Jocotán',
    'Esquipulas',
    'Camotán',
    'Quezaltepeque',
    'Olopa',
    'Ipala',
    'San Juan Ermita',
    'Concepción Las Minas',
    'San Jacinto',
    'San José la Arada'
  ],
  'Petén': [
    'Flores',
    'San José',
    'San Benito',
    'San Andrés',
    'La Libertad',
    'San Francisco',
    'Santa Ana',
    'Dolores',
    'San Luis',
    'Sayaxché',
    'Melchor de Mencos',
    'Poptún'
  ],
  'El Progreso': [
    'El Jícaro',
    'Morazán',
    'San Agustín Acasaguastlán',
    'San Antonio La Paz',
    'San Cristóbal Acasaguastlán',
    'Sanarate',
    'Guastatoya',
    'Sansare'
  ],
  'Quiché': [
    'Santa Cruz del Quiché',
    'Chiché',
    'Chinique',
    'Zacualpa',
    'Chajul',
    'Santo Tomás Chichicastenango',
    'Patzité',
    'San Antonio Ilotenango',
    'San Pedro Jocopilas',
    'Cunén',
    'San Juan Cotzal',  
    'Santa María Joyabaj',
    'Santa María Nebaj',
    'San Andrés Sajcabajá',
    'Uspantán',
    'Sacapulas',
    'San Bartolomé Jocotenango',
    'Canillá',
    'Chicamán',
    'Ixcán',
    'Pachalum'
  ],
  'Escuintla': [
    'Escuintla',
    'Santa Lucía Cotzumalguapa',
    'La Democracia',
    'Siquinalá',
    'Masagua',
    'Tiquisate',
    'La Gomera',
    'Guanagazapa',
    'San José',
    'Iztapa',
    'Palín',
    'San Vicente Pacaya',
    'Nueva Concepción'
  ],
  'Guatemala': [
    'Santa Catarina Pinula',
    'San José Pinula',
    'Guatemala',
    'San José del Golfo',
    'Palencia',
    'Chinautla',
    'San Pedro Ayampuc',
    'Mixco',
    'San Pedro Sacatepéquez',
    'San Juan Sacatepéquez',
    'Chuarrancho',
    'San Raymundo',
    'Fraijanes',
    'Amatitlán',
    'Villa Nueva',
    'Villa Canales',
    'San Miguel Petapa'
  ],
  'Huehuetenango': [
    'Huehuetenango',
    'Chiantla',
    'Malacatancito',
    'Cuilco',
    'Nentón',
    'San Pedro Necta',
    'Jacaltenango',
    'Soloma',
    'Ixtahuacán',
    'Santa Bárbara',
    'La Libertad',
    'La Democracia',
    'San Miguel Acatán',
    'San Rafael La Independencia',
    'Todos Santos Cuchumatán',
    'San Juan Atitán',
    'Santa Eulalia',
    'San Mateo Ixtatán',
    'Colotenango',
    'San Sebastián Huehuetenango',
    'Tectitán',
    'Concepción Huista',
    'San Juan Ixcoy',
    'San Antonio Huista',
    'Santa Cruz Barillas',
    'San Sebastián Coatán',
    'Aguacatán',
    'San Rafael Petzal',
    'San Gaspar Ixchil',
    'Santiago Chimaltenango',
    'Santa Ana Huista'
  ],
  'Izabal': [
    'Morales',
    'Los Amates',
    'Livingston',
    'El Estor',
    'Puerto Barrios'
  ],
  'Jalapa': [
    'Jalapa',
    'San Pedro Pinula',
    'San Luis Jilotepeque',
    'San Manuel Chaparrón',
    'San Carlos Alzatate',
    'Monjas',
    'Mataquescuintla'
  ],
  'Jutiapa': [
    'Jutiapa',
    'El Progreso',
    'Santa Catarina Mita',
    'Agua Blanca',
    'Asunción Mita',
    'Yupiltepeque',
    'Atescatempa',
    'Jerez',
    'El Adelanto',
    'Zapotitlán',
    'Comapa',
    'Jalpatagua',
    'Conguaco',
    'Moyuta',
    'Pasaco',
    'Quesada'
  ],
  'Quetzaltenango': [
    'Quetzaltenango',
    'Salcajá',
    'San Juan Olintepeque',
    'San Carlos Sija',
    'Sibilia',
    'Cabricán',
    'Cajolá',
    'San Miguel Sigüilá',
    'San Juan Ostuncalco',
    'San Mateo',
    'Concepción Chiquirichapa',
    'San Martín Sacatepéquez',
    'Almolonga',
    'Cantel',
    'Huitán',
    'Zunil',
    'Colomba Costa Cuca',
    'San Francisco La Unión',
    'El Palmar',
    'Coatepeque',
    'Génova',
    'Flores Costa Cuca',
    'La Esperanza',
    'Palestina de Los Altos'
  ],
  'Retalhuleu': [
    'Retalhuleu',
    'San Sebastián',
    'Santa Cruz Muluá',
    'San Martín Zapotitlán',
    'San Felipe',
    'San Andrés Villa Seca',
    'Champerico',
    'Nuevo San Carlos',
    'El Asintal'
  ],
  'Sacatepéquez': [
    'Antigua Guatemala',
    'Jocotenango',
    'Pastores',
    'Sumpango',
    'Santo Domingo Xenacoj',
    'Santiago Sacatepéquez',
    'San Bartolomé Milpas Altas',
    'San Lucas Sacatepéquez',
    'Santa Lucía Milpas Altas',
    'Magdalena Milpas Altas',
    'Santa María de Jesús',
    'Ciudad Vieja',
    'San Miguel Dueñas',
    'San Juan Alotenango',
    'San Antonio Aguas Calientes',
    'Santa Catarina Barahona'
  ],
  'San Marcos': [
    'San Marcos',
    'Ayutla',
    'Catarina',
    'Comitancillo',
    'El Quetzal',
    'El Rodeo',
    'El Tumbador',
    'Ixchiguán',
    'La Reforma',
    'Malacatán',
    'Nuevo Progreso',
    'Ocós',
    'Pajapita',
    'Esquipulas Palo Gordo',
    'San Antonio Sacatepéquez',
    'San Cristóbal Cucho',
    'San José Ojetenam',
    'San Lorenzo',
    'San Miguel Ixtahuacán',
    'San Pablo',
    'San Pedro Sacatepéquez',
    'San Rafael Pie de la Cuesta',
    'Sibinal',
    'Sipacapa',
    'Tacaná',
    'Tajumulco',
    'Tejutla',
    'Río Blanco',
    'La Blanca'
  ],
  'Santa Rosa': [
    'Cuilapa',
    'Casillas Santa Rosa',
    'Chiquimulilla',
    'Guazacapán',
    'Nueva Santa Rosa',
    'Oratorio',
    'Pueblo Nuevo Viñas',
    'San Juan Tecuaco',
    'San Rafael Las Flores',
    'Santa Cruz Naranjo',
    'Santa María Ixhuatán',
    'Santa Rosa de Lima',
    'Taxisco',
    'Barberena',
 
  ],
  'Sololá': [
    'Sololá',
    'Concepción',
    'Nahualá',
    'Panajachel',
    'San Andrés Semetabaj',
    'San Antonio Palopó',
    'San José Chacayá',
    'San Juan La Laguna',
    'San Lucas Tolimán',
    'San Marcos La Laguna',
    'San Pablo La Laguna',
    'San Pedro La Laguna',
    'Santa Catarina Ixtahuacán',
    'Santa Catarina Palopó',
    'Santa Clara La Laguna',
    'Santa Cruz La Laguna',
    'Santa Lucía Utatlán',
    'Santa María Visitación',
    'Santiago Atitlán'
  ],
  'Suchitepéquez': [
    'Mazatenango',
    'Cuyotenango',
    'San Francisco Zapotitlán',
    'San Bernardino',
    'San José El Ídolo',
    'Santo Domingo Suchitepéquez',
    'San Lorenzo',
    'Samayac',
    'San Pablo Jocopilas',
    'San Antonio Suchitepéquez',
    'San Miguel Panán',
    'San Gabriel',
    'Chicacao',
    'Patulul',
    'Santa Bárbara',
    'San Juan Bautista',
    'Santo Tomás La Unión',
    'Zunilito',
    'Pueblo Nuevo',
    'Río Bravo'
  ],
  'Totonicapán': [
    'San Cristóbal Totonicapán',
    'San Francisco El Alto',
    'San Andrés Xecul',
    'Momostenango',
    'Santa María Chiquimula',
    'Santa Lucía La Reforma',
    'San Bartolo'
  ],
  'Zacapa': [

    'Cabañas',
    'Estanzuela',
    'Gualán',
    'Huité',
    'La Unión',
    'Río Hondo',
    'San Jorge',
    'San Diego',
    'Teculután',
    'Usumatlán',
    'Zacapa',
  ]
};

const zones = ['NA', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25];


/* Colocamos cada componente a utilizar */
function App() {
  const [view, setView] = useState('home');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedMunicipality, setSelectedMunicipality] = useState('');
  const [selectedZone, setSelectedZone] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [infoMessage, setInfoMessage, onInfoClick] = useState('');
  const [cuentasCreadas, setCuentasCreadas] = useState(0);
  const [userCount, setUserCount] = useState(0);
  const [user, setUser] = useState(null);
  const [cuestionariosRealizados, setCuestionariosRealizados] = useState(0);
  const [totalHuella, setTotalHuella] = useState(0);
  const [maxHuellaUsers, setMaxHuellaUsers] = useState({ department: '', huella: 0 });
  const [maxHuellaTotales, setMaxHuellaTotales] = useState({ department: '', huella: 0 });
  const [activeUsersCount, setActiveUsersCount] = useState(0);
  const [totalCuestionariosActivos, setTotalCuestionariosActivos] = useState(0);
  const [huellaTotal, setHuellaTotal] = useState(0);
  const [filteredHuella, setFilteredHuella] = useState(null);
  const [filteredHuellaTotal, setFilteredHuellaTotal] = useState(0);
  

  const [departments, setDepartments] = useState([
    'Alta Verapaz',
    'Baja Verapaz',
    'Chimaltenango',
    'Chiquimula',
    'El Progreso',
    'Escuintla',
    'Guatemala',
    'Huehuetenango',
    'Izabal',
    'Jalapa',
    'Jutiapa',
    'Petén',
    'Quetzaltenango',
    'Quiché',
    'Retalhuleu',
    'Sacatepéquez',
    'San Marcos',
    'Santa Rosa',
    'Sololá',
    'Suchitepéquez',
    'Totonicapán',
    'Zacapa',
  ]);




  
  const [selectedQuestion, setSelectedQuestion] = useState('');

 



  
  const handleHuellaTotal = (total) => {
    setHuellaTotal(total);
  };

  useEffect(() => {
    const calcularHuellaTotal = async () => {
      try {
        const q = query(
          collection(db, 'cuestionarios'), 
          where('Activo', '==', 'Si') 
        );

        const querySnapshot = await getDocs(q);
        let total = 0;

        querySnapshot.forEach((doc) => {
          const data = doc.data();
          if (data.huellaCarbono) { 
            total += data.huellaCarbono;
          }
        });

        setHuellaTotal(total);
      } catch (error) {
        console.error('Error al calcular la huella total: ', error);
      }
    };

    calcularHuellaTotal();
  }, []);


  
  
  useEffect(() => {
    const fetchHuellaTotal = async () => {
      if (selectedDepartment) {

        const usersQuery = query(
          collection(db, 'users'),
          where('departamento', '==', selectedDepartment)
        );

        const usersSnapshot = await getDocs(usersQuery);
        const userUIDs = usersSnapshot.docs.map(doc => doc.id);


        if (userUIDs.length > 0) {
          const totalesQuery = query(
            collection(db, 'totales'),
            where('userUID', 'in', userUIDs) 
          );

          const totalesSnapshot = await getDocs(totalesQuery);
          let totalHuella = 0;
          totalesSnapshot.forEach((doc) => {
            totalHuella += doc.data().huella; 
          });

          setFilteredHuella(totalHuella);
        } else {
          setFilteredHuella(0); 
        }
      }
    };

    fetchHuellaTotal();
  }, [selectedDepartment]);

  useEffect(() => {
    const fetchData = async () => {
      await fetchUserCount();
      await fetchQuestionnaireCount();
      await fetchTotalHuella();
      await fetchMaxHuellaByDepartment();
    };

    fetchData();

    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  const fetchUserCount = async () => {
    try {
      const userCount = await obtenerUsuarios();
      setCuentasCreadas(userCount);
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
    }
  };


  const fetchQuestionnaireCount = async () => {
    try {
      const questionnaireCount = await obtenerCuestionarios();
      setCuestionariosRealizados(questionnaireCount);
    } catch (error) {
      console.error('Error al obtener cuestionarios:', error);
    }
  };


  const fetchTotalHuella = async () => {
    try {
      const totalHuella = await obtenerHuellaTotal();
      setTotalHuella(totalHuella);
    } catch (error) {
      console.error('Error al obtener huella total:', error);
    }
  };


  const fetchMaxHuellaByDepartment = async () => {
    try {
      const { users, totales } = await getMaxHuellaByDepartment();
      setMaxHuellaUsers(users);
      setMaxHuellaTotales(totales);
    } catch (error) {
      console.error('Error al obtener departamento con mayor huella:', error);
    }
  };


  useEffect(() => {
    const fetchActiveUsersCount = async () => {
      const count = await getActiveUsersCount();
      setActiveUsersCount(count);
    };

    fetchActiveUsersCount();
  }, []); 


  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };


  const handleDepartmentChange = (event) => {
    setSelectedDepartment(event.target.value);
    setSelectedMunicipality('');
    setSelectedZone('');
    fetchFilteredHuella();
  };

  const handleMunicipalityChange = (event) => {
    setSelectedMunicipality(event.target.value);
    setSelectedZone('');
    fetchFilteredHuella();
  };

  const handleZoneChange = (event) => {
    setSelectedZone(event.target.value);
    fetchFilteredHuella();
  };

  const handleRefresh = () => {
    setSelectedDepartment('');
    setSelectedMunicipality('');
    setSelectedZone('');

    setFilteredHuellaTotal(0);
  };

  const handleFillSurvey = () => {
    setView('login');
  };

  const handleGoBack = () => {
    setView('home');
  };


  const handleRedirectToRegister = () => {
    setView('register');
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleViewProfile = () => {
    setView('profile');
    setShowDropdown(false);
  };

  const handleRegister = async (userData) => {
    try {
      await guardarUsuario(userData);
      setView('login');
    } catch (error) {
      console.error('Error al guardar usuario:', error);
    }
  };

  const handleRedirectToInformacion = () => {
    setView('informacion');
  };

  const handleFAQClick = () => {
    setView('faq');
  };

  const handleMouseEnter = () => {
    setInfoMessage('');
  };
  
  const handleMouseLeave = () => {
    setInfoMessage('');
  };
  

  const handleInfoClick = () => {
    setCurrentView('informacion');
  };

  const huellaDeCarbono = (viewName) => {
    setView(viewName);
  };

  const scrollToHuella = () => {
    if (huellaRef.current) {
      huellaRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };
  


  useEffect(() => {
    const obtenerHuellaTotal = async () => {
      try {
        const totalesCollection = collection(db, 'totales');
        const totalesQuery = query(totalesCollection, orderBy('fecha', 'desc'));
        const totalesSnapshot = await getDocs(totalesQuery);
        const huellasPorEmail = {};

        totalesSnapshot.forEach((doc) => {
          const data = doc.data();
          const email = data.email;
          const huella = parseFloat(data.huella); 


          let fecha;
          if (data.fecha && typeof data.fecha.toDate === 'function') {
            fecha = data.fecha.toDate(); 
          } else {
            fecha = new Date(data.fecha);
          }

          if (!huellasPorEmail[email] || fecha > huellasPorEmail[email].fecha) {
            huellasPorEmail[email] = { huella, fecha };
          }
        });

        const totalHuella = Object.values(huellasPorEmail).reduce((acc, { huella }) => acc + huella, 0);

        setHuellaTotal(totalHuella);
      } catch (error) {
        console.error('Error al obtener la huella de carbono total: ', error);
      }
    };

    obtenerHuellaTotal();
  }, []);


  if (view === 'huellaDeCarbono') {
    return <HuellaDeCarbono />;
  }
  

  if (view === 'login') {
    return <Login onGoBack={handleGoBack} onRegister={handleRedirectToRegister} onLoginSuccessfully={()=>setView('questionnaire')} />;
  }

  if (view === 'register') {
    return <Register onGoBack={handleGoBack} onRegister={handleRegister} />;
  }

  if (view === 'profile') {
    return <UserProfile user={{ firstName: 'Nombre', lastName: 'Apellido', email: 'Email', avatarUrl: 'url_avatar' }} onGoBack={handleGoBack} />;
  }

  if (view === 'questionnaire') {
    return <Questionnaire user={{}} />;
  }

  /*Mostramos toda la información de la página */
  return (

/* Header */
    <div>
      <header className="header" >
        <div className="header-left">
        <ul className="header-nav">
        <li><button>EcoHuella</button></li>
        </ul>
        </div>
        <div className="header-right">
          <ul className="header-nav">


                  <div className="info-message">
        {infoMessage && <p>{infoMessage}</p>}
      </div>


      <button className="fill-survey-button" onClick={handleFillSurvey}>Iniciar Sesión</button>
<li><button className="fill-survey-button" onClick={scrollToBottom}>Información</button></li>
<li><button className="fill-survey-button" onClick={scrollToBottom}>FAQ</button></li>

          
          </ul>
        </div>
      </header>


      <div className="labels-container">


 <ActivoTotalSuma onHuellaTotal={handleHuellaTotal} />
<label>{huellaTotal} Kg CO<sub>2</sub> <br /> Huella de Carbono</label>
</div>


      
        <div className="filters">
          <div className="filter">
            <label htmlFor="department">Departamento</label>
      <select id="department" value={selectedDepartment} onChange={handleDepartmentChange}>
        <option value="">Seleccionar departamento</option>
        {departments.map((dept) => (
          <option key={dept} value={dept}>{dept}</option>
        ))}
      </select>
          </div>
          <div className="filter">
            <label htmlFor="municipality">Municipio</label>
            <select id="municipality" value={selectedMunicipality} onChange={handleMunicipalityChange} disabled={!selectedDepartment}>
              <option value="">Seleccionar municipio</option>
              {selectedDepartment &&
                municipalities[selectedDepartment].map((mun) => (
                  <option key={mun} value={mun}>{mun}</option>
                ))}
            </select>
          </div>
          <div className="filter">
            <label htmlFor="zone">Zona</label>
            <select id="zone" value={selectedZone} onChange={handleZoneChange} disabled={!selectedMunicipality}>
              <option value="">Seleccionar zona</option>
              {zones.map((zone) => (
                <option key={zone} value={zone}>Zona {zone}</option>
              ))}
            </select>

          </div>
          
          <div className="filter">
     
          </div>

          <div className="fill-survey">
            
          </div>
        </div>

        <div className="labels-container">



        <ActivoTotalSumaFiltro
        selectedDepartment={selectedDepartment}
        selectedMunicipality={selectedMunicipality}
        selectedZone={selectedZone}
        onFilteredHuellaTotal={setFilteredHuellaTotal}
      />


<div>
        <label>{filteredHuellaTotal} Kg CO<sub>2</sub></label>
      </div>
      
</div>


      
      <div className="stats">
  <div>
    <label> 
      <span className="large-text">{cuentasCreadas}</span>
      <br />
      <br /> 
      <span className="small-text">Cuentas creadas</span>
    </label>
  </div>
  
  <div>
    <label>
      <span className="large-text">{cuestionariosRealizados}</span>
      <br />
      <br />
      <span className="small-text">Cuestionarios realizados</span>
    </label>
  </div>
  
  <div>
    <label>
      <span className="large-text">{activeUsersCount}</span>
      <br />
      <br />
      <span className="small-text">Cuestionarios activos</span>
    </label>
  </div>
</div>

        <Footer />

    </div>
  );
}
export default App;
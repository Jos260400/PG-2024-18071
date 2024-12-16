/* Importamos cada componente */
import React, { useState, useEffect  } from 'react';
import Map from './Map.jsx';
import '../index.css';
import { auth } from '../firebase';

import  { app } from '../firebase.js';
import Footer from './Footer'; 
import { db } from '../firebase';
import { collection, getDocs, query, orderBy, where, getDoc } from 'firebase/firestore';
import { doc, setDoc } from 'firebase/firestore';
import { obtenerUsuarios } from '../userManagement';
import { obtenerCuestionarios } from '../totalManagement';
import { obtenerHuellaTotal } from '../huellatotalManagement';
import { getMaxHuellaByDepartment } from '../departmentManagement'; 
import getActiveUsersCount from '../activeManagement.js';
import guatemalaMap from '../assets/502.svg';
import ActivoTotalSuma from '../ActivoTotalSuma';
import ActivoTotalSumaFiltro from '../ActivoTotalSumaFiltro';
import ClipLoader from "react-spinners/ClipLoader";
import { onAuthStateChanged } from 'firebase/auth';
import { calculateTotalHuella } from '../firebaseActions.js';
import { useNavigate } from 'react-router-dom';



/* Departamentos, municipios y zonas para los filtros */
const departments = [
  'Todos',
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
  'Todos': [],
  'Alta Verapaz': [
    'Todos',
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
    'Todos', 
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
    'Todos',     
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
    'Todos',    
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
    'Todos', 
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
    'Todos', 
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
    'Todos', 
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
    'Todos',    
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
    'Todos', 
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
    'Todos',     
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
    'Todos', 
    'Morales',
    'Los Amates',
    'Livingston',
    'El Estor',
    'Puerto Barrios'
  ],
  'Jalapa': [
    'Todos', 
    'San Pedro Pinula',
    'San Luis Jilotepeque',
    'San Manuel Chaparrón',
    'San Carlos Alzatate',
    'Monjas',
    'Mataquescuintla'
  ],
  'Jutiapa': [
    'Todos',
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
    'Todos', 
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
    'Todos',     
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
    'Todos', 
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
    'Alotenango',
    'San Antonio Aguas Calientes'
  ],
  'San Marcos': [
    'Todos',     
    'San Pedro Sacatepéquez',
    'San Antonio Sacatepéquez',
    'Comitancillo',
    'San Miguel Ixtahuacán',
    'Concepción Tutuapa',
    'Tacaná',
    'Sibinal',
    'Tajumulco',
    'Tejutla',
    'San Rafael Pie de la Cuesta',
    'Nuevo Progreso',
    'El Tumbador',
    'El Rodeo',
    'Malacatán',
    'Catarina',
    'Ayutla',
    'Ocós',
    'San Pablo',
    'El Quetzal',
    'La Reforma',
    'Pajapita',
    'Ixchiguán',
    'San José Ojetenam',
    'San Cristóbal Cucho',
    'Sipacapa',
    'Esquipulas Palo Gordo',
    'Río Blanco',
    'San Lorenzo'
  ],
  'Santa Rosa': [
    'Todos', 
    'Cuilapa',
    'Barberena',
    'Santa Rosa de Lima',
    'Casillas',
    'San Rafael Las Flores',
    'Oratorio',
    'San Juan Tecuaco',
    'Chiquimulilla',
    'Taxisco',
    'Santa María Ixhuatán',
    'Guazacapán',
    'Santa Cruz Naranjo',
    'Pueblo Nuevo Viñas',
    'Nueva Santa Rosa'
  ],
  'Sololá': [
    'Todos',     
    'San José Chacayá',
    'Santa María Visitación',
    'Santa Lucía Utatlán',
    'Nahualá',
    'Santa Catarina Ixtahuacán',
    'Santa Clara La Laguna',
    'Concepción',
    'San Andrés Semetabaj',
    'Panajachel',
    'Santa Catarina Palopó',
    'San Antonio Palopó',
    'San Lucas Tolimán',
    'Santa Cruz La Laguna',
    'San Pablo La Laguna',
    'San Marcos La Laguna',
    'San Juan La Laguna',
    'San Pedro La Laguna',
    'Santiago Atitlán'
  ],
  'Suchitepéquez': [
    'Todos', 
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
    'Todos',    
    'San Cristóbal Totonicapán',
    'San Francisco El Alto',
    'San Andrés Xecul',
    'Momostenango',
    'Santa María Chiquimula',
    'Santa Lucía La Reforma',
    'San Bartolo'
  ],
  'Zacapa': [
    'Todos',     
    'Estanzuela',
    'Río Hondo',
    'Gualán',
    'Teculután',
    'Usumatlán',
    'Cabañas',
    'San Diego',
    'La Unión',
    'Huité'
  ]
}; 


const zones = ['Todas', 'NA', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25];


/* Colocamos cada parte importante que configuraremos para la app */
const Home = () => {
  const [view, setView] = useState('home');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
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
    'Todos',
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

  /* Sumatoria de las huellas activas */
  const handleHuellaTotal = (total) => {
    setHuellaTotal(total);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        
        const calcularHuellaTotal = async () => {
          setLoading(true); 
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
          } finally {
            setLoading(false);
          }
        };

        calcularHuellaTotal();

      } else {
       
      }
    });

    return () => unsubscribe();

  }, []);

  useEffect(() => {
    setLoading(true); 
    if (selectedDepartment) {
      const selectedMunicipalitiesQuery = getMunicipalityQuery(selectedDepartment, selectedMunicipality);
      const selectedZonesQuery = getZoneQuery(selectedZone);
      calculateTotalHuella(selectedDepartment, selectedMunicipalitiesQuery, selectedZonesQuery)
        .then((huella) => {
          setFilteredHuellaTotal(huella)
        })
        .catch((error) => console.error('Error fetching huella:', error))
        .finally(() => setLoading(false) );
    } else {      
      setLoading(false); 
    }
  }, [selectedDepartment, selectedMunicipality, selectedZone]);
  
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

  /* Cuentas totales */
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


  /* Cuentas activas */
  useEffect(() => {
    const fetchActiveUsersCount = async () => {
      const count = await getActiveUsersCount();
      setActiveUsersCount(count);
    };

    fetchActiveUsersCount();
  }, []); 


  /* Filtros para departamento, municipio y zona */
  const handleDepartmentChange = (e) => {
    const value = e.target.value;
    setSelectedDepartment(value);

    if (value === "Todos") {
      setSelectedMunicipality(""); 
      setSelectedZone(""); 
    } else {

      setSelectedMunicipality(""); 
      setSelectedZone("");
    }
  };

 const getMunicipalityQuery = (department, selectedMunicipality) => {
    if (municipalities[department]) {
      if (selectedMunicipality === 'Todos') {
        return municipalities[department].filter(muni => muni !== 'Todos');
      } else {
        return [selectedMunicipality];
      }
    }
    return [];
  }

  const handleMunicipalityChange = (e) => {
    const value = e.target.value;
    setSelectedMunicipality(value);

    if (value === "Todos") {
      setSelectedZone("");
    } else {
      setSelectedZone("");
    }
  };

  
 const getZoneQuery = (selectedZone) => {
   if (selectedZone === 'Todas') {
     return zones.filter(zone => zone !== 'Todas').map(zone => zone.toString());
   } else {
     return [selectedZone];
   }
}

  const handleZoneChange = (e) => {
    const value = e.target.value;
    setSelectedZone(value);
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
  
  return (
    <div>


<div className="labels-container" style={{ padding: '20px', maxWidth: '100%' }}>
  <ActivoTotalSumaFiltro
    selectedDepartment={selectedDepartment}
    selectedMunicipality={selectedMunicipality}
    selectedZone={selectedZone}
    onFilteredHuellaTotal={setFilteredHuellaTotal}
  />

<div className="carbon-footprint">
{loading ? (
        <div className="loading-container">
          <ClipLoader color={"#ffffff"} loading={loading} size={100} />
          <span className='small-text'>Calculando...</span>
        </div>
      ) : (
        filteredHuellaTotal == 0 ? (<div>
          <span className='small-text'>No se encontraron datos suficientes para calcular la huella de carbono...</span>
        </div>) : (<div>
          <label>
            {filteredHuellaTotal} Kg CO<sub>2</sub>
            <br />
            <span className="small-text">Huella de Carbono</span> {/* Envolvemos en un span */}
          </label>
        </div>)
      )}
  
</div>

</div>



        <div className="filters">
          <div className="filter">
            <label htmlFor="department">Departamento</label>
      <select id="department" value={selectedDepartment} onChange={handleDepartmentChange}>
        
        {departments.map((dept) => (
          <option key={dept} value={dept}>{dept}</option>
        ))}
      </select>
          </div>
          <div className="filter">
            <label htmlFor="municipality">Municipio</label>
            <select id="municipality" value={selectedMunicipality} onChange={handleMunicipalityChange} disabled={!selectedDepartment || (selectedDepartment && selectedDepartment == 'Todos')}>
              
              {selectedDepartment &&
                municipalities[selectedDepartment].map((mun) => (
                  <option key={mun} value={mun}>{mun}</option>
                ))}
            </select>
          </div>
          <div className="filter">
            <label htmlFor="zone">Zona</label>
            <select id="zone" value={selectedZone} onChange={handleZoneChange} disabled={!selectedMunicipality}>
             
              {zones.map((zone) => (
                <option key={zone} value={zone}>{zone == 'Todas' ? '' : 'Zona '}{zone}</option>
              ))}
            </select>

          </div>

        </div>


        
      
        <div className="stats">
  <div>
    <label> 
      <span className="large-text">{cuentasCreadas}</span>
      <br />
      <br /> 
      <span className="small-text2">Cuentas creadas</span>
    </label>
  </div>
  
  <div>
    <label>
      <span className="large-text">{cuestionariosRealizados}</span>
      <br />
      <br />
      <span className="small-text2">Cuestionarios realizados</span>
    </label>
  </div>
  
  <div>
    <label>
      <span className="large-text">{activeUsersCount}</span>
      <br />
      <br />
      <span className="small-text2">Cuestionarios activos</span>
    </label>
  </div>
        </div>

        <Footer />
    </div>
  );
};

export default Home;
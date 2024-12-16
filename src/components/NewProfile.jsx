import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "../firebase"; 
import './NewProfile.css';
import { useNavigate } from "react-router-dom";
import Footer from './Footer.jsx';
import ClipLoader from "react-spinners/ClipLoader";


const departmentsData = [
  {
    _id: "alta_verapaz",
    name: "Alta Verapaz",
    mun: [
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
    ]
  },
  {
    _id: "baja_verapaz",
    name: "Baja Verapaz",
    mun: [ 
      'Salamá',
      'San Miguel Chicaj',
      'Rabinal',
      'Cubulco',
      'Granados',
      'Santa Cruz el Chol',
      'San Jerónimo',
      'Purulhá'
    ]
  },
  {
    _id: "chimaltenango",
    name: "Chimaltenango",
    mun: [     
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
    ]
  },
  {
    _id: "chiquimula",
    name: "Chiquimula",
    mun: [    
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
    ]
  },
  {
    _id: "peten",
    name: "Petén",
    mun: [ 
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
    ]
  },
  {
    _id: "el_progreso",
    name: "El Progreso",
    mun: [ 
      'El Jícaro',
      'Morazán',
      'San Agustín Acasaguastlán',
      'San Antonio La Paz',
      'San Cristóbal Acasaguastlán',
      'Sanarate',
      'Guastatoya',
      'Sansare'
    ]
  },
  {
    _id: "quiche",
    name: "Quiché",
    mun: [ 
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
    ]
  },
  {
    _id: "escuintla",
    name: "Escuintla",
    mun: [   
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
    ]
  },
  {
    _id: "guatemala",
    name: "Guatemala",
    mun: [ 
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
    ]
  },
  {
    _id: "huehuetenango",
    name: "Huehuetenango",
    mun: [  
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
    ]
  },
  {
    _id: "izabal",
    name: "Izabal",
    mun: [ 
      'Morales',
      'Los Amates',
      'Livingston',
      'El Estor',
      'Puerto Barrios'
    ]
  },
  {
    _id: "jalapa",
    name: "Jalapa",
    mun: [ 
      'Jalapa',
      'San Pedro Pinula',
      'San Luis Jilotepeque',
      'San Manuel Chaparrón',
      'San Carlos Alzatate',
      'Monjas',
      'Mataquescuintla'
    ]
  },
  {
    _id: "jutiapa",
    name: "Jutiapa",
    mun: [
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
    ]
  },
  {
    _id: "quetzaltenango",
    name: "Quetzaltenango",
    mun: [     
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
    ]
  },
  {
    _id: "retalhuleu",
    name: "Retalhuleu",
    mun: [     
      'Retalhuleu',
      'San Sebastián',
      'Santa Cruz Muluá',
      'San Martín Zapotitlán',
      'San Felipe',
      'San Andrés Villa Seca',
      'Champerico',
      'Nuevo San Carlos',
      'El Asintal'
    ]
  },
  {
    _id: "sacatepequez",
    name: "Sacatepéquez",
    mun: [ 
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
    ]
  },
  {
    _id: "san_marcos",
    name: "San Marcos",
    mun: [     
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
    ]
  },
  {
    _id: "santa_rosa",
    name: "Santa Rosa",
    mun: [ 
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
    ]
  },
  {
    _id: "sololá",
    name: "Sololá",
    mun: [ 
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
    ]
  },
  {
    _id: "suchitepéquez",
    name: "Suchitepéquez",
    mun: [ 
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
    ]
  },
  {
    _id: "totonicapán",
    name: "Totonicapán",
    mun: [ 
      'San Cristóbal Totonicapán',
      'San Francisco El Alto',
      'San Andrés Xecul',
      'Momostenango',
      'Santa María Chiquimula',
      'Santa Lucía La Reforma',
      'San Bartolo'
    ]
  },
  {
    _id: "zacapa",
    name: "Zacapa",
    mun: [ 
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
  }
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

const zonesData = [
  "NA",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "11",
  "12",
  "13",
  "14",
  "15",
  "17",
  "18",
  "19",
  "20",
  "21",
  "22",
  "23",
  "24",
  "25",
];


const NewProfile = () => {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editMode, setEditMode] = useState(false); // State to toggle edit mode
    const [formValues, setFormValues] = useState({
        department: '', 
        municipality: '', 
        zone: ''
    });
    const [formErrors, setFormErrors] = useState({
      department: '', 
      municipality: '', 
      zone: ''
    });
    const [municipalities, setMunicipalities] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false); // State for form submission
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
          if (user) {
            try {
              const userDocRef = doc(db, "users", user.uid);
              const userDoc = await getDoc(userDocRef);
    
              if (userDoc.exists()) {
                console.log('data', user, userDoc.data());
                
                const { email, department, municipality, zone } = userDoc.data();
                const displayName = user.displayName || "--";
                setUserData({ displayName, email, department, municipality, zone });
                setFormValues({ department: department || '', municipality: municipality || '', zone: zone || '' });

                // Populate municipalities if department exists
                const selectedDepartment = departmentsData.find(d => d.name === department);
                if (selectedDepartment) {
                    setMunicipalities(selectedDepartment.mun);
                }
              } else {
                console.log("No se encontró información del usuario!");
              }
            } catch (err) {
              console.error("Error al obtener data: ", err);
              setError(err.message);
          } finally {
              setLoading(false);
          }
          } else {
            setLoading(false);
            setUserData(null);
            navigate("/login")
          }
        });
    
        return () => unsubscribe();
      }, [navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormValues((prevValues) => {
          const newValues = {
              ...prevValues,
              [name]: value,
          };
          return newValues;
        });
        setFormErrors((prev) => ({
          ...prev,
          [name]: '' // Reset error for this field
        }));
        if (name === "department") {
          // Update municipalities based on selected department
          const selectedDepartment = departmentsData.find(d => d.name === value);
          if (selectedDepartment) {
              setMunicipalities(selectedDepartment.mun);
              setFormValues((prevValues) => ({
                  ...prevValues,
                  municipality: '' // Reset municipality if department changes
              }));
          }
        }
    };

  const validateForm = () => {
      const errors = {};
      console.log('formValues from validateForm', {...formValues})
      if (!formValues.department) {
          errors.department = "Por favor, seleccione un departamento.";
      }
      if (!formValues.municipality) {
          errors.municipality = "Por favor, seleccione una municipalidad.";
      }
      if (!formValues.zone) {
          errors.zone = "Por favor, seleccione una zona.";
      }
      setFormErrors(errors);
      console.log("Form validation errors:", errors);
      return Object.keys(errors).length === 0;
  };

    const handleSave = async () => {
      console.log("Save button clicked");
      if (!validateForm()) return;
      setIsSubmitting(true);

      try {
          const userDocRef = doc(db, "users", auth.currentUser.uid);
          await updateDoc(userDocRef, {
              department: formValues.department,
              municipality: formValues.municipality,
              zone: formValues.zone
          });
          setUserData({ ...userData, ...formValues });
          setEditMode(false);
      } catch (err) {
          console.error("Error al actualizar data: ", err);
          setError(err.message);
      } finally {
        setIsSubmitting(false);
    }
  };

  if (loading) return <h1 className="">Cargando...</h1>;
  if (error) return <p>Error: {error}</p>;
  if (!userData) return <p>No se encontró información del usuario.</p>; 

  return (

    
    <div className="profile-view">
            <h2>Perfil</h2> <br />
            <div className="profile-info">
                <p><strong>Email:</strong> {userData.email}</p> <br />

                {editMode ? (
                    <>
                        <p>
                            <strong>Departamento:</strong>
                            <select
                                name="department"
                                value={formValues.department}
                                onChange={handleChange}
                                aria-label="Seleccione Departamento"
                            >
                                <option value="">-- Seleccione Departamento --</option>
                                {departmentsData.map(department => (
                                    <option key={department._id} value={department.name}>
                                        {department.name}
                                    </option>
                                ))}
                            </select>
                            {formErrors.department && <span className="error">{formErrors.department}</span>}
                        </p> <br />

                        <p>
                            <strong>Municipio:</strong>
                            <select
                                name="municipality"
                                value={formValues.municipality}
                                onChange={handleChange}
                                disabled={!formValues.department} 
                                aria-label="Seleccione Municipalidad"
                            >
                                <option value="">-- Seleccione Municipio --</option>
                                {municipalities.map((mun, index) => (
                                    <option key={index} value={mun}>
                                        {mun}
                                    </option>
                                ))}
                            </select>
                            {formErrors.municipality && <span className="error">{formErrors.municipality}</span>}
                        </p> <br />

                        <p>
                            <strong>Zona:</strong>
                            <select
                                name="zone"
                                value={formValues.zone}
                                onChange={handleChange}
                                aria-label="Seleccione Zona"
                            >
                                <option value="">-- Seleccione Zona --</option>
                                {zonesData.map((zone, index) => (
                                    <option key={index} value={zone}>
                                        {zone}
                                    </option>
                                ))}
                            </select>
                            {formErrors.zone && <span className="error">{formErrors.zone}</span>}
                        </p> <br />
                        <button className="button button--primary" onClick={handleSave} disabled={isSubmitting}>
                            {isSubmitting ? <ClipLoader size={20} color="#ffffff" /> : "Guardar"}
                        </button>
                        <button className="button button--secondary" onClick={() => setEditMode(false)}>Cancelar</button>
                    </>
                ) : (
                  <>
                      <p>
                          <strong>Departamento:</strong>
                          <select
                              value={userData.department}
                              disabled
                          >
                              {departmentsData.map(department => (
                                  <option key={department._id} value={department.name}>
                                      {department.name}
                                  </option>
                              ))}
                          </select>
                      </p>
                      <p>
                          <strong>Municipio:</strong>
                          <select
                              value={userData.municipality}
                              disabled
                          >
                              {municipalities.map((mun, index) => (
                                  <option key={index} value={mun}>
                                      {mun}
                                  </option>
                              ))}
                          </select>
                      </p>
                      <p>
                          <strong>Zona:</strong>
                          <select
                              value={userData.zone}
                              disabled
                          >
                              {zonesData.map((zone, index) => (
                                  <option key={index} value={zone}>
                                      {zone}
                                  </option>
                              ))}
                          </select>
                      </p>
                      <button className="button button--outline" onClick={() => setEditMode(true)}>Editar</button>
                  </>
              )}
            </div>

            <Footer />
        </div>
    );
  
};

export default NewProfile;
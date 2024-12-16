/* Importamos lo necesario para los datos de firebase */
import React, { useState } from 'react';
import { getFirestore, setDoc, doc } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase';
import Header from './Header';
import Footer from './Footer';
import './Register.css';

/* Podemos seleccionar estos departamentos, municipios y  zonas para registrarse */
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

const zones = [
  'NA',
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
  '11',
  '12',
  '13',
  '14',
  '15',
  '16',
  '17',
  '18',
  '19',
  '20',
  '21',
  '22',
  '23',
  '24',
  '25'
];


const Register = ({ onGoBack }) => {
  const [form, setForm] = useState({
    email: '',
    password: '',
    department: '',
    municipality: '',
    zone: ''
  });
  const [selectedDepartment, setSelectedDepartment] = useState('');

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });

    if (e.target.name === 'department') {
      setSelectedDepartment(e.target.value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const auth = getAuth();
    const db = getFirestore();

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, form.email, form.password);
      const user = userCredential.user;

      await setDoc(doc(db, 'users', user.uid), {
        email: form.email,
        department: form.department,
        municipality: form.municipality,
        zone: form.zone
      });

      alert('User registered successfully');
    } catch (error) {
      console.error('Error registering user:', error);
      alert('Error registering user');
    }
  };

  return (
    <div>
      <Header />

      <br />
      <br />
      <br /> 
      <br />
      <br />
      <br />



      <div className="container">
        <h2>Registrar</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input type="email" name="email" value={form.email} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Contraseña</label>
            <input type="password" name="password" value={form.password} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Departamento</label>
            <select name="department" value={form.department} onChange={handleChange} required>
              <option value="">Departamento</option>
              {departments.map((dept) => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Municipalidad</label>
            <select name="municipality" value={form.municipality} onChange={handleChange} required>
              <option value="">Municipalidad</option>
              {selectedDepartment && municipalities[selectedDepartment].map((mun) => (
                <option key={mun} value={mun}>{mun}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Zona</label>
            <select name="zone" value={form.zone} onChange={handleChange} required>
              <option value="">Zona</option>
              {zones.map((zone) => (
                <option key={zone} value={zone}>{zone}</option>
              ))}
            </select>
          </div>
          <div className="form-actions">
            <button type="submit">Registrar</button>
            <button type="button" onClick={onGoBack}>Volver</button>
          </div>
        </form>
      </div>
      
      <div className="info-container">
  <h2>Información de Registro</h2>
  <p>
    <span className="font-semibold">Correo:</span> Puedes utilizar ya sea un correo personal, institucional o empresarial.
  </p>
  <p>
    <span className="font-semibold">Contraseña:</span> Asegúrate de utilizar una contraseña segura de 6 caracteres o más.
  </p>
  <p>
    <span className="font-semibold">Lugar:</span> Debes proporcionar el departamento, municipio y zona de tu ubicación.
  </p>
</div>




      <Footer />
    </div>
  );
};

export default Register;
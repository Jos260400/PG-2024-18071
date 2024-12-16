/* Importamos lo necesario para los datos de firebase, y componentes */
import React, { useEffect, useState } from "react";
import { GiTreeGrowth, GiMountainCave, GiWaterDrop, GiSunflower, GiEarthAmerica, GiTruck, GiAirplaneDeparture, GiElectric, GiFruitBowl, GiClothes, GiRecycle, GiPaper, GiPapers, GiPodium, GiLevelCrossing, GiLevelEndFlag } from "react-icons/gi";
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import './Badges.css'; 
import Footer from './Footer.jsx';
import { useNavigate } from "react-router-dom";

/* Definimos cada insignia */
const badgeDescriptions = [
  { 
    icon: <GiPapers size={50} />, 
    description: (
      <p className="justified-text">
        <span className="first-line">Primera insignia: Crear cuenta.</span><br /><br />
        Esta insignia se otorga cuando creas tu cuenta en la aplicación.
      </p>
    )
  },
  { 
    icon: <GiTreeGrowth size={50} />, 
    description: (
      <p className="justified-text">
        <span className="first-line">Segunda insignia: Realizar 1 cuestionario.</span><br /><br />
        Esta insignia se otorga cuando completas tu primer cuestionario en la aplicación.
      </p>
    )
  },
  { 
    icon: <GiMountainCave size={50} />, 
    description: (
      <p className="justified-text">
        <span className="first-line">Tercera insignia: Realizar 2 cuestionarios.</span><br /><br />
        Esta insignia se otorga cuando completas dos cuestionarios en la aplicación.
      </p>
    )
  }, 
  { 
    icon: <GiWaterDrop size={50} />, 
    description: (
      <p className="justified-text">
        <span className="first-line">Cuarta insignia: Realizar 3 cuestionarios.</span><br /><br />
        Esta insignia se otorga cuando completas tres cuestionarios en la aplicación.
      </p>
    )
  },          
  { 
    icon: <GiSunflower size={50} />, 
    description: (
      <p className="justified-text">
        <span className="first-line">Quinta insignia: Realizar 4 cuestionarios.</span><br /><br />
        Esta insignia se otorga cuando completas cuatro cuestionarios en la aplicación.
      </p>
    )
  },  
  { 
    icon: <GiEarthAmerica size={50} />, 
    description: (
      <p className="justified-text">
        <span className="first-line">Sexta insignia: Realizar 5 cuestionarios.</span><br /><br />
        Esta insignia se otorga cuando completas cinco cuestionarios en la aplicación.
      </p>
    )
  },
  { 
    icon: <GiTruck size={50} />, 
    description: (
      <p className="justified-text">
        <span className="first-line">Séptima insignia: Reducir huella 1 vez.</span><br /><br />
        Esta insignia se otorga cuando reduces tu huella de carbono una vez.
      </p>
    )
  },
  { 
    icon: <GiAirplaneDeparture size={50} />, 
    description: (
      <p className="justified-text">
        <span className="first-line">Octava insignia: Reducir huella 2 veces.</span><br /><br />
        Esta insignia se otorga cuando reduces tu huella de carbono dos veces.
      </p>
    )
  },
  { 
    icon: <GiElectric size={50} />, 
    description: (
      <p className="justified-text">
        <span className="first-line">Novena insignia: Reducir huella 3 veces.</span><br /><br />
        Esta insignia se otorga cuando reduces tu huella de carbono tres veces.
      </p>
    )
  },
  { 
    icon: <GiFruitBowl size={50} />, 
    description: (
      <p className="justified-text">
        <span className="first-line">Décima insignia: Reducir huella 4 veces.</span><br /><br />
        Esta insignia se otorga cuando reduces tu huella de carbono cuatro veces.
      </p>
    )
  },
  { 
    icon: <GiClothes size={50} />, 
    description: (
      <p className="justified-text">
        <span className="first-line">Undécima insignia: Reducir huella 5 veces.</span><br /><br />
        Esta insignia se otorga cuando reduces tu huella de carbono cinco veces.
      </p>
    )
  },
  { 
    icon: <GiRecycle size={50} />, 
    description: (
      <p className="justified-text">
        <span className="first-line">Duodécima insignia: Reducir huella 6 veces.</span><br /><br />
        Esta insignia se otorga cuando reduces tu huella de carbono seis veces.
      </p>
    )
  },
  { 
    icon: <GiTreeGrowth size={50} />, 
    description: (
      <p className="justified-text">
        <span className="first-line">Decimotercera insignia: Reducir huella 7 veces.</span><br /><br />
        Esta insignia se otorga cuando participas activamente 7 veces.
      </p>
    )
  },
  { 
    icon: <GiSunflower size={50} />, 
    description: (
      <p className="justified-text">
        <span className="first-line">Decimocuarta insignia: Cero contaminación.</span><br /><br />
        Esta insignia se otorga cuando marcas alguna respuesta como 0 al no realizar alguna actividad que genere contaminación.
      </p>
    )
  },  
  { 
    icon: <GiLevelEndFlag size={50} />, 
    description: (
      <p className="justified-text">
        <span className="first-line">Nivel 1 alcanzado.</span><br /><br />
        Esta insignia se otorga al alcanzar el nivel 1.
      </p>
    )
  },
  { 
    icon: <GiLevelEndFlag size={50} />, 
    description: (
      <p className="justified-text">
        <span className="first-line">Nivel 2 alcanzado.</span><br /><br />
        Esta insignia se otorga al alcanzar el nivel 2.
      </p>
    )
  },
  { 
    icon: <GiLevelEndFlag size={50} />, 
    description: (
      <p className="justified-text">
        <span className="first-line">Nivel 3 alcanzado.</span><br /><br />
        Esta insignia se otorga al alcanzar el nivel 3.
      </p>
    )
  },
  { 
    icon: <GiLevelEndFlag size={50} />, 
    description: (
      <p className="justified-text">
        <span className="first-line">Nivel 4 alcanzado.</span><br /><br />
        Esta insignia se otorga al alcanzar el nivel 4.
      </p>
    )
  },
  { 
    icon: <GiLevelEndFlag size={50} />, 
    description: (
      <p className="justified-text">
        <span className="first-line">Nivel 5 alcanzado.</span><br /><br />
        Esta insignia se otorga al alcanzar el nivel 5.
      </p>
    )
  },
  { 
    icon: <GiLevelEndFlag size={50} />, 
    description: (
      <p className="justified-text">
        <span className="first-line">Nivel 6 alcanzado.</span><br /><br />
        Esta insignia se otorga al alcanzar el nivel 6.
      </p>
    )
  },
  { 
    icon: <GiLevelEndFlag size={50} />, 
    description: (
      <p className="justified-text">
        <span className="first-line">Nivel 7 alcanzado.</span><br /><br />
        Esta insignia se otorga al alcanzar el nivel 7.
      </p>
    )
  },
  { 
    icon: <GiLevelEndFlag size={50} />, 
    description: (
      <p className="justified-text">
        <span className="first-line">Nivel 8 alcanzado.</span><br /><br />
        Esta insignia se otorga al alcanzar el nivel 8.
      </p>
    )
  },
  { 
    icon: <GiLevelEndFlag size={50} />, 
    description: (
      <p className="justified-text">
        <span className="first-line">Nivel 9 alcanzado.</span><br /><br />
        Esta insignia se otorga al alcanzar el nivel 9.
      </p>
    )
  },
  { 
    icon: <GiLevelEndFlag size={50} />, 
    description: (
      <p className="justified-text">
        <span className="first-line">Nivel 10 alcanzado.</span><br /><br />
        Esta insignia se otorga al alcanzar el nivel 10.
      </p>
    )
  },
  { 
    icon: <GiPodium size={50} />, 
    description: (
      <p className="justified-text">
        <span className="first-line">20 puntos obtenidos.</span><br /><br />
        Esta insignia se otorga al alcanzar 20 puntos.
      </p>
    )
  },
  { 
    icon: <GiPodium size={50} />, 
    description: (
      <p className="justified-text">
        <span className="first-line">40 puntos obtenidos.</span><br /><br />
        Esta insignia se otorga al alcanzar 40 puntos.
      </p>
    )
  },
  { 
    icon: <GiPodium size={50} />, 
    description: (
      <p className="justified-text">
        <span className="first-line">60 puntos obtenidos.</span><br /><br />
        Esta insignia se otorga al alcanzar 60 puntos.
      </p>
    )
  },
  { 
    icon: <GiPodium size={50} />, 
    description: (
      <p className="justified-text">
        <span className="first-line">80 puntos obtenidos.</span><br /><br />
        Esta insignia se otorga al alcanzar 80 puntos.
      </p>
    )
  },
  { 
    icon: <GiPodium size={50} />, 
    description: (
      <p className="justified-text">
        <span className="first-line">100 puntos obtenidos.</span><br /><br />
        Esta insignia se otorga al alcanzar 100 puntos.
      </p>
    )
  },
];

/* Definimos cada componente */
const NatureIcons = ({ accountCreated }) => {
  const [user, setUser] = useState(null);
  const [iconsStatus, setIconsStatus] = useState(Array(badgeDescriptions.length).fill(false));
  const [points, setPoints] = useState(0);
  const [level, setLevel] = useState(1);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const totalBadges = badgeDescriptions.length;

  useEffect(() => {
    const checkUnlockStatus = async () => {
      const auth = getAuth();
      const db = getFirestore();
      const user = auth.currentUser;

      const unsubscribe = onAuthStateChanged(auth, async (user) => {
        if (user) {
          setUser(user);
          try {
            const email = user.email;
            const q = query(collection(db, "respuestas"), where("email", "==", email));

            try {
              const querySnapshot = await getDocs(q);
              const data = querySnapshot.docs.map(doc => doc.data());
              const completedQuizzes = data.length;
            
      
              /* Cada 50 puntos es un nivel */
              const newPoints = completedQuizzes * 10; 
              setPoints(newPoints);
              setLevel(Math.floor(newPoints / 50) + 1);

              const updatedStatus = Array(badgeDescriptions.length).fill(false);
              updatedStatus[0] = true; // Activar la primera insignia
      
              setIconsStatus(prevStatus => {
                const updatedStatus = [...prevStatus];
                updatedStatus[0] = true; 
      

                /* Al completar cada cuestionario se dara un insignia */
                if (completedQuizzes >= 1) updatedStatus[1] = true;
                if (completedQuizzes >= 2) updatedStatus[2] = true;
                if (completedQuizzes >= 3) updatedStatus[3] = true;
                if (completedQuizzes >= 4) updatedStatus[4] = true;
                if (completedQuizzes >= 5) updatedStatus[5] = true;
      
                
                const totalReductions = countHuellaReductions(data);
      

                /* Al reducir el valor de huella cierta cantidad de veces */
                if (totalReductions >= 1) updatedStatus[6] = true;
                if (totalReductions >= 2) updatedStatus[7] = true;
                if (totalReductions >= 3) updatedStatus[8] = true;
                if (totalReductions >= 4) updatedStatus[9] = true;
                if (totalReductions >= 5) updatedStatus[10] = true;
                if (totalReductions >= 6) updatedStatus[11] = true;
                if (totalReductions >= 7) updatedStatus[12] = true;
      
  /* Al colocar alguna seccion con un valor de 0 */
                if (hasAnsweredZero(data)) {
                  updatedStatus[13] = true;  
                }
      

                for (let i = 1; i <= 10; i++) {
                  
                  if (level >= i) {
                    console.log('level', level, i);
                    updatedStatus[13 + i] = true;  
                  }
                }
                
                /* Actualizar en base cada 20 puntos */
                if (newPoints >= 20) updatedStatus[24] = true;
                if (newPoints >= 40) updatedStatus[25] = true;
                if (newPoints >= 60) updatedStatus[26] = true;
                if (newPoints >= 80) updatedStatus[27] = true;
                if (newPoints >= 100) updatedStatus[28] = true;
      
                return updatedStatus;
              });
      
            } catch (error) {
              console.error("Error al obtener respuestas:", error);
            }
            
          } catch (error) {
            console.error('Error al obtener questionarios:', error);
          }
        } else {
          setUser(null);
          navigate('/login')
        }
      });
      return () => unsubscribe();
    };

    
  checkUnlockStatus();
  }, [accountCreated, level, navigate]);

/* Valor de reducción de cada huella */
  const countHuellaReductions = (responses) => {
    let reductionCount = 0;
    const sortedResponses = responses.sort(
      (a, b) => new Date(a.fechaHora) - new Date(b.fechaHora)
    );
  
    for (let i = 1; i < sortedResponses.length; i++) {
      const previousHuella = sortedResponses[i - 1].huella; 
      const currentHuella = sortedResponses[i].huella; 
  
  
      if (currentHuella < previousHuella) {
        reductionCount++;
      }
    }
    console.log('reduciton count',reductionCount);
    
    return reductionCount;
  };

  const hasAnsweredZero = (responses) => {
    console.log('response', responses);
    
    return responses.some(response => Object.values(response).some(value => value === ""));
  };

  const progressPercentage = (points / (totalBadges * 10)) * 100;

  const badgeCategories = [
    {
      title: "Cuestionarios",
      badges: badgeDescriptions.slice(0, 6), 
    },
    {
      title: "Reducir Huella",
      badges: badgeDescriptions.slice(6, 13),
    },
    {
      title: "Niveles",
      badges: badgeDescriptions.slice(13, 23), 
    },
    {
      title: "Puntos",
      badges: badgeDescriptions.slice(23),
    },
  ];
  
  

  return (
    
    <div className="nature-icons-container">
      <br />
      <br />      
      <br />
      <h2 className="title">Insignias obtenidas:</h2>
      <div className="points-level">
        <p>Puntos: {points}</p>
        <p>Nivel: {level}</p>
      </div>
      <div className="progress-container">
        
        <div className="progress-bar" style={{ width: `${progressPercentage}%` }}></div>
        

      </div>
      <p className="progress-description">
    La barra muestra tu progreso hacia la obtención de todas las insignias. 
        </p>
        <div className="nature-icons">
  {badgeDescriptions.map((badge, index) => (
    <div key={index} className={`badge ${iconsStatus[index] ? 'unlocked' : 'locked'}`}>
      {badge.icon}
      <div className="badge-description">
        {iconsStatus[index] ? (
          <>
            <span className="badge-title">{badge.title}</span>
            <span className="badge-description-text">{badge.description}</span>
          </>
        ) : (
          <>
            <span className="badge-title unavailable">Insignia {index + 1}<br /> No Disponible</span>
          </>
        )}
      </div>
    </div>
  ))}
</div>






      <Footer /> {}
    </div>
  );
};

export default NatureIcons;
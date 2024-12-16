/* Importamos lo necesario para los datos de firebase */

import { useEffect } from 'react';
import { db } from './firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';

/* Definimos como filtrar el resultado */
const ActivoTotalSumaFiltro = ({ selectedDepartment, selectedMunicipality, selectedZone, onFilteredHuellaTotal }) => {
  useEffect(() => {
    const calculateFilteredHuella = async () => {
      try {
        const usersRef = collection(db, 'users');
        const totalesRef = collection(db, 'totales');
        
        let usersQuery = usersRef;
    
        
        if (selectedDepartment && selectedDepartment !== "Todos") {
          usersQuery = query(usersQuery, where('department', '==', selectedDepartment));
        }
    
        let userDocs = [];
    
        if (selectedMunicipality && selectedMunicipality.length > 0 && selectedMunicipality[0] !== '') {
          const municipalityChunks = [];
          const chunkSize = 10;
    
        
          for (let i = 0; i < selectedMunicipality.length; i += chunkSize) {
            municipalityChunks.push(selectedMunicipality.slice(i, i + chunkSize));
          }
    
          
          for (const chunk of municipalityChunks) {
            let chunkQuery = query(usersQuery, where('municipality', 'in', chunk));
            
            if (selectedZone && selectedZone.length > 0 && selectedZone[0] !== '') {
              chunkQuery = query(chunkQuery, where('zone', 'in', selectedZone));
            }
    
            const chunkDocs = await getDocs(chunkQuery);
            userDocs = userDocs.concat(chunkDocs.docs);
          }
        } else {
          
          const allUserDocs = await getDocs(usersQuery);
          userDocs = allUserDocs.docs;
        }
    
        if (userDocs.length === 0) {
          console.error('No se encontraron datos para calcular la huella de carbono');
          
          onFilteredHuellaTotal(0);  
          return;
        }
    
        const emails = userDocs.map(doc => doc.data().email);
        let totalHuella = 0;
    
        if (emails.length > 0) {
          const emailChunks = [];
          const emailChunkSize = 30;
    
          for (let i = 0; i < emails.length; i += emailChunkSize) {
            emailChunks.push(emails.slice(i, i + emailChunkSize));
          }
    
          const latestHuellaMap = new Map();
    
          
          for (const emailChunk of emailChunks) {
            const queryTotales = query(totalesRef, where('email', 'in', emailChunk));
            const huellaQuery = await getDocs(queryTotales);
    
            huellaQuery.forEach(doc => {
              const data = doc.data();
              const email = data.email;
              const huella = data.huella;
              const fechaHora = data.fechaHora;
    
              if (huella && !isNaN(huella)) {
                if (!latestHuellaMap.has(email) || latestHuellaMap.get(email).fechaHora < fechaHora) {
                  latestHuellaMap.set(email, {
                    huella: Number(huella),
                    fechaHora: fechaHora,
                  });
                }
              }
            });
          }
    
          
          totalHuella = Array.from(latestHuellaMap.values()).reduce((sum, entry) => sum + entry.huella, 0);
        }
        if (onFilteredHuellaTotal) {
          onFilteredHuellaTotal(totalHuella);
        }
    
      } catch (error) {
        console.error('Error al calcular la huella:', error);
      }
      /* try {
        let usersQuery;
        
      
        if (!selectedDepartment && !selectedMunicipality && !selectedZone) {
          usersQuery = collection(db, 'users');  
        } else {
          
          usersQuery = query(
            collection(db, 'users'),
            where('department', '==', selectedDepartment || ''),
            where('municipality', '==', selectedMunicipality || ''),
            where('zone', '==', selectedZone || '')
          );
        }

        const usersSnapshot = await getDocs(usersQuery);
        const userEmails = usersSnapshot.docs.map(doc => doc.data().email);

       
        if (userEmails.length === 0) {
          onFilteredHuellaTotal(0);  
          return;
        }

        const totalesQuery = query(
          collection(db, 'totales'),
          where('email', 'in', userEmails)
        );

        const totalesSnapshot = await getDocs(totalesQuery);
        const latestHuellaMap = new Map();

        totalesSnapshot.forEach((doc) => {
          const data = doc.data();
          const email = data.email;
          const huella = data.huella;
          const fechaHora = data.fechaHora;

          if (huella && !isNaN(huella)) {
            
            if (!latestHuellaMap.has(email) || latestHuellaMap.get(email).fechaHora < fechaHora) {
              latestHuellaMap.set(email, {
                huella: Number(huella),
                fechaHora: fechaHora,
              });
            }
          }
        });

        const sumaHuella = Array.from(latestHuellaMap.values()).reduce((sum, entry) => sum + entry.huella, 0);

        if (onFilteredHuellaTotal) {
          onFilteredHuellaTotal(sumaHuella);
        }
      } catch (error) {
        console.error('Error al calcular la suma del campo huella:', error);
      } */
    };

    calculateFilteredHuella();
  }, [selectedDepartment, selectedMunicipality, selectedZone, onFilteredHuellaTotal]);

  return null;
};

export default ActivoTotalSumaFiltro;

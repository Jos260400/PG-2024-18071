import React, { useEffect, useState } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { useLocation } from 'react-router-dom';
import { obtenerRespuestaPorIdSinEmail } from '../firebaseActions';
import './Share.css';

const Share = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const questionnaireId = queryParams.get('questionnaireId');
  useEffect(() => {

    const fetchData = async () => {
      try {
        
        const questionnaires = await obtenerRespuestaPorIdSinEmail(questionnaireId);
        questionnaires.sort((a, b) => new Date(a.fechaHora) - new Date(b.fechaHora));
        const list = document.getElementById('data-list');
        list.innerHTML = ''; 
        questionnaires.forEach(item => {
          const listItem = document.createElement('li');
          listItem.innerHTML = `
            <p style="margin: 10px 0;"><strong>Email:</strong> ${item.email}</p>
            <p style="margin: 10px 0;"><strong>Fecha y Hora:</strong> ${item.fechaHora}</p>
            <p style="margin: 10px 0;"><strong>Huella de Carbono:</strong> ${item.huella}</p>
          `;
          list.appendChild(listItem);
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    const downloadPDF = () => {
      const list = document.getElementById('data-list');

      html2canvas(list).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save('resultados.pdf');
      }).catch(error => {
        console.error('Error generating PDF:', error);
      });
    };

    fetchData();

    const downloadButton = document.getElementById('download-button');
    if (downloadButton) {
      downloadButton.addEventListener('click', downloadPDF);
    }

  }, [questionnaireId]); 

  return (
    <div style={{ fontFamily: 'Roboto, sans-serif', backgroundColor: '#b2dfdb', margin: 0, padding: '20px', color: '#004d40', textAlign: 'center' }}>
            <br />
      <br />      
      <br />
      <br />
      <br />      
      <br /><h1>Resultados</h1>
      <div className='card'>
        <ul id="data-list" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', listStyleType: 'none', padding: 0 }}></ul>
        <div className='card form-actions'>
        <p>Calcula tu huella de carbono aquí: <a href="https://hdc-lac.vercel.app/">EcoHuella</a></p>
      </div>
      </div>
      <div className="spacer" style={{ height: '200px' }}></div>

    </div>
  );
};

export default Share;

import React from 'react';

const PublicPage = ({ questionnaireData }) => {
  return (
    <div>
      <h1>Huella de Carbono</h1>
      <p>Fecha y Hora: {questionnaireData.dateTime}</p>
      <h2>Detalles del Cuestionario</h2>
      <ul>
        {questionnaireData.sections.map((section, index) => (
          <li key={index}>
            <h3>{section.title}</h3>
            <ul>
              {section.questions.map((question, qIndex) => (
                <li key={qIndex}>{question}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PublicPage;

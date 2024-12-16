import React from 'react';


const Section = ({ section, values, setValues }) => {
  const handleChange = (index, value, question) => {
    const newValues = [...values];
    newValues[index] = value;
    setValues(newValues);

    console.log('question', {question})
    if (question.isParent) {
      if (value == 'No') {
        section.questions.forEach(q => {
          if (q.parentName == question.name) {
            q.show = false;
          }
        })
      } else if (value == 'Sí') {
        section.questions.forEach(q => {
          if (q.parentName == question.name) {
            q.show = true;
          }
        })        
      }
    }
  };

  const renderQuestionInput = (question, index) => {
    if (question.show) {
      if (question.question.includes('Fecha y hora actual')) {
        return <div className="form-control">{}</div>;
      } else if (question.question.includes('(Sí/No)')) {
        return (
          <select
            className="form-control"
            value={values[index] || ''}
            onChange={(e) => handleChange(index, e.target.value, question)}
          >
            <option value="">Seleccione</option>
            <option value="Sí">Sí</option>
            <option value="No">No</option>
          </select>
        );
      } else if (question.question.includes('(Gasolina/Diesel)')) {
        return (
          <select
            className="form-control"
            value={values[index] || ''}
            onChange={(e) => handleChange(index, e.target.value, question)}
          >
            <option value="">Seleccione</option>
            <option value="Gasolina">Gasolina</option>
            <option value="Diesel">Diesel</option>
          </select>
        );
      } else if (question.question.includes('¿En qué clase viajaste más durante el mes?')) {
        return (
          <select
            className="form-control"
            value={values[index] || ''}
            onChange={(e) => handleChange(index, e.target.value, question)}
          >
            <option value="">Seleccione</option>
            <option value="Económica">Económica</option>
            <option value="Primera Clase">Primera Clase</option>
            <option value="Clase Ejecutiva">Clase Ejecutiva</option>
          </select>
        );
      } else if (question.question.includes('¿Cuántas libras de gas consumiste durante el mes?')) {
        return (
          <select
            className="form-control"
            value={values[index] || ''}
            onChange={(e) => handleChange(index, e.target.value, question)}
          >
            <option value="">Seleccione</option>
            <option value="25 lb">25 lb</option>
            <option value="30 lb">30 lb</option>
            <option value="100 lb">100 lb</option>
          </select>
        );
      } else if (question.question.includes('¿qué tipo de materiales preferiste?')) {
        return (
          <select
            className="form-control"
            value={values[index] || ''}
            onChange={(e) => handleChange(index, e.target.value, question)}
          >
            <option value="">Seleccione</option>
            <option value="Ninguna">Ninguna</option>
            <option value="Algodón">Algodón</option>
            <option value="Lana">Lana</option>
            <option value="Manta">Manta</option>
            <option value="Brocado">Brocado</option>
            <option value="Seda">Seda</option>
            <option value="Cuero">Cuero</option>
          </select>
        );
      } else if (question.question.includes('¿Cómo gestionas los desechos líquidos en tu hogar')) {
        return (
          <select
            className="form-control"
            value={values[index] || ''}
            onChange={(e) => handleChange(index, e.target.value, question)}
          >
            <option value="">Seleccione</option>
            <option value="Sistema séptico">Sistema séptico</option>
            <option value="Drenaje público">Drenaje público</option>
          </select>
        );
      } else if (question.question.includes('¿Qué distancia recorriste durante el mes?')) {
        return (
          <input
            type="number"
            className="form-control"
            value={values[index] || ''}
            onChange={(e) => handleChange(index, e.target.value, question)}
            placeholder="Ingrese el número"
          />
        );
      } else {
        return (
          <input
            type="number"
            className="form-control"
            value={values[index] || ''}
            onChange={(e) => handleChange(index, e.target.value, question)}
            placeholder="Ingrese un número"
          />
        );
      }

    } else return null;
  };

  return (
    <div className="section">
      <h2>{section.title}</h2>
      {section.questions.map((question, index) => (
        question.show && <div key={index} className="question">
          <label>{question.question}</label>
          {renderQuestionInput(question, index)}
        </div>
      ))}
    </div>
  );
};

export default Section;

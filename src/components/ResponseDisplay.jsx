import React from 'react';

/* Mostramos los datos guardados */
const ResponseDisplay = ({ showResponses, responses }) => {
  if (!showResponses) {
    return null; 
  }

  return (
    <div>
      <h2>Respuestas Guardadas</h2>
      <p>Respuesta 1: {responses.respuesta1}</p>
      <p>Respuesta 2: {responses.respuesta2}</p>
      <p>Respuesta 3: {responses.respuesta3}</p>
      <p>Respuesta 4: {responses.respuesta4}</p>
      <p>Respuesta 5: {responses.respuesta5}</p>
      <p>Respuesta 6: {responses.respuesta6}</p>
      <p>Respuesta 7: {responses.respuesta7}</p>
      <p>Respuesta 8: {responses.respuesta8}</p>
      <p>Respuesta 9: {responses.respuesta9}</p>
      <p>Respuesta 10: {responses.respuesta10}</p>
      <p>Respuesta 11: {responses.respuesta11}</p>
      <p>Respuesta 12: {responses.respuesta12}</p>
      <p>Respuesta 13: {responses.respuesta13}</p>
      <p>Respuesta 14: {responses.respuesta14}</p>
      <p>Respuesta 15: {responses.respuesta15}</p>
      <p>Respuesta 16: {responses.respuesta16}</p>
      <p>Respuesta 17: {responses.respuesta17}</p>
      <p>Respuesta 18: {responses.respuesta18}</p>
      <p>Respuesta 19: {responses.respuesta19}</p>
      <p>Respuesta 20: {responses.respuesta20}</p>
      <p>Respuesta 21: {responses.respuesta21}</p>
      <p>Respuesta 22: {responses.respuesta22}</p>
      <p>Respuesta 23: {responses.respuesta23}</p>
      <p>Respuesta 24: {responses.respuesta24}</p>
      <p>Respuesta 25: {responses.respuesta25}</p>
      <p>Respuesta 26: {responses.respuesta26}</p>
      <p>Respuesta 27: {response.respuesta27}</p>
      <p>Respuesta 28: {response.respuesta28}</p>
      <p>Respuesta 29: {response.respuesta29}</p>
      <p>Respuesta 30: {response.respuesta30}</p>
      <p>Respuesta 31: {response.respuesta31}</p>
      <p>Respuesta 32: {response.respuesta32}</p>
      <p>Respuesta 33: {response.respuesta33}</p>



    </div>
  );
};

export default ResponseDisplay;

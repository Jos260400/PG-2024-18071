import React from "react";

/* Mostramos los datos guardados */
const ResponsesList = ({ responses }) => {
  return (
    <div>
      {responses.map((response) => (
        <div key={response.id}>
          <p>ID: {response.id}</p>
          <p>Fecha y Hora: {response.fechaHora}</p>
          <p>Huella: {response.huella}</p>
          <p>Respuesta 1: {response.respuesta1}</p>
          <p>Respuesta 2: {response.respuesta2}</p>
          <p>Respuesta 3: {response.respuesta3}</p>
          <p>Respuesta 4: {response.respuesta4}</p>
          <p>Respuesta 5: {response.respuesta5}</p>
          <p>Respuesta 6: {response.respuesta6}</p>
          <p>Respuesta 7: {response.respuesta7}</p>
          <p>Respuesta 8: {response.respuesta8}</p>
          <p>Respuesta 9: {response.respuesta9}</p>
          <p>Respuesta 10: {response.respuesta10}</p>
          <p>Respuesta 11: {response.respuesta11}</p>
          <p>Respuesta 12: {response.respuesta12}</p>
          <p>Respuesta 13: {response.respuesta13}</p>
          <p>Respuesta 14: {response.respuesta14}</p>
          <p>Respuesta 15: {response.respuesta15}</p>
          <p>Respuesta 16: {response.respuesta16}</p>
          <p>Respuesta 17: {response.respuesta17}</p>
          <p>Respuesta 18: {response.respuesta18}</p>
          <p>Respuesta 19: {response.respuesta19}</p>
          <p>Respuesta 20: {response.respuesta20}</p>
          <p>Respuesta 21: {response.respuesta21}</p>
          <p>Respuesta 22: {response.respuesta22}</p>
          <p>Respuesta 23: {response.respuesta23}</p>
          <p>Respuesta 24: {response.respuesta24}</p>
          <p>Respuesta 25: {response.respuesta25}</p>
          <p>Respuesta 26: {response.respuesta26}</p>
          <p>Respuesta 27: {response.respuesta27}</p>
          <p>Respuesta 28: {response.respuesta28}</p>
          <p>Respuesta 29: {response.respuesta29}</p>
          <p>Respuesta 30: {response.respuesta30}</p>
          <p>Respuesta 31: {response.respuesta31}</p>
          <p>Respuesta 32: {response.respuesta32}</p>
          <p>Respuesta 33: {response.respuesta33}</p>
          <p>Email: {response.email}</p>
        </div>
      ))}
    </div>
  );
};

export default ResponsesList;

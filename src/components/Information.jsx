import React from 'react';
import './Information.css'; 
import Footer from './Footer.jsx';

const Information = () => {
    return (
        <div className="information-container">
            <h1 className="information-title">Información</h1>
            <p className="information-paragraph">
                La huella de carbono es una medida del impacto que las actividades humanas tienen sobre el medio ambiente en términos de la cantidad de gases de efecto invernadero (GEI) que se emiten, especialmente dióxido de carbono (CO2).
            </p>
            <p className="information-paragraph">
                La aplicación sobre la huella de carbono está diseñada para ayudar a los usuarios a medir y gestionar su impacto ambiental. A través de un cuestionario interactivo, los usuarios pueden ingresar datos sobre sus hábitos diarios, como el uso de transporte, viajes aéreos, energía, alimentación, vestimenta, residuos y desechos. La aplicación calcula la huella de carbono por persona durante el mes, mostrando cuánto tiene de Kg CO2.
            </p>
            <p className="information-paragraph">
                Puedes realizar cuestionarios, ver tu progreso, ganar insignias, obtener recomendaciones y ver información adicional sobre la aplicación, preguntas frecuentes, entre otros.
            </p>
            <Footer />
        </div>
    );
};

export default Information;

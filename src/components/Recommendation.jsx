/* Importamos las imágenes necesarias */
import React from 'react';
import './Recommendation.css';
import image1 from './1.jpg';
import image2 from './2.jpg';
import image3 from './3.jpg';
import image4 from './4.jpg';
import image5 from './5.jpg';
import image6 from './6.jpg';
import Footer from './Footer.jsx';

/* Colocamos las recomendaciones por sección */
const Recommendation = () => {
  return (
    <div className="recommendation-container">
      <h1>Recomendaciones para Reducir la Huella de Carbono</h1>

      <div className="recommendation-card">
        <div className="recommendation-grid">
          <div className="recommendation-item">
            <img src={image1} alt="Transporte" />
            <div>
              <h2>Transporte</h2>
              <ul>
                <li><strong>Usa transporte público:</strong> Optar por autobuses, reduce significativamente las emisiones per cápita.</li>
                <li><strong>Camina o usa bicicleta:</strong> Para distancias cortas, caminar o andar en bicicleta no solo es saludable, sino que también reduce tu huella de carbono.</li>
                <li><strong>Comparte viajes:</strong> Carpooling o compartir el coche con otros es una excelente manera de reducir emisiones.</li>
                <li><strong>Autos eléctricos o híbridos:</strong> Considera cambiar a vehículos eléctricos o híbridos, que son mucho más eficientes en cuanto a emisiones.</li>
              </ul>
            </div>
          </div>

          <div className="recommendation-item">
            <img src={image2} alt="Vuelos Aéreos" />
            <div>
              <h2>Vuelos Aéreos</h2>
              <ul>
                <li><strong>Reduce la cantidad de vuelos:</strong> Intenta optar por reuniones virtuales si es posible.</li>
                <li><strong>Vuela sin escalas:</strong> Los vuelos directos son más eficientes, ya que el despegue y aterrizaje son las etapas que consumen más combustible.</li>
                <li><strong>Compensa tu huella de carbono:</strong> Muchas aerolíneas ofrecen opciones para compensar las emisiones de tu vuelo mediante proyectos de reforestación o energías limpias.</li>
              </ul>
            </div>
          </div>

          <div className="recommendation-item">
            <img src={image3} alt="Energía" />
            <div>
              <h2>Energía</h2>
              <ul>
                <li><strong>Cambia a energías renovables:</strong> Si es posible, instala paneles solares o contrata energía proveniente de fuentes limpias como la eólica o solar.</li>
                <li><strong>Apaga dispositivos:</strong> Desconecta los dispositivos eléctricos cuando no los estés utilizando, y apaga las luces en habitaciones vacías.</li>
                <li><strong>Usa electrodomésticos eficientes:</strong> Los electrodomésticos con certificación de bajo consumo energético pueden reducir considerablemente tu uso de energía.</li>
              </ul>
            </div>
          </div>

          <div className="recommendation-item">
            <img src={image4} alt="Alimentación" />
            <div>
              <h2>Alimentación</h2>
              <ul>
                <li><strong>Reduce el consumo de carne:</strong> Considera reducir el consumo de carne roja, ya que la ganadería es una de las principales fuentes de emisiones de metano.</li>
                <li><strong>Compra productos locales:</strong> Los alimentos locales y de temporada requieren menos energía para su transporte y refrigeración.</li>
                <li><strong>Reduce el desperdicio de alimentos:</strong> Planifica tus comidas para evitar el desperdicio y considera compostar restos orgánicos.</li>
              </ul>
            </div>
          </div>

          <div className="recommendation-item">
            <img src={image5} alt="Vestimenta" />
            <div>
              <h2>Vestimenta</h2>
              <ul>
                <li><strong>Compra ropa de calidad:</strong> Opta por prendas duraderas en lugar de moda rápida, que requiere un mayor volumen de recursos.</li>
                <li><strong>Reutiliza y recicla:</strong> Dona o intercambia ropa que ya no usas, o compra en tiendas de segunda mano.</li>
                <li><strong>Elige materiales sostenibles:</strong> Prendas hechas con algodón orgánico, lino o materiales reciclados son opciones más ecológicas.</li>
              </ul>
            </div>
          </div>

          <div className="recommendation-item">
            <img src={image6} alt="Residuos y Desechos" />
            <div>
              <h2>Residuos y Desechos</h2>
              <ul>
                <li><strong>Recicla:</strong> Asegúrate de separar correctamente los residuos para facilitar su reciclaje.</li>
                <li><strong>Composta residuos orgánicos:</strong> En lugar de tirar restos de comida, utilízalos para hacer compost, reduciendo el metano emitido en los vertederos.</li>
                <li><strong>Reduce el uso de plásticos:</strong> Lleva tus propias bolsas reutilizables y botellas de agua para evitar el uso de plásticos de un solo uso.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Recommendation;

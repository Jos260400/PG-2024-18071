import React from 'react';

const CarbonEquivalencies = ({ carbonFootprint }) => {
  const treesNeeded = (carbonFootprint / 25).toFixed(1);
  const plasticWasteEquivalent = (carbonFootprint / 6).toFixed(1);
  const recycledPlasticSaved = ((carbonFootprint / 6) * 0.4).toFixed(1);
  const deforestationTimeSeconds = ((carbonFootprint / 7600000) * 60).toFixed(2);

  const cardStyle = {
    padding: '25px',
    border: '2px solid',
    borderRadius: '12px',
    backgroundColor: '#ffffff',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    display: 'flex',
    flexDirection: 'column',
    height: '250px', // Altura fija para todas las tarjetas
    justifyContent: 'space-between'
  };

  const titleStyle = {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '15px',
    textAlign: 'center',
    color: '#000000',
    height: '35px', // Altura fija para los títulos
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  };

  const contentStyle = {
    textAlign: 'center',
    fontSize: '18px',
    color: '#000000',
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  };

  const valueStyle = {
    fontSize: '32px',
    fontWeight: 'bold',
    margin: '15px 0',
    lineHeight: '1.2'
  };

  return (
    <div style={{
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '20px',
      backgroundColor: 'white'
    }}>
      <h2 style={{
        fontSize: '32px',
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: '30px',
        color: '#000'
      }}>
        Equivalencias de tu Huella de Carbono
      </h2>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '25px',
        marginBottom: '30px'
      }}>
        {/* Árboles Necesarios */}
        <div style={{...cardStyle, borderColor: '#2E7D32'}}>
          <h3 style={titleStyle}>
            🌳 Árboles Necesarios
          </h3>
          <div style={contentStyle}>
            <p>Tu huella de carbono equivale a lo que absorben</p>
            <div style={{...valueStyle, color: '#2E7D32'}}>
              {treesNeeded} árboles
            </div>
            <p>en un año</p>
          </div>
        </div>

        {/* Impacto de Deforestación */}
        <div style={{...cardStyle, borderColor: '#D32F2F'}}>
          <h3 style={titleStyle}>
            🌲 Impacto de Deforestación
          </h3>
          <div style={contentStyle}>
            <p>Tu huella equivale a la pérdida de CO₂ por deforestación durante</p>
            <div style={{...valueStyle, color: '#D32F2F'}}>
              {deforestationTimeSeconds} segundos
            </div>
            <p>a nivel mundial</p>
          </div>
        </div>

        {/* Impacto del Reciclaje */}
        <div style={{...cardStyle, borderColor: '#6A1B9A'}}>
          <h3 style={titleStyle}>
            ♻️ Impacto del Reciclaje
          </h3>
          <div style={contentStyle}>
            <p>Reciclando plástico podrías evitar</p>
            <div style={{...valueStyle, color: '#6A1B9A'}}>
              {recycledPlasticSaved} kg de CO₂
            </div>
            <p>de emisiones</p>
          </div>
        </div>

        {/* Equivalente en Plástico */}
        <div style={{...cardStyle, borderColor: '#1565C0'}}>
          <h3 style={titleStyle}>
            🗑️ Equivalente en Plástico
          </h3>
          <div style={contentStyle}>
            <p>Tu huella equivale a la producción de</p>
            <div style={{...valueStyle, color: '#1565C0'}}>
              {plasticWasteEquivalent} kg de plástico
            </div>
            <p>nuevo</p>
          </div>
        </div>
      </div>

      <div style={{
        textAlign: 'center',
        fontSize: '16px',
        color: '#000000',
        maxWidth: '800px',
        margin: '0 auto',
        padding: '20px',
        backgroundColor: '#ffffff',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <p style={{ 
          marginBottom: '12px',
          fontWeight: 'bold'
        }}>
          * Estos cálculos son aproximados y están basados en promedios globales:
        </p>
        <ul style={{
          listStyleType: 'disc',
          textAlign: 'left',
          paddingLeft: '40px',
          fontSize: '16px',
          lineHeight: '1.6'
        }}>
          <li>Un árbol absorbe aproximadamente 25 kg de CO₂ al año.</li>
          <li>La producción de 1 kg de plástico emite aproximadamente 6 kg de CO₂.</li>
          <li>El reciclaje de plástico puede reducir las emisiones de CO₂ hasta en un 40%.</li>
          <li>Se pierden aproximadamente 38 hectáreas de bosque por minuto a nivel mundial.</li>
        </ul>
      </div>
    </div>
  );
};

export default CarbonEquivalencies;
/* Importamos cada componente y archivo */
import React from 'react';
import './FAQ.css';
import Footer from './Footer.jsx';

/* Colocamos cada una de las preguntas y sus respuestas */
const FAQ = () => {
  return (
    <div className="faq-container">
      <header className="faq-header">
        <h1>Preguntas Frecuentes</h1>
      </header>
      <main className="faq-content">
        <section className="faq-item">
          <h2>¿Cómo me registro en la aplicación?</h2>
          <p>Debes ir a “Iniciar Sesión” y si no tienes una cuenta puedes darle click a "Crear Cuenta". Al momento de registrarte en EcoHuella, tendrás que colocar tu correo electrónico, una contraseña de 6 caracteres o más, y proporcionando información del departamento, municipio y zona donde vives</p>
        </section>
        <section className="faq-item">
          <h2>¿Cómo calculo mi huella de carbono?</h2>
          <p>Al registrarte y luego iniciar sesión, podrás ser redirigido para completar el cuestionario en cada una de las áreas clave.</p>
        </section>
        <section className="faq-item">
          <h2>¿Qué es la huella de carbono?</h2>
          <p>La huella de carbono es la cantidad total de gases de efecto invernadero emitidos directa o indirectamente por actividades humanas.</p>
        </section>
        <section className="faq-item">
          <h2>¿Cómo se mide la huella de carbono?</h2>
          <p>La huella de carbono se mide en toneladas de CO2 equivalente y se calcula con base en las emisiones de diferentes actividades.</p>
        </section>
        <section className="faq-item">
          <h2>¿Puedo modificar mi información después de registrarme?</h2>
          <p>Si, luego de crear tu cuenta e iniciar sesión podras ir a perfil y editar tu información.</p>
        </section>

        <section className="faq-item">
          <h2>¿Cómo puedo reducir mi huella de carbono?</h2>
          <p>Puedes reducir tu huella de carbono adoptando hábitos sostenibles como usar transporte público, reducir el consumo de energía y reciclar.</p>
        </section>
        <section className="faq-item">
          <h2>¿La aplicación es gratuita?</h2>
          <p>Sí, EcoHuella es completamente gratuita para todos los usuarios.</p>
        </section>
        <section className="faq-item">
          <h2>¿Es necesario completar todo el cuestionario de una vez?</h2>
          <p>Si, debes completar las áreas clave al momento de calcular tu huella de carbono.</p>
        </section>
        <section className="faq-item">
          <h2>¿Qué tipo de datos recopila la aplicación?</h2>
          <p>La aplicación recopila datos relacionados a transporte, viajes aéreos, energía, alimentación, vestimenta, residuos y desechos.</p>
        </section>
        <section className="faq-item">
          <h2>¿Cómo protegen mi información personal?</h2>
          <p>Tu información está protegida mediante encriptación y solo será utilizada para fines educativos.</p>
        </section>
        <section className="faq-item">
          <h2>¿Quién puede ver mi huella de carbono?</h2>
          <p>Solo tú puedes ver tu huella de carbono.</p>
        </section>
        <section className="faq-item">
          <h2>¿Puedo eliminar mi cuenta?</h2>
          <p>No, no puedes eliminar tu cuenta.</p>
        </section>
        <section className="faq-item">
          <h2>¿Qué hago si olvido mi contraseña?</h2>
          <p>Debes recordar tu contraseña en todo momento.</p>
        </section>
        <section className="faq-item">
          <h2>¿Cómo puedo compartir mis resultados?</h2>
          <p>Puedes compartir tus resultados a través de redes sociales o por correo electrónico utilizando la opción de compartir tu resultado.</p>
        </section>
        <section className="faq-item">
          <h2>¿La aplicación funciona sin conexión?</h2>
          <p>No, necesitas estar conectado a internet para acceder y asi utilizar todas las funcionalidades de la aplicación.</p>
        </section>
        <section className="faq-item">
          <h2>¿Cómo se calculan los resultados de la huella de carbono?</h2>
          <p>Los resultados se calculan mediante fórmulas basadas en datos de consumo y actividades que emiten gases de efecto invernadero.</p>
        </section>
        <section className="faq-item">
          <h2>¿Puedo ver el impacto de mis acciones a lo largo del tiempo?</h2>
          <p>Sí, puedes acceder a un historial de tus evaluaciones y ver cómo cambia tu huella de carbono a lo largo del tiempo.</p>
        </section>
        <section className="faq-item">
          <h2>¿La aplicación tiene soporte técnico?</h2>
          <p>No, debido a que no hay un equipo relacionado a ello.</p>
        </section>
        <section className="faq-item">
          <h2>¿Puedo recomendar la aplicación a otros?</h2>
          <p>Por supuesto, puedes invitar a otros a utilizar EcoHuella compartiendo el enlace con tus amigos y familiares.</p>
        </section>
        {}
      </main>
      <Footer />
    </div>
  );
};

export default FAQ;

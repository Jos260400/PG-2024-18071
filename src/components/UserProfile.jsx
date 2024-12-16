import Footer from './Footer';

/* Opciones para Navegar a Home */
const UserProfile = ({ user, onGoBack }) => {
  return (
    <div className="page-container">
      <header className="header">
        <div className="header-left">
          <h1>EcoHuella</h1>
        </div>
        <div className="header-right">
          <ul className="header-nav">
            <li><button onClick={onGoBack}>Inicio</button></li>
          </ul>
        </div>
      </header>

      <Footer />
    </div>
  );
}

export default UserProfile;

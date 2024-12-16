/* Importamos cada componente */
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/Home.jsx';
import NewQuestionnaire from './components/NewQuestionnaire.jsx';
import Questionnaires from './components/Questionnaires.jsx';
import Badges from './components/Badges.jsx';
import Recommendation from './components/Recommendation.jsx';
import Information from './components/Information.jsx';
import FAQ from './components/FAQ.jsx';
import Navbar from './components/Navbar.jsx';
import Login from './components/Login.jsx';
import NewLogin from './components/NewLogin.jsx';
import Register from './components/Register.jsx';
import NewProfile from './components/NewProfile.jsx';
import NewRegister from './components/NewRegister.jsx';
import QuestionnaireDetails from './components/QuestionnaireDetails.jsx';
import ShowDocument from './components/ShowDocument.jsx';
import Share from './components/Share.jsx';


/* Colocamos cada ruta */

function NewApp() {
  return (
    <Router>
      <Navbar />
      <div  className="content">
        <Routes>
            <Route path="/" element={<Navigate to="/home" replace />} />
            <Route path="/home" element={<Home />} />
            <Route path="/new-questionnaire" element={<NewQuestionnaire />} />
            <Route path="/questionnaires" element={<Questionnaires />} />
            <Route path="/questionnaire/:questionnaireId" element={<QuestionnaireDetails />} />
            <Route path="/questionnaire/document/:questionnaireId" element={<ShowDocument />} />
            <Route path="/badges" element={<Badges />} />
            <Route path="/recommendation" element={<Recommendation />} />
            <Route path="/information" element={<Information />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/login" element={<NewLogin />} />
            <Route path="/register" element={<NewRegister />} />
            <Route path="/profile" element={<NewProfile />} />
            <Route path="/share" element={<Share />} />
        </Routes>
      </div>
    </Router>
  );
}

export default NewApp;
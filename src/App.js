import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home/Home';
import Navbar from './components/Navbar/Navbar';
import Galerie from './components/Galerie/Galerie';
import APropos from './components/APropos/APropos';
import Services from './components/Services/Services';
import Tarifs from './components/Tarifs/Tarifs';
import Avis from './components/Avis/Avis';
import Disponibilites from './components/Disponibilites/Disponibilites';
import Contact from './components/Contact/Contact';
import Acces from './components/Acces/Acces';
import Reservation from './components/Reservation/Reservation';
import ManageGalerie from './components/Admin/ManageGalerie';
import AdmDashboard from './components/Admin/AdmDashboard';


function App() {

  

  return (
    <Router>
      <Navbar />
      <div className="container">
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/galerie" element={<Galerie />} />
          <Route path="/a-propos" element={<APropos />} />
          <Route path="/nos-services" element={<Services />} />
          <Route path="/tarifs" element={<Tarifs />} />
          <Route path="/avis" element={<Avis />} />
          <Route path="/disponibilites" element={<Disponibilites />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/acces" element={<Acces />} />
          <Route path="/reservation" element={<Reservation />} />
          <Route path="/adm/galerie" element={<ManageGalerie />} />
          <Route path="/adm/dashboard" element={<AdmDashboard/>} />
          
        </Routes>
      </div>
    </Router>
  );
}

export default App;

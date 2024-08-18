import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PatientDetail from './components/PatientDetail';
import Home from './components/Home';
import NavBar from './components/NavBar';
import DrawerCompo from './components/DrawerCompo';
import AddNewPatient from './components/AddNewPatient';
import AllPatients from './components/AllPatients';
import MedicalVisit from './components/MedicalVisit';
import ErrorPage from './components/ErrorPage';
import Examination from './components/Examination';
import Vaccins from './components/Vaccins';
import Allergies from './components/Allergies';
import Radiologies from './components/Radiologies';
import TestSang from './components/TestSang';
import Autre from './components/Autre';
import Perscription from './components/Perscription';
import SuggestedPatients from './components/SuggestedPatients';
import Charges from './components/Charges';
import FastCertif from './components/FastCertif';
function App() {
  return (
    <Router>
      <NavBar />
      <DrawerCompo />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/patient" element={<PatientDetail />} />
        <Route path="/medicalVisit" element={<MedicalVisit />}></Route>
        <Route path="/examinations" element={<Examination />}></Route> /
        <Route path="/newpatient" element={<AddNewPatient />}></Route>
        <Route path="/allpatients" element={<AllPatients />}></Route>
        <Route path="/vaccins" element={<Vaccins />}></Route>
        <Route path="/allergies" element={<Allergies />}></Route>
        <Route path="/radiologies" element={<Radiologies />}></Route>
        <Route path="/testSang" element={<TestSang />}></Route>
        <Route path="/patientssuggeree" element={<SuggestedPatients />}></Route>
        <Route path="/ordonnance" element={<Perscription />}></Route>
        <Route path="/charges" element={<Charges />}></Route>
        <Route path="/certificatrapide" element={<FastCertif />}></Route>
        <Route path="/autre" element={<Autre />}></Route>
        <Route path="*" element={<ErrorPage />}></Route>
      </Routes>
    </Router>
  );
}

export default App;

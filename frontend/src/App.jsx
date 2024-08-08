import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PatientDetail from './components/PatientDetail';
import Home from './components/Home';
import NavBar from './components/NavBar';
import DrawerCompo from './components/DrawerCompo';
import AddNewPatient from './components/AddNewPatient';
import AllPatiens from './components/AllPatiens';
import MedicalVisit from './components/MedicalVisit';
function App() {
  return (
    <Router>
      <NavBar />
      <DrawerCompo />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/patient" element={<PatientDetail />} />
        <Route path="/medicalVisit" element={<MedicalVisit />}></Route>  /
        <Route path="/new_patient" element={<AddNewPatient />}>
          
        </Route>
        <Route path="/all_patients" element={<AllPatiens />}></Route>
      </Routes>
    </Router>
  );
}

export default App;

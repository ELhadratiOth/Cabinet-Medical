import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import NavBar from './components/NavBar';
import DrawerCompo from './components/DrawerCompo';
import ErrorPage from './components/ErrorPage';
import LogPage from './components/LogPage';
import { Spinner } from 'flowbite-react';
import { lazy, Suspense } from 'react';
  
  
  
const PatientDetail = lazy(() => import('./components/PatientDetail'));
const Home = lazy(() => import('./components/Home'));
const AddNewPatient = lazy(() => import('./components/AddNewPatient'));
const AllPatients = lazy(() => import('./components/AllPatients'));
const MedicalVisit = lazy(() => import('./components/MedicalVisit'));
const Examination = lazy(() => import('./components/Examination'));
const Vaccins = lazy(() => import('./components/Vaccins'));
const Allergies = lazy(() => import('./components/Allergies'));
const Radiologies = lazy(() => import('./components/Radiologies'));
const TestSang = lazy(() => import('./components/TestSang'));
const SuggestedPatients = lazy(() =>
  import('./components/SuggestedPatients'),
);
const Perscription = lazy(() => import('./components/Perscription'));
const Charges = lazy(() => import('./components/Charges'));
const FastCertif = lazy(() => import('./components/FastCertif'));
const Autre = lazy(() => import('./components/Autre'));

function App() {
  return (
    <Router>
      <NavBar />
      <DrawerCompo />
      <Suspense
        fallback={
          <div className="flex items-center justify-center pl-40 pt-28 h-screen">
            <Spinner size="xl" />
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<LogPage />} />
          <Route path="/home" element={<Home />} />
          <Route path="/patient" element={<PatientDetail />} />
          <Route path="/medicalVisit" element={<MedicalVisit />} />
          <Route path="/examinations" element={<Examination />} />
          <Route path="/newpatient" element={<AddNewPatient />} />
          <Route path="/allpatients" element={<AllPatients />} />
          <Route path="/vaccins" element={<Vaccins />} />
          <Route path="/allergies" element={<Allergies />} />
          <Route path="/radiologies" element={<Radiologies />} />
          <Route path="/testSang" element={<TestSang />} />
          <Route path="/patientssuggeree" element={<SuggestedPatients />} />
          <Route path="/ordonnance" element={<Perscription />} />
          <Route path="/charges" element={<Charges />} />
          <Route path="/certificatrapide" element={<FastCertif />} />
          <Route path="/autre" element={<Autre />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;

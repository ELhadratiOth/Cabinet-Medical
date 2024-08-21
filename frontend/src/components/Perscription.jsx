import Img from '../assets/img13.png';
import { HR } from 'flowbite-react';
import { useLocation, useNavigate } from 'react-router-dom';
import PatientMenu from './PatientMenu';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useState , useEffect } from 'react';
import PDFTemplate from './PDFTEmplate';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { Link } from 'react-router-dom';
import API from '../API';

const Perscription = () => {
  const navigate = useNavigate();

const suppressWarning = () => { // hode warning
  const originalConsoleError = console.error;
  console.error = (...args) => {
    if (/validateDOMNesting/.test(args[0])) {
      return;
    }
    originalConsoleError(...args);
  };
};

  suppressWarning();
  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await API.get(`user/verify-token/${token}`);
        console.log('Response Data:', response.data);

        if (response.status !== 200) {
          throw new Error('Token verification failed');
        }
      } catch (error) {
        console.log('Verification Error:', error);
        localStorage.removeItem('token');
        navigate('/');
      }
    };

    verifyToken();
  } , [])

  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const firstname = query.get('firstname');
  const lastname = query.get('lastname');
  const id_visit = query.get('id_visit')
  const [medications, setMedications] = useState([
    { id: Date.now(), name: '', description: '' },
  ]);

 const fetchMedicalVisits = async () => {
   try {
     const response = await API.get(`/medical_visits/${firstname}/${lastname}`);
     console.log(response.data);
   } catch (error) {
     console.warn('Error fetching medical visits:', error);
   }
 };
 const formatMedicationsData = () => {
   return medications.map(med => `${med.name}&${med.description}`).join('^'); // Use ^ or any delimiter you prefer
 };
  const updateMedic = async (e) => {
    e.preventDefault();
    const formatted = formatMedicationsData();
   try {
     await API.put(`/medical_visits/update/${id_visit}`, { medics: formatted });
     fetchMedicalVisits(); // Refresh the medical visits after update
   } catch (error) {
     console.warn('Error updating medics:', error);
   }
 };


  const addMedication = () => {
    setMedications([
      ...medications,
      { id: Date.now(), name: '', description: '' },
    ]);
  };

  const handleChange = (id, field, value) => {
    setMedications(
      medications.map(med =>
        med.id === id ? { ...med, [field]: value } : med,
      ),
    );
  };

  return (
    <div className="relative ml-60 px-10 space-y-8 mt-28 flex flex-col mb-20">
      <img
        src={Img}
        alt="background"
        className="fixed -z-10 right-[25%] top-[15.6rem] w-[510px] opacity-50"
      />
      <div className="w-full flex justify-between items-center ">
        <div className="text-3xl font-semibold text-blue-700">
          Créer Ordonnance
          <HR.Trimmed className="bg-blue-300 md:w-[17rem] md:mx-0 md:mt-3 md:mb-0" />
        </div>
        <div className="bg-blue-200 rounded-md border-2 border-blue-300 py-1 px-3 flex space-x-2 items-center">
          <div className="bg-white p-2 px-4 rounded-md text-blue-600 font-semibold">
            Patient concerné:{' '}
            <span className="capitalize font-bold">
              {firstname + ' ' + lastname}
            </span>
          </div>
          <PatientMenu firstname={firstname} lastname={lastname} />
        </div>
      </div>

      <form
        className={`relative self-center space-y-6 flex flex-col justify-center items-center w-1/2 bg-white/60 backdrop-blur-sm p-6 rounded-md shadow-lg border-l-4 border-blue-500 ${
          medications.length === 1 ? 'absolute top-[7rem]' : ''
        }`}
      >
        {medications.map(med => (
          <div key={med.id} className="space-y-4 w-full">
            <div className="space-y-2">
              <Label htmlFor={`medication-${med.id}`} className="text-blue-600">
                Nom du médicament
              </Label>
              <Input
                id={`medication-${med.id}`}
                value={med.name}
                onChange={e => handleChange(med.id, 'name', e.target.value)}
                placeholder="Nom du médicament"
                className="border-blue-300 focus:border-blue-500"
              />
            </div>
            <div className="space-y-2">
              <Label
                htmlFor={`description-${med.id}`}
                className="text-blue-600"
              >
                Détail
              </Label>
              <Textarea
                id={`description-${med.id}`}
                value={med.description}
                onChange={e =>
                  handleChange(med.id, 'description', e.target.value)
                }
                placeholder="Détail sur le médicament"
                className="border-blue-300 focus:border-blue-500"
              />
            </div>
          </div>
        ))}

        <div className="flex self-start space-x-4">
          <Button
            type="button"
            variant="primary"
            className="px-4 py-2 ring-2 ring-blue-300 hover:bg-blue-300 hover:text-white backdrop-blur-xl bg-blue-100 text-blue-700"
            onClick={addMedication}
          >
            Ajouter un médicament
          </Button>
          <Button
            type="submit"
            variant="primary"
            className="px-4 py-2 ring-2 ring-blue-500 hover:bg-blue-400 hover:text-white bg-blue-300 text-blue-800"
            onClick={updateMedic}
          >
            <Link
              to={`/medicalVisit?firstname=${firstname}&lastname=${lastname}`}
            >
              <PDFDownloadLink
                document={<PDFTemplate medications={medications} />}
                fileName={`${firstname}_${lastname}.pdf`}
              >
                Confirmer l&apos;ordonnance
              </PDFDownloadLink>
            </Link>
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Perscription;

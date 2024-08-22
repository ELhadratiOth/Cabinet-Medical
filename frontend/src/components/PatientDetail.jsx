/* eslint-disable react-hooks/exhaustive-deps */
import { useLocation , useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import API from '../API';
import Alert from './Alert';
import PatientEditAndDelete from './EditandDeletePatient';
import PatientMenu from './PatientMenu';
import Img from '../assets/img6.png';
import { HR } from 'flowbite-react';
const PatientDetail = () => {
  const navigate = useNavigate();
  const [patient, setPatient] = useState({});
  const [error, setError] = useState(false);
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const firstname = query.get('firstname');
  const lastname = query.get('lastname');


  const fetchPatientData = async () => {
    try {
      if (firstname && lastname) {
        const response = await API.get(
          `/patients/search/${firstname.trim().toLowerCase()}/${lastname
            .trim()
            .toLowerCase()}`,
        );
        setPatient(response.data);
        setError(false);
      }
    } catch (error) {
      console.error('Error fetching patient data:', error);
      setError(true);

      
    }
  };

  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await API.get(`user/verify-token/${token}`);
        if (response.status !== 200) {
          throw new Error('Token verification failed');
        }
      } catch (error) {
        console.error('Verification Error:', error);
        localStorage.removeItem('token');
        navigate('/');
      }
    };

    verifyToken();
    fetchPatientData();
  }, [firstname, lastname]);

  return (
    <div className="ml-60 px-10 flex flex-col justify-center space-y-12 mt-28  pb-10 ">
      <img
        src={Img}
        alt="background"
        className="fixed -z-10 opacity-30 right-[30%] top-[17rem] w-[470px] "
      />
      <div className="text-4xl font-semibold flex justify-between items-center  ">
        <div className="self-start text-blue-900">
          Données Patient
          <HR.Trimmed className="bg-blue-200  md:mt-2 md:w-[18.2rem] md:mx-0 md:mb-0" />
        </div>
        <div className=" border-blue-200 bg-blue-100 px-1 h-fit rounded-md border flex justify-center items-center space-x-1">
          <PatientMenu firstname={firstname} lastname={lastname} />

          <PatientEditAndDelete
            patient_data={patient}
            update_patient_data={data => setPatient(data)}
          />
        </div>
      </div>

      <div className="flow-root self-center   rounded-lg ring-2 w-2/3  overflow-hidden ring-blue-100 py-3 shadow-xl  capitalize">
        {error ? (
          <Alert
            title="Verifier le Nom et le Prenom du Patient"
            msg="le Nom ou/et le Prenom du Patient est incorrect , Veuillez Saisir a Nouveau"
            open={!!error}
            onClose={() => setError(null)}
            path="/all_patients"
          />
        ) : (
          <dl className="-my-3 divide-y divide-gray-100/70 text-base">
            <div className="grid grid-cols-1 gap-1 p-3 even:bg-blue-50/70 backdrop-blur-sm sm:grid-cols-3 sm:gap-4">
              <dt className="font-medium text-gray-900">Nom et Prénom</dt>
              <dd className="text-gray-700 sm:col-span-2 capitalize">
                {patient.firstname + ' ' + patient.lastname}
              </dd>
            </div>

            <div className="grid grid-cols-1 gap-1 p-3 even:bg-blue-50/70 backdrop-blur-sm sm:grid-cols-3 sm:gap-4">
              <dt className="font-medium text-gray-900">CINE</dt>
              <dd className="text-gray-700 sm:col-span-2">{patient.cin}</dd>
            </div>
            <div className="grid grid-cols-1 gap-1 p-3 even:bg-blue-50/70 backdrop-blur-sm sm:grid-cols-3 sm:gap-4">
              <dt className="font-medium text-gray-900">Date de Création</dt>
              <dd className="text-gray-700 sm:col-span-2">
                {patient.first_visit}
              </dd>
            </div>

            <div className="grid grid-cols-1 gap-1 p-3 even:bg-blue-50/70 backdrop-blur-sm sm:grid-cols-3 sm:gap-4">
              <dt className="font-medium  text-gray-900">Age</dt>
              <dd className="text-gray-700 sm:col-span-2 lowercase">
                {patient.age} ans
              </dd>
            </div>

            <div className="grid grid-cols-1 gap-1 p-3 even:bg-blue-50/70 backdrop-blur-sm sm:grid-cols-3 sm:gap-4">
              <dt className="font-medium text-gray-900">Sexe</dt>
              <dd className="text-gray-700 sm:col-span-2">{patient.gender}</dd>
            </div>

            <div className="grid grid-cols-1 gap-1 p-3 even:bg-blue-50 sm:grid-cols-3 normal-case	 sm:gap-4">
              <dt className="font-medium text-gray-900">Numéro de Téléphone</dt>
              <dd className="text-gray-700 sm:col-span-2">
                {patient.phonenumber}
              </dd>
            </div>
            <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
              <dt className="font-medium text-gray-900">Date de Naissance</dt>
              <dd className="text-gray-700 sm:col-span-2">
                {patient.birthday}
              </dd>
            </div>
          </dl>
        )}
      </div>
    </div>
  );
};

export default PatientDetail;

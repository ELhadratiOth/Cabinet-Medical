/* eslint-disable react-hooks/exhaustive-deps */
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import API from '../API';
import Alert from './Alert';
import PatientEditAndDelete from './EditandDeletePatient';
import PatientMenu from './PatientMenu';
import Img from '../assets/img6.png';
import { HR } from 'flowbite-react';

const PatientDetail = () => {
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
          `/patients/search?firstname=${firstname.trim()}&lastname=${lastname.trim()}`,
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
    fetchPatientData();
  }, [firstname, lastname]);

  return (
    <div className="ml-60 px-10 flex flex-col justify-center space-y-10 mt-36  pb-10 ">
      <img
        src={Img}
        alt="background"
        className="fixed -z-10 opacity-30 right-[30%] top-[17rem] w-[470px] "
      />
      <div className="text-4xl font-semibold flex justify-between items-center ">
        <div className="self-start">
          Patient Infos:
          <HR.Trimmed className="bg-blue-200  md:mt-2 md:w-[15rem] md:mx-0 md:mb-0" />
        </div>
        <div className=" border-blue-200 bg-blue-100 px-1 rounded-md border flex justify-center items-center space-x-1">
          <PatientMenu firstname={firstname} lastname={lastname} />

          <PatientEditAndDelete
            patient_data={patient}
            update_patient_data={data => setPatient(data)}
          />
        </div>
      </div>

      <div className="flow-root self-center  rounded-lg ring-2 w-2/3  overflow-hidden ring-blue-100 py-3 shadow-sm  capitalize">
        {error ? (
          <Alert
            title="Verifier le Nom et le Prenom du Patient"
            msg="le Nom ou/et le Prenom du Patient est incorrect , Veuillez Saisir a Nouveau"
            open={!!error}
            onClose={() => setError(null)}
          />
        ) : (
          <dl className="-my-3 divide-y divide-gray-100/70 text-base">
            <div className="grid grid-cols-1 gap-1 p-3 even:bg-blue-50/70 backdrop-blur-sm sm:grid-cols-3 sm:gap-4">
              <dt className="font-medium text-gray-900">Nom Complet</dt>
              <dd className="text-gray-700 sm:col-span-2 capitalize">
                {patient.firstname + ' ' + patient.lastname}
              </dd>
            </div>

            <div className="grid grid-cols-1 gap-1 p-3 even:bg-blue-50/70 backdrop-blur-sm sm:grid-cols-3 sm:gap-4">
              <dt className="font-medium text-gray-900">Carte National</dt>
              <dd className="text-gray-700 sm:col-span-2">{patient.cin}</dd>
            </div>
            <div className="grid grid-cols-1 gap-1 p-3 even:bg-blue-50/70 backdrop-blur-sm sm:grid-cols-3 sm:gap-4">
              <dt className="font-medium text-gray-900">Premier Visite</dt>
              <dd className="text-gray-700 sm:col-span-2">
                {patient.first_visit}
              </dd>
            </div>

            <div className="grid grid-cols-1 gap-1 p-3 even:bg-blue-50/70 backdrop-blur-sm sm:grid-cols-3 sm:gap-4">
              <dt className="font-medium text-gray-900">Age</dt>
              <dd className="text-gray-700 sm:col-span-2">{patient.age}</dd>
            </div>

            <div className="grid grid-cols-1 gap-1 p-3 even:bg-blue-50/70 backdrop-blur-sm sm:grid-cols-3 sm:gap-4">
              <dt className="font-medium text-gray-900">Gender</dt>
              <dd className="text-gray-700 sm:col-span-2">{patient.gender}</dd>
            </div>
            <div className="grid grid-cols-1 gap-1 p-3 even:bg-blue-50/70 backdrop-blur-sm sm:grid-cols-3 sm:gap-4">
              <dt className="font-medium text-gray-900">Maladie</dt>
              <dd className="text-gray-700 sm:col-span-2">{patient.disease}</dd>
            </div>

            <div className="grid grid-cols-1 gap-1 p-3 even:bg-blue-50/70 backdrop-blur-sm sm:grid-cols-3 sm:gap-4">
              <dt className="font-medium text-gray-900">Description</dt>
              <dd className="text-gray-700 sm:col-span-2">
                {patient.description}
              </dd>
            </div>

            <div className="grid grid-cols-1 gap-1 p-3 even:bg-blue-50 sm:grid-cols-3 sm:gap-4">
              <dt className="font-medium text-gray-900">Numero de Telephone</dt>
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

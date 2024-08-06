import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import api from '../API';

const PatientsTable = () => {
  const [patients, setPatients] = useState([]);

  const fetchPatients = async () => {
    try {
      const response = await api.get('/patients/all');
      setPatients(response.data);
    } catch (error) {
      console.error('Error fetching patients:', error);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y-2  divide-gray-200 bg-white text-sm ">
        <thead className="text-left font-semibold uppercase ">
          <tr>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
              Prenom
            </th>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
              Nom
            </th>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
              Premiere Visite
            </th>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
              Maladie
            </th>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
              Description
            </th>
            <th className="px-4 py-2"></th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-200 capitalize">
          {patients.map((patient, index) => (
            <tr
              key={patient.id}
              className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}
            >
              <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                {patient.firstname}
              </td>
              <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                {patient.lastname}
              </td>
              <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                {patient.first_visit}
              </td>
              <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                {patient.disease}
              </td>
              <td className="whitespace-nowrap px-4 py-2 text-gray-700 max-w-xs overflow-hidden overflow-ellipsis">
                {patient.description}
              </td>
              <td className="whitespace-nowrap px-4 py-2">
                <Link
                  to={`/patient?firstname=${patient.firstname}&lastname=${patient.lastname}`}
                  className=" bg-blue-300 text-base font-semibold  flex items-center justify-center rounded-xl cursor-pointer relative overflow-hidden transition-all duration-500 ease-in-out shadow-md hover:scale-105 hover:shadow-lg before:absolute px-5 py-2 before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-blue-100 hover:text-black before:to-blue-200 before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-xl hover:before:left-0 text-[#fff]"
                >
                  View
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PatientsTable;

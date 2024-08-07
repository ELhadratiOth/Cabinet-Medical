/* eslint-disable react/prop-types */
import { MdDeleteOutline } from 'react-icons/md';
import { FaEdit } from 'react-icons/fa';
import API from '../API';
import { useState } from 'react';
import Alert from './Alert';
import PutPatient from './PutPatient';

const EditPatient = ({ patient_data  ,  update_patient_data }) => {
  const [deleted, setDeleted] = useState();
  const handleDelete = () => {
    console.log(patient_data.id);
    API.delete(`/patients/delete/${patient_data.id}`)
      .then(() => {
        setDeleted(true);
      })
      .catch(error => {
        console.error('Error deleting patient:', error);
      });
  };

  return (
    <>
      {deleted && (
        <Alert
          title="Les données du patient ont été supprimées."
          msg=""
          open={!!deleted}
          onClose={() => setDeleted(false)}
        />
      )}
      <div className="inline-flex rounded-lg border border-blue-200 bg-blue-100 p-1">
        <button className="inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm text-gray-500 hover:text-gray-700 focus:relative">
          <FaEdit className="text-lg" />
          <PutPatient patient_data={patient_data} update />
        </button>

        <button
          onClick={handleDelete}
          className="inline-flex items-center gap-2 rounded-md bg-white px-4 py-2 text-sm hover:text-red-600 text-blue-500 shadow-sm focus:relative"
        >
          <MdDeleteOutline className="text-xl" />
          Supprimer
        </button>
      </div>
    </>
  );
};

export default EditPatient;

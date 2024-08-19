/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import PatientMenu from './PatientMenu';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import API from '../API';
import { MdDelete } from 'react-icons/md';
import { TbReportMedical } from 'react-icons/tb';
import { Modal } from 'flowbite-react';
import AddbtnMedicalVisit from './AddbtnMedicalVisit';
import Img from '../assets/img9.png';
import { HR } from 'flowbite-react';

const MedicalVisit = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const firstname = query.get('firstname');
  const lastname = query.get('lastname');

  const [openModal, setOpenModal] = useState(false);
  const [selectedVisit, setSelectedVisit] = useState(null);
  const [medical, setMedical] = useState([]);

  const deleteVisit = async (e, id) => {
    e.stopPropagation();
    try {
      await API.delete(`/medical_visits/delete/${id}`);
      setMedical(prevMedical => prevMedical.filter(visit => visit.id !== id));
    } catch (error) {
      console.error('Error deleting medical visit:', error);
    }
  };

  const fetchMedicalVisits = async () => {
    try {
      const response = await API.get(
        `/medical_visits/${firstname}/${lastname}`,
      );
      setMedical(response.data);
      console.log(response.data);
    } catch (error) {
      console.warn('Error fetching medical visits:', error);
    }
  };

  const addNewVisit = newVisit => {
    setMedical(prevMedical => [newVisit, ...prevMedical]);
  };

  useEffect(() => {
    fetchMedicalVisits();
  }, [firstname, lastname]);

  const Elem = ({ visit }) => (
    <div
      onClick={() => {
        setSelectedVisit(visit);
        setOpenModal(true);
      }}
      className="cursor-pointer rounded-xl ring p-0.5  bg-blue-50/50 backdrop-blur-md shadow-2xl"
    >
      <div className="relative rounded-[10px] p-4 pt-10 sm:p-6">
        <TbReportMedical className="mb-4 text-5xl" />
        <MdDelete
          onClick={e => deleteVisit(e, visit.id)}
          className="absolute hover:scale-105 transition-all duration-300 top-3 text-3xl drop-shadow-md right-3"
        />
        <h3 className="mt-0.5 text-xl capitalize font-medium text-gray-900">
          {visit.label}
        </h3>
        <div className="mt-4 flex flex-wrap gap-1">
          <span className="whitespace-nowrap rounded-full bg-blue-200 px-2.5 py-0.5 text-xs text-blue-600">
            {visit.hour_visit}
          </span>
          <span className="whitespace-nowrap rounded-full bg-blue-200 px-2.5 py-0.5 text-xs text-blue-600">
            {visit.date_visit}
          </span>
        </div>
      </div>
    </div>
  );

  const ModalShape = ({ visit }) => (
    <Modal dismissible show={openModal} onClose={() => setOpenModal(false)}>
      <Modal.Header className="pl-7 capitalize font-bold text-xl text-blue-600">
        {visit.label}
      </Modal.Header>
      <Modal.Body>
        {visit ? (
          <div className="space-y-6">
            <div className="bg-gray-100 shadow-lg p-4 rounded-lg border-l-4 border-blue-500">
              <h1 className="text-lg font-semibold mb-2 text-gray-800">
                Description de visite
              </h1>
              <p className="text-base leading-relaxed text-gray-600">
                {visit.description}
              </p>
            </div>
            <div className="bg-gray-100 p-4 shadow-lg rounded-lg border-l-4 border-blue-500">
              <h1 className="text-lg font-semibold mb-2 text-gray-800">
                Type d&apos;assurance
                <span className="ml-2 text-blue-500">{visit.insurance}</span>
              </h1>
              <p className="text-base leading-relaxed text-gray-600">
                {visit.insurance_description}
              </p>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="whitespace-nowrap rounded-full bg-blue-100 px-2.5 py-0.5 text-sm font-medium text-blue-600">
                {visit.hour_visit}
              </span>
              <span className="whitespace-nowrap rounded-full bg-blue-100 px-2.5 py-0.5 text-sm font-medium text-blue-600">
                {visit.date_visit}
              </span>
              <span className="whitespace-nowrap rounded-full bg-blue-100 px-2.5 py-0.5 text-sm font-medium text-blue-600">
                Type de Visite :{' '}
                <span className="font-semibold">{visit.type_visit}</span>
              </span>
              <span className="whitespace-nowrap rounded-full bg-blue-100 px-2.5 py-0.5 text-sm font-medium text-blue-600">
                Montant :{' '}
                <span className="font-semibold">{visit.money} DH</span>
              </span>
            </div>
          </div>
        ) : (
          <p className="text-base leading-relaxed text-gray-500">
            aucune visite médical pour ce patient
          </p>
        )}
      </Modal.Body>
      <Modal.Footer className="flex justify-end">
        <button
          className="bg-blue-200 px-5 ring rounded-md py-2 text-black hover:bg-gray-700 hover:text-white"
          onClick={() => setOpenModal(false)}
        >
          Close
        </button>
      </Modal.Footer>
    </Modal>
  );

  return (
    <div className="ml-60 px-10 space-y-10 mt-28 flex flex-col ">
      <img
        src={Img}
        alt="background"
        className="fixed -z-10 right-[27%] top-[19.5rem] w-[450px] opacity-50"
      />
      <div className="w-full flex justify-between items-center rounded-md ">
        <div className="text-2xl font-semibold px-2 py-2 rounded-md text-blue-900">
          Visites Médicales
          <HR.Trimmed className="bg-blue-200  md:mt-2 md:w-[12.5rem] md:mx-0 md:mb-0" />
        </div>
        <div className="bg-blue-100 rounded-md border-2 border-blue-200 py-0.5 px-1 flex space-x-2 justify-start items-center">
          <div className="bg-white p-1.5 px-2 rounded-md text-blue-500 font-semibold">
            Patient concerné :{' '}
            <span className="capitalize font-bold ">
              {firstname + ' ' + lastname}
            </span>
          </div>
          <AddbtnMedicalVisit
            firstname={firstname}
            lastname={lastname}
            addNewVisit={addNewVisit}
          />
          <PatientMenu firstname={firstname} lastname={lastname} />
        </div>
      </div>
      <div className="w-2/3 self-center space-y-5">
        {medical.length === 0 ? (
          <div className="text-gray-500 text-center mt-4">
            Ce patient n&apos;a pas encore de visites médicales.
          </div>
        ) : (
          medical.map(visit => <Elem key={visit.id} visit={visit} />)
        )}
        {selectedVisit && <ModalShape visit={selectedVisit} />}
      </div>
    </div>
  );
};

export default MedicalVisit;

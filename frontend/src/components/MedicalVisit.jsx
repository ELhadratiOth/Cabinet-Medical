/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import PatientMenu from './PatientMenu';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import API from '../API';
import { MdDelete } from 'react-icons/md';
import { TbReportMedical } from 'react-icons/tb';
import {  Modal } from 'flowbite-react';
const MedicalVisit = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const firstname = query.get('firstname');
  const lastname = query.get('lastname');

  const [openModal, setOpenModal] = useState(false);
  const [selectedVisit, setSelectedVisit] = useState(null);

  const [medical, setMedical] = useState([]);

  const fetchPatients = async () => {
    try {
      const response = await API.get(
        `/medical_visits/${firstname}/${lastname}`,
      );
      setMedical(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching medical visits:', error);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, [firstname, lastname]);

  const Elem = ({ visit }) => (
    <div
      onClick={() => {
        setSelectedVisit(visit);
        setOpenModal(true);
      }}
      className="cursor-pointer rounded-xl ring p-0.5 shadow-md bg-blue-50"
    >
      <div className="relative rounded-[10px] p-4 pt-10 sm:p-6">
        <TbReportMedical className="mb-4 text-5xl" />
        <MdDelete className="absolute hover:scale-105 transition-all duration-300 top-3 text-3xl drop-shadow-md right-3" />
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
      <Modal.Header className="capitalize ">{visit.label}</Modal.Header>
      <Modal.Body>
        {visit ? (
          <div className="space-y-6">
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              {visit.description}
            </p>
            <div className="mt-4 flex flex-wrap gap-1">
              <span className="whitespace-nowrap rounded-full bg-blue-200 px-2.5 py-0.5 text-sm text-blue-600">
                {visit.hour_visit}
              </span>
              <span className="whitespace-nowrap rounded-full bg-blue-200 px-2.5 py-0.5 text-sm text-blue-600">
                {visit.date_visit}
              </span>
              <span className="whitespace-nowrap rounded-full bg-blue-200 px-2.5 py-0.5 text-sm text-blue-600">
                Type de Visite :{' '}
                <span className="font-semibold">{visit.type_visit}</span>
              </span>
            </div>
          </div>
        ) : (
          <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
            No visit data available.
          </p>
        )}
      </Modal.Body>
      <Modal.Footer>
        <button
          className="bg-blue-200  px-5 ring rounded-md py-2 text-black hover:bg-gray-700 hover:text-white  "
          onClick={() => setOpenModal(false)}
        >
          Close
        </button>
      </Modal.Footer>
    </Modal>
  );

  return (
    <div className="ml-60 px-10 space-y-10 mt-36 flex flex-col ">
      <div className="w-full flex justify-between items-center rounded-md ">
        <div className="text-2xl font-semibold px-2 py-2 rounded-md">
          Les Visites Medicales :
        </div>
        <div className="bg-blue-100 rounded-md border-2 border-blue-200 py-0.5 px-1 flex space-x-2 justify-start items-center">
          <PatientMenu firstname={firstname} lastname={lastname} />

          <div className="bg-white p-1.5 px-2 rounded-md text-blue-500 font-semibold">
            Patient concerné :{' '}
            <span className=" capitalize font-bold">
              {firstname + ' ' + lastname}
            </span>
          </div>
        </div>
      </div>
      <div className="w-2/3 self-center">
        {medical.map(visit => (
          <Elem key={visit.id} visit={visit} />
        ))}
        {selectedVisit && <ModalShape visit={selectedVisit} />}
      </div>
    </div>
  );
};

export default MedicalVisit;

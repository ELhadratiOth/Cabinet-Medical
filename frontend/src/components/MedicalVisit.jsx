/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import PatientMenu from './PatientMenu';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import API from '../API';
import { MdDelete } from 'react-icons/md';
import { TbReportMedical } from 'react-icons/tb';
import { Modal, HR } from 'flowbite-react';
import AddbtnMedicalVisit from './AddbtnMedicalVisit';
import Img from '../assets/img9.png';
import { FaPlus } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import { MdReviews } from 'react-icons/md';
import PDFTemplate from './PDFTEmplate';
import { PDFDownloadLink } from '@react-pdf/renderer';
const MedicalVisit = () => {
  const navigate = useNavigate();

  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const firstname = query.get('firstname');
  const lastname = query.get('lastname');
  const [openModal, setOpenModal] = useState(false);
  const [openPrescriptionModal, setOpenPrescriptionModal] = useState(false);
  const [selectedVisit, setSelectedVisit] = useState(null);
  const [selectedPrescription, setSelectedPrescription] = useState(null);
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
    } catch (error) {
      console.error('Error fetching medical visits:', error);
    }
  };

  const updateMedic = async (visitId, newMedics) => {
    try {
      await API.put(`/medical_visits/update/${visitId}`, { medics: newMedics });
      fetchMedicalVisits();
    } catch (error) {
      console.error('Error updating medics:', error);
    }
  };

  const addNewVisit = newVisit => {
    setMedical(prevMedical => [newVisit, ...prevMedical]);
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

    fetchMedicalVisits();
  }, [firstname, lastname, location.pathname]);

  const displayPrescription = (e, visit) => {
    e.stopPropagation();
    setSelectedPrescription(visit);
    setOpenPrescriptionModal(true);
  };

  const Elem = ({ visit }) => (
    <div
      onClick={() => {
        setSelectedVisit(visit);
        setOpenModal(true);
      }}
      className="cursor-pointer w-[100%] rounded-lg ring px-0.5 bg-blue-50/50 backdrop-blur-md shadow-xl"
    >
      <div className="relative rounded-[8px] p-0 h-[40%] sm:p-4">
        <TbReportMedical className="mb-2 text-5xl -ml-2" />
        <MdDelete
          onClick={e => deleteVisit(e, visit.id)}
          className="absolute hover:scale-105 transition-all duration-300 top-2 text-3xl drop-shadow-md right-2"
        />
        <h3 className="my-0.5 text-lg capitalize font-medium text-gray-900">
          {visit.label}
        </h3>
        <div className="mt-2 flex justify-between items-center">
          <div className="space-x-1">
            <span className="whitespace-nowrap rounded-full bg-blue-200 px-2 py-0.5 text-xs text-blue-600">
              {visit.hour_visit}
            </span>
            <span className="whitespace-nowrap rounded-full bg-blue-200 px-2 py-0.5 text-xs text-blue-600">
              {visit.date_visit}
            </span>
          </div>
          <div>
            {visit.medics === 'empty' ? (
              <Link
                to={`/ordonnance?firstname=${firstname}&lastname=${lastname}&id_visit=${visit.id}`}
              >
                <div className="group bg-blue-300 hover:bg-blue-100 ring-2 group-hover:duration-500 duration-500 transition-all rounded-md py-[0.4rem] px-2 flex justify-center items-center space-x-3 cursor-pointer outline-none">
                  <FaPlus className="text-xl p-0 rounded-full ring bg-blue-100 ring-black group-hover:rotate-90 group-hover:bg-blue-300 group-hover:duration-500 duration-500" />

                  <div className="text-base text-gray-800 group-hover:text-gray-950 font-semibold">
                    Créer Ordonnance
                  </div>
                </div>
              </Link>
            ) : (
              <div>
                <div
                  onClick={e => displayPrescription(e, visit)}
                  className="flex justify-center items-center space-x-2 py-[0.2rem] px-3  text-black rounded-bl-xl rounded-tr-xl bg-blue-300 border-2 border-blue-400 hover:bg-blue-400 hover:text-blue-900   font-bold leading-loose transition duration-300"
                >
                  <MdReviews className="text-xl p-0 " />

                  <p>Detail d&apos;Ordonnace</p>
                </div>
              </div>
            )}
          </div>
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

  const PrescriptionModal = ({ visit }) => {
    const medications = visit.medics.split('^').map(elem => {
      const [name, description] = elem.split('&');
      return { name, description };
    });

    return (
      <Modal
        dismissible
        show={openPrescriptionModal}
        onClose={() => setOpenPrescriptionModal(false)}
      >
        <Modal.Header>
          <div className="font-semibold text-3xl text-blue-900">Ordonnace</div>
          <HR.Trimmed className="bg-blue-200 md:w-[10rem] md:mx-0 md:mt-1 md:mb-0" />
        </Modal.Header>
        <Modal.Body>
          {visit ? (
            <div className="-my-3">
              <div className="bg-gray-100 shadow-lg p-4 rounded-lg border-l-4 border-blue-500">
                <h1 className="text-xl font-semibold mb-2 text-gray-800">
                  Ordannance Contenu
                </h1>
                <div className="text-base leading-relaxed text-gray-600">
                  {medications.map((medic, index) => (
                    <div key={index} className="mb-2">
                      <p className="font-bold uppercase text-base">
                        {index + 1}- {medic.name} :
                      </p>
                      <p className="ml-5">{medic.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <p className="text-base leading-relaxed text-gray-500">
              Aucune Ordonnance pour le moment
            </p>
          )}
        </Modal.Body>
        <Modal.Footer className="flex justify-between">
          <button
            className="bg-red-500 px-5 ring ring-red-700 rounded-md py-2 font-semibold text-black hover:bg-red-700 hover:text-white"
            onClick={() => {
              updateMedic(selectedPrescription.id, 'empty');
              setOpenPrescriptionModal(false);
            }}
          >
            Supprimer
          </button>
          <PDFDownloadLink
            id="pdf-download-link"
            document={<PDFTemplate medications={medications} />}
            fileName={`${firstname}_${lastname}.pdf`}
            className="b px-5 ring rounded-md py-2 bg-blue-400  text-black hover:bg-blue-400 font-semibold hover:text-white"
          >
            DownLoad
          </PDFDownloadLink>
        </Modal.Footer>
      </Modal>
    );
  };

  return (
    <div className="ml-60 px-10 space-y-10 mt-28 flex flex-col">
      <img
        src={Img}
        alt="background"
        className="fixed -z-10 right-[27%] top-[19.5rem] w-[450px] opacity-50"
      />
      <div className="w-full flex justify-between items-center rounded-md">
        <div className="text-3xl font-semibold px-2 py-2 rounded-md text-blue-900">
          Visite Médicale
          <HR.Trimmed className="bg-blue-200 md:w-[14rem] md:mx-0 md:mt-3 md:mb-0" />
        </div>
        <div className="bg-blue-100 rounded-md border-2 border-blue-200 py-0.5 px-1 flex space-x-2 justify-start items-center">
          <div className="bg-white p-1.5 px-2 rounded-md text-blue-500 font-semibold">
            Patient concerné :{' '}
            <span className="capitalize font-bold">
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
          medical.map(visit => (
            <div
              key={visit.id}
              className="bg-blue-50/50 space-x-5 flex justify-around items-center rounded-xl border backdrop-blur-[3px] py-3 px-2"
            >
              <Elem visit={visit} />
            </div>
          ))
        )}
        {selectedVisit && <ModalShape visit={selectedVisit} />}
        {selectedPrescription && (
          <PrescriptionModal
            onClick={e => e.stopPropagation()}
            visit={selectedPrescription}
          />
        )}
      </div>
    </div>
  );
};

export default MedicalVisit;

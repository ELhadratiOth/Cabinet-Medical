/* eslint-disable react-hooks/exhaustive-deps */
import { useLocation } from 'react-router-dom';
import PatientMenu from './PatientMenu';
import { useEffect, useState } from 'react';
import API from '../API';
import DetailExamination from './DetailExamination';
import Img from '../assets/img4.png';
import { MdDelete } from 'react-icons/md';
import AddbtnExamination from './AddbtnExamination';
import { HR } from 'flowbite-react';

const Examination = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const firstname = query.get('firstname');
  const lastname = query.get('lastname');
  const [examinations, setExaminations] = useState([]);

  const fetchExaminations = async () => {
    try {
      const response = await API.get(`/examinations/${firstname}/${lastname}`);
      setExaminations(response.data);
      console.log(response.data);
    } catch (error) {
      console.warn('Error fetching examinations:', error);
    }
  };

  useEffect(() => {
    fetchExaminations();
    console.log(examinations);
  }, [firstname, lastname]);

  const deleteExamination = async (e, id) => {
    e.stopPropagation();
    console.log('clicked');
    try {
      await API.delete(`/examinations/delete/${id}`);
      setExaminations(prevExaminations =>
        prevExaminations.filter(examination => examination.id !== id),
      );
    } catch (error) {
      console.error('Error deleting examination:', error);
    }
  };

  const addNewExamianation = newExamination => {
    setExaminations(prevExaminations => [newExamination, ...prevExaminations]);
  };

  return (
    <div className="ml-60 px-10 space-y-8 mt-28 flex flex-col mb-20">
      <img
        src={Img}
        alt="background"
        className="fixed -z-10 right-[10%] top-[10rem] w-[800px] opacity-50"
      />
      <div className="w-full flex justify-between items-center rounded-md">
        <div className="text-3xl font-semibold px-2 py-2 rounded-md">
          Les Examinations :
          <HR.Trimmed className="bg-blue-200  md:mt-2 md:w-[16rem] md:mx-0 md:mb-0" />
        </div>
        <div className="bg-blue-100 rounded-md border-2 border-blue-200 py-0.5 px-1 flex space-x-2 justify-start items-center">
          <div className="bg-white p-1.5 px-2 rounded-md text-blue-500 font-semibold">
            Patient concerné :{' '}
            <span className="capitalize font-bold">
              {firstname + ' ' + lastname}
            </span>
          </div>
          <AddbtnExamination
            firstname={firstname}
            lastname={lastname}
            addNewExamianation={addNewExamianation}
          />
          <PatientMenu firstname={firstname} lastname={lastname} />
        </div>
      </div>
      <div className="space-y-10 flex flex-col justify-center items-center">
        {examinations.length === 0 ? (
          <div className="text-base leading-relaxed text-gray-500 dark:text-gray-400 text-center">
            Aucune examination pour le moment pour ce patient.
          </div>
        ) : (
          examinations.map((examination, index) => (
            <div key={examination.id} className="relative">
              <span
                onClick={e => deleteExamination(e, examination.id)}
                className="absolute hover:scale-110 transition duration-300 ease-in-out items-center inline-flex z-20 cursor-pointer top-[11%] right-[52%] justify-center rounded-full bg-red-600 px-3 py-1 text-white shadow-lg hover:bg-red-700"
              >
                <MdDelete className="text-xl mr-1" />
                <p className="whitespace-nowrap text-xs font-semibold">
                  Supprimer
                </p>
              </span>
              <DetailExamination examination={examination} index={index} />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Examination;

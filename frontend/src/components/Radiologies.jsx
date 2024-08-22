/* eslint-disable react-hooks/exhaustive-deps */
import { useLocation, useNavigate } from 'react-router-dom';
import PatientMenu from './PatientMenu';
import { useEffect, useState } from 'react';
import API from '../API';
import Img from '../assets/img8.png';
import { MdDelete } from 'react-icons/md';
import AddbtnRadiology from './AddbtnRadiology';
import { GiMedicalDrip } from 'react-icons/gi';
import { HR } from 'flowbite-react';

const Radiologies = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const firstname = query.get('firstname');
  const lastname = query.get('lastname');
  const [radiology, setRadiology] = useState([]);

  const fetchRadiology = async () => {
    try {
      const response = await API.get(`/radiologies/${firstname}/${lastname}`);
      setRadiology(response.data);
    } catch (error) {
      console.error('Error fetching radiology :', error);
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
    fetchRadiology();
  }, [firstname, lastname]);

  const deleteRadiology = async (e, id) => {
    e.stopPropagation();
    try {
      await API.delete(`/radiologies/delete/${id}`);
      setRadiology(prevState =>
        prevState.filter(prevState => prevState.id !== id),
      );
    } catch (error) {
      console.error('Error deleting radiology :', error);
    }
  };

  const addNewRadiology = newRAdio => {
    setRadiology(prevState => [newRAdio, ...prevState]);
  };

  return (
    <div className="ml-60 px-10 space-y-8 mt-28 flex flex-col mb-20">
      <img
        src={Img}
        alt="background"
        className="fixed -z-10 right-[20%] top-[18rem] w-[600px] opacity-50"
      />
      <div className="w-full flex justify-between items-center rounded-md">
        <div className="text-3xl font-semibold px-2 py-2 rounded-md text-blue-900">
          Radiologies
          <HR.Trimmed className="bg-blue-200 md:w-[11rem] md:mx-0 md:mt-3 md:mb-0" />
        </div>
        <div className="bg-blue-100 rounded-md border-2 border-blue-200 py-0.5 px-1 flex space-x-2 justify-start items-center">
          <div className="bg-white p-1.5 px-2 rounded-md text-blue-500 font-semibold">
            Patient concerné :{' '}
            <span className="capitalize font-bold">
              {firstname + ' ' + lastname}
            </span>
          </div>
          <AddbtnRadiology
            firstname={firstname}
            lastname={lastname}
            addNewRadiology={addNewRadiology}
          />
          <PatientMenu firstname={firstname} lastname={lastname} />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8">
        {radiology.length === 0 ? (
          <div className="text-base leading-relaxed text-gray-500 dark:text-gray-400 text-center col-span-3">
            Aucune radiologie pour ce patient.
          </div>
        ) : (
          radiology.map(Item => (
            <div
              key={Item.id}
              className="relative bg-gradient-to-tl from-gray-900/80 to-gray-950/80 hover:from-gray-800/90 hover:to-gray-950/90 backdrop-blur-md transition-colors duration-500 cursor-pointer border-r-2 border-t-2 border-gray-900 m-4 rounded-lg overflow-hidden"
            >
              <div className="absolute group hover:bg-red-600 -top-[7%] pl-3 py-5 -right-[7%] rounded-full transition -rotate-45 duration-300 z-20 cursor-pointer drop-shadow-lg ease-in-out bg-red-500 w-20">
                <MdDelete
                  onClick={e => deleteRadiology(e, Item.id)}
                  className="text-4xl mr-1 text-gray-200 rotate-45 group-hover:text-black group-hover:scale-110"
                />
              </div>

              <div className="px-8 py-4 pb-5">
                <GiMedicalDrip className="text-blue-700 text-7xl mb-4 -ml-2 " />{' '}
                <div className="capitalize font-bold text-xl text-gray-300">
                  {Item.label}
                </div>
                <div className="text-gray-300  tracking-widest">
                  {Item.description}
                </div>
                <div className="text-gray-400 mt-4">
                  <p className="font-bold">{Item.hour_visit}</p>
                  <p>{Item.date_exam}</p>
                </div>
              </div>
              <div className="h-2 w-full bg-gradient-to-l via-blue-300 group-hover:blur-xl blur-2xl m-auto rounded transition-all absolute bottom-14"></div>
              <div className="h-3 bg-gradient-to-l via-blue-700/50 duration-700 group-hover:via-blue-500 w-[100%] m-auto absolute bottom-0 rounded-full transition-all"></div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Radiologies;

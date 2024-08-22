/* eslint-disable react-hooks/exhaustive-deps */
import { useLocation, useNavigate } from 'react-router-dom';
import PatientMenu from './PatientMenu';
import { useEffect, useState } from 'react';
import API from '../API';
import Img from '../assets/img11.png';
import AddbtnAutre from './AddbtnAutre';
import { HR } from 'flowbite-react';
import { MdDelete } from 'react-icons/md';

const Autre = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const firstname = query.get('firstname');
  const lastname = query.get('lastname');
  const [autre, setAutre] = useState([]);

  const fetchAutre = async () => {
    try {
      const response = await API.get(`/autres/${firstname}/${lastname}`);
      setAutre(response.data);
    } catch (error) {
      console.error('Error fetching autre:', error);
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
    fetchAutre();
  }, [firstname, lastname]);

  const addNewAutre = newAutre => {
    setAutre(prevAutre => [newAutre, ...prevAutre]);
  };

  const deleteAutre = async (e, id) => {
    e.stopPropagation();
    try {
      await API.delete(`/autres/delete/${id}`);
      setAutre(prevAutre => prevAutre.filter(autre => autre.id !== id));
    } catch (error) {
      console.error('Error deleting Autre:', error);
    }
  };

  return (
    <div className="ml-60 px-10 space-y-8 mt-28 flex flex-col mb-20 relative">
      <img
        src={Img}
        alt="background"
        className="fixed -z-10 right-[0%] top-[6rem] w-[1150px] opacity-50"
      />
      <div className="w-full flex justify-between items-center rounded-md">
        <div className="text-3xl font-semibold px-2 py-2 rounded-md text-blue-900">
          Autre
          <HR.Trimmed className="bg-blue-200 w-[5.3rem] mt-2 md:my-2 md:mx-0" />
        </div>
        <div className="bg-blue-100 rounded-md border-2 border-blue-200 py-1 px-2 flex space-x-2 items-center">
          <div className="bg-white p-1.5 px-3 rounded-md text-blue-500 font-semibold">
            Patient concerné:{' '}
            <span className="capitalize font-bold">
              {firstname + ' ' + lastname}
            </span>
          </div>
          <AddbtnAutre
            firstname={firstname}
            lastname={lastname}
            addNewAutre={addNewAutre}
          />
          <PatientMenu firstname={firstname} lastname={lastname} />
        </div>
      </div>
      <div className="space-y-6 flex flex-col w-full items-center">
        {autre.length === 0 ? (
          <div className="text-base leading-relaxed text-gray-500 text-center col-span-3">
            Aucune donnée pour ce patient.
          </div>
        ) : (
          autre.map(item => (
            <div
              key={item.id}
              className="relative flex flex-col p-4 w-full max-w-xl bg-white/50 backdrop-blur-sm border-l-4 ring-1 border-blue-300 shadow-lg rounded-md "
            >
              <span
                onClick={e => deleteAutre(e, item.id)}
                className="absolute hover:scale-110 transition duration-700 ease-in-out items-center inline-flex z-20 cursor-pointer top-[16%] right-[4%] justify-center rounded-full bg-red-600 px-3 py-1 text-white shadow-lg hover:bg-red-700"
              >
                <MdDelete className="text-xl mr-1" />
                <p className="whitespace-nowrap text-xs font-semibold">
                  Supprimer
                </p>
              </span>
              <div className="w-full bg-blue-50  rounded-lg px-4 py-2 flex flex-col justify-around shadow-lg border">
                <p className="text-lg font-bold capitalize text-blue-900">
                  {item.label}
                </p>
                <div className="py-3">
                  <p className="text-gray-600 text-sm  ">{item.description}</p>
                </div>
                <div className=" w-fit  flex gap-1 -ml-0.5 mt-2  font-semibold">
                  <span className="whitespace-nowrap rounded-full bg-blue-300 px-2.5 py-[0.17rem] text-xs text-blue-700">
                    {item.hour_visit}
                  </span>
                  <span className="whitespace-nowrap rounded-full bg-blue-300 px-2.5 py-[0.17rem] text-xs text-blue-700">
                    {item.date_exam}
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Autre;

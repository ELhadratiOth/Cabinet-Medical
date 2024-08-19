/* eslint-disable react-hooks/exhaustive-deps */
import { useLocation } from 'react-router-dom';
import PatientMenu from './PatientMenu';
import { useEffect, useState } from 'react';
import API from '../API';
import Img from '../assets/img7.png';
import { MdDelete } from 'react-icons/md';
import AddbtnAllergie from './AddbtnAllergie';
import { LiaAllergiesSolid } from 'react-icons/lia';
import { HR } from 'flowbite-react';

const Allergies = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const firstname = query.get('firstname');
  const lastname = query.get('lastname');
  const [allergies, setAllergies] = useState([]);

  const fetchAllergies = async () => {
    try {
      const response = await API.get(`/allergies/${firstname}/${lastname}`);
      setAllergies(response.data);
      console.log(response.data);
    } catch (error) {
      console.warn('Error fetching allergies:', error);
    }
  };

  useEffect(() => {
    fetchAllergies();
    console.log(allergies);
  }, [firstname, lastname]);

  const deleteAllergie = async (e, id) => {
    e.stopPropagation();
    console.log('clicked');
    try {
      await API.delete(`/allergies/delete/${id}`);
      setAllergies(prevAllergies =>
        prevAllergies.filter(allergie => allergie.id !== id),
      );
    } catch (error) {
      console.error('Error deleting allergie:', error);
    }
  };

  const addNewAllergie = newAllergie => {
    setAllergies(prevAllergies => [newAllergie, ...prevAllergies]);
  };

  return (
    <div className="ml-60 px-10 space-y-8 mt-28 flex flex-col mb-20">
      <img
        src={Img}
        alt="background"
        className="fixed -z-10 right-[24%] top-[14rem] w-[560px] opacity-50"
      />
      <div className="w-full flex justify-between items-center rounded-md">
        <div className="text-3xl font-semibold px-2 py-2 rounded-md text-blue-900">
          Allérgies
          <HR.Trimmed className="bg-blue-200 md:w-[8rem] md:mx-0 md:mt-3 md:mb-0" />
        </div>
        <div className="bg-blue-100  rounded-md border-2 border-blue-200 py-0.5 px-1 flex space-x-2 justify-start items-center">
          <div className="bg-white p-1.5 px-2 rounded-md text-blue-500 font-semibold">
            Patient concerné :{' '}
            <span className="capitalize font-bold">
              {firstname + ' ' + lastname}
            </span>
          </div>
          <AddbtnAllergie
            firstname={firstname}
            lastname={lastname}
            addNewAllergie={addNewAllergie}
          />
          <PatientMenu firstname={firstname} lastname={lastname} />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8">
        {allergies.length === 0 ? (
          <div className="text-base leading-relaxed text-gray-500 dark:text-gray-400 text-center col-span-3">
            Aucune Allérgie pour ce patient.
          </div>
        ) : (
          allergies.map(allergie => (
            <div
              key={allergie.id}
              className="relative   bg-gradient-to-tl from-gray-900/80 to-gray-950/80 hover:from-gray-800/90 hover:to-gray-950/90 backdrop-blur-md transition-colors duration-500  cursor-pointer   border-r-2 border-t-2 border-gray-900 m-4 rounded-lg overflow-hidden "
            >
              <div
                onClick={e => deleteAllergie(e, allergie.id)}
                className="absolute group hover:bg-red-600  -top-[7%] pl-3 py-5 -right-[7%] rounded-full transition -rotate-45 duration-300 z-20 cursor-pointer  drop-shadow-lg  ease-in-out bg-red-500 w-20"
              >
                <MdDelete className="text-4xl mr-1 text-gray-200 rotate-45 group-hover:text-black group-hover:transition group-hover:duration-300   group-hover:scale-110    " />
              </div>

              <div className=" flex flex-col justify-start space-x-8 items-start  mt-10 mb-6">
                <LiaAllergiesSolid className="text-blue-700 text-7xl ml-4  mb-4" />
                <div>
                  {' '}
                  <div className="uppercase font-bold text-xl text-gray-300">
                    {allergie.label}
                  </div>
                  <div className="text-gray-300 uppercase tracking-widest">
                    {allergie.description}
                  </div>
                  <div className="text-gray-400 mt-4">
                    <p className="font-bold">{allergie.hour_visit}</p>
                    <p>{allergie.date_exam}</p>
                  </div>
                </div>
              </div>
              <div className="h-2 w-full bg-gradient-to-l via-blue-300 group-hover:blur-xl blur-2xl m-auto rounded transition-all absolute bottom-14"></div>
              <div className="h-3 bg-gradient-to-l via-blue-700/50  duration-700 group-hover:via-blue-500 w-[100%] m-auto absolute bottom-0  rounded-full transition-all"></div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Allergies;

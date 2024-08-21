/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import API from '../API';
import Img from '../assets/img111.png';
import { MdDelete } from 'react-icons/md';
import { HR } from 'flowbite-react';
import AddbtnFastCertif from './AddbtnFastCertif';
import { TbFileCertificate } from 'react-icons/tb';
import { useNavigate } from 'react-router-dom';


const FastCertif = () => {
  const [fastCertif, setFastCertif] = useState([]);
  const navigate = useNavigate();

  const fetchFastCertif = async () => {
    try {
      const response = await API.get(
        `/medical_visits/quick/certificat/current/month`,
      );
      setFastCertif(response.data);
      console.log(response.data);
    } catch (error) {
      console.warn('Error fetching fastCertif:', error);
    }
  };

  useEffect(() => {
     const verifyToken = async () => {
       const token = localStorage.getItem('token');
       try {
         const response = await API.get(`user/verify-token/${token}`);
         console.log('Response Data:', response.data);

         if (response.status !== 200) {
           throw new Error('Token verification failed');
         }
       } catch (error) {
         console.log('Verification Error:', error);
         localStorage.removeItem('token');
         navigate('/');
       }
     };

     verifyToken();
    fetchFastCertif();
    console.log(fastCertif);
  }, []);
  const addNewFastCertif = newFastCertif => {
    setFastCertif(prevFastCertif => [newFastCertif, ...prevFastCertif]);
  };
  const deleteFastCertif = async (e, id) => {
    e.stopPropagation();
    console.log('clicked');
    try {
      await API.delete(`/medical_visits/delete/${id}`);
      setFastCertif(prevFastCertif =>
        prevFastCertif.filter(fastCertif => fastCertif.id !== id),
      );
    } catch (error) {
      console.error('Error deleting fastCertif:', error);
    }
  };

  return (
    <div className="ml-60 px-10 space-y-8 mt-28 flex flex-col mb-20">
      <img
        src={Img}
        alt="background"
        className="fixed -z-10 right-[26%] top-[14rem] w-[500px] opacity-50"
      />
      <div className="w-full flex justify-between items-center rounded-md">
        <div className="text-3xl font-semibold px-2 py-2 rounded-md text-blue-900">
          Autre Revenu 
          <HR.Trimmed className="bg-blue-200 md:w-[12rem] md:mx-0 md:mt-3 md:mb-0" />
        </div>
        <div className="mr-6">
          <AddbtnFastCertif addNewFastCertif={addNewFastCertif} />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 mt-8">
        {fastCertif.length === 0 ? (
          <div className="text-base leading-relaxed text-gray-500 dark:text-gray-400 text-center col-span-full">
            Aucune Autre Revenu.
          </div>
        ) : (
          fastCertif.map(fastCertif => (
            <div
              key={fastCertif.id}
              className="relative bg-gradient-to-tl from-gray-900/80 to-gray-950/80 hover:from-gray-800/90 hover:to-gray-950/90 backdrop-blur-md transition-colors duration-500 cursor-pointer border-r-2 border-t-2 border-gray-900 m-4 rounded-lg overflow-hidden"
            >
              <div
                onClick={e => deleteFastCertif(e, fastCertif.id)}
                className="absolute group hover:bg-red-600 -top-[15%] pl-1.5 py-3 -right-[10%] rounded-full transition -rotate-45 duration-300 z-20 cursor-pointer drop-shadow-lg ease-in-out bg-red-500 w-20"
              >
                <MdDelete className="text-3xl mb-1 ml-1 mt-1.5 text-gray-200 rotate-45 group-hover:text-black group-hover:transition group-hover:duration-300 group-hover:scale-110" />
              </div>

              <div className="flex flex-col justify-start space-x-8 items-start mt-5 mb-5">
                <TbFileCertificate className="text-blue-700 text-6xl ml-6 mb-3" />
                <div>
                  <div className="uppercase font-bold text-lg text-gray-300">
                    {fastCertif.label}
                  </div>
                  <div className="text-gray-300 uppercase tracking-widest text-sm">
                    {fastCertif.money} MAD
                  </div>
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

export default FastCertif;

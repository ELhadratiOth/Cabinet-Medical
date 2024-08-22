/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Img from '../assets/img12.png';
import API from '../API';
import { Link } from 'react-router-dom';
import { MdKeyboardDoubleArrowRight } from 'react-icons/md';
import { HR } from 'flowbite-react';

const SuggestedPatients = () => {
    const navigate = useNavigate();

  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const name = query.get('name');

  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

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
    const fetchPatiens = async () => {
      try {
        setLoading(true);
        const response = await API.get(`patients/search_by_like/${name.toLocaleUpperCase()}`);
        setPatients(response.data);
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    if (name) {
      fetchPatiens();
    }
  }, [name]);

  return (
    <div className="ml-60 px-10 space-y-8 mt-28 flex  flex-col mb-20">
      <img
        src={Img}
        alt="background"
        className="fixed -z-10 right-[30%] top-[19rem] w-[440px] opacity-50"
      />
      <div className="w-full flex justify-between items-center rounded-md">
        <div className="text-3xl font-semibold px-2 py-2 rounded-md text-blue-900">
          Liste des Patients Suggérés
          <HR.Trimmed className="bg-blue-200 w-[24rem] mt-2 md:my-2 md:mx-0" />
        </div>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-2 md:grid-cols-4 gap-5 mt-8 ">
        {loading ? (
          <div className="text-base leading-relaxed text-gray-500 text-center col-span-4">
            Loading...
          </div>
        ) : error ? (
          <div className="text-base leading-relaxed w-full text-gray-500 text-center col-span-4">
            Aucun patient correspondant à ce nom, Veuillez réessayer.
          </div>
        ) : (
          <>
            {patients.map(elem => (
              <Link
                key={elem.id}
                to={`/patient?firstname=${elem.firstname}&lastname=${elem.lastname}`}
              >
                <div className="overflow-hidden  before:ease-in-out bg-blue-50 after:ease-in-out  group cursor-pointer relative flex flex-col gap-4 justify-between rounded-2xl border hover:after:w-full  border-white-222 hover:border-blue-400 duration-300 p-4 md:p-6 px-8 before:h-full before:w-2 hover:before:w-full after:absolute after:top-0 after:left-0 after:h-full after:w-0 after:duration-300 after:opacity-5 before:duration-500 before:-z-1 before:bg-blue-300 hover:text-black  before:absolute before:top-0 before:left-0">
                  <h4 className="font-semibold text-2xl duration-300  capitalize group-hover:z-[5]">
                    {elem.firstname} {elem.lastname}
                  </h4>
                  <div
                    className="text-gray-500 hover:text-gray-600 transition-colors duration-300 hover:underline  group-hover:z-[5] font-medium
                    flex items-center  space-x-1 text-base w-full   "
                  >
                    <div>Voir les détails </div>
                    <MdKeyboardDoubleArrowRight className="text-xl mt-[0.1rem]" />
                  </div>
                </div>
              </Link>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default SuggestedPatients;

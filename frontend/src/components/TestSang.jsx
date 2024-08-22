/* eslint-disable react-hooks/exhaustive-deps */
import { useLocation, useNavigate } from 'react-router-dom';
import PatientMenu from './PatientMenu';
import { useEffect, useState } from 'react';
import API from '../API';
import Img from '../assets/img10.png';
import AddbtnTestsang from './AddbtnTestSang';
import { HR } from 'flowbite-react';
import { MdDelete } from 'react-icons/md';

const Testsang = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const firstname = query.get('firstname');
  const lastname = query.get('lastname');
  const [testsang, setTestsang] = useState([]);

  const fetchTestsang = async () => {
    try {
      const response = await API.get(`/testsang/${firstname}/${lastname}`);
      setTestsang(response.data);
    } catch (error) {
      console.error('Error fetching testsang:', error);
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
    fetchTestsang();
  }, [firstname, lastname]);

  const addNewTestsang = newTest => {
    setTestsang(prevTestsang => [newTest, ...prevTestsang]);
  };

  const deleteTestSang = async (e, id) => {
    e.stopPropagation();
    try {
      await API.delete(`/testsang/delete/${id}`);
      setTestsang(prevTestSang => prevTestSang.filter(test => test.id !== id));
    } catch (error) {
      console.error('Error deleting Test Sang:', error);
    }
  };

  return (
    <div className="ml-60 px-10 space-y-8 mt-28 flex flex-col mb-20 relative">
      <img
        src={Img}
        alt="background"
        className="fixed -z-10 right-[21%] top-[10rem] w-[650px] opacity-30"
      />
      <div className="w-full flex justify-between items-center rounded-md">
        <div className="text-3xl font-semibold px-2 py-2 rounded-md text-blue-900">
          Tension Artérielle
          <HR.Trimmed className="bg-blue-200 w-[15rem] mt-2 md:my-2 md:mx-0" />
        </div>
        <div className="bg-blue-100 rounded-md border-2 border-blue-200 py-1 px-2 flex space-x-2 items-center">
          <div className="bg-white p-1.5 px-3 rounded-md text-blue-500 font-semibold">
            Patient concerné:{' '}
            <span className="capitalize font-bold">
              {firstname + ' ' + lastname}
            </span>
          </div>
          <AddbtnTestsang
            firstname={firstname}
            lastname={lastname}
            addNewTestsang={addNewTestsang}
          />
          <PatientMenu firstname={firstname} lastname={lastname} />
        </div>
      </div>
      <div className="space-y-6 flex flex-col w-full items-center">
        {testsang.length === 0 ? (
          <div className="text-base leading-relaxed text-gray-500 text-center col-span-3">
            Aucune mesure de tension artérielle pour ce patient.
          </div>
        ) : (
          testsang.map((test, index) => (
            <div
              key={test.id}
              className="relative flex flex-col p-4 w-full max-w-xl bg-white/50 backdrop-blur-sm border-l-4 ring-1 border-blue-300 shadow-lg rounded-md "
            >
              <span
                onClick={e => deleteTestSang(e, test.id)}
                className="absolute hover:scale-110 transition duration-700 ease-in-out items-center inline-flex z-20 cursor-pointer top-[10%] right-[4%] justify-center rounded-full bg-red-600 px-3 py-1 text-white shadow-lg hover:bg-red-700"
              >
                <MdDelete className="text-xl mr-1" />
                <p className="whitespace-nowrap text-xs font-semibold">
                  Supprimer
                </p>
              </span>
              <div className="w-full bg-blue-50  rounded-lg px-4 py-2 flex flex-col justify-around shadow-lg border">
                <p className="text-lg font-bold text-blue-900">
                  Analyse du Sang N : {index + 1}
                </p>
                <div className="py-3">
                  <p className="text-gray-600 text-sm  ">{test.description}</p>
                </div>
                <div className=" w-fit  flex gap-1 -ml-0.5 mt-2  font-semibold">
                  <span className="whitespace-nowrap rounded-full bg-blue-300 px-2.5 py-[0.17rem] text-xs text-blue-700">
                    {test.hour_visit}
                  </span>
                  <span className="whitespace-nowrap rounded-full bg-blue-300 px-2.5 py-[0.17rem] text-xs text-blue-700">
                    {test.date_exam}
                  </span>
                </div>
              </div>
              <div className="flex justify-between mt-4 space-x-4">
                <div className="flex flex-col items-center w-1/3">
                  <div className="w-full border shadow-lg  h-10 rounded border-gray-300 bg-blue-200 flex items-center justify-center text-blue-900 font-semibold">
                    {test.systolic} mmHg
                  </div>
                  <span className="text-base text-blue-900 mt-1">Systolic</span>
                </div>
                <div className="flex flex-col items-center w-1/3">
                  <div className="w-full h-10 shadow-lg  border border-gray-300 rounded bg-blue-300 flex items-center justify-center text-blue-900 font-semibold">
                    {test.diastolic} mmHg
                  </div>
                  <span className="text-base text-blue-900 mt-1">
                    Diastolic
                  </span>
                </div>
                <div className="flex flex-col  items-center w-1/3">
                  <div className="w-full h-10 shadow-lg  border rounded border-gray-300 bg-blue-400 flex items-center justify-center text-blue-900 font-semibold">
                    {test.pulse} Bpm
                  </div>
                  <span className="text-base text-blue-900 mt-1">Pulse</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Testsang;

import PatientsTable from './PatientsTable';
import Img from '../assets/img2.png';
import { HR } from 'flowbite-react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../API';
const AllPatients = () => {
  const navigate = useNavigate();
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
  }, []);
  return (
    <div className="ml-60 px-10 mt-28 flex flex-col space-y-10 ">
      <img
        src={Img}
        alt="error"
        className="fixed -z-10 right-[25%] top-[16rem] w-[560px] opacity-50"
      />

      <div className="text-3xl font-semibold capitalize text-blue-900  ">
        Historique des patients examinés
        <HR.Trimmed className="bg-blue-200  md:mt-3 md:w-[29.3rem] md:mx-0 md:mb-0" />
      </div>

      <PatientsTable />
    </div>
  );
};

export default AllPatients;

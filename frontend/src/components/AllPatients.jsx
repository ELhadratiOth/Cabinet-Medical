import PatientsTable from './PatientsTable';
import Img from '../assets/img2.png';
import { HR } from 'flowbite-react';

const AllPatients = () => {
  return (
    <div className="ml-60 px-10 mt-28 flex flex-col space-y-10 ">
      <img
        src={Img}
        alt="error"
        className="fixed -z-10 right-[25%] top-[16rem] w-[560px] opacity-50"
      />

      <div className="text-3xl font-semibold capitalize text-blue-900  ">
        Historique des patients examinés
        <HR.Trimmed className="bg-blue-200  md:mt-3 md:w-[23rem] md:mx-0 md:mb-0" />
      </div>

      <PatientsTable />
    </div>
  );
};

export default AllPatients;

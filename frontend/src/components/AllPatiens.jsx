import PatientsTable from './PatientsTable';
import Img from '../assets/img2.png';

const AllPatiens = () => {
  return (
    <div className="ml-60 px-10 mt-36 flex flex-col space-y-10 ">
      <img
        src={Img}
        alt="error"
        className="fixed -z-10 right-[25%] top-[16rem] w-[560px] opacity-50"
      />

      <div className="text-3xl font-semibold capitalize  ">
        Les patients récemment visités
        <hr className="mt-2 border-blue-300" />
      </div>

      <PatientsTable />
    </div>
  );
};

export default AllPatiens;

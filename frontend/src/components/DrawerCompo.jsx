/* eslint-disable react-hooks/exhaustive-deps */
import { Link } from 'react-router-dom';
import AdvancedSearch from './AdvancedSearch';
import Search from './Search';
import { useLocation } from 'react-router-dom';
import { MdDataUsage } from 'react-icons/md';
import { FaUserDoctor } from 'react-icons/fa6';
import { LuStethoscope } from 'react-icons/lu';
import { IoIosLogOut } from 'react-icons/io';
import { FaHospitalUser } from 'react-icons/fa6';
import { FaPeopleGroup } from 'react-icons/fa6';
import { RiUserSearchFill } from 'react-icons/ri';
import { useEffect, useState } from 'react'
import { SiWebmoney } from 'react-icons/si';

export default function DrawerCompo() {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const firstname = query.get('firstname');
  const lastname = query.get('lastname');
  const [displayPdf, setDisplayPdf] = useState(true);
  
  useEffect(() => {
    console.log('first value : ' + firstname + ' last value : ' + lastname);
    if (firstname === null && lastname === null) setDisplayPdf(false);
    else setDisplayPdf(true);
  }, [firstname, lastname]);

const PDF = () => (
  <div className="w-[90%] ml-[5%] left-0 absolute top-[56%] flex flex-col p-4 border-2   items-center justify-center bg-[#121a30]   border-blue-900 shadow-lg rounded-2xl">
    <div className="">
      <div className="text-center p-3 mb-3 flex-auto justify-center">
        <h2 className="text-lg w-max font-semibold   text-gray-200">
          Ordonnance Medicale
        </h2>
      </div>
      <div className=" flex justify-center items-center pb-3  text-center  md:block">
        <button className="bg-blue-400 w-[90%]  hover:bg-[#15337e]  hover:text-white py-1 shadow-sm hover:shadow-lg font-medium tracking-wider border-2 border-[#15337e] hover:border-blue-400 text-white rounded-md text-lg transition ease-in duration-300">
          <Link to={`/ordonnance?firstname=${firstname}&lastname=${lastname}`}>
            Créer
          </Link>
        </button>
      </div>
    </div>
  </div>
);

  return (
    <div className="fixed left-0 top-0 my-3  ">
      <div className="flex relative h-screen w-60 flex-col justify-between border-e bg-blue-100 rounded-br-2xl rounded-tr-2xl">
        <div>
          <div className="inline-flex  pb-5 pt-[1.5rem] w-full items-center justify-center   ">
            <div className=" py-3 flex justify-center items-center space-x-3 px-5 text-base font-bold  place-content-center rounded-lg bg-gray-100 text-gray-600">
              <FaUserDoctor className="text-2xl"></FaUserDoctor>
              <div> Ilham Ouzahra </div>
            </div>
          </div>

          <div className="border-t border-gray-100">
            <div className="px-2">
              <div className="py-4">
                <Link
                  to="/"
                  className="group w-full  relative capitalize flex justify-center items-center space-x-3 rounded bg-blue-50 px-2 py-1.5 text-blue-700"
                >
                  <MdDataUsage />
                  <div> tableau de bord</div>
                </Link>
              </div>

              <ul className="space-y-1 capitalize border-t border-gray-100 pt-4">
                <li>
                  <Link
                    to="/allpatients"
                    className="group relative flex justify-start items-center space-x-3 rounded px-2 py-1.5 text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                  >
                    <FaPeopleGroup className="font-bold ml-5" />
                    <div> Nos Patients</div>
                  </Link>
                </li>
                <li className="group relative flex justify-start space-x-3  items-center srounded px-2 py-1.5 text-gray-500 hover:bg-gray-50 hover:text-gray-700">
                  <RiUserSearchFill className="font-bold ml-5 " />
                  <Search />
                </li>
                <li className="group relative flex justify-start items-center space-x-3 rounded px-2 py-1.5 text-gray-500 hover:bg-gray-50 hover:text-gray-700">
                  <LuStethoscope className="font-bold ml-5" />
                  <AdvancedSearch />
                </li>

                <li>
                  <Link
                    to="/newpatient"
                    className="group relative flex justify-start items-center space-x-3 rounded px-2 py-1.5 text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                  >
                    <FaHospitalUser className="font-bold ml-5" />
                    <div> Nouveau patient</div>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/charges"
                    className="group relative flex justify-start items-center space-x-3 rounded px-2 py-1.5 text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                  >
                    <SiWebmoney className="font-bold ml-5" />
                    <div>Aperçu financier</div>
                  </Link>
                </li>
              </ul>
              {displayPdf && <PDF />}
            </div>
          </div>
        </div>

        <div className="sticky inset-x-0 bottom-0 border-t border-gray-100 bg-white p-2">
          <form action="#">
            <button
              type="submit"
              className="group relative font-bold flex w-full justify-center items-center space-x-3 rounded-lg px-2 py-1.5 text-sm text-gray-500 hover:bg-gray-200 hover:text-gray-700"
            >
              <IoIosLogOut className="text-2xl " />
              <div> Log Out</div>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}



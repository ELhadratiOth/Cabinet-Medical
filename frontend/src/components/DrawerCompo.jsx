import { Link, useLocation } from 'react-router-dom';
import AdvancedSearch from './AdvancedSearch';
import Search from './Search';
import { MdDataUsage } from 'react-icons/md';
import { LuStethoscope } from 'react-icons/lu';
import { IoIosLogOut } from 'react-icons/io';
import { RiUserSearchFill } from 'react-icons/ri';
import { SiWebmoney } from 'react-icons/si';
import { TbFileCertificate } from 'react-icons/tb';
import { useEffect, useState } from 'react';
import { FaPeopleGroup } from 'react-icons/fa6';
import { RiUserAddFill } from 'react-icons/ri';
import { FaUserDoctor } from 'react-icons/fa6';

export default function DrawerCompo() {
  const location = useLocation();
  const [displayHeaders, setDisplayHeaders] = useState(true);

  useEffect(() => {
    if (location.pathname === '/') {
      setDisplayHeaders(false);
    } else {
      setDisplayHeaders(true);
    }
  }, [location.pathname]);

  return (
    displayHeaders && (
      <div className="fixed left-0 top-0 my-3 ">
        <div className="flex relative h-screen w-60 flex-col justify-between border-e bg-blue-100 rounded-br-2xl rounded-tr-2xl">
          <div>
            <div className="inline-flex pb-5 pt-[1.5rem] w-full items-center justify-center">
              <div className="py-3 flex justify-center items-center space-x-3 px-5 text-base font-bold place-content-center rounded-lg bg-gray-100 text-gray-600">
                <FaUserDoctor className="text-2xl" />
                <div>Ilham Ouzzahra</div>
              </div>
            </div>

            <div className="border-t border-gray-100">
              <div className="px-2">
                <div className="py-4">
                  <Link
                    to="/home"
                    className="group w-full relative capitalize flex justify-center items-center space-x-3 rounded bg-blue-50 px-2 py-1.5 text-blue-700"
                  >
                    <MdDataUsage />
                    <div>Tableau de bord</div>
                  </Link>
                </div>

                <ul className="space-y-1 capitalize border-t border-gray-100 pt-4">
                  <li>
                    <Link
                      to="/allpatients"
                      className="group relative flex justify-start items-center space-x-3 rounded px-2 py-1.5 text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                    >
                      <FaPeopleGroup className="ml-5" />
                      <div>Nos Patients</div>
                    </Link>
                  </li>
                  <li className="group relative flex justify-start space-x-3 items-center rounded px-2 py-1.5 text-gray-500 hover:bg-gray-50 hover:text-gray-700">
                    <RiUserSearchFill className="font-bold ml-5" />
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
                      <RiUserAddFill className="font-bold ml-5" />
                      <div>Nouveau patient</div>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/certificatrapide"
                      className="group relative flex justify-start items-center space-x-3 rounded px-2 py-1.5 text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                    >
                      <TbFileCertificate className="font-bold ml-5" />
                      <div>Autre Revenu</div>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/charges"
                      className="group relative flex justify-start items-center space-x-3 rounded px-2 py-1.5 text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                    >
                      <SiWebmoney className="font-bold ml-5" />
                      <div>Dépenses</div>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="sticky inset-x-0 bottom-0 border-t border-gray-100 bg-white p-2">
            <Link to={'/'}>
              <button
                type="submit"
                className="group relative font-bold flex w-full justify-center items-center space-x-3 rounded-lg px-2 py-1.5 text-sm text-gray-500 hover:bg-gray-200 hover:text-gray-700"
              >
                <IoIosLogOut className="text-2xl" />
                <div>Log Out</div>
              </button>
            </Link>
          </div>
        </div>
      </div>
    )
  );
}

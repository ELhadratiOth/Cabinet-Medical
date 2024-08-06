import { Link } from 'react-router-dom';
import Search from './Search';
import { MdDataUsage } from 'react-icons/md';
import { FaUserDoctor } from 'react-icons/fa6';
import { LuStethoscope } from 'react-icons/lu';
import { IoIosLogOut } from 'react-icons/io';
import { FaHospitalUser } from 'react-icons/fa6';



export default function DrawerCompo() {
  return (
    <div className="fixed left-0 top-0 my-3 ">
      <div className="flex h-screen w-60 flex-col justify-between border-e bg-blue-100 rounded-br-2xl rounded-tr-2xl">
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
                  <div className="group relative flex justify-center items-center space-x-3 rounded px-2 py-1.5 text-gray-500 hover:bg-gray-50 hover:text-gray-700">
                    <LuStethoscope className="font-bold" />
                    <Search />
                  </div>
                </li>

                <li>
                  <Link
                    to="/new_patient"
                    className="group relative flex justify-center items-center space-x-3 rounded px-2 py-1.5 text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                  >
                    <FaHospitalUser className="font-bold" />
                    <div> Nouveau patient</div>
                  </Link>
                </li>

                <li>
                  <Link
                    to="#"
                    className="group relative flex justify-center rounded px-2 py-1.5 text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                  >
                    sdfyguio
                  </Link>
                </li>

                <li>
                  <Link
                    to="#"
                    className="group relative flex justify-center rounded px-2 py-1.5 text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                  >
                    dsaffd
                  </Link>
                </li>
              </ul>
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

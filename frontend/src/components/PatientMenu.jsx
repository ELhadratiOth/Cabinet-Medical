/* eslint-disable react/prop-types */
import { MdMedicalServices } from 'react-icons/md';
import { TbReportMedical } from 'react-icons/tb';
import { TbVaccine } from 'react-icons/tb';
import { LiaAllergiesSolid } from 'react-icons/lia';
import { MdOutlineBloodtype } from 'react-icons/md';
import { RiPsychotherapyLine } from 'react-icons/ri';
import { LiaFileMedicalAltSolid } from 'react-icons/lia';
import { TiUser } from 'react-icons/ti';
import { GiMedicalDrip } from 'react-icons/gi';

import { Link } from 'react-router-dom';

const PatientMenu = ({ firstname, lastname }) => {
  return (
    <div className="border-blue-200 bg-blue-100 flex items-center justify-center w-40 h-10 rounded-md">
      <div className="relative group">
        <button className="flex items-center gap-2 px-3 py-2 rounded-md text-gray-500 hover:text-gray-800 transition-colors">
          <div className="font-medium space-x-2 flex text-sm justify-center items-center">
            <MdMedicalServices className="text-xl" />
            <div>Service Medical</div>
          </div>
        </button>
        <div className="absolute top-[50%] -right-5 pt-10 bg-transparent z-10">
          <ul className=" flex-col gap-2 p-2 rounded-lg bg-white shadow-xl  w-48 overflow-hidden  hidden group-hover:flex ">
            <Option
              icon={TiUser}
              text="Profil du Patient"
              path={`/patient?firstname=${firstname}&lastname=${lastname}`}
            />
            <Option
              icon={TbReportMedical}
              text="Les Visites Medicals"
              path={`/medicalVisit?firstname=${firstname}&lastname=${lastname}`}
            />
            <Option
              icon={LiaFileMedicalAltSolid}
              text="Les Examinations"
              path={`/examinations?firstname=${firstname}&lastname=${lastname}`}
            />
            <Option
              icon={TbVaccine}
              text="Les Vaccins"
              path={`/vaccins?firstname=${firstname}&lastname=${lastname}`}
            />
            <Option
              icon={LiaAllergiesSolid}
              text="Les Allergies"
              path={`/allergies?firstname=${firstname}&lastname=${lastname}`}
            />
            <Option
              icon={MdOutlineBloodtype}
              text="Analyses Du Sang"
              path={`/testSang?firstname=${firstname}&lastname=${lastname}`}
            />
            <Option
              icon={GiMedicalDrip}
              text="Radiologie"
              path={`/radiologies?firstname=${firstname}&lastname=${lastname}`}
            />
            <Option
              icon={RiPsychotherapyLine}
              text="Autres"
              path={`/autre?firstname=${firstname}&lastname=${lastname}`}
            />
          </ul>
        </div>
      </div>
    </div>
  );
};

const Option = ({ text, icon: Icon, path }) => {
  return (
    <Link
      to={path}
      className="flex items-center gap-2 w-full p-2 text-xs font-medium whitespace-nowrap rounded-md hover:bg-indigo-100 text-slate-700 hover:text-indigo-500 transition-colors cursor-pointer"
    >
      <Icon className="text-base" />
      <span>{text}</span>
    </Link>
  );
};

export default PatientMenu;

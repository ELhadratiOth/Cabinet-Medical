/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { twMerge } from 'tailwind-merge';
import { SiGithub, SiTiktok, SiTwitter, SiYoutube } from 'react-icons/si';
import { LiaFileMedicalAltSolid } from 'react-icons/lia';
import { FaTemperatureEmpty } from 'react-icons/fa6';
import { MdOutlineMonitorWeight } from 'react-icons/md';
import { GiBodyHeight } from 'react-icons/gi';
import { BsHeartPulseFill } from 'react-icons/bs';

const RevealBento = ({ examination, index }) => {
          return (
            <div className="w-fit p-4 rounded-md   bg-gray-100/50 backdrop-blur-[2px] ring-1  ">
              <div className=" text-zinc-50">
                <div className="mx-auto grid max-w-4xl grid-flow-dense grid-cols-12 gap-4">
                  <HeaderBlock examination={examination} index={index} />
                  <SocialsBlock examination={examination} />
                </div>
              </div>
            </div>
          );
};

const HeaderBlock = ({ examination, index }) => (
  <Block className="col-span-12 row-span-2 md:col-span-6">
    <LiaFileMedicalAltSolid className="text-6xl -ml-2 text-blue-900" />
    <h1 className="mb-2 text-2xl font-medium leading-tight">
      Examination N : {index + 1}
    </h1>
    <p className="text-lg font-semibold">{examination.description}</p>
    <div className="mt-2  flex flex-wrap gap-1 ">
      <span className="whitespace-nowrap rounded-full bg-gray-100 px-2.5 py-0.5 text-xs text-blue-600">
        {examination.hour_visit}
      </span>
      <span className="whitespace-nowrap rounded-full bg-gray-100 px-2.5 py-0.5 text-xs text-blue-600">
        {examination.date_exam}
      </span>
    </div>
  </Block>
);

const SocialsBlock = ({ examination }) => (
  <>
    <Block className="col-span-6 bg-blue-100 md:col-span-3">
      <div className="h-full flex space-x-2 justify-center items-center text-lg">
        <FaTemperatureEmpty className="text-4xl text-blue-900 " />
        <div className="text-center capitalize font-semibold">
          température <br />{' '}
          <span className="font-bold text-xl">{examination.temperature}</span>{' '}
          °C
        </div>
      </div>
    </Block>
    <Block className="col-span-6 bg-blue-100 md:col-span-3">
      <div className="h-full flex space-x-6 justify-center items-center text-lg">
        <MdOutlineMonitorWeight className="text-5xl text-blue-900" />
        <div className="text-center tracking-widest capitalize font-semibold">
          poids <br />{' '}
          <span className="font-bold text-xl">{examination.weight}</span> kg
        </div>
      </div>
    </Block>
    <Block className="col-span-6 bg-blue-100 md:col-span-3">
      <div className="h-full flex space-x-6 justify-center items-center text-lg">
        <GiBodyHeight className="text-4xl text-blue-900" />
        <div className="text-center capitalize tracking-widest font-semibold">
          taille <br />{' '}
          <span className="font-bold text-xl">{examination.height}</span> cm
        </div>
      </div>
    </Block>
    <Block className="col-span-6  bg-blue-100 md:col-span-3">
      <div className="h-full flex space-x-4 justify-center items-center text-lg">
        <BsHeartPulseFill className="text-4xl text-blue-900" />
        <div className="text-center capitalize font-semibold">
          Heart Rate
          <br />{' '}
          <span className="font-bold text-xl">
            {examination.heart_rate}
          </span>{' '}
          bpm
        </div>
      </div>
    </Block>
  </>
);

//to make  a shape
const Block = ({ className, ...rest }) => {
  return (
    <div
      className={twMerge(
        'col-span-4 rounded-lg ring-1 bg-blue-200 text-black px-4 py-2 shadow-xl',
        className,
      )}
      {...rest}
    />
  );
};

export default RevealBento;

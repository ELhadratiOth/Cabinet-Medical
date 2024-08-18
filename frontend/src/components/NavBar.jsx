/* eslint-disable react/prop-types */
import Logo from '../assets/Logo.png';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { FiMoon, FiSun } from 'react-icons/fi';

const TOGGLE_CLASSES =
  'text-sm font-medium flex items-center gap-2 px-3 md:pl-3 md:pr-3.5 py-3 md:py-1.5 transition-colors relative z-10';

const NavBar = () => {
  const [selected, setSelected] = useState('light');

  return (
    <div className=" container z-50  h-[5.79rem] fixed top-0 left-0 w-[82%] ml-64 mr-4  mt-3 rounded-2xl px-12 mb-7 flex justify-between bg-blue-100 items-center">
      <div className="flex relative justify-start items-center">
        {' '}
        <img src={Logo}  className='w-[70px] md:w-[180px]  ' alt="error" />{' '}
        <div className=" absolute top-10 left-16  font-bold w-max text-lg md:text-xl uppercase">
          <p>Cabinet Medical</p>
        </div>
      </div>
      <div>
       
        <SliderToggle selected={selected} setSelected={setSelected} />
      </div>
    </div>
  );
};

export default NavBar;

const SliderToggle = ({ selected, setSelected }) => {
  return (
    <div className="relative flex w-fit items-center rounded-full">
      <button
        className={`${TOGGLE_CLASSES} ${
          selected === 'light' ? 'text-white' : 'text-slate-300'
        }`}
        onClick={() => {
          setSelected('light');
        }}
      >
        <FiMoon className="relative z-10 text-lg md:text-sm" />
        <span className="relative z-10">Light</span>
      </button>
      <button
        className={`${TOGGLE_CLASSES} ${
          selected === 'dark' ? 'text-white' : 'text-slate-800'
        }`}
        onClick={() => {
          setSelected('dark');
        }}
      >
        <FiSun className="relative z-10 text-lg md:text-sm" />
        <span className="relative z-10">Dark</span>
      </button>
      <div
        className={`absolute inset-0 z-0 flex ${
          selected === 'dark' ? 'justify-end' : 'justify-start'
        }`}
      >
        <motion.span
          layout
          transition={{ type: 'spring', damping: 15, stiffness: 250 }}
          className="h-full w-1/2 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600"
        />
      </div>
    </div>
  );
};

/* eslint-disable react/prop-types */
import Logo from '../assets/lg.png';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const NavBar = () => {
const location = useLocation();
const [displayHeaders, setDisplayHeaders] = useState(true);

useEffect(() => {
  if (location.pathname === '/') {
    setDisplayHeaders(false);
  } else {
    setDisplayHeaders(true);
  }
}, [location.pathname]);
  return ( displayHeaders && (<div className=" container z-50  h-[6.5rem] fixed top-0 left-0 w-[82%] ml-64 mr-4  mt-3 rounded-2xl  px-3 mb-7 flex justify-between bg-blue-100 items-center">
      <div className="flex relative justify-start items-center">
        {' '}
        <img src={Logo} className="w-[70px] md:w-[130px]  " alt="error" />{' '}
        <div className=" absolute top-8 left-32 text-center  font-bold w-max text-lg md:text-xl uppercase">
          <p>Cabinet Medecine <br></br> générale</p>
        </div>
      </div>
    </div>)
    
  );
};

export default NavBar;

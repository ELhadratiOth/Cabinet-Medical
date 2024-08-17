/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import API from '../API';
import Img from '../assets/img111.png';
import { MdDelete } from 'react-icons/md';
import { HR } from 'flowbite-react';
import { MdAccountBalanceWallet } from 'react-icons/md';
import AddbtnCharges from './AddbtnCharges';
const recurringExpenses = [
  {
    id: -1,
    label: 'Eau et Electricite',
    value_money: 2000,
  },

  {
    id: -2,
    label: 'Assistante',
    value_money: 2000,
  },
  { id: -3, label: 'paiement de loyer', value_money: 1000 },
  { id: -4, label: 'Credit Bank', value_money: 2000 },
];

const Charges = () => {
  const [charges, setCharges] = useState([]);

  const fetchCharges = async () => {
    try {
      const response = await API.get(`/charges/current_month`);
      setCharges(response.data);
      console.log(response.data);
    } catch (error) {
      console.warn('Error fetching charges:', error);
    }
  };

  useEffect(() => {
    fetchCharges();
    console.log(charges);
  }, []);
  const addNewCharge = newCharge => {
    setCharges(prevCharges => [newCharge, ...prevCharges]);
  };
  const deleteCharge = async (e, id) => {
    e.stopPropagation();
    console.log('clicked');
    try {
      await API.delete(`/charges/delete/${id}`);
      setCharges(prevCharges => prevCharges.filter(charge => charge.id !== id));
    } catch (error) {
      console.error('Error deleting charge:', error);
    }
  };

  return (
    <div className="ml-60 px-10 space-y-8 mt-28 flex flex-col mb-20">
      <img
        src={Img}
        alt="background"
        className="fixed -z-10 right-[26%] top-[14rem] w-[500px] opacity-50"
      />
      <div className="w-full flex justify-between items-center rounded-md">
        <div className="text-3xl font-semibold px-2 py-2 rounded-md text-blue-900">
          Revenus et dépenses :
          <HR.Trimmed className="bg-blue-200 md:w-[19.5rem] md:mx-0 md:mt-3 md:mb-0" />
        </div>
        <div className="mr-6">
          <AddbtnCharges addNewCharge={addNewCharge} />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 mt-8">
        {recurringExpenses.map(charge => (
          <div
            key={charge.id}
            className="relative bg-gradient-to-tl from-gray-900/80 to-gray-950/80 hover:from-gray-800/90 hover:to-gray-950/90 backdrop-blur-md transition-colors duration-500 cursor-pointer border-r-2 border-t-2 border-gray-900 m-4 rounded-lg overflow-hidden"
          >
            <div className="flex flex-col justify-start space-x-8 items-start mt-5 mb-5">
              <MdAccountBalanceWallet className="text-blue-700 text-6xl ml-6 mb-3" />
              <div>
                <div className="uppercase font-bold text-lg text-gray-300">
                  {charge.label}
                </div>
                <div className="text-gray-300 uppercase tracking-widest text-sm">
                  {charge.value_money} MAD
                </div>
              </div>
            </div>
            <div className="h-2 w-full bg-gradient-to-l via-blue-300 group-hover:blur-xl blur-2xl m-auto rounded transition-all absolute bottom-14"></div>
            <div className="h-3 bg-gradient-to-l via-blue-700/50 duration-700 group-hover:via-blue-500 w-[100%] m-auto absolute bottom-0 rounded-full transition-all"></div>
          </div>
        ))}

        <div className="col-span-full w-full flex justify-center items-center ">
          <HR.Trimmed className="w-[30rem] bg-blue-700 left-1/2" />
        </div>

        {charges.length === 0 ? (
          <div className="text-base leading-relaxed text-gray-500 dark:text-gray-400 text-center col-span-full">
            Aucune charges supplémentaires pour le moment pour cette mois.
          </div>
        ) : (
          charges.map(charge => (
            <div
              key={charge.id}
              className="relative bg-gradient-to-tl from-gray-900/80 to-gray-950/80 hover:from-gray-800/90 hover:to-gray-950/90 backdrop-blur-md transition-colors duration-500 cursor-pointer border-r-2 border-t-2 border-gray-900 m-4 rounded-lg overflow-hidden"
            >
              <div
                onClick={e => deleteCharge(e, charge.id)}
                className="absolute group hover:bg-red-600 -top-[15%] pl-1.5 py-3 -right-[10%] rounded-full transition -rotate-45 duration-300 z-20 cursor-pointer drop-shadow-lg ease-in-out bg-red-500 w-20"
              >
                <MdDelete className="text-3xl mb-1 ml-1 mt-1.5 text-gray-200 rotate-45 group-hover:text-black group-hover:transition group-hover:duration-300 group-hover:scale-110" />
              </div>

              <div className="flex flex-col justify-start space-x-8 items-start mt-5 mb-5">
                <MdAccountBalanceWallet className="text-blue-700 text-6xl ml-6 mb-3" />
                <div>
                  <div className="uppercase font-bold text-lg text-gray-300">
                    {charge.label}
                  </div>
                  <div className="text-gray-300 uppercase tracking-widest text-sm">
                    {charge.value_money} MAD
                  </div>
                </div>
              </div>
              <div className="h-2 w-full bg-gradient-to-l via-blue-300 group-hover:blur-xl blur-2xl m-auto rounded transition-all absolute bottom-14"></div>
              <div className="h-3 bg-gradient-to-l via-blue-700/50 duration-700 group-hover:via-blue-500 w-[100%] m-auto absolute bottom-0 rounded-full transition-all"></div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Charges;

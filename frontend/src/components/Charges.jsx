/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import API from '../API';
import { useNavigate } from 'react-router-dom';

import Img from '../assets/img111.png';
import { MdDelete, MdAccountBalanceWallet } from 'react-icons/md';
import { HR } from 'flowbite-react';
import AddbtnCharges from './AddbtnCharges';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

const Charges = () => {
  const navigate = useNavigate();
  const [charges, setCharges] = useState([]);
  const [recurringExpenses, setRecurringExpenses] = useState([]);

  const fetchCharges = async () => {
    try {
      const response = await API.get(`/charges/current_month`);
      const allCharges = response.data;
      const firstFourCharges = allCharges.slice(0, 4);
      const remainingCharges = allCharges.slice(4);

      setRecurringExpenses(firstFourCharges);
      setCharges(remainingCharges);
    } catch (error) {
      console.error('Error fetching charges:', error);
    }
  };

  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await API.get(`user/verify-token/${token}`);
        if (response.status !== 200) {
          throw new Error('Token verification failed');
        }
      } catch (error) {
        console.error('Verification Error:', error);
        localStorage.removeItem('token');
        navigate('/');
      }
    };

    verifyToken();
    fetchCharges();
  }, []);

  const addNewCharge = newCharge => {
    setCharges(prevCharges => [newCharge, ...prevCharges]);
  };

  const deleteCharge = async (e, id) => {
    e.stopPropagation();
    try {
      await API.delete(`/charges/delete/${id}`);
      setCharges(prevCharges => prevCharges.filter(charge => charge.id !== id));
    } catch (error) {
      console.error('Error deleting charge:', error);
    }
  };

  const UpdateForm = ({ charge }) => {
    const [currentCharge, setCurrentCharge] = useState(charge);
    const [isInputEmpty, setIsInputEmpty] = useState(false);

    useEffect(() => {
      setCurrentCharge(charge);
    }, [charge]);

    const handleUpdate = async () => {
      if (!currentCharge.value_money) {
        setIsInputEmpty(true);
        return;
      }

      try {
        await API.put(`/charges/update/${currentCharge.id}`, {
          value_money: currentCharge.value_money,
        });
        fetchCharges();
        setIsInputEmpty(false);
      } catch (error) {
        console.error('Error updating charge:', error);
      }
    };

    const handleInputChange = e => {
      setCurrentCharge({ ...currentCharge, value_money: e.target.value });

      if (e.target.value) {
        setIsInputEmpty(false);
      } else {
        setIsInputEmpty(true);
      }
    };

    if (!currentCharge) {
      return null;
    }

    return (
      <Dialog>
        <DialogTrigger asChild>
          <div className="relative bg-gradient-to-tl from-gray-900/80 to-gray-950/80 hover:from-gray-800/90 hover:to-gray-950/90 backdrop-blur-md transition-colors duration-500 cursor-pointer border-r-2 border-t-2 border-gray-900 m-4 rounded-lg overflow-hidden">
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
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="font-bold text-lg">Modifier le Montant</DialogTitle>
            <DialogDescription></DialogDescription>
            <div className="mb-4 space-y-2">
              <Label htmlFor="chargeValue"
              
              >Montant</Label>
              <Input
                id="chargeValue"
                type="number"
                value={currentCharge.value_money}
                onChange={handleInputChange}
                className={ 
                  isInputEmpty ? 'border-red-500 border-2' : 'border-1 border-blue-400 focus:border-0'
                }
              />
            </div>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="secondary"
              className="bg-blue-300 hover:bg-blue-400 ring ring-blue-500"
              onClick={handleUpdate}
              disabled={isInputEmpty}
            >
              Modifier
            </Button>
            <DialogClose asChild>
              <Button variant="secondary">Annuler</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
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
          Dépenses
          <HR.Trimmed className="bg-blue-200 md:w-[9.5rem] md:mx-0 md:mt-3 md:mb-0" />
        </div>
        <div className="mr-6">
          <AddbtnCharges addNewCharge={addNewCharge} />
        </div>
      </div>
      <div className="col-span-full w-full flex justify-start items-center my-6 text-blue-900">
        <div className="flex items-center justify-start">
          <div className="pr-4 pl-1 font-bold text-2xl">
            Dépenses récurrentes
          </div>
          <div className="inset-x-0 mt-[0.56rem] top-1/2 h-[4px] -translate-y-1/2 bg-transparent bg-gradient-to-r w-[15cm] from-blue-900 to-transparent opacity-75"></div>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 mt-8">
        {recurringExpenses.map(charge => (
          <UpdateForm key={charge.id} charge={charge} />
        ))}

        <div className="col-span-full w-full flex justify-start items-center my-6 text-blue-900">
          <div className="flex items-center justify-start">
            <div className="pr-4 pl-1 font-bold text-2xl">
              Dépenses Supplémentaires
            </div>
            <div className="inset-x-0 mt-[0.56rem] top-1/2 h-[4px] -translate-y-1/2 bg-transparent bg-gradient-to-r w-[15cm] from-blue-900 to-transparent opacity-75"></div>
          </div>
        </div>

        {charges.length === 0 ? (
          <div className="text-base leading-relaxed text-gray-500 dark:text-gray-400 text-center col-span-full">
            Aucune Dépenses supplémentaires pour le moment pour cette mois.
          </div>
        ) : (
          charges.map(charge => (
            <div
              key={charge.id}
              className="relative bg-gradient-to-tl from-gray-900/80 to-gray-950/80 hover:from-gray-800/90 hover:to-gray-950/90 backdrop-blur-md transition-colors duration-500 cursor-pointer border-r-2 border-t-2 border-gray-900 m-4 rounded-lg overflow-hidden"
            >
              <div
                onClick={e => deleteCharge(e, charge.id)}
                className="absolute group hover:bg-red-600 -top-[0%] pl-1.5 py-3 -right-[0%] bg-red-500 text-center rounded-tl-xl shadow-xl z-10"
              >
                <MdDelete className="text-2xl text-white mx-auto" />
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

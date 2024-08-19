/* eslint-disable react/prop-types */
import { useState } from 'react';
import { Button } from '@/components/ui/button';
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
import { HR } from 'flowbite-react';
import API from '../API';
import { MdAdd } from 'react-icons/md';

const AddbtnFastCertif = ({ addNewFastCertif }) => {
  const [fastCertif, setFastCertif] = useState({
    label: '',
    money: '',
  });
  const [errors, setErrors] = useState({
    label: false,
    money: false,
  });

  const handleChange = field => event => {
    setFastCertif({ ...fastCertif, [field]: event.target.value });
    setErrors({ ...errors, [field]: !event.target.value.trim() });
  };

  const validate = () => {
    const newErrors = {
      label: !fastCertif.label.trim(),
      money: !fastCertif.money.trim(),
    };
    setErrors(newErrors);
    return !newErrors.label && !newErrors.money;
  };

  const addFastCertif = async () => {
    if (!validate()) return;

    const dataToSend = {
      ...fastCertif,
      label: fastCertif.label || 'Non Saisi',
      money: fastCertif.money || 'Non Saisi',
    };

    console.log('FastCertif Added:', dataToSend);

    try {
      const response = await API.post(
        `/medical_visits/quick/certificat/add`,
        dataToSend,
      );
      addNewFastCertif(response.data);
    } catch (error) {
      console.error('Error adding fastCertif:', error);
    }

    setFastCertif({
      label: '',
      money: '',
    });
    setErrors({
      label: false,
      money: false,
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="rounded-lg relative w-36 h-10 cursor-pointer flex items-center border border-blue-300 bg-blue-300 overflow-hidden group hover:bg-blue-300 active:bg-blue-300 active:border-blue-300"
        >
          <span className="text-black font-semibold text-base -ml-[2rem] transform group-hover:translate-x-20 transition-all duration-500">
            Ajouter Une!
          </span>
          <span className="absolute right-0 h-full w-10 rounded-lg bg-blue-300 flex items-center justify-center transform group-hover:translate-x-0 group-hover:w-full transition-all duration-500">
            <MdAdd className="text-3xl" />
          </span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            Ajouter Revenu
            <HR.Trimmed className="bg-blue-200 md:w-[9rem] md:mx-0 md:mt-3 md:mb-0" />
          </DialogTitle>
          <DialogDescription />
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex-col space-y-3 flex justify-start items-start">
            <Label htmlFor="label">Autre Revenu</Label>
            <Input
              id="label"
              value={fastCertif.label}
              onChange={handleChange('label')}
              placeholder="Saisir Autre Revenu (ECG, certificat, Permis ...)"
              className={`border-2 ${
                errors.label ? 'border-red-500' : 'border-blue-200'
              } focus:border-0 placeholder:text-gray-500/50`}
            />
          </div>
          <div className="flex-col flex space-y-3 justify-start items-start">
            <Label htmlFor="money">Montant</Label>
            <Input
              type="number"
              id="money"
              value={fastCertif.money}
              onChange={handleChange('money')}
              placeholder="Saisir le montant"
              className={`border-2 ${
                errors.money ? 'border-red-500' : 'border-blue-200'
              } w-full placeholder:text-gray-500/50`}
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button
              variant="secondary"
              type="submit"
              className="bg-blue-200 ring mr-3"
              onClick={addFastCertif}
            >
              Ajouter
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button variant="outline">Annuler</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddbtnFastCertif;

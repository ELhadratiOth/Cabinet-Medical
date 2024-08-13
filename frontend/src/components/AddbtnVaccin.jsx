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
import { Textarea } from '@/components/ui/textarea';
import API from '../API';
import { AiOutlineFileAdd } from 'react-icons/ai';
import { HR } from 'flowbite-react';

const AddbtnVaccin = ({ firstname, lastname, addNewVaccin }) => {
  const [vaccin, setVaccin] = useState({
    label: '',
    description: '',
  });

  const handleChange = field => event => {
    setVaccin({ ...vaccin, [field]: event.target.value });
  };

  const addVaccin = async () => {
    const dataToSend = {
      ...vaccin,
      label: vaccin.label || 'Non Saisi',
      description: vaccin.description || 'Non Saisi',
    };

    console.log('Vaccin added:', dataToSend);

    try {
      const response = await API.post(
        `/vaccins/add/${firstname}/${lastname}`,
        dataToSend,
      );
      addNewVaccin(response.data);
    } catch (error) {
      console.error('Error adding vaccin:', error);
    }

    setVaccin({
      name: '',
      description: '',
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="bg-transparent -mr-5 border-0 space-x-2 text-base text-gray-500 hover:text-gray-800 hover:bg-white"
        >
          <AiOutlineFileAdd className="text-xl" /> <div>Ajouter</div>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            Ajouter Un Vaccin
            <HR.Trimmed className="bg-blue-200 md:w-[10rem] md:mx-0 md:mt-3 md:mb-0" />
          </DialogTitle>
          <DialogDescription />
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex-col space-y-3 flex justify-start items-start">
            <Label htmlFor="vaccin" className="">
              Nom Du Vaccin
            </Label>
            <Input
              id="vaccin"
              value={vaccin.name}
              onChange={handleChange('label')}
              placeholder="Saisi le Nom du Vaccin"
              className="border-2 focus:border-0 border-blue-200  placeholder:text-gray-500/50"
            />
          </div>
          <div className="flex-col flex space-y-3  justify-start items-start">
            <Label htmlFor="description" className=" ">
              Vaccin Description
            </Label>
            <Textarea
              id="description"
              value={vaccin.description}
              onChange={handleChange('description')}
              placeholder="Saisi use Description sur le Vaccin"
              className="resize-none border-2 focus:border-0 border-blue-200  w-full placeholder:text-gray-500/50"
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button
              variant="secondary"
              type="submit"
              className="bg-blue-200 ring mr-3"
              onClick={addVaccin}
            >
              Enregistrer
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button
              variant="secondary"
              className="bg-gray-600 ring-gray-600 ring hover:text-black text-white"
            >
              Annuler
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddbtnVaccin;

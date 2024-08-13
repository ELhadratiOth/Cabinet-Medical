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
import { HR } from 'flowbite-react';

import API from '../API';
import { AiOutlineFileAdd } from 'react-icons/ai';

const AddbtnAllergie = ({ firstname, lastname, addNewAllergie }) => {
  const [allergie, setAllergie] = useState({
    label: '',
    description: '',
  });

  const handleChange = field => event => {
    setAllergie({ ...allergie, [field]: event.target.value });
  };

  const addAllergie = async () => {
    const dataToSend = {
      ...allergie,
      label: allergie.label || 'Non Saisi',
      description: allergie.description || 'Non Saisi',
    };

    console.log('Allergie added:', dataToSend);

    try {
      const response = await API.post(
        `/allergies/add/${firstname}/${lastname}`,
        dataToSend,
      );
      addNewAllergie(response.data);
    } catch (error) {
      console.error('Error adding allergie:', error);
    }

    setAllergie({
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
            Ajouter Une Allergie
            <HR.Trimmed className="bg-blue-200 md:w-[11rem] md:mx-0 md:mt-3 md:mb-0" />
          </DialogTitle>
          <DialogDescription />
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex-col space-y-3 flex justify-start items-start">
            <Label htmlFor="allergie" className="">
              Nom d&apos;Allergie
            </Label>
            <Input
              id="allergie"
              value={allergie.name}
              onChange={handleChange('label')}
              placeholder="Saisir le nom de l'allergie"
              className="border-2 focus:border-0 border-blue-200  placeholder:text-gray-500/50"
            />
          </div>
          <div className="flex-col flex space-y-3  justify-start items-start">
            <Label htmlFor="description" className=" ">
              Description d&apos;Allergie
            </Label>
            <Textarea
              id="description"
              value={allergie.description}
              onChange={handleChange('description')}
              placeholder="Saisir une description de l'allergie"
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
              onClick={addAllergie}
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

export default AddbtnAllergie;

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

const AddbtnRadiologyCase = ({ firstname, lastname, addNewRadiology }) => {
  const [radiology, setRadiology] = useState({
    label: '',
    description: '',
  });

  const handleChange = field => event => {
    setRadiology({ ...radiology, [field]: event.target.value });
  };

  const addRadiology = async () => {
    const dataToSend = {
      ...radiology,
      label: radiology.label || 'Non Saisi',
      description: radiology.description || 'Non Saisi',
    };

    try {
      const response = await API.post(
        `/radiologies/add/${firstname}/${lastname}`,
        dataToSend,
      );
      addNewRadiology(response.data);
    } catch (error) {
      console.error('Error adding radiology case:', error);
    }

    setRadiology({
      label: '',
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
            Ajouter Un Radio
            <HR.Trimmed className="bg-blue-200 md:w-[10rem] md:mx-0 md:mt-3 md:mb-0" />
          </DialogTitle>
          <DialogDescription />
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex-col space-y-3 flex justify-start items-start">
            <Label htmlFor="label" className="">
              Type De Radio
            </Label>
            <Input
              id="label"
              value={radiology.label}
              onChange={handleChange('label')}
              placeholder="Saisir le type de Radio"
              className="border-2 focus:border-0 border-blue-200 placeholder:text-gray-500/50"
            />
          </div>
          <div className="flex-col flex space-y-3 justify-start items-start">
            <Label htmlFor="description" className=" ">
              Observation
            </Label>
            <Textarea
              id="description"
              value={radiology.description}
              onChange={handleChange('description')}
              placeholder="Observation"
              className="resize-none border-2 focus:border-0 border-blue-200 w-full placeholder:text-gray-500/50"
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button
              variant="secondary"
              type="submit"
              className="bg-blue-200 ring mr-3"
              onClick={addRadiology}
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

export default AddbtnRadiologyCase;

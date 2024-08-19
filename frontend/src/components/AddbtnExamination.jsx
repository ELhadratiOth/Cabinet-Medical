/* eslint-disable react/prop-types */
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
import { AiOutlineFileAdd } from 'react-icons/ai';
import { useState } from 'react';
import API from '../API';
import { HR } from 'flowbite-react';

export default function AddbtnMedicalVisit({
  firstname,
  lastname,
  addNewExamianation,
}) {
  const [examinations, setExaminations] = useState({
    temperature: '',
    weight: '',
    height: '',
    heart_rate: '',
    description: '',
  });

  const handleChange = field => event => {
    setExaminations({ ...examinations, [field]: event.target.value });
  };

  const addExamination = async () => {

    const dataToSend = {
      temperature: examinations.temperature || '0',
      weight: examinations.weight || '0',
      height: examinations.height || '0',
      heart_rate: examinations.heart_rate || '0',
      description: examinations.description || 'Non Saisi',
    };
    console.log('Medical visit added:', dataToSend);
    try {
      const response = await API.post(
        `/examinations/add/${firstname}/${lastname}`,
        dataToSend,
      );
      addNewExamianation(response.data);
    } catch (error) {
      console.error('Error adding examination:', error);
    }
   
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="bg-transparent border-0 space-x-2 text-base text-gray-500 hover:text-gray-800 hover:bg-white"
        >
          <AiOutlineFileAdd className="text-xl" /> <div>Ajouter</div>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            Ajouter un nouveau examen
            <HR.Trimmed className="bg-blue-200 md:w-[18rem] md:mx-0 md:mt-3 md:mb-0" />
          </DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div className="flex flex-col space-y-5">
          <div className="flex space-x-4">
            <div className="flex flex-col items-start w-1/2">
              <Label htmlFor="temperature" className="mb-2">
                Température (°C)
              </Label>
              <Input
                type="number"
                step="0.1"
                id="temperature"
                placeholder="36.5"
                value={examinations.temperature}
                onChange={handleChange('temperature')}
                className="bg-[#e8e8e8] w-full px-3 py-2 border-0 ring-1 focus:ring-0 rounded-[5px] placeholder:text-black/25"
              />
            </div>
            <div className="flex flex-col items-start w-1/2">
              <Label htmlFor="weight" className="mb-2">
                Poids (Kg)
              </Label>
              <Input
                type="number"
                step="0.1"
                id="weight"
                placeholder="70.0"
                value={examinations.weight}
                onChange={handleChange('weight')}
                className="bg-[#e8e8e8] w-full px-3 py-2 border-0 ring-1 focus:ring-0 rounded-[5px] placeholder:text-black/25"
              />
            </div>
          </div>

          <div className="flex space-x-4">
            <div className="flex flex-col items-start w-1/2">
              <Label htmlFor="height" className="mb-2">
                Taille (Cm)
              </Label>
              <Input
                type="number"
                step="0.1"
                id="height"
                placeholder="170.0"
                value={examinations.height}
                onChange={handleChange('height')}
                className="bg-[#e8e8e8] w-full px-3 py-2 border-0 ring-1 focus:ring-0 rounded-[5px] placeholder:text-black/25"
              />
            </div>
            <div className="flex flex-col items-start w-1/2">
              <Label htmlFor="heart_rate" className="mb-2">
                Fréquence cardiaque (Bpm)
              </Label>
              <Input
                type="number"
                step="1"
                id="heart_rate"
                placeholder="75"
                value={examinations.heart_rate}
                onChange={handleChange('heart_rate')}
                className="bg-[#e8e8e8] w-full px-3 py-2 border-0 ring-1 focus:ring-0 rounded-[5px] placeholder:text-black/25"
              />
            </div>
          </div>

          <div className="space-y-2 flex flex-col items-start">
            <Label htmlFor="description" className="mb-2">
              Observation 
            </Label>
            <Textarea
              id="description"
              placeholder="Observation"
              value={examinations.description}
              onChange={handleChange('description')}
              className="resize-none bg-[#e8e8e8] w-full px-3 py-2 border-0 ring-1 focus:ring-0 rounded-[5px] placeholder:text-black/25"
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button
              variant="secondary"
              type="submit"
              className="bg-blue-200 ring mr-3"
              onClick={addExamination}
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
}

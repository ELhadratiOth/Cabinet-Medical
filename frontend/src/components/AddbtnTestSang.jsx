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

const AddbtnTestsang = ({ firstname, lastname, addNewTestsang }) => {
  const [testSang, setTestSang] = useState({
    systolic: '',
    diastolic: '',
    pulse: '',
    description: '',
  });

  const handleChange = field => event => {
    // Accept only valid decimal numbers
    console.log(event);
    const value = event.target.value;
    const { id } = event.target;
    if (/^\d*\.?\d*$/.test(value) && id !== 'description') {
      setTestSang({ ...testSang, [field]: value });
    }
    else if (id === 'description') {
      setTestSang({ ...testSang, [field]: value });
    }
  };

  const addTestSang = async () => {
    const dataToSend = {
      ...testSang,
      systolic: testSang.systolic || '0',
      diastolic: testSang.diastolic || '0',
      pulse: testSang.pulse || '0',
      description: testSang.description || 'Non Saisi',
    };

    try {
      const response = await API.post(
        `/testsang/add/${firstname}/${lastname}`,
        dataToSend,
      );
      addNewTestsang(response.data);
    } catch (error) {
      console.error('Error adding test sanguin:', error);
    }

    setTestSang({
      systolic: '',
      diastolic: '',
      pulse: '',
      description: '',
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="bg-transparent border-0 space-x-2 text-base text-gray-500 hover:text-gray-800 "
        >
          <AiOutlineFileAdd className="text-xl" /> <div>Ajouter</div>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            Ajouter une tension artérielle
            <HR.Trimmed className="bg-blue-200 md:w-[14.5rem] md:mx-0 md:mt-3 md:mb-0" />
          </DialogTitle>
          <DialogDescription />
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex-col space-y-3 flex justify-start items-start">
            <Label htmlFor="systolic">Systolic (mmHg)</Label>
            <Input
              id="systolic"
              type="number"
              value={testSang.systolic}
              onChange={handleChange('systolic')}
              placeholder="120.4 mmHg"
              className="border-2 focus:border-0 border-blue-200 placeholder:text-gray-500/50"
            />
          </div>
          <div className="flex-col space-y-3 flex justify-start items-start">
            <Label htmlFor="diastolic">Diastolic (mmHg)</Label>
            <Input
              id="diastolic"
              type="number"
              value={testSang.diastolic}
              onChange={handleChange('diastolic')}
              placeholder="80 mmHg"
              className="border-2 focus:border-0 border-blue-200 placeholder:text-gray-500/50"
            />
          </div>
          <div className="flex-col space-y-3 flex justify-start items-start">
            <Label htmlFor="pulse">Pulse (Bpm)</Label>
            <Input
              id="pulse"
              type="number"
              value={testSang.pulse}
              onChange={handleChange('pulse')}
              placeholder="71 Bpm"
              className="border-2 focus:border-0 border-blue-200 placeholder:text-gray-500/50"
            />
          </div>
          <div className="flex-col space-y-3 flex justify-start items-start">
            <Label htmlFor="description">Observation</Label>
            <Textarea
              id="description"
              value={testSang.description}
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
              onClick={addTestSang}
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

export default AddbtnTestsang;

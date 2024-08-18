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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { AiOutlineFileAdd } from 'react-icons/ai';
import { useState } from 'react';
import API from '../API';
import Alert from './Alert'; 
import { HR } from 'flowbite-react';

export default function AddbtnMedicalVisit({
  firstname,
  lastname,
  addNewVisit,
}) {
  const [medical, setMedical] = useState({
    label: '',
    description: '',
    insurance_description: '',
    type_visit: '',
    insurance: '',
    money: '',
  });
  const [alertVisible, setAlertVisible] = useState(false);

  const handleChange = field => event => {
    setMedical({ ...medical, [field]: event.target.value });
  };

  const addMedicalVisit = async () => {
    if (!medical.type_visit || !medical.insurance) {
      setAlertVisible(true);
      return;
    }

    const dataToSend = {
      ...medical,
      label: medical.label || 'Non Saisi',
      description: medical.description || 'Non Saisi',
      insurance_description: medical.insurance_description || 'Non Saisi',
      type_visit: medical.type_visit || 'Non Saisi',
      insurance: medical.insurance || 'Non Saisi',
      money: medical.money || '0',
    };

    console.log('Medical visit added:', dataToSend);

    try {
      const response = await API.post(
        `/medical_visits/add/${firstname}/${lastname}`,
        dataToSend,
      );
      addNewVisit(response.data);
    } catch (error) {
      console.error('Error adding medical visit:', error);
    }

    setMedical({
      label: '',
      description: '',
      insurance_description: '',
      type_visit: '',
      insurance: '',
      money: '',
    });
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
            Ajouter Une Nouvelle Visite Médicale
            <HR.Trimmed className="bg-blue-200  md:mt-2 md:w-[19rem] md:mx-0 md:mb-0" />
          </DialogTitle>
          <DialogDescription />
        </DialogHeader>
        <div className="flex flex-col space-y-5">
          <div className="space-y-2 flex flex-col items-start">
            <Label htmlFor="label" className="text-right">
              Titre
            </Label>
            <Input
              id="label"
              placeholder="Saisir le Titre"
              value={medical.label}
              onChange={handleChange('label')}
              className="resize-none bg-[#e8e8e8] px-3 py-2 border-0 ring-1 focus:ring-0 rounded-[5px] placeholder:text-black/25"
            />
          </div>
          <div className="space-y-2 flex flex-col items-start">
            <Label htmlFor="description" className="text-right">
              Description
            </Label>
            <Textarea
              id="description"
              placeholder="Description de la Visite"
              value={medical.description}
              onChange={handleChange('description')}
              className="resize-none bg-[#e8e8e8] w-full px-3 py-2 border-0 ring-1 focus:ring-0 rounded-[5px] placeholder:text-black/25"
            />
          </div>
          <div className="grid gap-2 w-full">
            <Label>Type de Visite</Label>
            <Select
              onValueChange={value =>
                setMedical(prevMedical => ({
                  ...prevMedical,
                  type_visit: value,
                }))
              }
            >
              <SelectTrigger className="bg-[#e8e8e8] ring-1">
                <SelectValue placeholder="Visite Médicale Options" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Nouvelle Visite">Nouvelle Visite</SelectItem>
                <SelectItem value="Contrôle">Contrôle</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col items-start">
            <Label htmlFor="money" className="mb-2">
              Montant
            </Label>
            <Input
              type="number"
              step="1"
              id="money"
              placeholder="150 DH"
              value={medical.money}
              onChange={handleChange('money')}
              className="bg-[#e8e8e8] w-full px-3 py-2 border-0 ring-1 focus:ring-0 rounded-[5px] placeholder:text-black/25"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="insurance">Assurance</Label>
            <Select
              onValueChange={value =>
                setMedical(prevMedical => ({
                  ...prevMedical,
                  insurance: value,
                }))
              }
            >
              <SelectTrigger className="bg-[#e8e8e8] ring-1">
                <SelectValue placeholder="Assurance Options" />
              </SelectTrigger>
              <SelectContent className="cursor-pointer">
                <SelectItem value="CNSS">CNSS</SelectItem>
                <SelectItem value="None">None</SelectItem>
                <SelectItem value="Assurance">Assurance</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="insurance_description">
              Description d&apos;Assurance
            </Label>
            <Textarea
              id="insurance_description"
              placeholder="Saisir la description d'assurance"
              value={medical.insurance_description}
              onChange={handleChange('insurance_description')}
              className="resize-none bg-[#e8e8e8] border-0 ring-1 focus:ring-0"
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button
              variant="secondary"
              type="submit"
              className="bg-blue-200 ring mr-3"
              onClick={addMedicalVisit}
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

      {/* Custom Alert */}
      <Alert
        title="Attention"
        msg="Veuillez sélectionner le type de visite et l'assurance avant de continuer."
        open={alertVisible}
        onClose={() => setAlertVisible(false)}
        path={`/medicalVisit?firstname=${firstname}&lastname=${lastname}`}
      />
    </Dialog>
  );
}

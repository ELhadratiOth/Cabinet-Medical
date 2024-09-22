/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdDeleteOutline } from 'react-icons/md';
import { FaEdit } from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import DatePicker from 'react-datepicker';
import { format } from 'date-fns';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Alert from './Alert';
import API from '../API';
import { HR } from 'flowbite-react';

const PatientEditAndDelete = ({ patient_data, update_patient_data }) => {
  const [deleted, setDeleted] = useState(false);
  const [patient, setPatient] = useState({});
  const [errors, setErrors] = useState({});
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false); 
  const navigate = useNavigate();

  useEffect(() => {
    if (patient_data) {
      const initialPatientData = { ...patient_data };
      Object.keys(initialPatientData).forEach(key => {
        if (initialPatientData[key] === 'Non Saisi') {
          initialPatientData[key] = '';
        }
      });
      setPatient(initialPatientData);
    }
  }, [patient_data]);

  const handleChange = field => event => {
    const value = event.target.value;
    setPatient(prevPatient => ({ ...prevPatient, [field]: value }));
    setErrors(prevState => ({ ...prevState, [`${field}Error`]: !value }));
  };

  const handleDateChange = field => date => {
    const formattedDate = format(date, 'yyyy-MM-dd');
    setPatient(prevPatient => ({ ...prevPatient, [field]: formattedDate }));
  };

  const trimPatientData = data => {
    const trimmedData = { ...data };
    Object.keys(trimmedData).forEach(key => {
      if (typeof trimmedData[key] === 'string') {
        trimmedData[key] = trimmedData[key].trim();
      }
      if (trimmedData[key] === '') {
        trimmedData[key] = 'Non Saisi';
      }
    });
    return trimmedData;
  };

  const handleSubmit = async event => {
    event.preventDefault();

    if (!patient.firstname || !patient.lastname) {
      setErrors({
        firstnameError: !patient.firstname,
        lastnameError: !patient.lastname,
      });
      return;
    }

    const updatedData = trimPatientData(patient);
    try {
      setPatient({ ...updatedData });
      await API.put(`/patients/edit/${patient_data.id}`, updatedData);
      update_patient_data(updatedData);
      navigate(
        `/patient?firstname=${updatedData.firstname}&lastname=${updatedData.lastname}`,
      );
    } catch (error) {
      console.error('Error updating patient:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await API.delete(`/patients/delete/${patient_data.id}`);
      setDeleted(true);
      setDeleteDialogOpen(false);
    } catch (error) {
      console.error('Error deleting patient:', error);
    }
    navigate('/home')
  };

  return (
    <>
      {deleted && (
        <Alert
          title="Les données du patient ont été supprimées."
          msg=""
          open={!!deleted}
          onClose={() => setDeleted(false)}
        />
      )}
      <div className="flex justify-center items-center rounded-lg  border-blue-200 space-x-3 py-0.2 bg-blue-100">
        <Dialog>
          <DialogTrigger asChild>
            <div className="flex cursor-pointer justify-center text-gray-500 hover:text-gray-800 transition-colors duration-300 items-center space-x-2 ">
              <FaEdit className="text-lg" />
              <div className="text-base">Modifier</div>
            </div>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[925px]">
            <DialogHeader>
              <DialogTitle className="font-bold text-2xl">
                Editer Patient
                <HR.Trimmed className="bg-blue-200 md:mx-0 md:w-44 md:mt-3 md:mb-0" />
              </DialogTitle>
              <DialogDescription></DialogDescription>
            </DialogHeader>
            <form
              className={`grid items-start gap-4 mt-5`}
              onSubmit={handleSubmit}
            >
              <div className="flex space-x-4">
                <div className="grid gap-2 w-full">
                  <Label htmlFor="firstname">Prenom</Label>
                  <Input
                    id="firstname"
                    type="text"
                    placeholder="Saisir le prénom du patient"
                    value={patient.firstname || ''}
                    onChange={handleChange('firstname')}
                    className={`px-[10px] py-[11px] text-base bg-[#e8e8e8] border-0 ring-1 focus:ring-0 rounded-[5px] w-full focus:outline-none placeholder:text-black/25 ${
                      errors.firstnameError ? 'border-red-500 border-2' : ''
                    }`}
                  />
                </div>
                <div className="grid gap-2 w-full">
                  <Label htmlFor="lastname">Nom</Label>
                  <Input
                    id="lastname"
                    type="text"
                    placeholder="Saisir le Nom du Patient"
                    value={patient.lastname || ''}
                    onChange={handleChange('lastname')}
                    className={`input px-[10px] py-[11px] text-base bg-[#e8e8e8] rounded-[5px] w-full border-0 ring-1 focus:ring-0 focus:outline-none placeholder:text-black/25 ${
                      errors.lastnameError ? 'border-red-500 border-2' : ''
                    }`}
                  />
                </div>
              </div>
              <div className="flex space-x-4">
                <div className="grid gap-2 w-full">
                  <Label htmlFor="cin">CINE</Label>
                  <Input
                    className="input px-[10px] py-[11px] text-base bg-[#e8e8e8] rounded-[5px] w-full border-0 ring-1 focus:ring-0 focus:outline-none placeholder:text-black/25"
                    id="cin"
                    type="text"
                    placeholder="CINE"
                    value={patient.cin || ''}
                    onChange={handleChange('cin')}
                  />
                </div>
                <div className="grid gap-2 w-full">
                  <Label htmlFor="age">Age</Label>
                  <Input
                    className="input px-[10px] py-[11px] text-base bg-[#e8e8e8] rounded-[5px] w-full border-0 ring-1 focus:ring-0 focus:outline-none placeholder:text-black/25"
                    id="age"
                    type="number"
                    placeholder="Age"
                    value={patient.age || ''}
                    onChange={handleChange('age')}
                  />
                </div>
              </div>

              <div className="flex space-x-4">
                <div className="grid gap-2 w-full">
                  <Label htmlFor="birthday">Date de Naissance</Label>
                  <DatePicker
                    className="ring-1 rounded-md bg-[#e8e8e8] border-0 w-full"
                    id="birthday"
                    closeOnScroll={true}
                    selected={
                      patient.birthday ? new Date(patient.birthday) : new Date()
                    }
                    onChange={handleDateChange('birthday')}
                  />
                </div>
                <div className="grid gap-2 w-full">
                  <Label htmlFor="gender">Sexe</Label>
                  <Select
                    onValueChange={value =>
                      setPatient(prevPatient => ({
                        ...prevPatient,
                        gender: value,
                      }))
                    }
                  >
                    <SelectTrigger className="bg-[#e8e8e8] ring-1">
                      <SelectValue placeholder="Sexe Options" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Male">Male</SelectItem>
                      <SelectItem value="Female">Female</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2 w-full">
                  <Label htmlFor="phonenumber">Numéro de Téléphone</Label>
                  <Input
                    className="w-full px-[10px] text-base bg-[#e8e8e8] border-0 ring-1 focus:ring-0 rounded-[5px] focus:outline-none placeholder:text-black/25"
                    id="phonenumber"
                    type="text"
                    placeholder="Saisir le numéro de téléphone"
                    value={patient.phonenumber || ''}
                    onChange={handleChange('phonenumber')}
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-3">
                <DialogClose asChild>
                  <Button
                    type="submit"
                    variant="secondary"
                    className="px-4 py-2 ring-2 ring-blue-500 hover:bg-blue-300 hover:text-black  bg-blue-400"
                  >
                    Enregistrer
                  </Button>
                </DialogClose>

                <DialogClose asChild>
                  <Button
                    className=" ring-2 ring-gray-900 px-4  hover:bg-gray-700 hover:text-white duration-300 transition-colors"
                    type="button"
                    variant="secondary"
                  >
                    Annuler
                  </Button>
                </DialogClose>
              </div>
            </form>
          </DialogContent>
        </Dialog>

        <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <DialogContent className="sm:max-w-sm">
            <DialogHeader>
              <DialogTitle className="font-bold text-lg">
                Confirmer la Suppression
              </DialogTitle>
              <DialogDescription>
                Êtes-vous sûr de vouloir supprimer les données de ce patient ?
              </DialogDescription>
            </DialogHeader>
            <div className="flex justify-end space-x-2 ">
              <Button
                type="button"
                variant="destructive"
                onClick={handleDelete}
              >
                Supprimer
              </Button>
              <DialogClose asChild>
                <Button type="button" variant="outline">
                  Annuler
                </Button>
              </DialogClose>
            </div>
          </DialogContent>
        </Dialog>

        <Button
          variant="destructive"
          onClick={() => setDeleteDialogOpen(true)}
          className="flex space-x-2 items-center  bg-white text-blue-500 my-0.5 border-[1px] border-blue-400 hover:bg-white hover:text-red-500 transition duration-300"
        >
          <MdDeleteOutline className="text-xl" />
          <span>Supprimer</span>
        </Button>
      </div>
    </>
  );
};

export default PatientEditAndDelete;

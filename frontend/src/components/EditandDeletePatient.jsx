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
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Alert from './Alert';
import API from '../API';
import { HR } from 'flowbite-react';

const PatientEditAndDelete = ({ patient_data, update_patient_data }) => {
  const [deleted, setDeleted] = useState(false);
  const [patient, setPatient] = useState({});
  const [errors, setErrors] = useState({});
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
    const updatedData = trimPatientData(patient);
    try {
      setPatient({ ...updatedData });
      console.log(updatedData)
      await API.put(`/patients/edit/${patient_data.id}`, updatedData);
      update_patient_data(updatedData);
      navigate(
        `/patient?firstname=${updatedData.firstname}&lastname=${updatedData.lastname}`,
      );
    } catch (error) {
      console.error('Error updating patient:', error);
    }
  };

  const handleDelete = () => {
    API.delete(`/patients/delete/${patient_data.id}`)
      .then(() => {
        setDeleted(true);
      })
      .catch(error => {
        console.error('Error deleting patient:', error);
      });
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
      <div className="flex justify-center items-center  rounded-lg  border-blue-200 bg-blue-100 ">
        <div className=" px-4 py-2 text-sm text-gray-500 hover:text-gray-800 focus:relative">
          <Dialog>
            <DialogTrigger asChild>
              <div className="flex cursor-pointer justify-center items-center space-x-2">
                <FaEdit className="text-lg" />

                <div>Editer</div>
              </div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[925px] ">
              <DialogHeader>
                <DialogTitle className="font-bold text-2xl">
                  Editer Patient
                  <HR.Trimmed className="bg-blue-200 md:mx-0 md:w-44  md:mt-3 md:mb-0" />
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
                      placeholder="Saisi le prenom du patient"
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
                      placeholder="Saisi le Nom du Patient"
                      value={patient.lastname || ''}
                      onChange={handleChange('lastname')}
                      className={`input px-[10px] py-[11px] text-base bg-[#e8e8e8] rounded-[5px] w-full border-0 ring-1 focus:ring-0   focus:outline-none placeholder:text-black/25 ${
                        errors.lastnameError ? 'border-red-500 border-2 ' : ''
                      }`}
                    />
                  </div>
                  <div className="grid gap-2 w-full">
                    <Label htmlFor="cin">CIN</Label>
                    <Input
                      className="input px-[10px] py-[11px] text-base bg-[#e8e8e8] rounded-[5px] w-full border-0 ring-1 focus:ring-0   focus:outline-none placeholder:text-black/25"
                      id="cin"
                      type="text"
                      placeholder="CIN"
                      value={patient.cin || ''}
                      onChange={handleChange('cin')}
                    />
                  </div>
                  <div className="grid gap-2 w-full">
                    <Label htmlFor="age">Age</Label>
                    <Input
                      className="input px-[10px] py-[11px] text-base bg-[#e8e8e8] rounded-[5px] w-full border-0 ring-1 focus:ring-0   focus:outline-none placeholder:text-black/25"
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
                        patient.birthday
                          ? new Date(patient.birthday)
                          : new Date()
                      }
                      onChange={handleDateChange('birthday')}
                    />
                  </div>
                  <div className="grid gap-2 w-full">
                    <Label htmlFor="gender">Gender</Label>
                    <Select
                      onValueChange={value =>
                        setPatient(prevPatient => ({
                          ...prevPatient,
                          gender: value,
                        }))
                      }
                    >
                      <SelectTrigger className="bg-[#e8e8e8] ring-1">
                        <SelectValue placeholder="Gender Options" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Male">Male</SelectItem>
                        <SelectItem value="Female">Female</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2 w-full">
                    <Label htmlFor="phonenumber">Numero Du Telephone</Label>
                    <Input
                      className="w-full px-[10px] text-base bg-[#e8e8e8] border-0 ring-1 focus:ring-0 rounded-[5px] focus:outline-none"
                      id="phonenumber"
                      type="text"
                      placeholder="Numero Du Telephone "
                      value={patient.phonenumber || ''}
                      onChange={handleChange('phonenumber')}
                    />
                  </div>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="disease">Maladie</Label>
                  <Input
                    className="w-full px-[10px] text-base bg-[#e8e8e8] border-0 ring-1 focus:ring-0 rounded-[5px] focus:outline-none"
                    id="disease"
                    type="text"
                    placeholder="Maladie du Patient"
                    value={patient.disease || ''}
                    onChange={handleChange('disease')}
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Description du Maladie"
                    value={patient.description || ''}
                    onChange={handleChange('description')}
                    className="resize-none bg-[#e8e8e8] px-3 py-2 border-0 ring-1 focus:ring-0 rounded-[5px] placeholder:text-black/25"
                  />
                </div>

                <div className="flex justify-end gap-4 mt-4">
                  <DialogClose asChild>
                    <Button
                      variant="secondary"
                      type="submit"
                      className="bg-blue-300 text-black ring rounded-md px-4 py-2 hover:bg-blue-100 "
                    >
                      Enregister
                    </Button>
                  </DialogClose>

                  <DialogClose asChild>
                    <Button type="button" className="ring" variant="secondary">
                      Close
                    </Button>
                  </DialogClose>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <button
          onClick={handleDelete}
          className="inline-flex items-center gap-2 rounded-md bg-white px-4 py-2 text-sm hover:text-red-600 text-blue-500 shadow-sm focus:relative"
        >
          <MdDeleteOutline className="text-xl" />
          Supprimer
        </button>
      </div>
    </>
  );
};

export default PatientEditAndDelete;

/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Datepicker } from 'flowbite-react';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import API from '../API';

export default function PutPatient({ patient_data }) {
  const [open, setOpen] = useState(false);
  const [patient, setPatient] = useState({});
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    if (patient_data) {
      setPatient({ ...patient_data });
    }
  }, [patient_data]);

  const handleChange = field => event => {
    const value = event.target.value;
    setPatient(prevPatient => ({ ...prevPatient, [field]: value }));
    setErrors(prevState => ({ ...prevState, [`${field}Error`]: !value }));
  };

  const handleDateChange = field => date => {
    setPatient(prevPatient => ({ ...prevPatient, [field]: date }));
  };

  const handleSubmit = async event => {
    event.preventDefault();
    const updatedData = { ...patient };
    try {
      setPatient({ ...updatedData });

      console.log(updatedData);
      await API.put(`/patients/edit/${patient_data.id}`, patient);
      setOpen(false);
      navigate(
        `/patient?firstname=${updatedData.firstname.trim()}&lastname=${updatedData.lastname.trim()}`,
      );
    } catch (error) {
      console.error('Error updating patient:', error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className="cursor-pointer">Editer</div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[925px]">
        <DialogHeader>
          <DialogTitle className="font-bold text-2xl">
            Editer Patient
          </DialogTitle>
          <DialogDescription></DialogDescription>
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
                <Label htmlFor="birthday">Birthday</Label>
                <Datepicker
                  className="ring-1 rounded-md"
                  id="birthday"
                  selected={
                    patient.birthday ? new Date(patient.birthday) : null
                  }
                  onChange={handleDateChange('birthday')}
                />
              </div>
              <div className="grid gap-2 w-full">
                <Label htmlFor="gender">Gender</Label>
                <select
                  id="gender"
                  value={patient.gender || ''}
                  onChange={handleChange('gender')}
                  className="w-full px-[10px] text-base bg-[#e8e8e8] border-0 ring-1 focus:ring-0 rounded-[5px] focus:outline-none"
                >
                  <option value="">Select Gender</option>
                  <option value="0">Male</option>
                  <option value="1">Female</option>
                </select>
              </div>
              <div className="grid gap-2 w-full">
                <Label htmlFor="phonenumber">Phone Number</Label>
                <Input
                  className="w-full px-[10px] text-base bg-[#e8e8e8] border-0 ring-1 focus:ring-0 rounded-[5px] focus:outline-none"
                  id="phonenumber"
                  type="text"
                  placeholder="Phone Number"
                  value={patient.phonenumber || ''}
                  onChange={handleChange('phonenumber')}
                />
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="disease">Disease</Label>
              <Input
                className="w-full px-[10px] text-base bg-[#e8e8e8] border-0 ring-1 focus:ring-0 rounded-[5px] focus:outline-none"
                id="disease"
                type="text"
                placeholder="Disease"
                value={patient.disease || ''}
                onChange={handleChange('disease')}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                className="w-full px-[10px] text-base bg-[#e8e8e8] border-0 ring-1 focus:ring-0 rounded-[5px] focus:outline-none"
                id="description"
                type="text"
                placeholder="Description"
                value={
                  patient.description === 'Non saisi'
                    ? ''
                    : patient.description || ''
                }
                onChange={handleChange('description')}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="insurance">Insurance</Label>
              <Input
                className="w-full px-[10px] text-base bg-[#e8e8e8] border-0 ring-1 focus:ring-0 rounded-[5px] focus:outline-none"
                id="insurance"
                type="text"
                placeholder="Insurance"
                value={patient.insurance || ''}
                onChange={handleChange('insurance')}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="insurance_description">
                Insurance Description
              </Label>
              <Textarea
                className="w-full px-[10px] text-base bg-[#e8e8e8] border-0 ring-1 focus:ring-0 rounded-[5px] focus:outline-none"
                id="insurance_description"
                type="text"
                placeholder="Insurance Description"
                value={patient.insurance_description || ''}
                onChange={handleChange('insurance_description')}
              />
            </div>

            <Button
              className="bg-blue-200 text-black hover:text-white ring-2"
              type="submit"
            >
              Enregistrer
            </Button>
          </form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

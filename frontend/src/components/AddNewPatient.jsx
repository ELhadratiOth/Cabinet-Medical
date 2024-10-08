import { useState, useEffect } from 'react';
import Img from '../assets/img3.png';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import API from '../API';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';
import { HR } from 'flowbite-react';

export default function AddNewPatient() {
  function SearchForm() {
    const [patient, setPatient] = useState({
      firstname: '',
      lastname: '',
      gender: '',
      age: '',
      disease: '',
      description: '',
      phonenumber: '',
      cin: '',
      birthday: new Date(),
    });

    const [errors, setErrors] = useState({
      firstnameError: false,
      lastnameError: false,
    });

    const navigate = useNavigate();
    useEffect(() => {
      const verifyToken = async () => {
        const token = localStorage.getItem('token');
        try {
          const response = await API.get(`user/verify-token/${token}`);

          if (response.status !== 200) {
            throw new Error('Token verification failed');
          }
        } catch (error) {
          console.err('Verification Error:', error);
          localStorage.removeItem('token');
          navigate('/');
        }
      };

      verifyToken();
    }, []);
    const handleChange = field => event => {
      const value = event.target.value;
      setPatient(prevPatient => ({ ...prevPatient, [field]: value }));
      if (!value) {
        setErrors(prevState => ({ ...prevState, [`${field}Error`]: true }));
      } else {
        setErrors(prevState => ({ ...prevState, [`${field}Error`]: false }));
      }
    };

    const handleDateChange = selectedDate => {
      setPatient(prevPatient => ({ ...prevPatient, birthday: selectedDate }));
    };

    const handleSubmit = async event => {
      event.preventDefault();
      const { firstname, lastname, birthday } = patient;

      if (!firstname || !lastname) {
        setErrors({
          firstnameError: !firstname,
          lastnameError: !lastname,
        });
        console.error('Please enter both first and last names.');
        return;
      }

      const updatedPatient = { ...patient };

      if (birthday) {
        updatedPatient.birthday = format(birthday, 'yyyy-MM-dd');
      }

      for (const key in updatedPatient) {
        if (updatedPatient.gender === '') {
          updatedPatient.gender = 'Male';
        } else if (updatedPatient.age === '') {
          updatedPatient.age = '0';
        } else if (updatedPatient[key] === '') {
          updatedPatient[key] = 'Non Saisi';
        }
      }
      try {
        await API.post('/patients/add', updatedPatient);
      } catch (error) {
        console.error('Error adding new patient:', error);
      }

      navigate(
        `/patient?firstname=${patient.firstname}&lastname=${patient.lastname}`,
      );
    };

    return (
      <div className="w-[73%]">
        <form
          className="grid items-start gap-4 backdrop-blur-sm"
          onSubmit={handleSubmit}
        >
          <div className="flex space-x-3">
            <div className="grid gap-2 w-1/2">
              <Label htmlFor="firstname">
                Prenom<span className="text-red-600">*</span>
              </Label>
              <Input
                id="firstname"
                type="text"
                placeholder="Saisi le prenom du patient"
                value={patient.firstname}
                onChange={handleChange('firstname')}
                className={`px-[10px] py-[11px] text-base border-0 ring-1 focus:ring-0 bg-[#e8e8e8] rounded-[5px] w-full focus:outline-none placeholder:text-black/25 ${
                  errors.firstnameError ? 'border-red-500 border-2' : ''
                }`}
              />
            </div>
            <div className="grid gap-2 w-1/2">
              <Label htmlFor="lastname">
                Nom<span className="text-red-600">*</span>
              </Label>
              <Input
                id="lastname"
                type="text"
                placeholder="Saisi le Nom du Patient"
                value={patient.lastname}
                onChange={handleChange('lastname')}
                className={`px-[10px] py-[11px] text-base bg-[#e8e8e8] border-0 ring-1 focus:ring-0 rounded-[5px] w-full focus:outline-none placeholder:text-black/25 ${
                  errors.lastnameError ? 'border-red-500 border-2' : ''
                }`}
              />
            </div>
          </div>
          <div className="flex space-x-3 justify-center items-center">
            <div className="grid gap-2 w-full">
              <Label>Sexe</Label>
              <Select
                onValueChange={value =>
                  setPatient(prevPatient => ({ ...prevPatient, gender: value }))
                }
              >
                <SelectTrigger className="bg-[#e8e8e8] ring-1">
                  <SelectValue placeholder="Male" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Male</SelectItem>
                  <SelectItem value="0">Female</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2 w-full">
              <Label htmlFor="age">Age</Label>
              <Input
                id="age"
                type="number"
                placeholder="Saisi l'Age du Patient"
                value={patient.age}
                onChange={handleChange('age')}
                className="px-[10px] py-[11px] text-base bg-[#e8e8e8] ring-1 focus:ring-0 border-0 rounded-[5px] w-full focus:outline-none placeholder:text-black/25"
              />
            </div>
          </div>

          <div className="flex justify-center items-center space-x-3">
            <div className="grid gap-2 w-1/2">
              <Label htmlFor="numero">Numéro du téléphone</Label>
              <Input
                id="numero"
                type="text"
                placeholder="Saisir le numéro de téléphone"
                value={patient.phonenumber}
                onChange={handleChange('phonenumber')}
                className="px-[10px] py-[11px] text-base bg-[#e8e8e8] ring-1 focus:ring-0 border-0 rounded-[5px] w-full focus:outline-none placeholder:text-black/25"
              />
            </div>
            <div className="grid gap-2 w-1/2">
              <Label htmlFor="cin">CINE</Label>
              <Input
                id="cin"
                type="text"
                placeholder="Saisir le CINE "
                value={patient.cin}
                onChange={handleChange('cin')}
                className="px-[10px] py-[11px] text-base bg-[#e8e8e8] ring-1 focus:ring-0 border-0 rounded-[5px] w-full focus:outline-none placeholder:text-black/25"
              />
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="calendar">Date de Naissance</Label>
            <DatePicker
              id="calendar"
              selected={patient.birthday}
              onChange={handleDateChange}
              className="bg-[#e8e8e8] ring-1 focus:ring-0 border-0 rounded-[5px] w-full"
              dateFormat="yyyy-MM-dd" // Set the date format
            />
          </div>

          <Button
            className="bg-blue-200 text-black hover:text-white"
            type="submit"
          >
            Enregistrer
          </Button>
        </form>
      </div>
    );
  }

  return (
    <div className="ml-60 px-24 flex justify-center flex-col space-y-8 mt-36 pb-20">
      <img
        src={Img}
        alt="error"
        className="fixed -z-10 right-0 top-[6rem] w-[1040px] opacity-30"
      />
      <div className="text-3xl font-semibold capitalize">
        Ajouter un nouveau patient
        <HR.Trimmed className="bg-blue-200  md:mt-3 md:w-[25rem] md:mx-0 md:mb-0" />
      </div>
      <SearchForm />
    </div>
  );
}

import { useState } from 'react';
import Img from '../assets/img3.png';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import API from '../API';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'; // Import DatePicker CSS
import { format } from 'date-fns'; // Import date-fns

export default function AddNewPatient() {
  function SearchForm() {
    const [patient, setPatient] = useState({
      firstname: '',
      lastname: '',
      gender: '1',
      age: 10,
      disease: '',
      description: '',
      phonenumber: '',
      cin: '',
      birthday: new Date(),
      insurance: '',
      insurance_description: '',
    });

    const [errors, setErrors] = useState({
      firstnameError: false,
      lastnameError: false,
    });

    const navigate = useNavigate();

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

      // Format the birthday date as "yyyy-MM-dd" before sending to the API
      if (birthday) {
        updatedPatient.birthday = format(birthday, 'yyyy-MM-dd');
      }

      for (const key in updatedPatient) {
        if (updatedPatient[key] === '') {
          updatedPatient[key] = 'Non Saisi';
        }
      }

      console.log('Updated Patient:', updatedPatient);

      try {
        await API.post('/patients/add', updatedPatient);
      } catch (error) {
        console.error('Error:', error);
      }

      navigate(`/`);
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
              <Label>Gender</Label>
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

          <div className="grid gap-2">
            <Label htmlFor="maladie">Maladie</Label>
            <Input
              id="maladie"
              type="text"
              placeholder="Saisi la Maladie du patient"
              value={patient.disease}
              onChange={handleChange('disease')}
              className="px-[10px] py-[11px] text-base bg-[#e8e8e8] ring-1 focus:ring-0 border-0 rounded-[5px] w-full focus:outline-none placeholder:text-black/25"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Enter a description"
              value={patient.description}
              onChange={handleChange('description')}
              className="bg-[#e8e8e8] border-0 ring-1 focus:ring-0"
            />
          </div>
          <div className="flex justify-center items-center space-x-3">
            <div className="grid gap-2 w-1/2">
              <Label htmlFor="numero">Numero du telephone</Label>
              <Input
                id="numero"
                type="text"
                placeholder="Saisi le numero de telephone du patient"
                value={patient.phonenumber}
                onChange={handleChange('phonenumber')}
                className="px-[10px] py-[11px] text-base bg-[#e8e8e8] ring-1 focus:ring-0 border-0 rounded-[5px] w-full focus:outline-none placeholder:text-black/25"
              />
            </div>
            <div className="grid gap-2 w-1/2">
              <Label htmlFor="cin">CIN</Label>
              <Input
                id="cin"
                type="text"
                placeholder="Saisi le CIN du patient"
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
          <div className="grid gap-2">
            <Label htmlFor="insurance">Assurance</Label>
            <Input
              id="insurance"
              type="text"
              placeholder="Saisi l'assurance du patient"
              value={patient.insurance}
              onChange={handleChange('insurance')}
              className="px-[10px] py-[11px] text-base bg-[#e8e8e8] ring-1 focus:ring-0 border-0 rounded-[5px] w-full focus:outline-none placeholder:text-black/25"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="insurance_description">
              Description d&apos;Assurance
            </Label>
            <Textarea
              id="insurance_description"
              placeholder="Saisi la discreption d'Assurance"
              value={patient.insurance_description}
              onChange={handleChange('insurance_description')}
              className="bg-[#e8e8e8] border-0 ring-1 focus:ring-0"
            />
          </div>
          <Button className="bg-blue-200 text-black hover:text-white" type="submit">
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
        <hr className="mt-2 border-blue-300" />
      </div>
      <SearchForm />
    </div>
  );
}

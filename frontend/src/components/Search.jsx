/* eslint-disable react/prop-types */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import { useMediaQuery } from '@/hooks/use-media-query';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { HR } from 'flowbite-react';

export default function SearchBox() {
  const [open, setOpen] = useState(false);

  function SearchForm() {
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [error, setError] = useState({
      firstnameError: false,
      lastnameError: false,
    });
    const navigate = useNavigate();

    const handleChange = (setter, field) => event => {
      const value = event.target.value;
      setter(value);
      if (!value) {
        setError(prevState => ({ ...prevState, [`${field}Error`]: true }));
      } else {
        setError(prevState => ({ ...prevState, [`${field}Error`]: false }));
      }
    };

    const handleSubmit = event => {
      event.preventDefault();
      if (firstname && lastname) {
        setOpen(false);
        navigate(
          `/patient?firstname=${firstname.trim()}&lastname=${lastname.trim()}`,
        );
      } else {
        if (firstname == '') setError(prevState => ({ ...prevState, [`firstnameError`]: true }));
        if (lastname == '') setError(prevState => ({...prevState, [`lastnameError`]: true }));
        console.error('Please enter both first and last names.');
      }
    };

    return (
      <form className={`grid items-start gap-4`} onSubmit={handleSubmit}>
        <div className="grid gap-2">
          <Label htmlFor="firstname">Prenom</Label>
          <Input
            id="firstname"
            type="text"
            placeholder="Saisi le prenom du patient"
            value={firstname}
            onChange={handleChange(setFirstname, 'firstname')}
            className={` px-[10px] py-[11px] text-base bg-[#e8e8e8] border-0 ring-1 focus:ring-0 rounded-[5px] w-full focus:outline-none placeholder:text-black/25 ${
              error.firstnameError ? 'border-red-500 border-2' : ''
            }`}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="lastname">Nom</Label>
          <Input
            id="lastname"
            type="text"
            placeholder="Saisi le Nom du Patient"
            value={lastname}
            onChange={handleChange(setLastname, 'lastname')}
            className={`input px-[10px] py-[11px] text-base bg-[#e8e8e8] rounded-[5px] w-full border-0 ring-1 focus:ring-0   focus:outline-none placeholder:text-black/25 ${
              error.lastnameError ? 'border-red-500 border-2 ' : ''
            }`}
          />
        </div>
        <Button className="bg-blue-200 text-black hover:text-white ring-2" type="submit">
          Chercher
        </Button>
      </form>
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className="cursor-pointer">Chercher Patient</div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            Chercher Patient
            <HR.Trimmed className="bg-blue-200 md:mx-0 md:w-36 md:mt-4 md:mb-3" />
          </DialogTitle>
          <DialogDescription>
            Saisi le Nom et le Prenom du Patient
          </DialogDescription>
        </DialogHeader>
        <SearchForm />
      </DialogContent>
    </Dialog>
  );
}

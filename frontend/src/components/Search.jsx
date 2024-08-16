/* eslint-disable react/prop-types */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
  const [patientName, setPatientName] = useState('');
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleChange = event => {
    const value = event.target.value;
    setPatientName(value);
    setError(!value);
  };

  const handleSubmit = event => {
      console.log('222 : ' + patientName);

    event.preventDefault();
    if (patientName.trim()) {
      setOpen(false);
      navigate(`/patientssuggeree?name=${patientName.trim()}`);
      setPatientName("");
    } else {
      setError(true);
      console.error("Please enter the patient's name.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className="cursor-pointer">Chercher Patient</div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            Recherche avancée d&apos;un Patient
            <HR className="bg-blue-200 md:mx-0 md:w-[16rem] md:mt-4 md:mb-3" />
          </DialogTitle>
          <DialogDescription>Saisi le Nom du Patient</DialogDescription>
        </DialogHeader>
        <form className="grid items-start gap-4">
          <div className="grid gap-2">
            <Label htmlFor="patientName">Nom</Label>
            <Input
              id="patientName"
              type="text"
              placeholder="Saisi le Nom du Patient"
              value={patientName}
              onChange={handleChange}
              className={`px-[10px] py-[11px] text-base bg-[#e8e8e8] rounded-[5px] w-full border-0 ring-1 focus:ring-0 placeholder:text-black/25 ${
                error ? 'border-red-500 border-2' : ''
              }`}
            />
          </div>
          <Button
            className="bg-blue-200 text-black hover:text-white ring-2"
            type="submit"
            onClick={handleSubmit}
          >
            Chercher
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

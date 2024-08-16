/* eslint-disable react/prop-types */
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogAction,
  
} from '@/components/ui/alert-dialog';
import { useNavigate } from 'react-router-dom';
export default function Alert({ title, msg, open, onClose , path = "/" }) {
const navigate =useNavigate()
const divide = msg.split(",")
  return (
    <AlertDialog open={open} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-xl">{title}</AlertDialogTitle>
          <AlertDialogDescription className="text-base">
            {divide[0]}
          </AlertDialogDescription>
          <AlertDialogDescription className="text-base">
            {divide[1]}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction
            className="bg-blue-200 text-black hover:text-white duration-300 transition-all"
            onClick={onClose}
          >
            <div className='h-full w-full' onClick={
              () => {
                navigate(path)
              }
            }>j&apos;ai compris!</div>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

/* eslint-disable react/prop-types */
// AlertDialogComponent.js
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogAction,
  //   AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import {Link} from 'react-router-dom'
// import { Button } from '@/components/ui/button';

export default function Alert({ title, msg, open, onClose }) {

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
            className="bg-blue-200 text-black"
            onClick={onClose}
          >
            <Link to="/">j&apos;ai compris!</Link>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

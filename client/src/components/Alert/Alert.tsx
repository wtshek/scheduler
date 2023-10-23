import {
  Alert as AlertComponent,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";
import { useAlertContext } from "@/hook/useAlertContext";
import { LucideXSquare } from "lucide-react";

export const Alert = () => {
  const { showAlert, message, toggleAlert } = useAlertContext();

  const onCloseClick = () => {
    toggleAlert();
  };

  if (!showAlert) return;
  return (
    <div className="w-screen h-screen fixed top-0 left-0 flex justify-center items-center">
      <AlertComponent className="w-1/2 bg-white rounded-lg border-red-500 text-red-500 relative">
        <button className="absolute right-1 top-1" onClick={onCloseClick}>
          <LucideXSquare />
        </button>
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{message}</AlertDescription>
      </AlertComponent>
    </div>
  );
};

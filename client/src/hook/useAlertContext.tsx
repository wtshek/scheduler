import { createContext, useContext } from "react";

interface AlertContextValue {
  showAlert: boolean;
  message: string;
  toggleAlert: () => void;
  setMessage: (message: string) => void;
}

export const AlertContext = createContext<AlertContextValue>({
  showAlert: false,
  message: "",
  toggleAlert: () => {},
  setMessage: () => {},
});

export const useAlertContext = () => {
  return useContext(AlertContext);
};

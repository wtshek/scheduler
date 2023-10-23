import { AlertContext } from "@/hook/useAlertContext";
import { FC, ReactNode, useState } from "react";

export const Providers: FC<{ children: ReactNode }> = ({ children }) => {
  const [showAlert, setShowAlert] = useState(false);
  const [message, setMessage] = useState("");
  return (
    <AlertContext.Provider
      value={{
        showAlert: showAlert,
        message,
        toggleAlert: () => setShowAlert((prev) => !prev),
        setMessage: (message: string) => setMessage(message),
      }}
    >
      {children}
    </AlertContext.Provider>
  );
};

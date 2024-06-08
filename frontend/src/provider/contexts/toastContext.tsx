import { createContext, useState, useContext } from "react";
import Toast from "../../components/dataDisplay/toast";
import { ProviderProps, ToastStatus } from "../../constants/typess";

export type ToastContextType = {
  showToast: (message: string, type: ToastStatus) => void;
};

export const ToastContext = createContext<ToastContextType | undefined>(
  undefined
);

export const ToastProvider = ({ children }: ProviderProps) => {
  const [toastState, setToastState] = useState<{
    isOpen: boolean;
    message: string;
    type: ToastStatus;
    duration?: number;
  }>({
    isOpen: false,
    message: "",
    type: "success",
  });

  const showToast = (
    message: string,
    type: ToastStatus,
    duration: number = 3000
  ) => {
    setToastState({ isOpen: true, message, type, duration });
  };

  const closeToast = () => {
    setToastState({ isOpen: false, message: "", type: "success" });
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      <Toast
        isOpen={toastState.isOpen}
        onClose={closeToast}
        message={toastState.message}
        duration={toastState.duration}
        type={toastState.type}
      />
      {children}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error("useToast must be used within a ToastProvider!");
  }
  return context;
};

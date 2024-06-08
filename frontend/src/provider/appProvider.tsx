import React from "react";
import { NewTaskProvider } from "./contexts/newTaskContext";
import { TeacherProvider } from "./contexts/teacherContext";
import { ToastProvider } from "./contexts/toastContext";
const AppProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ToastProvider>
      <TeacherProvider>
        <NewTaskProvider>{children} </NewTaskProvider>
      </TeacherProvider>
    </ToastProvider>
  );
};

export default AppProvider;

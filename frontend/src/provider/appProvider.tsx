// AppProvider.js
import React from "react";
import { NewTaskProvider } from "../components/dialogs/task/newTaskProvider";

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  return <NewTaskProvider>{children}</NewTaskProvider>;
};

export default AppProvider;

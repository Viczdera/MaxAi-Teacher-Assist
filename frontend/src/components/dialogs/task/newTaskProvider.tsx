// ModalContext.js
import React, { createContext, useState, useContext } from "react";
import TaskForm from "./taskForm";

export type ModalContextType = {
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
};
export const ModalContext = createContext<ModalContextType | undefined>(
  undefined
);
export const NewTaskProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <ModalContext.Provider value={{ isModalOpen, openModal, closeModal }}>
      <TaskForm isOpen={isModalOpen} onClose={closeModal} />
      {children}
    </ModalContext.Provider>
  );
};

export const useNewTaskModal = () => {
  const context = useContext(ModalContext);
  if (context === undefined) {
    throw new Error("use within provider g!");
  }
  return context;
};

import { createContext, useState, useContext } from "react";
import TaskForm from "../../components/dialogs/task/taskForm";
import { ProviderProps, TaskFormType } from "../../constants/typess";

export type ModalContextType = {
  isModalOpen: boolean;
  openModal: (type: TaskFormType, studentId?: string) => void;
  closeModal: () => void;
};

export const ModalContext = createContext<ModalContextType | undefined>(
  undefined
);
export const NewTaskProvider = ({ children }: ProviderProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskState, setTaskState] = useState<{
    type: TaskFormType;
    studentId?: string | null;
  }>({
    type: "all",
    studentId: null,
  });

  const openModal = (type: TaskFormType, studentId?: string | null) => {
    setIsModalOpen(true);
    setTaskState({ type, studentId });
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTaskState({ type: "all", studentId: null });
  };

  return (
    <ModalContext.Provider value={{ isModalOpen, openModal, closeModal }}>
      <TaskForm
        isOpen={isModalOpen}
        onClose={closeModal}
        selectType={taskState.type}
        studentId={taskState.studentId}
      />
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

import React, { createContext, useReducer } from "react";
import { NewTask, ProviderProps } from "../../constants/typess";

type TeacherState = {
  recentAssignments: NewTask;
  assignedBooks: {
    studentId: string;
    resourceId: string;
    resourceName: string;
  }[];
};

type SetAssignmentAction = {
  type: "SET_ASSIGNMENT";
  payload: NewTask;
};

type SetAssignedBooksAction = {
  type: "SET_ASSIGNED_BOOKS";
  payload: {
    studentId: string;
    resourceId: string;
    resourceName: string;
  };
};

type TeacherAction = SetAssignmentAction | SetAssignedBooksAction;

const initialState: TeacherState = {
  recentAssignments: {
    name: "No Task",
    date: "",
    resources: [],
    students: [],
  },
  assignedBooks: [],
};

const reducer = (state: TeacherState, action: TeacherAction): TeacherState => {
  switch (action.type) {
    case "SET_ASSIGNMENT":
      return {
        ...state,
        recentAssignments: action.payload,
      };
    case "SET_ASSIGNED_BOOKS":
      const newPayload = action.payload;
      let newAssignedBooks = [...state.assignedBooks];
      let isPresent = newAssignedBooks.find(
        (item) => item.studentId === newPayload?.studentId
      );

      if (isPresent) {
        newAssignedBooks=newAssignedBooks.filter(
          (item) => item.studentId !== newPayload.studentId
        );
        newAssignedBooks.push(newPayload);
      } else {
        newAssignedBooks.push(newPayload);
      }
      console.log("old", state.assignedBooks);
      console.log("updated", newAssignedBooks);
      return {
        ...state,
        assignedBooks: newAssignedBooks,
      };
    default:
      return state;
  }
};

type ModalContextType = {
  state: TeacherState;
  dispatch: React.Dispatch<TeacherAction>;
};

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const TeacherProvider = ({ children }: ProviderProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <ModalContext.Provider value={{ state, dispatch }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useTeacherContext = () => {
  const context = React.useContext(ModalContext);
  if (context === undefined) {
    throw new Error("useTeacherContext must be used within a TeacherProvider!");
  }
  return context;
};

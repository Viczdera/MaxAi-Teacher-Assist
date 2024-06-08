export interface StudentData {
  id?: string;
  grade?: string;
  firstname?: string;
  lastname?: string;
  email?: string;
  schoolId?: string;
  avatar?: string;
}

export interface NewTask {
  name: string;
  date: string;
  resources: string[];
  students: string[];
}
export type ProviderProps = {
  children: React.ReactNode;
};

export type ReqResponseType = {
  success: boolean
  data?: any;
  message: string;
};

export type ToastStatus="success" | "error"

export type TaskFormType= "all" | "one";
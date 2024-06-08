import { BASE_URL } from "../constants/constants";
import axios from "axios";

export const fetchStudents = async () => {
  const response = await axios
    .get(BASE_URL + "/students")
    .then(({ data }) => {
      return data;
    })
    .catch((err) => {
      console.log("errror fetching students", err);
    });
  return response;
};

export const fetchStudentById = async (id: string) => {
  const response = await axios
    .get(BASE_URL + "/students")
    .then(({ data }) => {
      if (data?.students) {
        const student = data?.students.find(
          (student: any) => student?.id === id
        );
        return student;
      } else return {};
    })
    .catch((err) => {
      console.log("errror fetching student", err);
    });
  return response;
};

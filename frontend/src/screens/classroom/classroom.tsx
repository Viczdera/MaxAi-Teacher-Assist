import axios from "axios";
import { useEffect, useState } from "react";

const fetchStudents = async () => {
  const response = await axios
    .get("http://localhost:3000/students")
    .then(({ data }) => {
      return data;
    })
    .catch((err) => {
      console.log("errror fetching students", err);
    });
  return response;
};
//TODO: ADD ERROR MESSAGE AND TOAST
const Classroom = () => {
  const [students, setStudents] = useState<any[]>([]);
  useEffect(() => {
    fetchStudents().then((data) => {
      setStudents(data?.students || []);
    });
  }, []);

  return (
    <div className="parent">
      <div className="child">
        <p>Your Classroom</p>

        <div>{JSON.stringify(students)}</div>
      </div>
    </div>
  );
};

export default Classroom;

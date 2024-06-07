import React from "react";
import "./tables.module.scss";
import { useNavigate } from "react-router-dom";

interface StudentData{
  id?: string
  grade?:string
  firstname?:string
  lastname?: string
  email?:string
  schoolId?:string
  avatar?: string
}
const StudentTable = ({ data }: { data: any[] }) => {
  const navigate=useNavigate()
  const viewStudent=(data:StudentData)=>{
    navigate(`/classroom/${data?.id}`);
  }
  return (
    <div>
      <div className="tbl-header">
        <table cellPadding="0" cellSpacing="0">
          <thead>
            <tr>
              <th>Name</th>
              <th>Id</th>
              <th>Email</th>
              <th>Grade</th>
            </tr>
          </thead>
        </table>
      </div>
      <div className="tbl-content">
        <table cellPadding="0" cellSpacing="0">
          <tbody>
            {data?.map((student, index) => (
              <tr onClick={()=>viewStudent(student)} key={index}>
                <td>{student?.firstname + student?.lastname}</td>
                <td>{student?.id} </td>
                <td>{student?.email}</td>
                <td>{student?.grade}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentTable;

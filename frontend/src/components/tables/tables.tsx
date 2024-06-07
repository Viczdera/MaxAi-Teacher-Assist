import React from "react";
import "./tables.scss";
import { useNavigate } from "react-router-dom";
import { StudentData } from "../../screens/student/student";


const StudentTable = ({ data }: { data: any[] }) => {
  const navigate = useNavigate();
  const viewStudent = (data: StudentData) => {
    navigate(`/classroom/${data?.id}`);
  };
  return (
    <div className="table-base">
      <div className="table-cont">
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
                <tr key={index}>
                  <td className="row-link" onClick={() => viewStudent(student)}>
                    <span>{student?.firstname + student?.lastname}</span>
                  </td>

                  <td>{student?.schoolId} </td>
                  <td>{student?.email}</td>
                  <td>{student?.grade}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StudentTable;

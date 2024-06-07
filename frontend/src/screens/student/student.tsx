import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import textStyles from "../../components/texts.module.scss";
import styles from "./student.module.scss";
import Back from "../../components/navigation/back";
import { useParams } from "react-router-dom";
import Divider from "../../components/inputs/divider";
import { useNewTaskModal } from "../../components/dialogs/task/newTaskProvider";
import Avatar from "../../components/dataDisplay/avatar";

export interface StudentData {
  id?: string;
  grade?: string;
  firstname?: string;
  lastname?: string;
  email?: string;
  schoolId?: string;
  avatar?: string;
}
const fetchStudentById = async (id: string) => {
  const response = await axios
    .get("http://localhost:3000/students")
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

const Student = () => {
  const [student, setStudent] = useState<StudentData>({});
  const { studentId } = useParams();
  const { openModal } = useNewTaskModal();
  useEffect(() => {
    if (studentId)
      fetchStudentById(studentId).then((data) => {
        setStudent(data || []);
      });
  }, []);
  const studentItems: { title: string; value: string }[] = useMemo(
    () => [
      { title: "firstname", value: student?.firstname || "" },
      { title: "lastname", value: student?.lastname || "" },
      { title: "grade", value: student?.grade || "" },
      { title: "email", value: student?.email || "" },
    ],
    [student]
  );
  //TODO:ADD LOADING STATES FOR EVERYTING
  return (
    <div className="parent">
      <div className={`child ${styles.student}`}>
        <Back />
        <p className={textStyles.sectionTitle}>Student Profile</p>
        <div className={`card-cont ${styles.overview}`}>
          <div className={styles.avatarName}>
            <Avatar />
            <div className={styles.name}>
              <p className={textStyles.cardMd}>{`${student?.firstname} ${student?.lastname}`}</p>
              <p>{student?.schoolId}</p>
              <div>
                <button className="button-default" onClick={openModal}>
                  Assign book
                </button>
              </div>
            </div>
          </div>
          <Divider mt="var(--p-md)" mb="var(--p-md)" />
          <div className={styles.statsCont}>
            {studentItems.map((item, i) => (
              <div key={i}>
                <p>{item.title}</p>
                <p className={textStyles.cardMd}>{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Student;

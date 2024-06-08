import { useEffect, useMemo, useState } from "react";
import textStyles from "../../components/texts.module.scss";
import styles from "./classroom.module.scss";
import { useNewTaskModal } from "../../provider/contexts/newTaskContext";
import StudentTable from "../../components/tables/tables";
import ClassIcon from "../../assets/icons/class";
import { useTeacherContext } from "../../provider/contexts/teacherContext";
import { fetchStudents } from "../../requests/fetchStudents";

const Classroom = () => {
  const [students, setStudents] = useState<any[]>([]);
  const { openModal } = useNewTaskModal();
  const { state } = useTeacherContext();

  useEffect(() => {
    fetchStudents().then((data) => {
      setStudents(data?.students || []);
    });
  }, []);

  const overviewStats: { name: string; value: string }[] = useMemo(
    () => [
      {
        name: `Student${students.length > 0 ? "s" : ""}`,
        value: students?.length.toString() || "0",
      },
      { name: "Recent Task", value: state.recentAssignments.name },
    ],
    [students, state]
  );

  return (
    <div className="parent">
      <div className={`child ${styles.classroom}`}>
        <p className={`${textStyles.sectionTitle} ${textStyles.sectionTop} `}>
          Your Classroom
        </p>
        <div className={`card-cont ${styles.overview}`}>
          <div className={`${styles.stats}`}>
            <ClassIcon />
            <p className={textStyles.cardTitle}>Year 5 Beryl</p>
            <div className={`flex-center ${styles.statItems}`}>
              {overviewStats.map((item, i) => (
                <div key={i}>
                  <p className={styles.itemValue}>{item.value}</p>
                  <p className={styles.itemName}>{item.name}</p>
                </div>
              ))}
            </div>
          </div>
          <div className={styles.newTaskCard}>
            <div>
              <p>Assign homework to your students</p>
              <div>
                <button
                  onClick={() => openModal("all")}
                  className="button-default"
                >
                  Assign homework
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="card-cont">
          <p className={textStyles.sectionTitle}>All Students</p>
          <StudentTable data={students} />
        </div>
      </div>
    </div>
  );
};

export default Classroom;

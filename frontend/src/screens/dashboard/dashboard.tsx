import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import textStyles from "../../components/texts.module.scss";
import styles from "./dashboard.module.scss";
import { useNewTaskModal } from "../../provider/contexts/newTaskContext";
import StudentTable from "../../components/tables/tables";
import ClassIcon from "../../assets/icons/class";
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
const Dashboard = () => {
  const [students, setStudents] = useState<any[]>([]);
  const { openModal } = useNewTaskModal();
  useEffect(() => {
    fetchStudents().then((data) => {
      setStudents(data?.students || []);
    });
  }, []);

  const overviewStats: { name: string; value: string }[] = useMemo(
    () => [
      { name: `Student${students.length>0?"s":""}`, value: students?.length.toString() || "0" },
      { name: "Recent Task", value: "task name" },
    ],
    [students]
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
                <button onClick={openModal} className="button-default">
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

export default Dashboard;

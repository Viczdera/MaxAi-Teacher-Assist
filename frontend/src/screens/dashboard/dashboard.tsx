import { useEffect, useMemo, useState } from "react";
import textStyles from "../../components/texts.module.scss";
import styles from "./dashboard.module.scss";
import ClassIcon from "../../assets/icons/class";
import { useNavigate } from "react-router-dom";
import { fetchStudents } from "../../requests/fetchStudents";

const Dashboard = () => {
  const [students, setStudents] = useState<any[]>([]);
  const navigate = useNavigate();
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
const goToClass=()=>{
  navigate("/classroom");
}
  return (
    <div className="parent">
      <div className={`child ${styles.classroom}`}>
        <p className={`${textStyles.sectionTitle} ${textStyles.sectionTop} `}>
         Dashboard
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
                <button onClick={goToClass} className="button-default">
                  Go to classroom
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

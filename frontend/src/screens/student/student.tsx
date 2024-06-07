import axios from "axios";
import { useEffect, useState } from "react";
import textStyles from "../../components/texts.module.scss";
import styles from "./student.module.scss";
import { useNewTaskModal } from "../../components/dialogs/task/newTaskProvider";

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
const Student = () => {
  const [students, setStudents] = useState<any[]>([]);
  const { openModal} = useNewTaskModal();
  useEffect(() => {
    fetchStudents().then((data) => {
      setStudents(data?.students || []);
    });
  }, []);

  return (
    <div className="parent">
      <div className={`child ${styles.classroom}`}>
        <p className={textStyles.sectionTitle}>Your Classroom</p>
        <div className={`card-cont ${styles.overview}`}>
          <div  className={styles.newTaskCard}>
            {/* <div sx={campaignStyles.speakerRounded}>
              <SpeakerIcon />
            </div> */}
            <p>
              Congratulations John,
            </p>
            <p color="white">
              You can start creating your needs now
            </p>
            <button onClick={openModal} className="button-default">Assign homework</button>
          </div>
          <div  className={styles.newTaskCard}>
            {/* <div sx={campaignStyles.speakerRounded}>
              <SpeakerIcon />
            </div> */}
            <p>
              Congratulations John,
            </p>
            <p color="white">
              You can start creating your needs now
            </p>
            <button className="button-default">Assign homework</button>
          </div>
        </div>
       
      </div>
    </div>
  );
};

export default Student;

import { useNavigate } from "react-router-dom";
import ArrowLeft from "../../assets/icons/arrowLeft";
import styles from "./nav.module.scss";
const Back = () => {
    const navigate=useNavigate()
    const goBack = () => {
        navigate(-1); // Navigate back to the previous page
      };
  return (
    <div onClick={goBack} className={styles.back}>
      <ArrowLeft />
      Back
    </div>
  );
};

export default Back;

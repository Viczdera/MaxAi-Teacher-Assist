import styles from "./styles.module.scss"
import defaultImage from '../../assets/icons8-student-64.png';
const Avatar = ({src}:{src:string}) => {
    const isExternal = src.startsWith('https://') || src.startsWith('http://');
    return ( 
        <div className={styles.avatar}>
             <img src={isExternal?src:defaultImage} alt="Description of the image" />
        </div>
     );
}
 
export default Avatar;
import styles from "./divider.module.scss";

interface Divider {
  mt?: string;
  mr?: string;
  mb?: string;
  ml?: string;
}
const Divider = ({
  mt = "10px",
  mr = "0px",
  mb = "10px",
  ml = "0px",
}: Divider) => {
  return (
    <div
      className={styles.divider}
      style={{ margin: `${mt} ${mr} ${mb} ${ml}` }}
    ></div>
  );
};

export default Divider;

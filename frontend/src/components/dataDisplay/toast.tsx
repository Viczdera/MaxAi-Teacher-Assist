import { useEffect } from "react";
import ReactDOM from "react-dom";
import styles from "./styles.module.scss";

interface ToastProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
  duration?: number;
  type: "success" | "error";
}

const Toast = ({
  isOpen,
  onClose,
  message,
  type,
  duration = 3000,
}: ToastProps) => {
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [isOpen, duration, onClose]);

  if (!isOpen) {
    return null;
  }

  return ReactDOM.createPortal(
    <div
      className={`${styles.toast} ${
        type == "error" ? styles.error : styles.success
      }`}
    >
      <div className={styles.toastContent}>
        <span>{message}</span>
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
      </div>
    </div>,
    document.body
  );
};

export default Toast;
